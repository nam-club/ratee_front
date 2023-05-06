<template>
    <v-btn :color="color" :fab="fab" :large="large" :left="left" :right="right" :round="round"
        :small="small" :tile="tile" :disabled="disabled" :valiant="variant" 
        :style="{width: width, fontSize: fontSize, color: textColor}" 
        :class="['font-weight-' + fontWeight]"
        @click="onClick">
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
        width: {
            type: String
        },
        fontSize: {
            type: String,
            default: "1em"
        },
        fontWeight: {
            type: String,
            default: 'normal'
        },
        textColor: {
            type: String,
            default: "black"
        }
    },
})
</script>