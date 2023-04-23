<template>
    <v-btn :color="color" :dark="dark" :fab="fab" :large="large" :left="left" :right="right" :round="round"
        :small="small" :tile="tile" :disabled="disabled" @click="onClick">
        <v-icon>{{ icon }}</v-icon>
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
        icon: {
            type: String,
            required: true,
        }
    },
})
</script>