<template>
    <form @submit.prevent="checkCreateVolunteer">
        <div>
            <div class="flex flex-column w-full">
                <label for="teamName">Имя</label>
                <InputText type="text" class="w-full mt-1 mb-1" v-model="createVolunteerForm.firstName.value"
                    @input="useValidateForm(createVolunteerForm.firstName)" />
            </div>
            <span class="error-text">{{ createVolunteerForm.firstName.error }}</span>
        </div>
        <div class="mt-4">
            <div class="flex flex-column w-full">
                <label for="projectName">Фамилия</label>
                <InputText type="text" class="w-full mt-1 mb-1" v-model="createVolunteerForm.lastName.value"
                    @input="useValidateForm(createVolunteerForm.lastName)" />
            </div>
            <span class="error-text">{{ createVolunteerForm.lastName.error }}</span>
        </div>
        <div class="mt-4">
            <div class="flex flex-column w-full">
                <label for="projectName">Возраст</label>
                <InputText type="text" class="w-full mt-1 mb-1" v-model="createVolunteerForm.age.value"
                    @input="useValidateForm(createVolunteerForm.age)" />
            </div>
            <span class="error-text">{{ createVolunteerForm.age.error }}</span>
        </div>
        <div class="mt-4">
            <div class="flex flex-column w-full">
                <label for="projectInfo">Телефон</label>
                <InputMask class="w-full" id="phone" mask="996999999999" placeholder="996999999999"
                    v-model="createVolunteerForm.phone.value"
                    @update:model-value="useValidateForm(createVolunteerForm.phone)" />
            </div>
            <span class="error-text">{{ createVolunteerForm.phone.error }}</span>

        </div>


        <div class="mt-4">
            <div class="flex flex-column w-full">
                <label for="projectInfo">Дата</label>
                <DatePicker v-model="createVolunteerForm.joinedAt.value" @update:modelValue="chooseDate" />
            </div>
            <span class="error-text">{{ createVolunteerForm.joinedAt.error }}</span>
        </div>


        <div class="mt-4" v-if="!authStore.getIsLeader">
            <div class="flex flex-column w-full">
                <label for="projectInfo">Команда</label>
                <VolunteersVolunteerSelect placeholder="Выбрать команду" :selectOptions="teamsOptions"
                    optionLabel="label" @selectOption="selectTeam" />
            </div>
            <span class="error-text">{{ createVolunteerForm.groupId.error }}</span>
        </div>

        <div class="mt-5 flex justify-content-center">
            <Button label="Создать" type="submit" />
        </div>
    </form>
</template>

<script setup lang="ts">

import { createVolunteerForm, checkCreateVolunteer, chooseDate } from './create'
import { useTeamsStore } from '~/store/teams';
import { Team } from '~/types/Teams';
import { SelectOption } from '../VolunteerSelect.vue';
import { useAuthStore } from '~/store/auth';
import { InputNumber } from 'primevue';
const authStore = useAuthStore()

const teamsStore = useTeamsStore()


onMounted(() => {
    teamsStore.fetchAllteams()
    if (authStore.getIsLeader && authStore.getGroupId) {
        createVolunteerForm.value.groupId.value = authStore.getGroupId
    }
})

const teamsOptions = computed(() => {
    return teamsStore.getTeams.map((team: Team) => {
        return ({
            label: team.groupName,
            value: team.groupId
        })
    })
})
console.log('get TEMAS', teamsStore.getTeams)


const selectTeam = (team: SelectOption) => {
    createVolunteerForm.value.groupId.value = team.value
    createVolunteerForm.value.groupId.error = ''
}


</script>

<style scoped></style>