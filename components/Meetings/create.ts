import { useVolunteerStore } from "~/store/volunteers";
import { SelectOption } from "../Volunteers/VolunteerSelect.vue";
import { useTeamsStore } from "~/store/teams";
import { useMeetingsStore } from "~/store/meeting";

export const createMeetingForm = ref({
    name: {
        value: "",
        error: '',
        required: true,
        type:'text'
    },
    meetingInfo: {
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
    },   
    volunteerId: {
        value: [],
        error: '',
        required: true,
        type:'array'
    },
    format: {
        value: "",
        error: '',
        required: true,
        type:'text'
    },
})
export const selectedMeetingVolunteers=ref([] as string[])
const resetForm = () => {
    selectedMeetingVolunteers.value=[]
    
    Object.keys(createMeetingForm.value).forEach(key => {
        if (createMeetingForm.value[key as keyof typeof createMeetingForm.value].type === 'date') {
            createMeetingForm.value[key as keyof typeof createMeetingForm.value].value = null  
        } else {
            createMeetingForm.value[key as keyof typeof createMeetingForm.value].value = ''; // Reset to an empty string or the initial value
            createMeetingForm.value[key as keyof typeof createMeetingForm.value].error = '';       
        }


    });
};

export const checkCreateMeeting = (groupId:string) => {
    const result = validateForm(createMeetingForm.value as any);
    const meetingsStore=useMeetingsStore()
    if (result) {
        const body = {
            name:createMeetingForm.value.name.value,
            meetingInfo:createMeetingForm.value.meetingInfo.value,
            dateCreated:createMeetingForm.value.datetime.value,
            volunteerId:createMeetingForm.value.volunteerId.value,
            format: createMeetingForm.value.format.value,
        }

        console.log('createMEtinfa body', body)
        meetingsStore.createMeeting(body,groupId)
         resetForm()
    } else {
        return;
    }
}


export const chooseMeetingDate = (event: any) => {

    createMeetingForm.value.datetime.value = useDateFormat(event) as any
    createMeetingForm.value.datetime.error = ''


}



