<template>
    <div>
        <div v-if="!authStore.getIsLeader">
            <h1 class="mb-2">Статистика</h1>
            <div class="flex flex-column gap-1 mb-6">
                <div class="circle-chart-block">
                    <Chart type="pie" :data="chartData" :options="chartOptions" class="w-full md:w-[30rem]" />
                </div>
                <div class="mt-8">
                    Общее кол-во волонтеров: <strong>{{ totalLenVolunteers() }}</strong>
                </div>
            </div>
            <h2>Прогресс команд</h2>
<div  v-for="team in teamsStore.getTeams" :key="team.groupId">

    <MainTeamProgress :group-name="team.groupName"

    :project-name="team.projectName" :status="team.status"
    :team-leader-name="team.teamLeader.teamLeaderName" @selectStatus="selectStatus"
    type="admin"
    />

</div>
            <!-- <MainTeamProgress /> -->
        </div>

        <div v-else>


            <div class="flex flex-row align-items-start gap-5">


                <div class="circle-chart-block">

                    <Chart type="pie" :data="leaderChart" :options="leaderChartOptions" class="w-full md:w-[30rem]" />
                </div>

                <div class="mt-8">
                    Общее кол-во волонтеров: <strong>{{ leaderTotalLen() }}</strong>
                </div>
            </div>



            <div class="w-full mt-5 mb-6 flex">

                <h2>Прогресс команд</h2>
                <MainTeamProgress :group-name="teamsStore.getTeam.groupName"
    type="leader"
                    :project-name="teamsStore.getTeam?.projectName" :status="teamsStore.getTeam.status"
                    :team-leader-name="teamsStore.getTeam?.teamLeader?.teamLeaderName" @selectStatus="selectStatus" />





            </div>

        </div>
        <ConfirmDialog></ConfirmDialog>

    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth';
import { useTeamsStore } from '~/store/teams';
import { statusOptions, Team } from '~/types/Teams';
import { leaderTotalLen, totalLenVolunteers, selectedStep } from './main'
import { SelectOption } from '~/components/Volunteers/VolunteerSelect.vue';
import { useTasksStore } from '~/store/tasks';
import { useVolunteerStore } from '~/store/volunteers';
const router = useRouter()
const tasksStore = useTasksStore()
const authStore = useAuthStore()


const teamsStore = useTeamsStore()
const setChartData = () => {
    
    const documentStyle = getComputedStyle(document.body);



    const labels = teamsStore.getTeams.map((team: Team) => team.groupName);
    const data = teamsStore.getTeams.map((team: Team) => team?.volunteers?.length || 0);
    const backgroundColor = teamsStore.getTeams.map((_, index) => {
        const colors = ['--p-cyan-500', '--p-orange-500', '--p-gray-500'];
        return documentStyle?.getPropertyValue(colors[index % colors.length]);
    });
    const hoverBackgroundColor = teamsStore.getTeams.map((_, index) => {
        const hoverColors = ['--p-cyan-400', '--p-orange-400', '--p-gray-400'];
        return documentStyle?.getPropertyValue(hoverColors[index % hoverColors.length]);
    });

    return {
        labels,
        datasets: [
            {
                data,
                backgroundColor,
                hoverBackgroundColor,
            },
        ],
    };
};

const generateRandomColor = () => {
    // Generate a random hex color
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, '0')}`;
};

const setLeaderChartData = () => {
    const documentStyle = getComputedStyle(document.body);
    const labels = tasksStore.getTasksByGroup?.map((item) => item.name)
    const data = tasksStore.getTasksByGroup?.map((item) => item?.volunteers?.length)
    const backgroundColor = tasksStore.getTasksByGroup?.map(() => generateRandomColor());
    const hoverBackgroundColor = backgroundColor

    return {
        labels,
        datasets: [
            {
                data,
                backgroundColor,
                hoverBackgroundColor,
            },
        ],
    };
};

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');

    return {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
        }
    };
};
const selectStatus = (value: SelectOption) => {
    console.log(value)

    updateStep(value.value)
}

const setLeaderChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');

    return {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
        }
    };
};
const chartData = ref();
const chartOptions = ref();
const confirm = useConfirm()
const updateStep = (step: string) => {

    console.log('step', step)


    const option = statusOptions.find((item) => item.value === step)
    confirm.require({
        message: `Вы хотите изменить статус на  "${option?.label}"?`,
        header: 'Изменение статуса',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Отмена',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Потвердить'
        },
        accept: () => {
            console.log('accpr',authStore.getLeader)
            if (authStore.getLeader.groupId) {
                teamsStore.fetchUpdateTeamStatus(authStore.getLeader.groupId, step)
            }


            //   toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        },
        reject: () => {
            //  toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};
const leaderChart = ref()
const leaderChartOptions = ref()
const createUser = async () => {
    try {
        const response = await http.post('/add_user', {
            name: 'Nurgul',
            phone: '996435454545',
            role: 'leader-1'
        })
        console.log('response create user', response)
    } catch (err) {
        console.log(err)
    }
}
const voluntStore=useVolunteerStore()
onMounted(async () => {
    if (!authStore.getUserFromStorage) {
        return navigateTo('/auth')

    }


    if (!authStore.getIsLeader) {
        await teamsStore.fetchAllteams()
        chartData.value = setChartData();
        chartOptions.value = setChartOptions();
        await voluntStore.fetchAllVolunteers()
    } else {
        await teamsStore.fetchTeamId(authStore.getLeaderId as string)
        await tasksStore.fetchTasksByGroupId(authStore.getGroupId as string)
        leaderChart.value = setLeaderChartData();
        leaderChartOptions.value = setLeaderChartOptions();

        console.log('leaderChart', leaderChart)
    }
})


</script>

<style scoped lang="scss">
.circle-chart-block {
    width: 300px;
}
</style>