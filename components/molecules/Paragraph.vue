<template>
    <h2>{{ caption }}</h2>
    <div v-if="type === 'text'">
        <Msg fontWeight="normal" size="1.5em">{{ text }}</Msg>
    </div>
    <div v-else-if="type === 'multiText'">
        <Msg v-for="(t, i) in texts" :key="i" fontWeight="normal" size="1.5em">
            {{ i + 1 + ": " + t }}
        </Msg>
    </div>
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
        type: {
            type: String,
            required: true
        },
        text: {
            type: String
        },
        texts: {
            type: []
        }
    }
})
</script>