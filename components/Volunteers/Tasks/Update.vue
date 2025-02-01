<template>
    <div>
        <form @submit.prevent="checkUpdateTask(props?.currentTask?.id, authStore.getGroupId as any)">
            <div>
                <div class="flex flex-column w-full">
                    <label for="teamName">Название</label>
                    <InputText type="text" class="w-full mt-1 mb-1" v-model="updateTaskForm.name.value"
                        @input="useValidateForm(updateTaskForm.name)" />
                </div>
                <span class="error-text">{{ updateTaskForm.name.error }}</span>
            </div>
            <div class="mt-3">
                <div class="flex flex-column w-full">
                    <label for="projectInfo" class="mb-1">Дата</label>
                    <DatePicker v-model="updateTaskForm.createdAt.value" @update:modelValue="updateTaskDate" />
                </div>
                <span class="error-text">{{ updateTaskForm.createdAt.error }}</span>
            </div>

            <div class="mt-4">

                <div class="flex flex-column w-full">
                    <label for="projectInfo" class="mb-1">Волонтеры</label>
                    <MultiSelect v-model="selectedUpdateVolunteers" :options="volunteers" optionLabel="name" filter
                        placeholder="Выбрать волонтеров" :maxSelectedLabels="5" class="w-full md:w-80"
                        @update:model-value="changeVolunteer" />
                </div>
                <span class="error-text">{{ updateTaskForm.volunteerId.error }}</span>
            </div>
            <div class="flex items-center gap-2 mt-4">
                <Checkbox v-model="updateTaskForm.isDone.value" binary inputId="isDone" />
                <label for="isDone"> Завершено </label>
            </div>

            <div class="mt-4">

                <Button label="Изменить" type="submit" />
            </div>

        </form>

    </div>
</template>

<script setup lang="ts">
import { Volunteer } from '~/types/Volunteers';


import { updateTaskForm, updateTaskDate, checkUpdateTask, selectedUpdateVolunteers } from './update';
import { useVolunteerStore } from '~/store/volunteers';
import { useAuthStore } from '~/store/auth';
import { PropType } from 'vue';
import { Task } from '~/types/Tasks';
const volunteers = ref([] as Volunteer[])
const voluntStore = useVolunteerStore()
const authStore = useAuthStore()

const props = defineProps({
    currentTask: {
        type: Object as PropType<Task>,
        required: true
    }
})

onMounted(async () => {
    if (authStore.getGroupId) {
        const result = await voluntStore.fetchVolunteersByGroupId(authStore.getGroupId)
        const transformed = result?.map((item: Volunteer) => {
            return {
                ...item,
                name: item.firstName + ' ' + item.lastName
            }
        })


        volunteers.value = transformed?.map((task: Task) => {
            return ({
                name: task.name,
                id: task.id
            })
        })
    }


    if (props.currentTask?.volunteers?.length) {
        updateTaskForm.value.volunteerId.value = props.currentTask?.volunteers?.map((item => item.volunteerId)) as any
    }


    selectedUpdateVolunteers.value = props.currentTask?.volunteers?.map((item) => {
        return ({
            name: item.firstName + ' ' + item.lastName,
            id: item.volunteerId
        })
    })



    updateTaskForm.value.name.value = props.currentTask.name
    updateTaskForm.value.isDone.value = props.currentTask.isDone
    updateTaskForm.value.createdAt.value = useDateFormat(props.currentTask.dateCreated as any) as any;
})


const changeVolunteer = (arr: Volunteer[]) => {
    if (arr.length) {
        updateTaskForm.value.volunteerId.error = ''
    }

    updateTaskForm.value.volunteerId.value = arr.map((item: Volunteer) => item.id) as any
}

</script>

<style scoped></style>