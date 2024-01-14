<template>
    <v-btn :icon="icon" :color="color" :size="size" :variant="variant" :disabled="disabled" :style="{ ...buttonStyle }"></v-btn>
</template>
  
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        color: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            required: true,
        },
        variant: {
            type: String,
            default: 'outlined'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        buttonStyle: {
            type: Object,
            default: () => ({}),
        },
    },
})
</script>