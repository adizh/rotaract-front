import { isCreateVolunteerOpen } from "~/pages/volunteers/volunteers";
import { Team } from "~/types/Teams";
import { Volunteer } from "~/types/Volunteers";
import {isUpdateVolunteerOpen} from '@/pages/volunteers/volunteers'
import { useAuthStore } from "./auth";

export const useVolunteerStore = defineStore("volunteerStore", {
    state: () => ({
        volunteer: {} as Volunteer,
        volunteers: [] as Volunteer[],
        volunteersByGroup:[] as Volunteer[]
    }),
  
    actions: {
      async  fetchVolunteerById(volunteerId: string) {
            try {
                const response = await http(`/volunteers/get-volunteer-by-id/${volunteerId}`)

                console.log('response get volunteer', response)
                if (response.status === 200) {
                    this.volunteer = response.data
                    return response.data
                }

          
            } catch (err) {
                console.log(err)
      }   
        },
        async  fetchAllVolunteers() {
            try {
                const response = await http(`/volunteers/get-all`)

                console.log('response get all volunteers', response)
                if (response.status === 200) {
                    this.volunteers = response.data
             
                }

          
            } catch (err) {
                console.log(err)
      }   
        },

        async deleteVolunteer(volunteerId: string) {
            const authStore=useAuthStore()
            try {
                const response = await http.delete(`/volunteers/delete-volunteer/${volunteerId}`)
                console.log('response delete volunteer', response)
                if (response.status === 200) {
                    this.fetchAllVolunteers()
                    if (authStore.getIsLeader && authStore?.getGroupId) {
                         this.fetchVolunteersByGroupId(authStore.getGroupId)
                        
                    }


                }
            } catch (err) {
                console.log(err)
            }
        },
        async createVolunteer(body:any) {
            try {
                const response = await http.post('/volunteers/create-volunteer', body)
                if (response.status === 200) {
                    await this.fetchAllVolunteers()

                    if (body.groupId) {
                       await this.fetchVolunteersByGroupId(body.groupId)
                    }

                    isCreateVolunteerOpen.value=false
                }
                return response.status
            } catch (err) {
                console.log(err)
            }
        },
        async updateVolunteer(volunteerId: string, body: any) {
            try {
                const response = await http.put(`/volunteers/update-volunteer/${volunteerId}`, body)
                console.log('response update volunteer',response)
                if (response.status === 200) {
                    this.fetchAllVolunteers()
                    isUpdateVolunteerOpen.value = false
                    this.fetchVolunteersByGroupId(body.groupId)
                }


            } catch (err) {
                console.log(err)
            }
            
        },
        async fetchVolunteersByGroupId(groupId: string) {
            try {
                const response = await http(`/volunteers/get-all-volunteers-by-group-id/${groupId}`)
                console.log('response fetch volunteer by group id',response)
                if (response.status === 200) {
this.volunteersByGroup=response.data
                    return response.data


                }
            } catch (err) {
                console.log(err)
            }
            
        }
        
    
    },
    
    getters: {
        getVolunteer(state) {
            return state.volunteer
        },
        getAllVolunteers(state) {
            return state.volunteers
        },
        getVolunteersByGroup(state) {
            return state.volunteersByGroup
        }
    }
})