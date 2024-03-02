<template>
    <v-card v-if="questionnaire">
        <v-container>
            <v-row>
                <v-col>
                    <Msg fontWeight="normal" :fontSize="mobile ? '1em' : '2em'" style="margin:2% 0">{{ questionnaire.content }}</Msg>
                    <v-row no-gutters>
                        <v-col cols="auto" v-for="(tag, i) in questionnaire.tags" :key="i">
                            <v-chip class="ma-2">
                                {{ tag }}
                            </v-chip>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-container v-if="questionnaire.isAnswered === false">
                <v-row class="justify-center" v-for="(choice, index) in questionnaire.choices" :key="index">
                    <v-col xs12 sm12 md12 align-self="center">
                        <Button :color="btnColor" :variant="btnVariant" :buttonStyle="btnStyle"
                            :onClick="() => answerQuestionnaire(questionnaire.id, [choice.id])">
                            {{ choice.name }}
                        </Button>
                    </v-col>
                </v-row>
            </v-container>
            <v-container v-if="questionnaire.isAnswered === true">
                <v-row>
                    <QuestionnaireBarChart :questionnaire="questionnaire" :options="options" />
                </v-row>
                <v-row>
                    <TimeChart :timeData="chart" :options="options" />
                </v-row>
            </v-container>
        </v-container>
    </v-card>
</template>

<script lang="ts">
import { useDisplay } from 'vuetify'
import Msg from '@/components/atoms/Msg.vue'
import QuestionnaireBarChart from '@/components/organisms/QuestionnaireBarChart.vue'
import TimeChart from '@/components/organisms/TimeChart.vue'

export default defineComponent({
    components: {
        Msg,
        QuestionnaireBarChart,
        TimeChart
    },
    props: {
        questionnaire: {
            type: Object,
            required: true,
        },
        answerQuestionnaire: {
            type: Function,
            required: true
        },
        chart: {
            type: Object,
            required: true,
        }
    },
    setup() {
        const { mobile } = useDisplay()
        
        const options = computed(() => ({
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: mobile.value ? 1.2 : 4, // mobile の状態に基づいて aspectRatio を変更
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false // レジェンド（ラベル）を非表示にする
                }
            },
            scales: {
                x: {
                    display: false, // x軸の目盛りと数値を非表示にする
                },
                y: {
                    ticks: {
                        font: {
                            family: "'Kosugi Maru'", // y軸のラベルにフォントを適用
                            size: 14
                        }
                    }
                }
            },
        }));

        return {
            mobile,
            options
        }
    }
})
</script>