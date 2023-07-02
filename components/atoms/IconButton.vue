<template>
    <v-btn :icon="icon" :color="color" :size="size"></v-btn>
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
        }
    },
})
</script>