<template>
    <form @submit.prevent="checkUpdateVolunteerForm(props?.currentVolunteer?.id)">
        <div>
            <div class="flex flex-column w-full">
                <label for="teamName">Имя</label>
                <InputText type="text" class="w-full mt-1 mb-1" v-model="updateVolunteerForm.firstName.value"
                    @input="useValidateForm(updateVolunteerForm.firstName)" />
            </div>
            <span class="error-text">{{ updateVolunteerForm.firstName.error }}</span>
        </div>
        <div class="mt-4">
            <div class="flex flex-column w-full">
                <label for="projectName">Фамилия</label>
                <InputText type="text" class="w-full mt-1 mb-1" v-model="updateVolunteerForm.lastName.value"
                    @input="useValidateForm(updateVolunteerForm.lastName)" />
            </div>
            <span class="error-text">{{ updateVolunteerForm.lastName.error }}</span>
        </div>
        <div class="mt-4">
            <div class="flex flex-column w-full">
                <label for="projectName">Возраст</label>
                <InputText type="text" class="w-full mt-1 mb-1" v-model="updateVolunteerForm.age.value"
                    @input="useValidateForm(updateVolunteerForm.age)" />
            </div>
            <span class="error-text">{{ updateVolunteerForm.age.error }}</span>
        </div>
        <div class="mt-4">
            <div class="flex flex-column w-full">
                <label for="projectInfo">Телефон</label>
                <InputMask class="w-full" id="phone" mask="996999999999" placeholder="996999999999"
                    v-model="updateVolunteerForm.phone.value"
                    @update:model-value="useValidateForm(updateVolunteerForm.phone)" />
            </div>
            <span class="error-text">{{ updateVolunteerForm.phone.error }}</span>
        </div>


        <div class="mt-4">
            <div class="flex flex-column w-full">
                <label for="projectInfo">Дата</label>
                <DatePicker v-model="updateVolunteerForm.joinedAt.value" @update:modelValue="chooseDate" />
            </div>
            <span class="error-text">{{ updateVolunteerForm.joinedAt.error }}</span>
        </div>



        <div class="mt-4" v-if="!authStore.getIsLeader">
            <div class="flex flex-column w-full">
                <label for="projectInfo">Команда</label>
                <VolunteersVolunteerSelect placeholder="Выбрать команду" :selectOptions="teamsOptions"
                    optionLabel="label" @selectOption="selectTeam" :selectedOption="selectedTeam" />
            </div>
            <span class="error-text">{{ updateVolunteerForm.groupId.error }}</span>
        </div>

        <div class="mt-5 flex justify-content-center">
            <Button label="Обновить" type="submit" />
        </div>
    </form>
</template>

<script setup lang="ts">

import { updateVolunteerForm, checkUpdateVolunteerForm, chooseDate } from './update'
import { useTeamsStore } from '~/store/teams';
import { Team } from '~/types/Teams';
import { SelectOption } from '../VolunteerSelect.vue';
import { Volunteer } from '~/types/Volunteers';
import { useAuthStore } from '~/store/auth';
const authStore = useAuthStore()

const teamsStore = useTeamsStore()

onMounted(() => {
    teamsStore.fetchAllteams()
    if (authStore.getIsLeader && authStore?.getGroupId) {
        updateVolunteerForm.value.groupId.value = authStore.getGroupId
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


const selectTeam = (team: SelectOption) => {
    updateVolunteerForm.value.groupId.value = team.value
    updateVolunteerForm.value.groupId.error = ''
}

const props = defineProps<{
    currentVolunteer: Volunteer
}>()

const selectedTeam = computed(() => {
    return ({
        label: `${props.currentVolunteer.group.groupName}`,
        value: props.currentVolunteer.group.groupId
    })
})

onMounted(() => {
    updateVolunteerForm.value.firstName.value = props.currentVolunteer.firstName
    updateVolunteerForm.value.lastName.value = props.currentVolunteer.lastName
    updateVolunteerForm.value.groupId.value = props.currentVolunteer.group.groupId as any
    updateVolunteerForm.value.joinedAt.value = useDateFormat(props.currentVolunteer.joinedAt as any) as any
    updateVolunteerForm.value.phone.value = props.currentVolunteer.phone
    updateVolunteerForm.value.age.value = props.currentVolunteer.age
})

</script>

<style scoped></style>