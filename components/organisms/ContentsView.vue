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
                <AnswerBox v-if="n==1" style="margin:5%" :questionnaires="questionnaires" :incrementVoteCount="incrementVoteCount"/>
            </v-window-item>
        </v-window>
    </v-card>
</template>

<script lang="ts">
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

        // 投票した項目をカウントアップ
        const incrementVoteCount = (id: string, name: string) => {
            console.log("id:" + id + " name:" + name)
            //console.log(qStore.incrementVoteCount(id, name));
        }

        return {
            questionnaires,
            incrementVoteCount
        }
    }
}
</script>