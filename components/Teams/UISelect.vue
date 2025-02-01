<template>
    <div>
        <Select v-model="selectedValue" :options="selectOptions" :optionLabel="optionLabel" :placeholder="placeholder"
            class="w-full md:w-56" @update:modelValue="emit('selectOption', $event)" />
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

const selectedValue = ref()
export type SelectOption = {
    label: string,
    value: string
}
const props = defineProps({
    selectOptions: {
        type: Array as PropType<{ label: string, value: string }[]>,
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
const emit = defineEmits<{

    selectOption: [SelectOption]

}>()

onMounted(() => {
    console.log('defaultValue', props.defaultValue)
    console.log("props.selectedOption", props.selectedOption)
    if (props.selectedOption) {
        selectedValue.value = props.selectedOption

        console.log('selectedValue in props volunteer', selectedValue)
    }
})

</script>

<style scoped></style>