import { useVolunteerStore } from "~/store/volunteers";

import { useTeamsStore } from "~/store/teams";
import { SelectOption } from "~/components/Volunteers/VolunteerSelect.vue";

export const updateTeamForm = ref({
    groupName: {
        value: "",
        error: '',
        required: true,
        type:'text'
    },
    datetime: {
        value: null,
        error: '',
        required: true,
        type:'text'
    },  projectName: {
        value: "",
        error: '',
        required: true,
        type:'text'
    },  projectInfo: {
        value: "",
        error: '',
        required: true,
        type:'text'
    },
    teamLeaderId: {
        value: "",
        error: '',
        required: true,
        type:'text'
    },
})

export const checkUpdateTeam = (teamdId:string) => {
const teamsStore=useTeamsStore()
    const result = validateForm(updateTeamForm.value as any);
    if (result) {
        const body = {
            projectName:updateTeamForm.value.projectName.value,
            groupName:updateTeamForm.value.groupName.value,
            dateCreated:updateTeamForm.value.datetime.value,
            projectInfo:updateTeamForm.value.projectInfo.value,
            teamLeaderId:updateTeamForm.value.teamLeaderId.value,
        }
        console.log('body', body)
        teamsStore.updateTeam(body,teamdId)
    } else {
        return;
    }
}


export const updateDate = (event: any) => {

    updateTeamForm.value.datetime.value = useDateFormat(event) as any
    updateTeamForm.value.datetime.error = ''
}

export const updateTeamLeader = (event: SelectOption) => {
    updateTeamForm.value.teamLeaderId.value = event.value

    updateTeamForm.value.teamLeaderId.error = ''
}

export const voluntOptions = computed(() => {
    const voluntStore = useVolunteerStore()
    return voluntStore.getAllVolunteers?.map((item) => ({
        label: item.firstName + ' ' + item.lastName,
        value: item.id
    }))
})
