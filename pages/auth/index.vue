<template>
    <div class="login">
        <form class="auth-form md:w-5 lg:w-5 sm:w-full w-full" @submit.prevent="checkLogin()">

            <div class="card flex flex-column justify-center mb-5 lg:w-6 md:w-full sm:w-full w-full basic-form-block">
                <label for="phone" class="mb-1 opacity-70">Номер телефона</label>
                <InputMask class="w-full" id="phone" mask="996999999999" placeholder="996999999999"
                    v-model="authForm.phone.value" @update:model-value="useValidateForm(authForm.phone)" />
                <span class="error-text" v-show="authForm.phone.error">{{ authForm.phone.error }}</span>
            </div>


            <div class="card flex flex-column justify-center lg:w-6 md:w-full sm:w-full w-full basic-form-block">
                <label for="password" class="mb-1 opacity-70">Пароль</label>


                <div class="password-block">
                    <InputText :type="passwordType" class="w-full password-input" v-model="authForm.password.value"
                        @update:model-value="useValidateForm(authForm.password)" />

                    <span v-if="!togglePassword" class="pi pi-eye-slash password-icon"
                        @click="changePassword(true)"></span>
                    <span v-else class="pi pi-eye password-icon" @click="changePassword(false)"></span>
                </div>

                <span class="error-text" v-show="authForm.password.error">{{ authForm.password.error }}</span>
            </div>


            <div class="mt-6 lg:w-6 md:w-full sm:w-full w-full">
                <Button label="Логин" class="w-full" type="submit" />
            </div>
        </form>

    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth';
import { authForm } from './auth';
const togglePassword = ref(false)
const passwordType = computed(() => {
    return togglePassword.value ? 'text' : 'password'
})
const authStore = useAuthStore()
const changePassword = (value: boolean) => {
    togglePassword.value = value;



}


const checkLogin = async () => {
    const result = validateForm(authForm.value);
    if (result) {
        const body = {
            password: authForm.value.password.value,
            phone: authForm.value.phone.value,
        }
        const status = await authStore.loginUser(body)
        if (status === 401) {
            authForm.value.password.error = wrongCredentials
        } else if (status === 404) {
            authForm.value.phone.error = userNotFound
        }
    } else {
        return;
    }
};

onMounted(() => {
    if (authStore.getUserFromStorage) {
        return navigateTo('/')
    } else {
        return;
    }
})
</script>

<style scoped lang="scss">
.login {
    width: 100%;
    margin: 60px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;

}

.auth-form {
    padding: 60px 20px 40px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    border: 1px solid rgb(170, 168, 168);
    border-radius: 10px;
    gap: 20px;
}
</style>