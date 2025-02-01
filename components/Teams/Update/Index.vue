<template>
    <form @submit.prevent="checkUpdateTeam(props.currentTeam.groupId)">
        <div>
            <div class="flex flex-column w-full">
                <label for="teamName">Название команды</label>
                <InputText type="text" class="w-full mt-1 mb-1" v-model="updateTeamForm.groupName.value"
                    @input="useValidateForm(updateTeamForm.groupName)" />
            </div>
            <span class="error-text">{{ updateTeamForm.groupName.error }}</span>
        </div>

        <div class="mt-4">
            <div class="flex flex-column w-full">
                <label for="projectName">Название проекта</label>
                <InputText type="text" class="w-full mt-1 mb-1" v-model="updateTeamForm.projectName.value"
                    @input="useValidateForm(updateTeamForm.projectName)" />
            </div>
            <span class="error-text">{{ updateTeamForm.projectName.error }}</span>
        </div>
        <div class="mt-4">
            <div class="flex flex-column w-full">
                <label for="projectInfo">Информация о проекте</label>
                <Textarea rows="5" cols="30" class="w-full mt-1 mb-1" v-model="updateTeamForm.projectInfo.value"
                    @input="useValidateForm(updateTeamForm.projectInfo)" />
            </div>
            <span class="error-text">{{ updateTeamForm.projectInfo.error }}</span>
        </div>


        <div class="mt-4">
            <div class="flex flex-column w-full">
                <label for="projectInfo">Дата</label>
                <DatePicker v-model="updateTeamForm.datetime.value" @update:modelValue="updateDate" />
            </div>
            <span class="error-text">{{ updateTeamForm.datetime.error }}</span>
        </div>


        <div class="mt-4">
            <div class="flex flex-column w-full">
                <label for="projectInfo">Куратор</label>
                
                <VolunteersVolunteerSelect placeholder="Выбрать куратора" :selectOptions="voluntOptions"
                    :defaultValue="props.currentTeam.teamLeader.teamLeaderId" optionLabel="label"
                    @selectOption="updateTeamLeader" :selectedOption="selectedVoluteerLeader" />
            </div>
            <span class="error-text">{{ updateTeamForm.teamLeaderId.error }}</span>
        </div>

        <div class="mt-5 flex justify-content-center">
            <Button label="Обновить" type="submit" />
        </div>
    </form>
</template>

<script setup lang="ts">
import { useVolunteerStore } from '~/store/volunteers';
import { updateTeamForm, checkUpdateTeam, voluntOptions, updateTeamLeader, updateDate } from './update'

import { Team } from '~/types/Teams';
import { SelectOption } from '~/components/Volunteers/VolunteerSelect.vue';

const voluntStore = useVolunteerStore();

const selectedVoluteerLeader = computed(() => {
    return ({
        label: props.currentTeam.teamLeader.teamLeaderName,
        value: props.currentTeam.teamLeader.teamLeaderId
    })
})
onMounted(() => {
    voluntStore.fetchAllVolunteers();
    updateTeamForm.value.datetime.value = useDateFormat(props.currentTeam.dateCreated as any) as any
    updateTeamForm.value.groupName.value = props.currentTeam.groupName
    updateTeamForm.value.projectInfo.value = props.currentTeam.projectInfo
    updateTeamForm.value.projectName.value = props.currentTeam.projectName
    updateTeamForm.value.teamLeaderId.value = props.currentTeam.teamLeader.teamLeaderId;
   

    console.log('selectedVoluteerLeader', selectedVoluteerLeader)

})


const props = defineProps<{
    currentTeam: Team
}>()



</script>

<style scoped></style>