<template>
    <v-tabs v-model="tab" color="color" align-tabs="center">
        <v-tab :value="1">新着</v-tab>
        <v-tab :value="2">トレンド</v-tab>
        <v-tab :value="3">人気</v-tab>
        <v-tab :value="4">全アンケート</v-tab>
    </v-tabs>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        tab: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
    },
})
</script>