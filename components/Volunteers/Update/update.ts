import { isCreateVolunteerOpen } from "~/pages/volunteers/volunteers";
import { useVolunteerStore } from "~/store/volunteers";

export const updateVolunteerForm = ref({
    firstName: {
        value: "",
        error: '',
        required: true,
        type: 'text'
    },
    lastName: {
        value: '',
        error: '',
        required: true,
        type:'text'
    },  phone: {
        value: "",
        error: '',
        required: true,
        type:'text'
    },  groupId: {
        value: "",
        error: '',
        required: false,
        type:'text'
    },
    joinedAt: {
        value: null,
        error: '',
        required: true,
        type:'text'
    },
    age: {
        value: "",
        error: '',
        required: true,
        type:'number'
    }, 
})


export const checkUpdateVolunteerForm = (volunteerId:string) => {
    const voluntStore=useVolunteerStore()
    const result = validateForm(updateVolunteerForm.value as any);
    if (result) {
        const body = {
            firstName:updateVolunteerForm.value.firstName.value,
            lastName:updateVolunteerForm.value.lastName.value,
            phone:updateVolunteerForm.value.phone.value,
            groupId:updateVolunteerForm.value.groupId.value,
            joinedAt:updateVolunteerForm.value.joinedAt.value,
            age:updateVolunteerForm.value.age.value,
        }

        
       voluntStore.updateVolunteer(volunteerId,body)


    } else {
        return;
    }
}


export const chooseDate = (event: any) => {

    updateVolunteerForm.value.joinedAt.value = useDateFormat(event) as any
    updateVolunteerForm.value.joinedAt.error = ''


}

// export const selectTeamLeader = (event: SelectOption) => {
//     createVolunteerForm.value.teamLeaderId.value = event.value

//     createVolunteerForm.value.teamLeaderId.error = ''
// }
