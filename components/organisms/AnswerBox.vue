<template>
    <v-row v-if="!mobile">
        <v-col cols="4" v-for="(questionnaire, index) in questionnaires" :key="index">
            <v-card>
                <v-container>
                    <v-row class="justify-center">
                        <v-col xs12 sm6 md6 align-self="center">
                            <v-row no-gutters>
                                <v-col cols="8">
                                    <Msg fontWeight="normal" fontSize="1.5em" style="margin:2% 0">{{ questionnaire.content
                                    }}
                                    </Msg>
                                </v-col>
                                <v-col cols="4" class="text-end">
                                    <nuxt-link :to="`/questionnaire/${questionnaire.id}`">
                                        <Button :textColor="detailBtnTextColor" variant="btnVariant">
                                            詳細を見る
                                        </Button>
                                    </nuxt-link>
                                </v-col>
                            </v-row>
                            <v-row no-gutters>
                                <v-col cols="auto" v-for="(tag, i) in questionnaire.tags" :key="i">
                                    <v-chip class="ma-1"
                                        @click="() => { searchQuestionnaires(FORM_TAG_TEXT, tag); goToSearchTab(tag); }">
                                        {{ tag }}
                                    </v-chip>
                                </v-col>
                            </v-row>
                            <v-container v-if="questionnaire.isAnswered === false">
                                <div v-if="questionnaire.enableMultiAnswer">
                                    <v-row class="justify-center" v-for="(choice, index) in questionnaire.choices"
                                        :key="index">
                                        <v-col xs12 sm12 md12 align-self="center">
                                            <Button
                                                :class="{ 'background-on-click': findChoicesByQuestionnaireId(questionnaire.id).includes(choice.id) }"
                                                :textColor="findChoicesByQuestionnaireId(questionnaire.id).includes(choice.id) ? clickedMultiTextColor : btnTextColor"
                                                :buttonStyle="btnStyle" :variant="btnVariant"
                                                :onClick="() => toggleChoice(questionnaire.id, choice.id)">
                                                {{ choice.name }}
                                            </Button>
                                        </v-col>
                                    </v-row>
                                    <v-row class="justify-center"
                                        v-if="findChoicesByQuestionnaireId(questionnaire.id).length !== 0">
                                        <v-col class="text-end">
                                            <Button :textColor="confirmBtnTextColor" :variant="btnVariant"
                                                :buttonStyle="confirmBtnStyle"
                                                :onClick="() => answerQuestionnaire(questionnaire.id, findChoicesByQuestionnaireId(questionnaire.id))">確定</Button>
                                        </v-col>
                                    </v-row>
                                </div>
                                <div v-else>
                                    <v-row class="justify-center" v-for="(choice, index) in questionnaire.choices"
                                        :key="index">
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
                                    <QuestionnaireBarChart :questionnaire="questionnaire" :options="options" />
                                </v-row>
                            </v-container>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-col>
    </v-row>
    <v-row v-else>
        <v-col cols="12" v-for="(questionnaire, index) in questionnaires" :key="index">
            <v-card>
                <v-container>
                    <v-row class="justify-center">
                        <v-col xs12 sm6 md6 align-self="center">
                            <v-row no-gutters>
                                <v-col cols="8">
                                    <Msg fontWeight="normal" fontSize="1em">{{ questionnaire.content }}
                                    </Msg>
                                </v-col>
                                <v-col cols="4" class="text-end">
                                    <nuxt-link :to="`/questionnaire/${questionnaire.id}`" style="color: black;">
                                        <IconButton :icon="icons.mdiChevronRight" :size="large" :variant="iconBtnVariant" />
                                    </nuxt-link>
                                </v-col>
                            </v-row>
                            <v-row no-gutters>
                                <v-col cols="auto" v-for="(tag, i) in questionnaire.tags" :key="i">
                                    <v-chip class="ma-1"
                                        @click="() => { searchQuestionnaires(FORM_TAG_TEXT, tag); goToSearchTab(tag); }">
                                        {{ tag }}
                                    </v-chip>
                                </v-col>
                            </v-row>
                            <v-container v-if="questionnaire.isAnswered === false">
                                <div v-if="questionnaire.enableMultiAnswer">
                                    <v-row class="justify-center" v-for="(choice, index) in questionnaire.choices"
                                        :key="index">
                                        <v-col xs12 sm12 md12 align-self="center">
                                            <Button
                                                :class="{ 'background-on-click': findChoicesByQuestionnaireId(questionnaire.id).includes(choice.id) }"
                                                :textColor="findChoicesByQuestionnaireId(questionnaire.id).includes(choice.id) ? clickedMultiTextColor : btnTextColor"
                                                :buttonStyle="btnStyle" :variant="btnVariant"
                                                :onClick="() => toggleChoice(questionnaire.id, choice.id)">
                                                {{ choice.name }}
                                            </Button>
                                        </v-col>
                                    </v-row>
                                    <v-row class="justify-center"
                                        v-if="findChoicesByQuestionnaireId(questionnaire.id).length !== 0">
                                        <v-col class="text-end">
                                            <Button :textColor="confirmBtnTextColor" :variant="btnVariant"
                                                :buttonStyle="confirmBtnStyle"
                                                :onClick="() => answerQuestionnaire(questionnaire.id, findChoicesByQuestionnaireId(questionnaire.id))">確定</Button>
                                        </v-col>
                                    </v-row>
                                </div>
                                <div v-else>
                                    <v-row class="justify-center" v-for="(choice, index) in questionnaire.choices"
                                        :key="index">
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
                                    <QuestionnaireBarChart :questionnaire="questionnaire" :options="options" />
                                </v-row>
                            </v-container>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-col>
    </v-row>
