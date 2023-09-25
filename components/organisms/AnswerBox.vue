<template>
    <v-card v-for="(questionnaire, index) in questionnaires" :key="index" style="margin:1%">
        <v-container>
            <v-row class="justify-center">
                <v-col xs12 sm6 md6 align-self="center">
                    <Msg fontWeight="normal" fontSize="2em" style="margin:2% 0">{{ questionnaire.content }}</Msg>
                    <v-row no-gutters>
                        <v-col cols="auto" v-for="(tag, i) in questionnaire.tags" :key="i">
                            <v-chip class="ma-2" @click="() => {searchQuestionnaires(FORM_TAG_TEXT, tag); goToSearchTab(tag);}">
                                {{ tag }}
                            </v-chip>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col xs12 sm6 md6>
                    <v-container v-if="questionnaire.isAnswered === false">
                        <div v-if="questionnaire.enableMultiAnswer">
                            <v-row class="justify-center" v-for="(choice, index) in questionnaire.choices" :key="index">
                                <v-col xs12 sm12 md12 align-self="center">
                                    <Button :clickedTextColor="clickedMultiTextColor" :buttonStyle="btnStyle"
                                        :onClick="() => toggleChoice(choice.id)">
                                        {{ choice.name }}
                                    </Button>
                                </v-col>
                            </v-row>
                            <v-row class="justify-center" v-if="choices.length !== 0">
                                <v-col class="text-end">
                                    <Button :color="btnColor" :textColor="btnTextColor"
                                        :onClick="() => answerQuestionnaire(questionnaire.id, choices)">確定</Button>
                                </v-col>
                            </v-row>
                        </div>
                        <div v-else>
                            <v-row class="justify-center" v-for="(choice, index) in questionnaire.choices" :key="index">
                                <v-col xs12 sm12 md12 align-self="center">
                                    <Button :color="btnColor" :textColor="btnTextColor" :variant="btnVariant"
                                        :buttonStyle="btnStyle"
                                        :onClick="() => answerQuestionnaire(questionnaire.id, [choice.id])">
                                        {{ choice.name }}
                                    </Button>
                                </v-col>
                            </v-row>
                        </div>
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
import { FORM_TITLE_TEXT, FORM_CATEGORY_TEXT, FORM_TAG_TEXT } from '@/constants';

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
        },
        answerSearchQuestionnaire: {
            type: Function,
            required: true
        },
        searchQuestionnaires: {
            type: Function,
            required: true
        },
        searchType: {
            type: String,
            default: ''
        },
        searchWord: {
            type: String,
            default: ''
        },
        searchCategory: {
            type: String,
            default: ''
        },
        goToSearchTab: {
            type: Function,
            required: true
        }
    },
    setup(props) {
        const btnColor = ref("#3A98B9");
        const btnTextColor = ref('white');
        const btnVariant = ref("elevated");
        const btnStyle = ref({ width: '100%' });
        const clickedMultiTextColor = ref("#3A98B9");

        const choices = ref([]);

        // 選択肢をクリックしてchoices配列に追加 or 削除
        const toggleChoice = (choiceId: string) => {
            const index = choices.value.indexOf(choiceId);
            if (index === -1) {
                choices.value.push(choiceId);
            } else {
                choices.value.splice(index, 1);
            }
        };

        const answerQuestionnaire = (questionId: string, choices: string[]) => {
            console.log(props.searchType);
            console.log(props.searchWord);
            if (props.searchType === '') {
                props.answerQuestionnaire(questionId, choices);
            } else {
                if (props.searchType === FORM_TITLE_TEXT || props.searchType === FORM_TAG_TEXT) {
                    props.answerSearchQuestionnaire(questionId, choices, props.searchType, props.searchWord);
                } else if (props.searchType === FORM_CATEGORY_TEXT) {
                    props.answerSearchQuestionnaire(questionId, choices, props.searchType, props.searchCategory);
                }
            }
        }

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
            FORM_TAG_TEXT,
            btnColor,
            btnTextColor,
            btnVariant,
            btnStyle,
            clickedMultiTextColor,
            choices,
            toggleChoice,
            answerQuestionnaire,
            options
        }
    }
})
</script>