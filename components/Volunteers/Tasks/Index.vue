<template>
    <div class="mt-6">
        <div class="flex justify-content-between">
            <h2 class="mb-2">Задания</h2>
            <Button severity="info" label="Создать задание" @click="openCreateTask = true" />
        </div>


        <div v-if="!tasksStore.getTasksByGroupLoading">
            <DataTable :value="tasksStore.getTasksByGroup" dataKey="id" tableStyle="min-width: 60rem"
                v-model:expandedRows="expandedRows">
                <template #header>
                    <div class="flex flex-wrap justify-end gap-2">
                        <!-- <Button text icon="pi pi-plus" label="Expand All" @click="expandAll" />
            <Button text icon="pi pi-minus" label="Collapse All" @click="collapseAll" /> -->
                    </div>
                </template>
                <Column expander style="width: 5rem" />
                <Column field="name" header="Название"></Column>


                <Column field="isDone" header="Статус">
                    <template #body="slotProps">
                        {{ slotProps.data.isDone ? 'Завершено':'В прогрессе' }}
                    </template>
                </Column>

                <Column field="dateCreated" header="Дата">
                    <template #body="slotProps">
                        {{ useDateFormat(slotProps.data.dateCreated) }}
                    </template>
                </Column>




                <Column field="groupId" header="Функции">
                    <template #body="slotProps">


                        <div class="flex gap-1">
                            <Button @click="openTaskDelete(slotProps.data)" icon="pi pi-trash" severity="danger"
                                v-tooltip.top="'Удалить'"></Button>

                            <Button @click="openUpdateTask(slotProps.data)" icon="pi pi-pencil" severity="success"
                                v-tooltip.top="'Изменить'"></Button>
                        </div>
                    </template>
                </Column>

                <template #expansion="slotProps">
                    <div class="p-4">



                        <h5>Волонтеры задания</h5>

                        <DataTable :value="slotProps.data.volunteers">
                            <Column field="firstName" header="ФИО">
                                <template #body="slotProps">
                                    <span>{{ slotProps.data.firstName + ' ' + slotProps.data.lastName }}</span>
                                </template>
                            </Column>

                        </DataTable>
                    </div>
                </template>
            </DataTable>



        </div>
        <div v-else class="centered-block">
            <ProgressSpinner />
        </div>

        <Dialog v-model:visible="openCreateTask" modal header="Создать задание" :style="{ width: '35rem' }">
            <VolunteersTasksCreate />
        </Dialog>

        <Dialog v-model:visible="isUpdateTaskOpen" modal header="Изменить задание" :style="{ width: '35rem' }">
            <VolunteersTasksUpdate :currentTask="currentTask" />
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth';
import { useTasksStore } from '~/store/tasks';
import {isUpdateTaskOpen,openCreateTask} from './update'
import { Task } from '~/types/Tasks';
const expandedRows = ref()


const tasksStore = useTasksStore()
const confirm = useConfirm()
const authStore = useAuthStore()
const currentTask = ref({} as Task)
const openUpdateTask = (task: Task) => {
    isUpdateTaskOpen.value = true
    currentTask.value = task
}
const openTaskDelete = (data: Task) => {
    console.log('data', data)
    confirm.require({
        message: `Вы хотите удалить задание ${data.name}?`,
        header: 'Удалить задание',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Отмена',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Потвердить'
        },
        accept: () => {

            tasksStore.deleteTask(data.id, data.groupId)
            //   toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        },
        reject: () => {

        }
    });
}
onMounted(() => {
    tasksStore.fetchAllTasks()
    if (authStore.getGroupId) {
        tasksStore.fetchTasksByGroupId(authStore.getGroupId)
    }


})
</script>

<style scoped></style>