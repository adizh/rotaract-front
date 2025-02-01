import { useVolunteerStore } from "~/store/volunteers";
import { SelectOption } from "../Volunteers/VolunteerSelect.vue";
import { useTeamsStore } from "~/store/teams";

export const createTeamForm = ref({
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
        type:'date'
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
const resetForm = () => {
    
    Object.keys(createTeamForm.value).forEach(key => {
        if (createTeamForm.value[key as keyof typeof createTeamForm.value].type === 'date') {
            createTeamForm.value[key as keyof typeof createTeamForm.value].value = null  
        } else {
            createTeamForm.value[key as keyof typeof createTeamForm.value].value = ''; // Reset to an empty string or the initial value
            createTeamForm.value[key as keyof typeof createTeamForm.value].error = '';       
        }


    });
};
export const checkCreateTeam = () => {
    
    const teamStore = useTeamsStore()
    const result = validateForm(createTeamForm.value as any);
    if (result) {
        const body = {
            projectName:createTeamForm.value.projectName.value,
            groupName:createTeamForm.value.groupName.value,
            dateCreated:createTeamForm.value.datetime.value,
            projectInfo:createTeamForm.value.projectInfo.value,
            teamLeaderId:createTeamForm.value.teamLeaderId.value,
        }
        teamStore.createTeam(body)
        resetForm()
    } else {
        return;
    }
}


export const chooseDate = (event: any) => {

    createTeamForm.value.datetime.value = useDateFormat(event) as any
    createTeamForm.value.datetime.error = ''

    console.log('createTeamForm',createTeamForm)
}

export const selectTeamLeader = (event: SelectOption) => {
    createTeamForm.value.teamLeaderId.value = event.value

    createTeamForm.value.teamLeaderId.error = ''
}

export const voluntOptions = computed(() => {
    const voluntStore = useVolunteerStore()
    return voluntStore.getAllVolunteers?.map((item) => ({
        label: item.firstName + ' ' + item.lastName,
        value: item.id
    }))
})
