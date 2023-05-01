<template>
    <v-card>
        <v-tabs v-model="tab" color="#3A98B9" align-tabs="center">
            <v-tab :value="1">新着</v-tab>
            <v-tab :value="2">トレンド</v-tab>
            <v-tab :value="3">人気</v-tab>
            <v-tab :value="4">全アンケート</v-tab>
        </v-tabs>
        <v-window v-model="tab">
            <v-window-item v-for="n in 4" :key="n" :value="n">
                <AnswerBox style="margin:5%"/>
            </v-window-item>
        </v-window>
    </v-card>
</template>

<script>
import AnswerBox from '@/components/organisms/AnswerBox.vue'
export default {
    components: {
        AnswerBox
    },
    data: () => ({
        tab: null,
    }),
}
</script>