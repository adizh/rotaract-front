<template>
    <div>
        <div class='flex align-items-center justify-content-between'>

            <h1>История встреч</h1>
            <Button v-if="authStore.getIsLeader" label="Создать" @click="isCreateMeetingsOpen = true" />
        </div>



        <div v-if="authStore.getIsLeader">
            <div v-if="!meetingsStore.getMeetingsByGroupLoading">
                <DataTable v-model:expandedRows="expandedRows" :value="meetingsStore.getMeetingsByGroupId" dataKey="id"
                    tableStyle="min-width: 60rem">


                    <template #header>
                        <div class="flex flex-wrap justify-end gap-2">
                            <!-- <Button text icon="pi pi-plus" label="Expand All" @click="expandAll" />
            <Button text icon="pi pi-minus" label="Collapse All" @click="collapseAll" /> -->
                        </div>
                    </template>
                    <Column expander style="width: 5rem" />
                    <Column field="name" header="Название"></Column>

                    <Column field="format" header="Формат">
                        <template #body="slotProps">

                            <div>

                                {{ slotProps.data.format === 'online' ? 'Онлайн' : 'Оффлайн' }}
                            </div>
                        </template>
                    </Column>

                    <Column field="id" header="Кол-во волонтеров">
                        <template #body="slotProps">{{ slotProps.data.volunteers?.length }}</template>
                    </Column>
                    <Column field="dateCreated" header="Дата встречи">
                        <template #body="slotProps">
                            {{ useDateFormat(slotProps.data.dateCreated) }}
                        </template>
                    </Column>




                    <Column field="groupId" header="Функции">
                        <template #body="slotProps">


                            <!-- <div class="flex gap-1">
                            <Button @click="openTeamDelete(slotProps.data)" icon="pi pi-trash" severity="danger"
                                v-tooltip.top="'Удалить'"></Button>

                            <Button @click="toggleUpdateTeam(slotProps.data)" icon="pi pi-pencil" severity="secondary"
                                v-tooltip.top="'Изменить'"></Button> 
                        </div>-->
                        </template>
                    </Column>

                    <template #expansion="slotProps">
                        <div class="p-4">

                            <p class="max-width-900">Информация о встрече: <strong>{{ slotProps.data.meetingInfo
                                    }}</strong>
                            </p>

                            <h5>Волонтеры</h5>

                            <DataTable :value="slotProps.data.volunteers">
                                <Column field="firstName" header="ФИО">
                                    <template #body="slotProps">
                                        <span>{{ slotProps.data.firstName + ' ' + slotProps.data.lastName }}</span>
                                    </template>
                                </Column>
                                <!--        
                            <Column field="joinedAt" header="Дата присоединения">
                                <template #body="slotProps">
                                    {{ useDateFormat(slotProps.data.joinedAt) }}
                                </template>
                            </Column> -->
                            </DataTable>
                        </div>
                    </template>
                </DataTable>
            </div>


            <div v-else class="centered-block">
                <ProgressSpinner />
            </div>
        </div>

        <div v-else>

            <DataTable
            v-model:filters="filters"  paginator :rows="perPage" filterDisplay="row" :loading="meetingsStore.getMeetingsLoading"
            :globalFilterFields="['groupName']"
            

            v-if="!meetingsStore.getMeetingsLoading"
            v-model:expandedRows="expandedRows" :value="meetingsStore.getAllMeetings" dataKey="_id"
                tableStyle="min-width: 60rem">


                <template #header>
                    <div class="flex justify-end w-full">
                        <IconField class="w-full">
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText
                            class="w-full" v-model="filters['global'].value" placeholder="Поиск по группам" />
                        </IconField>
                    </div>
                </template>

                <template #empty>Нет данных</template>
                <Column expander style="width: 5rem" />
                <Column field="groupName" header="Команда"></Column>

                <Column field="teamLeader" header="Куратор">
                    <template #body="slotProps">{{ slotProps.data.teamLeader.firstName + ' ' +
                        slotProps.data.teamLeader.lastName }}</template>
                </Column>
                <Column field="groupId" header="Всего встреч">
                    <template #body="slotProps">{{ slotProps.data.meetings?.length }}</template>
                </Column>
                <!-- <Column field="format" header="Формат">
                <template #body="slotProps">

                    <div>

                        {{ slotProps.data.format === 'online' ? 'Онлайн' : 'Оффлайн' }}
                    </div>
                </template>
            </Column> -->

                <!-- <Column field="id" header="Кол-во волонтеров">
                <template #body="slotProps">{{ slotProps.data.volunteers?.length }}</template>
            </Column>
            <Column field="dateCreated" header="Дата встречи">
                <template #body="slotProps">
                    {{ useDateFormat(slotProps.data.dateCreated) }}
                </template>
            </Column> -->




                <Column field="groupId" header="Функции">
                    <template #body="slotProps">


                        <!-- <div class="flex gap-1">
                        <Button @click="openTeamDelete(slotProps.data)" icon="pi pi-trash" severity="danger"
                            v-tooltip.top="'Удалить'"></Button>

                        <Button @click="toggleUpdateTeam(slotProps.data)" icon="pi pi-pencil" severity="secondary"
                            v-tooltip.top="'Изменить'"></Button> 
                    </div>-->
                    </template>
                </Column>

                <template #expansion="slotProps">
                    <div class="p-4">

                        <!-- <p class="max-width-900">Информация о встрече: <strong>{{ slotProps.data.meetingInfo }}</strong>
                    </p> -->

                        <h5>Встречи</h5>

                        <DataTable :value="slotProps.data.meetings">
                            <Column field="name" header="Название">

                            </Column>
                            <Column field="format" header="Формат">
                                <template #body="slotProps">
                                    {{ slotProps.data.format === 'online' ? 'Онлайн' : 'Оффлайн' }}
                                </template>
                            </Column>
                            <Column field="joinedAt" header="Дата">
                                <template #body="slotProps">
                                    {{ useDateFormat(slotProps.data.dateCreated) }}
                                </template>
                            </Column>

                            <Column field="volunteers" header="Волонтеры">
                                <template #body="slotProps">
                                    {{ slotProps.data.volunteers?.map((item: any) => item.firstName + ' ' +
                                        item.lastName).join(', ') }}
                                </template>
                            </Column>
                        </DataTable>
                    </div>
                </template>

                <template #footer>
                    <div class="flex align-items-center justify-content-between">
                
                        <!-- <p>Общее кол-во волонтеров: {{ voluntStore.getAllVolunteers?.length }}</p> -->
                
                        <Button v-if="!areAllMeetingsOpen" class="info" icon="pi pi-plus" @click="openAllDate(true)" rounded v-tooltip.top="'Показать все'"/>
                        <Button v-else class="info" icon="pi pi-minus" @click="openAllDate(false)" rounded v-tooltip.top="'Закрыть все'"/>
                    </div>
                </template>
            </DataTable>



            <div v-else class="centered-block">
                <ProgressSpinner />
            </div>
        </div>

        <Dialog v-model:visible="isCreateMeetingsOpen" modal header="Создать встречу" class="big-dialog">
            <MeetingsCreate />
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import { useMeetingsStore } from '~/store/meeting';
import { isCreateMeetingsOpen } from './meetings';
import { FilterMatchMode } from '@primevue/core/api';
import { useAuthStore } from '~/store/auth';
const meetingsStore = useMeetingsStore()
const authStore = useAuthStore()
const expandedRows = ref()
const perPage = ref(5)
const areAllMeetingsOpen=ref(false)

const openAllDate = (value: boolean) => {
    areAllMeetingsOpen.value = value
    if (value) {
        perPage.value=meetingsStore.getMeetingsByGroupId?.length
    }
}
onMounted(() => {
    if (!authStore.getUserFromStorage) {
        return navigateTo('/auth')

    }
    if (authStore.getIsLeader) {
        if (authStore.getGroupId) {
            meetingsStore.fetchMeetingsByGroupId(authStore.getGroupId)
        }

    } else {
        meetingsStore.fetchAllMeetings()
    }

})

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    groupName: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
 
});
</script>

<style scoped></style>