import { Team } from "~/types/Teams";

import {isCreateTeamOpen, openTeamUpdate} from '@/pages/teams/teams'
export const useTeamsStore = defineStore("teamsStore", {
    state: () => ({
        teams: [] as Team[],
        team: {} as Team,

        loading: {
            team: false,
            teams:false
        }
    }),
  
    actions: {
        async fetchAllteams() {
            this.loading.teams=true
      try {
          const response = await http('/teams/get-all-teams')
          console.log('response get all teams', response)
          if (response.status === 200) {
              
              this.teams = response.data
          }
                
            } catch (err) {
                console.log(err)
            }finally{
                this.loading.teams=false
            }
        },
        async createTeam(body:any) {
            console.log('body', body)   
            try {
                const response = await http.post('/teams/create-team', body)
                console.log('resposne create volunteer', response)
                if (response.status === 200) {
                    isCreateTeamOpen.value=false
                    this.fetchAllteams()
                }
            } catch (err) {
                console.log(err)
            }
        },
        async updateTeam(body:any,teamdId:string) {
            try {
                
                const response = await http.put(`/teams/update-team/${teamdId}`, body)
                console.log('response update team', response)
                if (response.status === 200) {
                    this.fetchAllteams()
                    openTeamUpdate.value=false
                }
            } catch (err) {
                console.log(err)
            }
        },
        async fetchTeamId(teamId: string) {
            this.loading.team=true
            try {
                const response = await http(`/teams/team/${teamId}`)
                console.log('response get team id', response)
                if (response.status === 200) {
                    this.team=response.data
                }
                
            } catch (err) {
                console.log(err)
            } finally {
                this.loading.team=false
            }
        },
        async fetchUpdateTeamStatus(teamId: string, status: string) {
            try {
                const response = await http.put(`/teams/update-team-status/${teamId}`, { status: status }) 
                console.log('response udpate team state', response)  
                if (response.status === 200) {
                    setTimeout(() => {
                      window.location.reload()  
                    },300)
                }
            } catch (err) {
                console.log(err)
            }
        }
        
    },
    getters: {
        getTeams(state) {

            return state.teams
        },
        getTeam(state) {
            return state.team
        },
        getTeamLoading(state) {
            return state.loading.team
        },
        getTeamsLoading(state) {
            return state.loading.teams
        },
    }

})