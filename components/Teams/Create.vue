<template>
    <form @submit.prevent="checkCreateTeam">
        <div>
            <div class="flex flex-column w-full">
                <label for="teamName">Название команды</label>
                <InputText type="text" class="w-full mt-1 mb-1" v-model="createTeamForm.groupName.value"
                    @input="useValidateForm(createTeamForm.groupName)" />
            </div>
            <span class="error-text">{{ createTeamForm.groupName.error }}</span>
        </div>
        <div class="mt-4">
            <div class="flex flex-column w-full">
                <label for="projectName">Название проекта</label>
                <InputText type="text" class="w-full mt-1 mb-1" v-model="createTeamForm.projectName.value"
                    @input="useValidateForm(createTeamForm.projectName)" />
            </div>
            <span class="error-text">{{ createTeamForm.projectName.error }}</span>
        </div>
        <div class="mt-4">
            <div class="flex flex-column w-full">
                <label for="projectInfo">Информация о проекте</label>
                <Textarea rows="5" cols="30" class="w-full mt-1 mb-1" v-model="createTeamForm.projectInfo.value"
                    @input="useValidateForm(createTeamForm.projectInfo)" />
            </div>
            <span class="error-text">{{ createTeamForm.projectInfo.error }}</span>
        </div>


        <div class="mt-4">
            <div class="flex flex-column w-full">
                <label for="projectInfo">Дата</label>
                <DatePicker v-model="createTeamForm.datetime.value" @update:modelValue="chooseDate" />
            </div>
            <span class="error-text">{{ createTeamForm.datetime.error }}</span>
        </div>


        <div class="mt-4">
            <div class="flex flex-column w-full">
                <label for="projectInfo">Куратор</label>
                <VolunteersVolunteerSelect placeholder="Выбрать куратора" :selectOptions="voluntOptions"
                    optionLabel="label" @selectOption="selectTeamLeader" />
            </div>
            <span class="error-text">{{ createTeamForm.teamLeaderId.error }}</span>
        </div>

        <div class="mt-5 flex justify-content-center">
            <Button label="Создать" type="submit"  />
        </div>
    </form>
</template>

<script setup lang="ts">
import { useVolunteerStore } from '~/store/volunteers';
import { createTeamForm, checkCreateTeam, voluntOptions, selectTeamLeader, chooseDate } from './create'
import { SelectOption } from '../Volunteers/VolunteerSelect.vue';

const voluntStore = useVolunteerStore()

onMounted(() => {
    voluntStore.fetchAllVolunteers()
})




</script>

<style scoped></style>