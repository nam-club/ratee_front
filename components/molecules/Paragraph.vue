<template>
    <div :style="paragraphStyle">
        <div :style="{margin: divMargin}">
        <Msg fontSize="1.4em" :margin="msgMargin">{{ caption }}</Msg>
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
    </div>
</template>

<script>
import { useDisplay } from "vuetify";
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
            type: Array
        },
        chips: {
            type: Array
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
        const { mobile } = useDisplay();
        const divMargin = ref("1%");
        const msgMargin = ref("0.5%");

        if (mobile.value) {
            divMargin.value = "5%";
            msgMargin.value = "2%";
        }

        const msgPadding = ref("0 0 0 2%")
        return {
            mobile,
            divMargin,
            msgMargin,
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