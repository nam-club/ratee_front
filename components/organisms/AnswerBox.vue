<template>
    <div v-if="!mobile">
        <div v-if="questionnaire.enableMultiAnswer">
            <v-row class="justify-center" v-for="(choice, index) in questionnaire.choices" :key="index">
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
            <v-row class="justify-center" v-if="findChoicesByQuestionnaireId(questionnaire.id).length !== 0">
                <v-col class="text-end">
                    <Button :textColor="confirmBtnTextColor" :variant="btnVariant" :buttonStyle="confirmBtnStyle"
                        :onClick="() => answerQuestionnaire(questionnaire.id, findChoicesByQuestionnaireId(questionnaire.id))">{{
                            CONFIRM_BUTTON }}</Button>
                </v-col>
            </v-row>
        </div>
        <div v-else>
            <v-row class="justify-center" v-for="(choice, index) in questionnaire.choices" :key="index">
                <v-col xs12 sm12 md12 align-self="center">
                    <Button :color="btnColor" :textColor="btnTextColor" :variant="btnVariant" :buttonStyle="btnStyle"
                        :onClick="() => answerQuestionnaire(questionnaire.id, [choice.id])">
                        {{ choice.name }}
                    </Button>
                </v-col>
            </v-row>
        </div>
    </div>
    <div v-else>
        <div v-if="questionnaire.enableMultiAnswer">
            <v-row class="justify-center" v-for="(choice, index) in questionnaire.choices" :key="index">
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
            <v-row class="justify-center" v-if="findChoicesByQuestionnaireId(questionnaire.id).length !== 0">
                <v-col class="text-end">
                    <Button :textColor="confirmBtnTextColor" :variant="btnVariant" :buttonStyle="confirmBtnStyle"
                        :disabled="isLoading"
                        :onClick="() => answerQuestionnaire(questionnaire.id, findChoicesByQuestionnaireId(questionnaire.id))">{{
                            CONFIRM_BUTTON }}</Button>
                </v-col>
            </v-row>
        </div>
        <div v-else>
            <v-row class="justify-center" v-for="(choice, index) in questionnaire.choices" :key="index">
                <v-col xs12 sm12 md12 align-self="center">
                    <Button :color="btnColor" :textColor="btnTextColor" :variant="btnVariant" :buttonStyle="btnStyle"
                        :disabled="isLoading" :onClick="() => answerQuestionnaire(questionnaire.id, [choice.id])">
                        {{ choice.name }}
                    </Button>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<style>
.background-on-click {
    background-color: #3A98B9;
    /* クリックされた時の背景色 */
}
</style>

<script lang="ts">
import { useDisplay } from 'vuetify'

import { mainTheme } from '@/helpers/themes'
import Button from '@/components/atoms/Button.vue'
import { FORM_TITLE_TEXT, FORM_CATEGORY_TEXT, FORM_TAG_TEXT, CONFIRM_BUTTON } from '@/constants';

export default defineComponent({
    components: {
        Button,
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
        answerSearchQuestionnaire: {
            type: Function,
            default: () => () => { }
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
    },
    setup(props) {
        const isLoading = ref(false);
        const { mobile } = useDisplay()

        const btnColor = ref(mainTheme.colors!.primary);
        const btnTextColor = ref(mainTheme.colors!.primary);
        const btnVariant = ref("text");
        const btnStyle = ref({ width: '100%', "border-color": mainTheme.colors!.primary });
        const clickedMultiTextColor = ref("#FFFFFF");
        const confirmBtnTextColor = ref("#FFFFFF");
        const confirmBtnStyle = ref({ "background-color": mainTheme.colors!.primary });

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
        };

        // 選択肢を選択した場合に色を変えるため、questionnaire.idに対応するanswersオブジェクトのchoicesを取得するヘルパー関数
        const findChoicesByQuestionnaireId = (questionnaireId: string) => {
            const answer = answers.value.find(answer => answer.questionId === questionnaireId);
            return answer ? answer.choices : [];
        };

        const answerQuestionnaire = async (questionId: string, choices: string[]) => {
            try {
                if (!isLoading.value) {
                    isLoading.value = true; // ローディング開始
                    await new Promise(resolve => setTimeout(resolve, 500)); // 0.5秒待機する
                    if (props.searchType === '') {
                        await props.answerQuestionnaire(questionId, [...choices]);
                    } else {
                        if (props.searchType === FORM_TITLE_TEXT || props.searchType === FORM_TAG_TEXT) {
                            await props.answerSearchQuestionnaire(questionId, [...choices], props.searchType, props.searchWord);
                        } else if (props.searchType === FORM_CATEGORY_TEXT) {
                            await props.answerSearchQuestionnaire(questionId, [...choices], props.searchType, props.searchCategory);
                        }
                    }
                }
            } catch (error) {
                console.error("アンケート回答エラーが発生しました:", error);
            } finally {
                isLoading.value = false; // ローディング終了
            }



        }

        return {
            mobile,
            FORM_TAG_TEXT,
            CONFIRM_BUTTON,
            btnColor,
            btnTextColor,
            btnVariant,
            btnStyle,
            clickedMultiTextColor,
            confirmBtnTextColor,
            confirmBtnStyle,
            choices,
            toggleChoice,
            findChoicesByQuestionnaireId,
            answerQuestionnaire,
            isLoading
        }
    }
})
</script>