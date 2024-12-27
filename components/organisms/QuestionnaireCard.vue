<template>
  <v-row v-if="!mobile && !verticalDisplay">
    <v-col
      cols="4"
      v-for="(questionnaire, index) in questionnaires"
      :key="index"
    >
      <v-card>
        <v-container>
          <v-row class="justify-center">
            <v-col xs12 sm6 md6 align-self="center">
              <v-row no-gutters>
                <v-col cols="8">
                  <Msg fontWeight="normal" fontSize="1.5em" style="margin: 2% 0"
                    >{{ questionnaire.content }}
                  </Msg>
                </v-col>
                <v-col
                  v-if="questionnaire.isAnswered === true"
                  cols="4"
                  class="text-end"
                >
                  <nuxt-link :to="`${DETAIL_LINK}/${questionnaire.id}`">
                    <Button
                      :textColor="detailBtnTextColor"
                      :variant="btnVariant"
                    >
                      {{ DETAIL_BUTTON }}
                    </Button>
                  </nuxt-link>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-chip
                  class="ma-2"
                  :color="getCategoryColor(questionnaire.category.name)"
                  label
                  text-color="white"
                  @click="
                      () => {
                        searchQuestionnaires(FORM_CATEGORY_TEXT, questionnaire.category.id);
                        goToSearchTab(FORM_CATEGORY_TEXT, questionnaire.category.id);
                      }
                    "
                >
                {{ questionnaire.category.name }}
                </v-chip>
              </v-row>
              <v-row no-gutters>
                <v-col
                  cols="auto"
                  v-for="(tag, i) in questionnaire.tags"
                  :key="i"
                >
                  <v-chip
                    class="ma-1"
                    @click="
                      () => {
                        searchQuestionnaires(FORM_TAG_TEXT, tag);
                        goToSearchTab(FORM_TAG_TEXT, tag);
                      }
                    "
                  >
                    {{ tag }}
                  </v-chip>
                </v-col>
              </v-row>
              <v-container v-if="questionnaire.isAnswered === false">
                <AnswerBox
                  :questionnaire="questionnaire"
                  :answerQuestionnaire="answerQuestionnaire"
                  :answerSearchQuestionnaire="answerSearchQuestionnaire"
                  :searchType="searchType"
                  :searchWord="searchWord"
                  :searchCategory="searchCategory"
                />
              </v-container>
              <v-container v-if="questionnaire.isAnswered === true">
                <v-row>
                  <QuestionnaireBarChart
                    :questionnaire="questionnaire"
                    :options="options"
                  />
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
  <v-row v-else-if="!mobile && verticalDisplay">
    <v-col
      cols="12"
      v-for="(questionnaire, index) in questionnaires"
      :key="index"
    >
      <v-card style="margin: 0 30%">
        <v-container>
          <v-row class="justify-center">
            <v-col xs12 sm6 md6 align-self="center">
              <v-row no-gutters>
                <v-col cols="8">
                  <Msg fontWeight="normal" fontSize="1.5em" style="margin: 2% 0"
                    >{{ questionnaire.content }}
                  </Msg>
                </v-col>
                <v-col
                  v-if="questionnaire.isAnswered === true"
                  cols="4"
                  class="text-end"
                >
                  <nuxt-link
                    :to="{
                      path: `${DETAIL_LINK}/${questionnaire.id}`,
                      query: currentQuery,
                    }"
                  >
                    <Button
                      :textColor="detailBtnTextColor"
                      :variant="btnVariant"
                    >
                      {{ DETAIL_BUTTON }}
                    </Button>
                  </nuxt-link>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-chip
                  class="ma-2"
                  :color="getCategoryColor(questionnaire.category.name)"
                  label
                  text-color="white"
                  @click="
                      () => {
                        searchQuestionnaires(FORM_CATEGORY_TEXT, questionnaire.category.id);
                        goToSearchTab(FORM_CATEGORY_TEXT, questionnaire.category.id);
                      }
                    "
                >
                {{ questionnaire.category.name }}
                </v-chip>
              </v-row>
              <v-row no-gutters>
                <v-col
                  cols="auto"
                  v-for="(tag, i) in questionnaire.tags"
                  :key="i"
                >
                  <v-chip
                    class="ma-1"
                    @click="
                      () => {
                        searchQuestionnaires(FORM_TAG_TEXT, tag);
                        goToSearchTab(FORM_TAG_TEXT, tag);
                      }
                    "
                  >
                    {{ tag }}
                  </v-chip>
                </v-col>
              </v-row>
              <v-container v-if="questionnaire.isAnswered === false">
                <AnswerBox
                  :questionnaire="questionnaire"
                  :answerQuestionnaire="answerQuestionnaire"
                  :answerSearchQuestionnaire="answerSearchQuestionnaire"
                  :searchType="searchType"
                  :searchWord="searchWord"
                  :searchCategory="searchCategory"
                />
              </v-container>
              <v-container v-if="questionnaire.isAnswered === true">
                <v-row>
                  <QuestionnaireBarChart
                    :questionnaire="questionnaire"
                    :options="options"
                  />
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col
      cols="12"
      v-for="(questionnaire, index) in questionnaires"
      :key="index"
    >
      <v-card>
        <v-container>
          <v-row class="justify-center">
            <v-col xs12 sm6 md6 align-self="center">
              <v-row no-gutters>
                <v-col cols="8">
                  <Msg fontWeight="normal" fontSize="1em"
                    >{{ questionnaire.content }}
                  </Msg>
                </v-col>
                <v-col
                  v-if="questionnaire.isAnswered === true"
                  cols="4"
                  class="text-end"
                >
                  <nuxt-link
                    :to="{
                      path: `${DETAIL_LINK}/${questionnaire.id}`,
                      query: currentQuery,
                    }"
                    style="color: black"
                  >
                    <IconButton
                      :icon="icons.mdiChevronRight"
                      :variant="iconBtnVariant"
                    />
                  </nuxt-link>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-chip
                  class="ma-2"
                  :color="getCategoryColor(questionnaire.category.name)"
                  label
                  text-color="white"
                  @click="
                      () => {
                        searchQuestionnaires(FORM_CATEGORY_TEXT, questionnaire.category.id);
                        goToSearchTab(FORM_CATEGORY_TEXT, questionnaire.category.id);
                      }
                    "
                >
                {{ questionnaire.category.name }}
                </v-chip>
              </v-row>
              <v-row no-gutters>
                <v-col
                  cols="auto"
                  v-for="(tag, i) in questionnaire.tags"
                  :key="i"
                >
                  <v-chip
                    class="ma-1"
                    @click="
                      () => {
                        searchQuestionnaires(FORM_TAG_TEXT, tag);
                        goToSearchTab(FORM_TAG_TEXT, tag);
                      }
                    "
                  >
                    {{ tag }}
                  </v-chip>
                </v-col>
              </v-row>
              <v-container v-if="questionnaire.isAnswered === false">
                <AnswerBox
                  :questionnaire="questionnaire"
                  :answerQuestionnaire="answerQuestionnaire"
                  :answerSearchQuestionnaire="answerSearchQuestionnaire"
                  :searchType="searchType"
                  :searchWord="searchWord"
                  :searchCategory="searchCategory"
                />
              </v-container>
              <v-container v-if="questionnaire.isAnswered === true">
                <v-row>
                  <QuestionnaireBarChart
                    :questionnaire="questionnaire"
                    :options="options"
                  />
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.background-on-click {
  background-color: #3a98b9;
  /* クリックされた時の背景色 */
}
</style>

