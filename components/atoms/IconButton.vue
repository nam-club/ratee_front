<template>
    <v-btn :icon="icon" :color="color" :size="size" :variant="variant" :disabled="disabled" :style="{ color: textColor, ...buttonStyle }"></v-btn>
</template>
  
<script>
import { defineComponent } from 'vue'
import { mainTheme } from '~/helpers/themes';

export default defineComponent({
    props: {
        color: {
            type: String,
            default: '',
        },
        textColor: {
            type: String,
            default: mainTheme.colors?.secondary,
        },
        icon: {
            type: String,
            required: true,
        },
        size: {
            type: String,
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