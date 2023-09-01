<template>
    <v-card>
        
    </v-card>
</template>

<script lang="ts">
import QuestionnaireBarChart from '@/components/organisms/QuestionnaireBarChart.vue'
import { Questionnaire } from '~/composables/questionnaireStates';

export default defineComponent({
    components: {
        QuestionnaireBarChart,
    },
    props: {
        questionnaire: {
            type: Object as PropType<Questionnaire>
        },
    },
    setup() {
        const router = useRoute();
        console.log(router.params.id);
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