<script lang="ts">
import { useRoute } from "vue-router";
import { useDisplay } from "vuetify";
import { mdiChevronRight } from "@mdi/js";

import { mainTheme } from "@/helpers/themes";
import Msg from "@/components/atoms/Msg.vue";
import Button from "@/components/atoms/Button.vue";
import AnswerBox from "@/components/organisms/AnswerBox.vue";
import QuestionnaireBarChart from "@/components/organisms/QuestionnaireBarChart.vue";
import { Questionnaire } from "~/composables/questionnaireStates";
import { DETAIL_LINK, FORM_CATEGORY_TEXT, FORM_TAG_TEXT, DETAIL_BUTTON } from "@/constants";

export default defineComponent({
  components: {
    Msg,
    Button,
    AnswerBox,
    QuestionnaireBarChart,
  },
  props: {
    questionnaires: {
      type: Array as PropType<Questionnaire[]>,
    },
    sortType: {
      type: String,
    },
    answerQuestionnaire: {
      type: Function,
      required: true,
    },
    answerSearchQuestionnaire: {
      type: Function,
      required: true,
    },
    searchQuestionnaires: {
      type: Function,
      required: true,
    },
    searchType: {
      type: String,
      default: "",
    },
    searchWord: {
      type: String,
      default: "",
    },
    searchCategory: {
      type: String,
      default: "",
    },
    goToSearchTab: {
      type: Function,
      required: true,
    },
    verticalDisplay: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { mobile } = useDisplay();

    const route = useRoute();
    // 現在のクエリパラメータを取得
    const currentQuery = route.query;

    const icons = ref({
      mdiChevronRight,
    });

    const btnVariant = ref("text");
    const iconBtnVariant = ref("text");
    const detailBtnTextColor = ref(mainTheme.colors!.primary);

    const categoryColors = {
      '社会': '#FF1744',
      '政治経済': '#F50057',
      '地域': '#D500F9',
      '文化': '#651FFF',
      '会社・職業': '#3D5AFE',
      'テクノロジー': '#2979FF',
      '医療・ヘルスケア': '#00B0FF',
      '学問': '#26C6DA',
      '教育': '#26A69A',
      '生活': '#2E7D32',
      '食文化': '#558B2F',
      'スポーツ': '#9E9D24',
      '旅行': '#FFD600',
      '趣味': '#FFC400',
      'テレビ・映画・芸能': '#FF9100',
      '本': '#FF3D00',
      'アニメ': '#FF4081',
      '音楽': '#FF5252',
      'ゲーム': '#E040FB',
      '悩み': '#FF8A80',
      '雑談': '#4E342E',
      'その他': '#37474F'
    };

    const getCategoryColor = (categoryName: any) => {
      console.log(categoryName);
      return categoryColors[categoryName] || '#FFFFFF'; // デフォルト色を白に設定
    };

    // ウィンドウ幅の変更時にリサイズ
    const windowWidth = ref(window.innerWidth);
    window.addEventListener("resize", () => {
      windowWidth.value = window.innerWidth;
    });

    const options = computed(() => ({
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: mobile.value ? 1.2 : 1.8, // mobile の状態に基づいて aspectRatio を変更
      indexAxis: "y",
      plugins: {
        legend: {
          display: false, // レジェンド（ラベル）を非表示にする
        },
      },
      scales: {
        x: {
          max: mobile.value ? 130 : 120, // 棒グラフが右端まで到達しないようにする
          display: false, // x軸の目盛りと数値を非表示にする
          grid: {
            drawBorder: false, // x軸の境界線を非表示にする
            display: false, // x軸のグリッド線を非表示にする
          },
        },
        y: {
          display: false, // y軸の目盛りと数値を非表示にする
          grid: {
            drawBorder: false, // y軸の境界線を非表示にする
            display: false, // y軸のグリッド線を非表示にする
          },
        },
      },
    }));

    return {
      mobile,
      DETAIL_LINK,
      currentQuery,
      icons,
      FORM_CATEGORY_TEXT,
      FORM_TAG_TEXT,
      DETAIL_BUTTON,
      btnVariant,
      iconBtnVariant,
      detailBtnTextColor,
      getCategoryColor,
      options,
    };
  },
});
</script>