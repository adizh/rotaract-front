<template>
    <div>
        <Button label="Добавить команду" @click="isCreateTeamOpen = !isCreateTeamOpen" />
        <DataTable v-model:expandedRows="expandedRows" :value="store.getTeams" dataKey="groupId"
            tableStyle="min-width: 60rem">

            <template #header>
                <div class="flex flex-wrap justify-end gap-2">
                    <!-- <Button text icon="pi pi-plus" label="Expand All" @click="expandAll" />
            <Button text icon="pi pi-minus" label="Collapse All" @click="collapseAll" /> -->
                </div>
            </template>
            <Column expander style="width: 5rem" />
            <Column field="groupName" header="Название"></Column>
            <Column field="projectName" header="Проект"></Column>



            <Column field="dateCreated" header="Дата создания">
                <template #body="slotProps">
                    {{ useDateFormat(slotProps.data.dateCreated) }}
                </template>
            </Column>


            <Column field="teamLeader" header="Куратор">
                <template #body="slotProps">
                    {{ slotProps.data.teamLeader.teamLeaderName }}

                </template>
            </Column>
            <Column field="meetingCount" header="Кол-во встреч"></Column>
            <Column field="groupId" header="Функции">
                <template #body="slotProps">


                    <div class="flex gap-1">
                        <Button @click="openTeamDelete(slotProps.data)" icon="pi pi-trash" severity="danger"
                            v-tooltip.top="'Удалить'"></Button>

                        <Button @click="toggleUpdateTeam(slotProps.data)" icon="pi pi-pencil" severity="secondary"
                            v-tooltip.top="'Изменить'"></Button>
                    </div>
                </template>
            </Column>

            <template #expansion="slotProps">
                <div class="p-4">

                    <p class="max-width-900">Информация о проекте: <strong>{{ slotProps.data.projectInfo }}</strong></p>

                    <h5>Волонтеры команды {{ slotProps.data.groupName }}</h5>

                    <DataTable :value="slotProps.data.volunteers">
                        <Column field="firstName" header="ФИО">
                            <template #body="slotProps">
                                <span>{{ slotProps.data.firstName + ' ' + slotProps.data.lastName }}</span>
                            </template>
                        </Column>
                        <Column field="phone" header="Телефон"></Column>
                        <Column field="joinedAt" header="Дата присоединения">
                            <template #body="slotProps">
                                {{ useDateFormat(slotProps.data.joinedAt) }}
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </template>
        </DataTable>
    </div>

    <Dialog v-model:visible="isCreateTeamOpen" modal header="Создать команду" :style="{ width: '35rem' }">
        <TeamsCreate />
    </Dialog>


    <ConfirmDialog></ConfirmDialog>

    <Dialog v-model:visible="openTeamUpdate" modal header="Обновить команду" :style="{ width: '35rem' }">
        <TeamsUpdate :currentTeam="currentTeam" />
    </Dialog>

</template>

<script setup lang="ts">
import { useTeamsStore } from '~/store/teams';

import { isCreateTeamOpen, confirmDeleteTeams, openTeamUpdate, toggleUpdateTeam, currentTeam } from './teams'
import { Team } from '~/types/Teams';
import { useAuthStore } from '~/store/auth';

const store = useTeamsStore()
const authStore = useAuthStore()
const expandedRows = ref({});



onMounted(() => {
    if (!authStore.getUserFromStorage) {
        return navigateTo('/auth')

    }
    if (authStore.getIsLeader) {
        return navigateTo('/')
    }

   
    store.fetchAllteams()
})
const confirm = useConfirm();

const openTeamDelete = (data: Team) => {
    console.log(data)
    confirm.require({
        message: 'Вы действительно хотите удалить эту команду?',
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
            confirmDeleteTeams(data)
        },
        reject: () => {
        }
    });
};
</script>

<style scoped>
.max-width-900 {
    max-width: 900px;

    width: 100%;
    word-wrap: break-word;
}
</style>