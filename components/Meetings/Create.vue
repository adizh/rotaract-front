<template>
    <form @submit.prevent="checkCreateMeeting(authStore.getGroupId as any)">
        <div>
            <div class="flex flex-column w-full">
                <label for="teamName">Название</label>
                <InputText type="text" class="w-full mt-1 mb-1" v-model="createMeetingForm.name.value"
                    @input="useValidateForm(createMeetingForm.name)" />
            </div>
            <span class="error-text">{{ createMeetingForm.name.error }}</span>
        </div>

        <div class="mt-4">
            <div class="flex flex-column w-full">
                <label for="teamName">Информация о встрече</label>
                <Textarea type="text" class="w-full mt-1 mb-1" v-model="createMeetingForm.meetingInfo.value"
                    @input="useValidateForm(createMeetingForm.meetingInfo)" />
            </div>
            <span class="error-text">{{ createMeetingForm.meetingInfo.error }}</span>
        </div>


        <div class="mt-4">
            <div class="flex flex-column w-full">
                <label for="projectInfo">Дата</label>
                <DatePicker v-model="createMeetingForm.datetime.value" @update:modelValue="chooseMeetingDate" />
            </div>
            <span class="error-text">{{ createMeetingForm.datetime.error }}</span>
        </div>
        <div class="mt-4">
            <div class="flex flex-column w-full">
                <label for="projectInfo" class="mb-1">Формат</label>
                <SelectButton v-model="formatValue" :options="formatOptions"
                    @update:model-value="changeFormat" />
            </div>
            <span class="error-text">{{ createMeetingForm.datetime.error }}</span>
        </div>

        <div class="mt-4">

            <div class="flex flex-column w-full">
                <label for="projectInfo" class="mb-1">Присутствовали</label>
                <MultiSelect v-model="selectedMeetingVolunteers" :options="volunteers" optionLabel="name" filter
                    placeholder="Выбрать волонтеров" :maxSelectedLabels="5" class="w-full md:w-80"
                    @update:model-value="changeVolunteer" />
            </div>
            <span class="error-text">{{ createMeetingForm.volunteerId.error }}</span>
        </div>




        <div class="mt-5 flex justify-content-center">
            <Button label="Создать" type="submit" />
        </div>
    </form>
</template>

<script setup lang="ts">
import { useVolunteerStore } from '~/store/volunteers';
import { createMeetingForm, checkCreateMeeting, chooseMeetingDate, selectedMeetingVolunteers } from './create'
import { SelectOption } from '../Volunteers/VolunteerSelect.vue';
import { useAuthStore } from '~/store/auth';
import { Volunteer } from '~/types/Volunteers';
const volunteers = ref([] as Volunteer[])
const voluntStore = useVolunteerStore()
const formatValue=ref()
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
})

const formatOptions = ref(['Онлайн', 'Оффлайн'])


const changeFormat = (value: 'Онлайн' | 'Оффлайн') => {
    if (value === 'Онлайн') {
        createMeetingForm.value.format.value = 'online'
    } else if (value === 'Оффлайн') {
        createMeetingForm.value.format.value = 'offline'
    }

}
const changeVolunteer = (value: Volunteer[]) => {
    console.log(value)
    if (value?.length) {
        createMeetingForm.value.volunteerId.error = ''
    }
    const result = value?.map((item) => item.id)
    createMeetingForm.value.volunteerId.value = result as any;
}

</script>

<style scoped></style>