import { useTasksStore } from "~/store/tasks";


export const updateTaskForm = ref({
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
        type:'text'
    },  isDone: {
        value: false,
        error: '',
        required: false,
        type:'boolean'
    },
    createdAt: {
        value: null,
        error: '',
        required: true,
        type:'text'
    },
})

export const selectedUpdateVolunteers=ref()
export const checkUpdateTask = (taskId:string,groupId:string) => {

    const tasksStore=useTasksStore()
    const result = validateForm(updateTaskForm.value as any);
    if (result) {

        const body = {
            name: updateTaskForm.value.name.value,
            volunteerId: updateTaskForm.value.volunteerId.value,
            dateCreated: updateTaskForm.value.createdAt.value,
            isDone: updateTaskForm.value.isDone.value,
            groupId:groupId

            
        }
       

        
      tasksStore.updateTask(taskId,body)



    } else {
        return;
    }
}

export const isUpdateTaskOpen = ref(false)
export const openCreateTask = ref(false)
export const updateTaskDate = (event: any) => {

    updateTaskForm.value.createdAt.value = useDateFormat(event) as any
    updateTaskForm.value.createdAt.error = ''


}
