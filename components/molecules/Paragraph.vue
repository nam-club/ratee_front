<template>
    <h2>{{ caption }}</h2>
    <Msg fontWeight="normal" size="1.5em">{{ text }}</Msg>
</template>

<script>
import { defineComponent } from 'vue'
import Msg from '@/components/atoms/Msg.vue'

export default defineComponent({
    components: {
        Msg
    },
    props: {
        caption: {
            type: String
        },
        text: {
            type: String,
            required: true
        }
    }
})
</script>