<template>
    <div>
        <form @submit.prevent="checkCreateTask(authStore.getGroupId as any)">
            <div>
                <div class="flex flex-column w-full">
                    <label for="teamName">Название</label>
                    <InputText type="text" class="w-full mt-1 mb-1" v-model="createTask.name.value"
                        @input="useValidateForm(createTask.name)" />
                </div>
                <span class="error-text">{{ createTask.name.error }}</span>
            </div>
            <div class="mt-3">
                <div class="flex flex-column w-full">
                    <label for="projectInfo" class="mb-1">Дата создания</label>
                    <DatePicker v-model="createTask.createdAt.value" @update:modelValue="chooseTaskDate" />
                </div>
                <span class="error-text">{{ createTask.createdAt.error }}</span>
            </div>

            <div class="mt-4">

                <div class="flex flex-column w-full">
                    <label for="projectInfo" class="mb-1">Волонтеры</label>
                    <MultiSelect v-model="selectedVolunteers" :options="volunteers" optionLabel="name" filter
                        placeholder="Выбрать волонтеров" :maxSelectedLabels="5" class="w-full md:w-80"
                        @update:model-value="changeVolunteer" />
                </div>
                <span class="error-text">{{ createTask.volunteerId.error }}</span>
            </div>
            <div class="mt-4">

                <Button label="Создать" type="submit" />
            </div>

        </form>

    </div>
</template>

<script setup lang="ts">
import { Volunteer } from '~/types/Volunteers';
import { createTask, chooseTaskDate, selectedVolunteers, checkCreateTask } from './create';
import { useVolunteerStore } from '~/store/volunteers';
import { useAuthStore } from '~/store/auth';
const volunteers = ref([] as Volunteer[])
const voluntStore = useVolunteerStore()
const authStore = useAuthStore()

onMounted(async () => {
    if (authStore.getGroupId) {
        const result = await voluntStore.fetchVolunteersByGroupId(authStore.getGroupId)
        volunteers.value = result?.map((item: Volunteer) => {
            return {
                ...item,
                name: item.firstName + ' ' + item.lastName
            }
        })
    }
    console.log('volunteers', volunteers)
})


const changeVolunteer = (arr: Volunteer[]) => {

    if (arr.length) {
        createTask.value.volunteerId.error = ''
    }

    createTask.value.volunteerId.value = arr.map((item: Volunteer) => item.id) as any
}

</script>

<style scoped></style>