<template>
    <Drawer v-model:visible="authStore.isSidebarOpen" header="Меню">

    <div class="sidebar mt-2">
        <ul>
            <li :class="{ 'active-link': route.path == '/' }" @click="linkTo('/')">Главная</li>
            <li :class="{ 'active-link': route.path == '/volunteers' }" @click="linkTo('/volunteers')">Волонтеры
            </li>
            <li v-if="!authStore.getIsLeader" :class="{ 'active-link': route.path == '/teams' }"
                @click="linkTo('/teams')">Команды</li>

            <li :class="{ 'active-link': route.path == '/meetings' }" @click="linkTo('/meetings')">Встречи</li>
        </ul>



        <p class="extra-methods" @click="openLogout">
            <span class="pi pi-sign-out" v-tooltip.top="'Выйти'"></span>


        </p>

        <Dialog v-model:visible="isLogoutOpen" modal header="Выход" class="big-dialog">
            <p class="text-center">Вы действительно хотите выйти?</p>

            <div class="flex justify-content-center gap-2 align-items-center mt-4">
                <Button @click="isLogoutOpen=false" label="Отмена" severity="contrast" />
                <Button @click="authStore.logout()" label="Выйти" severity="danger" />
            </div>

        </Dialog>
    </div>
    </Drawer>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth';

const activeLink = ref('/')
const route = useRoute()
const isLogoutOpen = ref(false)
const confirm = useConfirm();
const openLogout = () => {
    isLogoutOpen.value = true
};
const authStore = useAuthStore()
const isOpen = ref(false)


const linkTo = (value:string) => {
    authStore.toggleSidebar(false)
    return navigateTo(value)
}

console.log('route', route)
</script>

<style scoped lang="scss">

.sidebar {
    -webkit-box-shadow: 2px 5px 8px 0px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 2px 5px 8px 0px rgba(34, 60, 80, 0.2);
    box-shadow: 2px 5px 8px 0px rgba(34, 60, 80, 0.2);
    border-radius: 5px;
    width: 100%;
    position: fixed;
    padding: 0 7px;
    top: 0;
    left: 0;
    height: 100vh;


}

.extra-methods {
    margin: 300px auto 0 30px;
    width: 100%;
    display: flex;

}

.active-link {
    background: $main-color;
    color: white;
    transition: .4s ease;
    cursor: pointer;
}

ul {
    margin-top: 50px;
    width: 100%;

    li {
        border-radius: 5px;
        transition: .3s ease;
        margin-top: 4px;
        padding: 6px 10px 6px 20px;

        &:hover {
            background: $main-color;
            color: white;
            transition: .4s ease;
            cursor: pointer;
        }
    }
}
</style>