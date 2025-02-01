<template>
    <div>
        <Select v-model="selectedValue" :options="selectOptions" :optionLabel="optionLabel" :placeholder="placeholder"
            class="w-full md:w-56" @update:modelValue="emit('selectOption', $event)" />
    </div>
</template>

<script setup lang="ts">

import { PropType } from 'vue';


export type SelectOption = {
    label: string,
    value: string
}
const props = defineProps({
    selectOptions: {
        type: Array as PropType<SelectOption[]>,
        required: true
    },
    optionLabel: String,
    placeholder: String,
    selectedOption: {
        type: {} as PropType<SelectOption>,

        required: false
    },
    defaultValue: String
})
const selectedValue = ref(props.selectedOption || {})
const emit = defineEmits<{

    selectOption: [SelectOption]

}>()

onMounted(() => {
 

})


</script>

<style scoped></style>