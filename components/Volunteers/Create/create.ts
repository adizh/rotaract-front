import { isCreateVolunteerOpen } from "~/pages/volunteers/volunteers";
import { useVolunteerStore } from "~/store/volunteers";

export const createVolunteerForm = ref({
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
        type:'date'
    },
    age: {
        value: '',
        error: '',
        required: true,
        type:'number'
    },
})
const resetForm = () => {
    
    Object.keys(createVolunteerForm.value).forEach(key => {
        if (createVolunteerForm.value[key as keyof typeof createVolunteerForm.value].type === 'date') {
            createVolunteerForm.value[key as keyof typeof createVolunteerForm.value].value = null  
        } else {
            createVolunteerForm.value[key as keyof typeof createVolunteerForm.value].value = ''; // Reset to an empty string or the initial value
            createVolunteerForm.value[key as keyof typeof createVolunteerForm.value].error = '';       
        }


    });
};

export const checkCreateVolunteer = async() => {
    const voluntStore=useVolunteerStore()
    const result = validateForm(createVolunteerForm.value as any);
    if (result) {
        const body = {
            firstName:createVolunteerForm.value.firstName.value,
            lastName:createVolunteerForm.value.lastName.value,
            phone:createVolunteerForm.value.phone.value,
            groupId:createVolunteerForm.value.groupId.value,
            joinedAt: createVolunteerForm.value.joinedAt.value,
            age:createVolunteerForm.value.age.value
        }

        const status = await voluntStore.createVolunteer(body)
        if (status === 200) {
            resetForm()            
        }




    } else {
        return;
    }
}


export const chooseDate = (event: any) => {

    createVolunteerForm.value.joinedAt.value = useDateFormat(event) as any
    createVolunteerForm.value.joinedAt.error = ''


}

// export const selectTeamLeader = (event: SelectOption) => {
//     createVolunteerForm.value.teamLeaderId.value = event.value

//     createVolunteerForm.value.teamLeaderId.error = ''
// }
