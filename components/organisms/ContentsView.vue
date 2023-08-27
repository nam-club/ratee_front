<template>
    <v-card class="bg-secondary" dark>
        <v-tabs v-model="tab" color="primary" dark align-tabs="center">
            <v-tab :value="1">新着</v-tab>
            <v-tab :value="2">トレンド</v-tab>
            <v-tab :value="3">人気</v-tab>
            <v-tab :value="4">全アンケート</v-tab>
        </v-tabs>
        <v-window v-model="tab">
            <v-window-item v-for="n in 4" :key="n" :value="n">
                <AnswerBox v-if="n==1" style="margin:5%" :questionnaires="questionnaires"/>
            </v-window-item>
        </v-window>
    </v-card>
</template>

<script>
import AnswerBox from '@/components/organisms/AnswerBox.vue'
import { useQuestionnaires } from '~/composables/questionnaireStates';

export default {
    components: {
        AnswerBox
    },
    props: {
        contentsBg: {
            type: String,
            default: '#FFFFFF'
        },
    },
    data: () => ({
        tab: null,
    }),
    setup() {
        const qStore = useQuestionnaires();
        const questionnaires = qStore.state;
        console.log(questionnaires)

        return {
            questionnaires
        }
    }
}
</script>