import { useTeamsStore } from "~/store/teams";
import { useVolunteerStore } from "~/store/volunteers";
import { Team } from "~/types/Teams";



const totalLenVolunteers = () => {
    const teamsStore=useVolunteerStore()
  return  teamsStore.getAllVolunteers?.length
}

const leaderTotalLen = () => {
  const teamsStore = useTeamsStore()
  return teamsStore.getTeam?.volunteers?.length
}

const selectedStep = ref('')
const updateStep = (step: string) => {
  selectedStep.value=step 
}
export {totalLenVolunteers,leaderTotalLen,updateStep,selectedStep}