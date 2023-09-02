<template>
    <v-card v-if="questionnaire">
        <v-container>
            <v-row>
                <v-col>
                    <Msg fontWeight="normal" fontSize="2em">{{ questionnaire.content }}</Msg>
                </v-col>
            </v-row>
            <v-row>
                <QuestionnaireBarChart :questionnaire="questionnaire" :options="options" />
            </v-row>
        </v-container>
    </v-card>
</template>

<script lang="ts">
import Msg from '@/components/atoms/Msg.vue'
import QuestionnaireBarChart from '@/components/organisms/QuestionnaireBarChart.vue'

export default defineComponent({
    components: {
        Msg,
        QuestionnaireBarChart,
    },
    props: {
        questionnaire: {
            type: Object,
            required: true,
        },
    },
    setup() {
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
            options
        }
    }
})
</script>