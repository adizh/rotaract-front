import { useTeamsStore } from "~/store/teams"
import { Team } from "~/types/Teams"

const openTeamUpdate=ref(false)
const isCreateTeamOpen = ref(false)
const currentTeam=ref({} as Team)
const confirmDeleteTeams = async (team: Team) => {
    const teamStore=useTeamsStore()
    try {
        const response = await http.delete(`/teams/delete-team/${team?.groupId}`)
        console.log('respone delete tema', response)
        
        if (response.status === 200) {
            teamStore.fetchAllteams()   
        }
    } catch (err) {
        console.log(err)
    }
}

const toggleUpdateTeam = (team: Team) => {
    openTeamUpdate.value = true   
    currentTeam.value=team
}
export {isCreateTeamOpen,confirmDeleteTeams,openTeamUpdate,toggleUpdateTeam,currentTeam}