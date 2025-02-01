<template>
  <div class="app-layout">
    <div v-show="route.path !== '/auth'">
      <NuxtLayout />
    </div>
    <div class="app-page">
      <NuxtPage />
    </div>


  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from './store/auth';




const authStore = useAuthStore()
const route = useRoute()


onMounted(async () => {
  if (authStore.getIsLeader && authStore.getUserId) {
    await authStore.fetchUser(authStore.getUserId)
  }


})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');
@import './styles/index.scss';
@import '/node_modules/primeflex/primeflex.css';

.app-layout {
  display: flex;

  gap: 270px;
  padding-top: 40px;

}

.app-page {
  width: 100%;
  padding-right:30px;

}
</style>