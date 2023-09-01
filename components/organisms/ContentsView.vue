<template>
    <v-card class="bg-secondary" dark>
        <v-tabs v-model="tab" color="primary" dark align-tabs="center">
            <v-tab :value="1">新着</v-tab>
            <v-tab :value="2">トレンド</v-tab>
            <v-tab :value="3">人気</v-tab>
            <v-tab :value="4">全アンケート</v-tab>
        </v-tabs>
        <v-window v-if="stubMode === '1'" v-model="tab">
            <v-window-item v-for="n in 4" :key="n" :value="n">
                <AnswerBox v-if="n == 1" style="margin:5%" :questionnaires="stubQuestionnaires"
                    :answerQuestionnaire="answerQuestionnaire" />
            </v-window-item>
        </v-window>
        <v-window v-else v-model="tab">
            <v-window-item v-for="n in 4" :key="n" :value="n">
                <AnswerBox v-if="n == 1" style="margin:5%" :questionnaires="questionnaires"
                    :answerQuestionnaire="answerQuestionnaire" />
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

        // スタブモードの時は直接データを入れる
        const stubMode = import.meta.env.VITE_STUB_MODE;
        console.log(stubMode + typeof (stubMode))

        const stubQuestionnaires = ref([
            {
                id: "A01",
                content: "好きな動物は？",
                choices: [
                    { name: "イヌ", voteCount: 12, reasons: ["可愛いから"] },
                    { name: "ネコ", voteCount: 10, reasons: ["猫しか勝たん"] },
                    { name: "ゾウ", voteCount: 6, reasons: ["強いから"] },
                    { name: "キリン", voteCount: 8, reasons: ["イカしてるから"] },
                ],
                category: "生物",
                tags: ["ペット", "犬", "猫", "動物"],
                isAnswered: false,
                createdAt: "2019-08-24T14:15:22Z"
            },
            {
                id: "A02",
                content: "国内旅行するならどこ？",
                choices: [
                    { name: "北海道", voteCount: 22, reasons: ["ご飯が美味しいから"] },
                    { name: "沖縄", voteCount: 18, reasons: ["海が綺麗だから"] },
                    { name: "京都", voteCount: 16, reasons: ["日本人だから"] },
                    { name: "福岡", voteCount: 17, reasons: ["博多グルメ最強"] },
                ],
                category: "旅行",
                tags: ["国内旅行", "都道府県", "日本"],
                isAnswered: false,
                createdAt: "2019-08-26T10:22:09Z"
            },
        ])

        // アンケート回答
        const answerQuestionnaire = (id: string, name: string) => {
            if (stubMode === '0') {
                qStore.answerQuestionnaire(id, [name])
            } else {
                const target = stubQuestionnaires.value.find(item => item.id === id);
                if (target) {
                    target.isAnswered = true;
                }
            }
        }

        return {
            questionnaires,
            answerQuestionnaire,
            stubMode,
            stubQuestionnaires
        }
    }
}
</script>