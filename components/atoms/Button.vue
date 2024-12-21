<template>
    <v-btn :color="color" :disabled="disabled" :variant="variant" :style="{ color: textColor, ...buttonStyle }"
        :class="['font-weight-' + fontWeight]" @click="handleClick">
        <slot></slot>
    </v-btn>
</template>
  
<script>
import { defineComponent } from 'vue'
import { mainTheme } from '~/helpers/themes.ts';

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
            default: mainTheme.colors?.secondary,
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