<template>
    <div :style="paragraphStyle">
        <h2>{{ caption }}</h2>
        <div v-if="type === 'text'">
            <Msg fontWeight="normal" fontSize="1.2em" :padding="msgPadding">{{ text }}</Msg>
        </div>
        <div v-else-if="type === 'multiText'">
            <Msg v-for="(t, i) in texts" :key="i" fontWeight="normal" fontSize="1.2em" :padding="msgPadding">
                {{ i + 1 + ": " + t }}
            </Msg>
        </div>
        <div v-else-if="type === 'chips'">
            <v-chip v-for="(chip, i) in chips" :key="i" class="ma-2">
                {{ chip }}
            </v-chip>
        </div>
        <div v-else-if="type === 'switchButton'">
            <v-switch color="primary" v-model="isChecked" :label="labelText" readonly hide-details
                class="no-focus"></v-switch>
        </div>
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
        },
        chips: {
            type: []
        },
        labelText: {
            type: String
        },
        isChecked: {
            type: Boolean,
            default: false
        },
        paragraphStyle: {
            type: Object,
            default: () => ({}),
        }
    },
    setup() {
        const msgPadding = ref("0 0 0 2%")
        return {
            msgPadding
        }
    }
})
</script>

<style scoped>
.no-focus {
    pointer-events: none;
}
</style>