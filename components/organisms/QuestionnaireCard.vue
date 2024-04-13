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
                                        <Button :textColor="detailBtnTextColor" :variant="btnVariant">
                                            {{ DETAIL_BUTTON }}
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
                                <AnswerBox :questionnaire="questionnaire" :answerQuestionnaire="answerQuestionnaire"
                                    :answerSearchQuestionnaire="answerSearchQuestionnaire" :searchType="searchType"
                                    :searchWord="searchWord" :searchCategory="searchCategory" />
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
                                <AnswerBox :questionnaire="questionnaire" :answerQuestionnaire="answerQuestionnaire"
                                    :answerSearchQuestionnaire="answerSearchQuestionnaire" :searchType="searchType"
                                    :searchWord="searchWord" :searchCategory="searchCategory" />
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

import { mainTheme } from '@/helpers/themes'
import Msg from '@/components/atoms/Msg.vue'
import Button from '@/components/atoms/Button.vue'
import AnswerBox from '@/components/organisms/AnswerBox.vue'
import QuestionnaireBarChart from '@/components/organisms/QuestionnaireBarChart.vue'
import { Questionnaire } from '~/composables/questionnaireStates';
import { FORM_TAG_TEXT, DETAIL_BUTTON } from '@/constants';

export default defineComponent({
    components: {
        Msg,
        Button,
        AnswerBox,
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
    setup() {
        const { mobile } = useDisplay()
        const icons = ref({
            mdiChevronRight,
        })

        const btnVariant = ref("text");
        const iconBtnVariant = ref("text");
        const detailBtnTextColor = ref(mainTheme.colors!.primary);

        const options = computed(() => ({
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: mobile.value ? 1.2 : 1.8, // mobile の状態に基づいて aspectRatio を変更
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false // レジェンド（ラベル）を非表示にする
                }
            },
            scales: {
                x: {
                    display: false, // x軸の目盛りと数値を非表示にする
                    grid: {
                        drawBorder: false, // x軸の境界線を非表示にする
                        display: false, // x軸のグリッド線を非表示にする
                    }
                },
                y: {
                    ticks: {
                        font: {
                            family: "'Kosugi Maru'", // y軸のラベルにフォントを適用
                            size: 14
                        }
                    },
                    grid: {
                        drawBorder: false, // y軸の境界線を非表示にする
                        display: false, // y軸のグリッド線を非表示にする
                    }
                }
            },
        }));

        return {
            mobile,
            icons,
            FORM_TAG_TEXT,
            DETAIL_BUTTON,
            btnVariant,
            iconBtnVariant,
            detailBtnTextColor,
            options
        }
    }
})
</script>