</template>

<style>
.background-on-click {
    background-color: #3A98B9;
    /* クリックされた時の背景色 */
}
</style>

<script lang="ts">
import { useDisplay } from 'vuetify'
import { mdiChevronRight } from '@mdi/js';
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
        const { mobile } = useDisplay()
        const icons = ref({
            mdiChevronRight,
        })

        const btnColor = ref("#3A98B9");
        const btnTextColor = ref("#3A98B9");
        const btnVariant = ref("outlined");
        const iconBtnVariant = ref("text");
        const btnStyle = ref({ width: '100%', "border-color": "#3A98B9" });
        const clickedMultiTextColor = ref("#FFFFFF");
        const confirmBtnTextColor = ref("#FFFFFF");
        const confirmBtnStyle = ref({ "background-color": "#3A98B9" });
        const detailBtnTextColor = ref("#3A98B9");

        // 回答オブジェクトの型定義
        interface Answer {
            questionId: string;
            choices: string[];
        }
        const answers = ref<Answer[]>([]);  // 回答配列
        const choices = ref([]);            // 回答配列ないの選択肢配列

        // 選択肢をクリックしてchoices配列に追加 or 削除
        const toggleChoice = (questionId: string, choiceId: string) => {
            // 引数の questionId と一致する questionId のオブジェクトを検索
            const answerIndex = answers.value.findIndex(answer => answer.questionId === questionId);

            if (answerIndex === -1) {
                // questionId のオブジェクトが存在しない場合、新しいオブジェクトを追加
                answers.value.push({ questionId, choices: [choiceId] });
            } else {
                // questionId のオブジェクトが存在する場合
                const existingChoices = answers.value[answerIndex].choices;
                const choiceIndex = existingChoices.indexOf(choiceId);

                if (choiceIndex === -1) {
                    // choiceId が存在しない場合、choices 配列に追加
                    existingChoices.push(choiceId);
                } else {
                    // choiceId が存在する場合、choices 配列から削除
                    existingChoices.splice(choiceIndex, 1);
                }
            }

            console.log(answers.value);
        };

        // 選択肢を選択した場合に色を変えるため、questionnaire.idに対応するanswersオブジェクトのchoicesを取得するヘルパー関数
        const findChoicesByQuestionnaireId = (questionnaireId) => {
            const answer = answers.value.find(answer => answer.questionId === questionnaireId);
            return answer ? answer.choices : [];
        };

        const answerQuestionnaire = (questionId: string, choices: string[]) => {
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
                y: {
                    ticks: {
                        font: {
                            family: "'Kosugi Maru'", // y軸のラベルにフォントを適用
                            size: 16,             // y軸のラベルのフォントサイズを16に設定
                        }
                    }
                }
            },
        });

        return {
            mobile,
            icons,
            FORM_TAG_TEXT,
            btnColor,
            btnTextColor,
            btnVariant,
            iconBtnVariant,
            btnStyle,
            clickedMultiTextColor,
            confirmBtnTextColor,
            confirmBtnStyle,
            detailBtnTextColor,
            choices,
            toggleChoice,
            findChoicesByQuestionnaireId,
            answerQuestionnaire,
            options
        }
    }
})
</script>