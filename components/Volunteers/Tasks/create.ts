import { useTasksStore } from "~/store/tasks";


export const createTask = ref({
    name: {
        value: "",
        error: '',
        required: true,
        type: 'text'
    },
  volunteerId: {
        value: [],
        error: '',
        required: true,
        type:'array'
    },  isDone: {
        value: "",
        error: '',
        required: false,
        type:'text'
    },
    createdAt: {
        value: null,
        error: '',
        required: true,
        type:'date'
    },
})

const resetForm = () => {
    
    Object.keys(createTask.value).forEach(key => {
        if (createTask.value[key as keyof typeof createTask.value].type === 'date') {
            createTask.value.createdAt.value= null  
        } else if (createTask.value[key as keyof typeof createTask.value].type === 'array') {
            createTask.value[key as keyof typeof createTask.value].value = []
        } else {
            createTask.value[key as keyof typeof createTask.value].value = ''; // Reset to an empty string or the initial value
            createTask.value[key as keyof typeof createTask.value].error = ''; // Clear any errors
        }

       
    });
};
export const selectedVolunteers=ref()
export const checkCreateTask = (groupId:string) => {

    const tasksStore=useTasksStore()
    const result = validateForm(createTask.value as any);
    if (result) {

        const body = {
            name: createTask.value.name.value,
            volunteerId: createTask.value.volunteerId.value,
            dateCreated: createTask.value.createdAt.value,
            isDone: false,
            groupId:groupId
            
        
        }
        console.log('body', body)
        tasksStore.createTask(body)
        resetForm()
        selectedVolunteers.value=null
        
      



    } else {
        return;
    }
}


export const chooseTaskDate = (event: any) => {

    createTask.value.createdAt.value = useDateFormat(event) as any
    createTask.value.createdAt.error = ''


}
