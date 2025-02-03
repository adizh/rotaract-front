import  type {Leader, User} from '@/types/User'
import { isUpdateTaskOpen, openCreateTask } from '~/components/Volunteers/Tasks/update'
import { isCreateVolunteerOpen } from '~/pages/volunteers/volunteers'
import { Task } from '~/types/Tasks'

export const useTasksStore = defineStore("tasksStore", {
    state: () => ({
        allTasks: [] as Task[],
        tasksByGroup: [] as Task[],
        loading: {
            tasks: false,
            tasksByGroup:false
        }

    }),
  
    actions: {
       
        async fetchTasksByGroupId(groupId: string) {
            this.loading.tasksByGroup= true
            try {
                const response = await http(`/tasks/get-tasks-by-group/${groupId}`)
                console.log('response fetch tasks by groupId', response)
                if (response.status === 200) {
                 this.tasksByGroup=response.data   
                }
                
            } catch (err) {
                console.log(err)
            } finally {
                this.loading.tasksByGroup= false
            }
    },
        
        async fetchAllTasks() {
            this.loading.tasks= true
        try {
            const response = await http('/tasks/get-all-tasks')
            console.log('response fetch tasks', response)
            if (response.status === 200) {
                this.allTasks=response.data
            }
            
        } catch (err) {
            console.log(err)
        }finally{   this.loading.tasks= false}
    },
        async createTask(body: any) {
            try {
                const response = await http.post('/tasks/create-task', body)
                console.log('response create task', response)
                if (response.status === 200) {
                   openCreateTask.value=false
             
                   await this.fetchTasksByGroupId(body.groupId)
                }
            
            } catch (err) {
                console.log(err)
            }
        },
        async deleteTask(taskId: string,groupId?:string) {
            try {
                const response = await http.delete(`/tasks/delete-task/${taskId}`)
                console.log('response delete task',response)
                if (response.status === 200) {
                    if (groupId) {
                        this.fetchTasksByGroupId(groupId)
                    } else {
                        this.fetchAllTasks()
                    }
                }
            } catch (err) {
                console.log(err)
            }
        },
        async updateTask(taskId: string,body:any) {
            try {
                const response = await http.put(`/tasks/update-task/${taskId}`, body);
                console.log('response update task', response)
                if (response.status === 200) {
                    isUpdateTaskOpen.value=false
                    this.fetchTasksByGroupId(body.groupId)
                }
                
            } catch (err) {
                console.log(err)
            }
        }
    },
    getters: {
        getTasksByGroup(state) {
            return state.tasksByGroup
        },
        getTasksLoading(state) {
            return state.loading.tasks
        },
        getTasksByGroupLoading(state) {
            return state.loading.tasksByGroup
        }
    }

})
          