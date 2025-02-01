<template>
    <div>
        <div class="flex justify-content-between">
            <h3 class="mb-3" v-if="authStore.getIsLeader">Волонтеры команды {{ authStore.getLeader.groupName }}</h3>
            <Button label="Создать волонтера" @click="toggleCreateVolunteer(true)" />
        </div>
        <DataTable :value="volunteersTable" dataKey="id" tableStyle="min-width: 60rem">


            <template #header>
                <div class="flex flex-wrap justify-end gap-2">
                    <!-- <Button text icon="pi pi-plus" label="Expand All" @click="expandAll" />
        <Button text icon="pi pi-minus" label="Collapse All" @click="collapseAll" /> -->
                </div>
            </template>
            <Column field="firstName" header="Имя"></Column>
            <Column field="lastName" header="Фамилия"></Column>
            <Column field="age" header="Возраст"></Column>
            <Column field="group" header="Команда">
                <template #body="slotProps">
                    {{ slotProps.data.group.groupName }}
                </template>
            </Column>

            <Column field="performance" header="Активность">
                <template #body="slotProps">
                    <Badge :value="`${slotProps.data.performance}%`"
                        :severity="slotProps.data.performance <= 30 ? 'danger' : slotProps.data.performance <= 70 ? 'warn' : 'success'">
                    </Badge>

                </template>
            </Column>
            <Column field="joinedAt" header="Дата">
                <template #body="slotProps">
                    {{ useDateFormat(slotProps.data.joinedAt) }}
                </template>
            </Column>




            <Column field="groupId" header="Функции">
                <template #body="slotProps">


                    <div class="flex gap-1">
                        <Button @click="openVolunteerDelete(slotProps.data)" icon="pi pi-trash" severity="danger"
                            v-tooltip.top="'Удалить'"></Button>

                        <Button @click="toggleUpdateVolunteer(slotProps.data)" icon="pi pi-pencil" severity="secondary"
                            v-tooltip.top="'Изменить'"></Button>
                    </div>
                </template>
            </Column>


        </DataTable>








        <VolunteersTasks v-if="authStore.getIsLeader" />

        <ConfirmDialog></ConfirmDialog>


        <Dialog v-model:visible="isUpdateVolunteerOpen" modal header="Обновить волонтера" :style="{ width: '35rem' }">

            <VolunteersUpdate :currentVolunteer="currentVolunteer" />
        </Dialog>

        <Dialog v-model:visible="isCreateVolunteerOpen" modal header="Создать волонтера" :style="{ width: '35rem' }">
            <VolunteersCreate />
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import { useVolunteerStore } from '~/store/volunteers';
import { Volunteer } from '~/types/Volunteers';
import { toggleUpdateVolunteer, isUpdateVolunteerOpen, currentVolunteer, toggleCreateVolunteer, isCreateVolunteerOpen } from './volunteers'
import { useAuthStore } from '~/store/auth';

const confirm = useConfirm()
const voluntStore = useVolunteerStore();
const volunteersTable = computed(() => {
    return authStore.getIsLeader ? voluntStore.getVolunteersByGroup : voluntStore.getAllVolunteers
})
const authStore = useAuthStore()
const openVolunteerDelete = (data: Volunteer) => {
    console.log(data)
    confirm.require({
        message: 'Вы действительно хотите удалить этого волонтера?',
        header: 'Удалить',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Отмена',
        rejectProps: {
            label: 'Отмена',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Удалить',
            severity: 'danger'
        },
        accept: () => {
            voluntStore.deleteVolunteer(data?.id)
        },
        reject: () => {
        }
    });
};
onMounted(async () => {

    if (!authStore.getUserRole) {
        return navigateTo('/')

    }

    if (authStore.getIsLeader) {
        if (authStore.getGroupId) {
            await voluntStore.fetchVolunteersByGroupId(authStore.getGroupId)


        }

    } else {
        await voluntStore.fetchAllVolunteers()
    }
})
</script>

<style scoped></style>