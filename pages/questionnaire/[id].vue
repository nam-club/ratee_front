<template>
    <v-card>
        <v-container>
            <v-row>
                <QuestionnaireBarChart :questionnaire="questionnaire" :options="options" />
            </v-row>
        </v-container>
    </v-card>
</template>

<script lang="ts">
import QuestionnaireBarChart from '@/components/organisms/QuestionnaireBarChart.vue'
import { useQuestionnaire } from '~/composables/questionnaireStates';

export default defineComponent({
    components: {
        QuestionnaireBarChart,
    },
    setup() {
        const router = useRoute();
        const questionId = Array.isArray(router.params.id) ? router.params.id[0] : router.params.id;

        const qStore = useQuestionnaire(questionId);
        const questionnaire = qStore.state;

        console.log(questionnaire)

        const options = ref({
            responsive: true,
            indexAxis: 'y',
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false // レジェンド（ラベル）を非表示にする
                }
            },
            scales: {
                x: {
                    display: false, // x軸の目盛りと数値を非表示にする
                },
            },
        });

        return {
            questionnaire,
            options
        }
    }
})
</script>