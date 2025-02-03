<template>
    <div class="team-progress">
       
        <div>
            <div class='card team-block'>

                <p class="mt-3">Команда: <strong>{{ groupName }}</strong></p>
                <p class="mt-1 mb-1">Куратор: <strong>{{ teamLeaderName }}</strong></p>
                <p class="mb-1">Проект: <strong>{{ projectName }}</strong></p>
                <div class="flex gap-2 w-40rem align-items-center mt-2 mb-2">

                    <p class="mb-1">Статус проекта: <strong>{{ currentStatus(status as any) }}</strong></p>

                </div>

                <div class="w-20rem" v-if="props.type==='leader'">
                    <VolunteersVolunteerSelect placeholder="Изменить статус" :selectOptions="statusOptions"
                        optionLabel="label" @selectOption="selectStatus" :selectedOption="selectedStatus" />
                </div>

                <Stepper :value="status" class="basis-[10rem]">
                    <StepList>
                        <Step v-for="item in statusOptions" :key="item.label" :disabled="true" :value="item.value">{{
                            item.label }}</Step>
                    </StepList>

                </Stepper>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { useAuthStore } from '~/store/auth';
import { useTeamsStore } from '~/store/teams';
import { statusOptions, Team } from '~/types/Teams';
import { SelectOption } from '../Volunteers/VolunteerSelect.vue';

const authStore = useAuthStore()
const teamStore = useTeamsStore()

const currentStatus = (status: string) => {
    if (status && status !== null) {
        return statusOptions.find((item) => item.value === status)?.label
    } else {
        return;
    }

}

const props = defineProps({
    groupName: String,
    teamLeaderName: String,
    projectName: String,
    status: String,
    type: {
    type: String,
    validator(value: string) {
      return ['admin', 'leader'].includes(value); 
    }
  }
});
const selectedStatus = statusOptions.find((item) => item.value === props.status)


const emits = defineEmits<{
    selectStatus: [value: SelectOption],


}>()

const selectStatus = (value: SelectOption) => {
    emits('selectStatus', value)
}






</script>

<style scoped lang="scss">
.team-block {
    width: 1000px;
}

.team-progress {
    padding-bottom: 50px;
}
</style>