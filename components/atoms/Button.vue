<template>
    <v-btn v-bind="attrs" v-on="listeners" :color="color" :disabled="disabled" :valiant="variant" :style="buttonStyle"
        :class="['font-weight-' + fontWeight]" @click="onClick">
        <slot></slot>
    </v-btn>
</template>
  
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        color: {
            type: String,
            required: true,
        },
        variant: {
            type: String,
            default: "flat"
        },
        fontWeight: {
            type: String,
            default: 'normal'
        },
        textColor: {
            type: String,
            default: "black"
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
})
</script>