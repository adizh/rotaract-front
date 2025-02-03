import { isCreateMeetingsOpen } from "~/pages/meetings/meetings"
import { AllMeetings } from "~/types/Meetings"

export const useMeetingsStore = defineStore("meetingsStore", {
    state: () => ({
        allMeetings: [] as AllMeetings[],
        meetingsByGroupId: [],
        loading: {
            allMeetings: false,
            meetingsByGroupId:false
        }
    
    }),
    actions: {
        
        async fetchMeetingsByGroupId(groupId: string) {
            this.loading.meetingsByGroupId=true
            try {
                const response = await http.get(`/meetings/fetch-all-meetings-groupId/${groupId}`)
                console.log('response fetch meetings gropId',response)
                if (response.status === 200) {
                    this.meetingsByGroupId = response.data.meetings
                }
                
            } catch (err) {
                console.log(err)
            } finally {
                this.loading.meetingsByGroupId=false
            }
        },
        async fetchAllMeetings() {
            this.loading.allMeetings=true
            try {
                const response = await http.get('/meetings/fetch-all-meetings')
                console.log('response',response)
                if (response.status === 200) {

          this.allMeetings=response.data.meetings
                }
                
            } catch (err) {
                console.log(err)
            } finally {
                this.loading.allMeetings=false
            }
        },
        async deleteMeetingById(meetingId:string) {
            try {
                const response = await http.delete(`/meetings/delete-meeting/${meetingId}`)
                console.log('response dlete meeting',response)
                if (response.status === 200) {
          
                }
                
            } catch (err) {
                console.log(err)
            }
        },
        async createMeeting(body:any,groupId:string) {
            try {
                const response = await http.post(`/meetings/create-meeting/${groupId}`,body)
                console.log('response create meeting', response)
                if (response.status === 200) {
                    isCreateMeetingsOpen.value = false
                    this.fetchMeetingsByGroupId(groupId)
                }
                
            } catch (err) {
                console.log(err)
            }
        }
    },
    getters: {
        getMeetingsByGroupId(state) {
            return state.meetingsByGroupId
        },
        getAllMeetings(state) {
            return state.allMeetings
        },
        getMeetingsLoading(state) {
            return state.loading.allMeetings
        },
        getMeetingsByGroupLoading(state) {
            return state.loading.meetingsByGroupId
        }
    }
})
  