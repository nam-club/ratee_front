<template>
    <v-btn :color="color" :dark="dark" :fab="fab" :large="large" :left="left" :right="right" :round="round"
        :small="small" :tile="tile" :disabled="disabled" @click="onClick">
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
    },
})
</script>