<template>
    <div class="volunteers-section">
        <div class="flex justify-content-between mb-5">
            <h3 class="mb-3" v-if="authStore.getIsLeader">Волонтеры команды {{ authStore.getLeader.groupName }}</h3>
            <Button label="Создать волонтера" @click="toggleCreateVolunteer(true)" />
        </div>
        <DataTable v-if="!voluntStore.getVolunteersByGroupLoading && !voluntStore.getVolunteersLoading"
            :value="volunteersTable" dataKey="id" tableStyle="min-width: 60rem"
            
             v-model:filters="filters"  paginator :rows="perPage" filterDisplay="row" :loading="voluntStore.getVolunteersByGroupLoading ||voluntStore.getVolunteersLoading "
                :globalFilterFields="['firstName', 'lastName']"
            >


            <template #header>
                <div class="flex justify-end w-full">
                    <IconField class="w-full">
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText
                        class="w-full" v-model="filters['global'].value" placeholder="Поиск по ФИО" />
                    </IconField>
                </div>
            </template>
            <template #empty> Нет данных </template>
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
<template #footer>
    <div class="flex align-items-center justify-content-between">

        <p>Общее кол-во волонтеров: {{ voluntStore.getAllVolunteers?.length }}</p>

        <Button v-if="!areAllOpen" class="info" icon="pi pi-plus" @click="showAllData(true)" rounded v-tooltip.top="'Показать все'"/>
        <Button v-else class="info" icon="pi pi-minus" @click="showAllData(false)" rounded v-tooltip.top="'Закрыть все'"/>
    </div>
</template>

        </DataTable>



        <div v-else class="centered-block">
            <ProgressSpinner />
        </div>




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
import { useTasksStore } from '~/store/tasks';
import { FilterMatchMode } from '@primevue/core/api';
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    firstName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    lastName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
 
});
const areAllOpen =ref(false)
const perPage=ref(5)

const showAllData = (data: boolean) => {
    areAllOpen.value = data
    if (data) {
        perPage.value = voluntStore.getAllVolunteers?.length    
    } else {
        perPage.value = 5
    }
    
}
const confirm = useConfirm()
const tasksStore = useTasksStore()
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

<style scoped>
.volunteers-section{
    padding-bottom: 90px;
}


</style>