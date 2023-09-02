<template>
    <v-card v-for="(questionnaire, index) in questionnaires" :key="index" style="margin:1%">
        <v-container>
            <v-row class="justify-center">
                <v-col xs12 sm6 md6 align-self="center">
                    <Msg fontWeight="normal" fontSize="2em">{{ questionnaire.content }}</Msg>
                </v-col>
                <v-col xs12 sm6 md6>
                    <v-container v-if="questionnaire.isAnswered === false">
                        <v-row class="justify-center" v-for="(choice, index) in questionnaire.choices" :key="index">
                            <v-col xs12 sm12 md12 align-self="center">
                                <Button :color="btnColor" :variant="btnVariant" :buttonStyle="btnStyle"
                                    :onClick="() => answerQuestionnaire(questionnaire.id, choice.id)">
                                    {{ choice.name }}
                                </Button>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-container v-if="questionnaire.isAnswered === true">
                        <v-row>
                            <v-col class="text-end">
                                <nuxt-link :to="`/questionnaire/${questionnaire.id}`">
                                    <Button>
                                        詳細を見る
                                    </Button>
                                </nuxt-link>
                            </v-col>
                        </v-row>
                        <v-row>
                            <QuestionnaireBarChart :questionnaire="questionnaire" :options="options" />
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script lang="ts">
import Msg from '@/components/atoms/Msg.vue'
import Button from '@/components/atoms/Button.vue'
import QuestionnaireBarChart from '@/components/organisms/QuestionnaireBarChart.vue'
import { Questionnaire } from '~/composables/questionnaireStates';

export default defineComponent({
    components: {
        Msg,
        Button,
        QuestionnaireBarChart,
    },
    props: {
        questionnaires: {
            type: Array as PropType<Questionnaire[]>
        },
        sortType: {
            type: String
        },
        answerQuestionnaire: {
            type: Function,
            required: true
        }
    },
    setup() {
        const btnColor = ref("#3A98B9");
        const btnVariant = ref("elevated");
        const btnStyle = ref({ width: '100%', color: 'white' });

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
            btnColor,
            btnVariant,
            btnStyle,
            options
        }
    }
})
</script>