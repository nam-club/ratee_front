<template>
    <v-btn :color="color" :disabled="disabled" :variant="variant" :style="{ color: textColor, ...buttonStyle }"
        :class="['font-weight-' + fontWeight]" @click="handleClick">
        <slot></slot>
    </v-btn>
</template>
  
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        color: {
            type: String,
            default: '',
        },
        clickedColor: {
            type: String,
            default: ''
        },
        textColor: {
            type: String,
            default: ''
        },
        clickedTextColor: {
            type: String,
            default: ''
        },
        variant: {
            type: String,
            default: 'outlined'
        },
        fontWeight: {
            type: String,
            default: 'normal'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        buttonStyle: {
            type: Object,
            default: () => ({}),
        },
        onClick: {
            type: Function,
            default: () => { },
        },
    },
    setup(props) {

        const handleClick = () => {
            props.onClick();
        };

        return {
            handleClick
        }
    }
})
</script>