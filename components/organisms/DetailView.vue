<template>
  <v-card v-if="questionnaire">
    <v-container>
      <v-row>
        <v-col>
          <Msg
            fontWeight="normal"
            :fontSize="mobile ? '1.5em' : '2em'"
            style="margin: 2% 0"
            >{{ questionnaire.content }}</Msg
          >
          <v-row no-gutters>
            <v-chip
              class="ma-2"
              :color="categoryColor"
              label
              text-color="white"
            >
              {{ questionnaire.category.name }}
            </v-chip>
          </v-row>
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
        <AnswerBox
          :questionnaire="questionnaire"
          :answerQuestionnaire="answerQuestionnaire"
        />
      </v-container>

      <v-container v-if="questionnaire.isAnswered === true">
        <v-tabs v-model="tab" color="primary" dark align-tabs="center">
          <v-tab :value="DETAIL_TAB_NUM1" :style="{ color: color }"
            ><span style="font-size: 1.5em">{{ DETAIL_TAB_NAME1 }}</span></v-tab
          >
          <v-tab v-if="Object.keys(chart).length !== 0" :value="DETAIL_TAB_NUM2" :style="{ color: color }"
            ><span style="font-size: 1.5em">{{ DETAIL_TAB_NAME2 }}</span></v-tab
          >
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item
            v-for="n in DETAIL_TAB_LENGTH"
            :key="n"
            :value="n"
            style="padding: 5%"
          >
            <div v-if="n === DETAIL_TAB_NUM1">
              <v-row justify="center">
                <QuestionnaireBarChart
                  :questionnaire="questionnaire"
                  :options="options"
                />
              </v-row>
            </div>
            <div v-if="n === DETAIL_TAB_NUM2">
              <v-row>
                <TimeChart :timeData="chart" :options="timeOptions" />
              </v-row>
            </div>
          </v-window-item>
        </v-window>
      </v-container>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { useDisplay } from "vuetify";
import { mainTheme } from "@/helpers/themes";
import Msg from "@/components/atoms/Msg.vue";
import AnswerBox from "@/components/organisms/AnswerBox.vue";
import QuestionnaireBarChart from "@/components/organisms/QuestionnaireBarChart.vue";
import TimeChart from "@/components/organisms/TimeChart.vue";
import {
  DETAIL_TAB_LENGTH,
  DETAIL_TAB_NAME1,
  DETAIL_TAB_NUM1,
  DETAIL_TAB_NAME2,
  DETAIL_TAB_NUM2,
} from "@/constants";

export default defineComponent({
  components: {
    Msg,
    AnswerBox,
    QuestionnaireBarChart,
    TimeChart,
  },
  props: {
    questionnaire: {
      type: Object,
      required: true,
    },
    answerQuestionnaire: {
      type: Function,
      required: true,
    },
    chart: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { mobile } = useDisplay();

    // タブの値をリアクティブにする
    const tab = ref<number | null>(null);

    const options = computed(() => ({
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: mobile.value ? 1.2 : 4, // mobile の状態に基づいて aspectRatio を変更
      indexAxis: "y",
      plugins: {
        legend: {
          display: false, // レジェンド（ラベル）を非表示にする
        },
      },
      scales: {
        x: {
          max: 120, // 棒グラフが右端まで到達しないようにする
          display: false, // x軸の目盛りと数値を非表示にする
        },
        y: {
          display: false, // y軸の目盛りと数値を非表示にする
          ticks: {
            font: {
              family: "'Kosugi Maru'", // y軸のラベルにフォントを適用
              size: mobile.value ? 10 : 12,
            },
          },
          grid: {
            drawBorder: false, // y軸の境界線を非表示にする
            display: false, // y軸のグリッド線を非表示にする
          },
        },
      },
    }));

    const timeOptions = computed(() => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels: {
            usePointStyle: true,
            font: {
              family: "'Kosugi Maru'",
              size: mobile.value ? 10 : 12,
            },
            color: mainTheme.colors?.secondary,
          },
        },
        tooltip: {
          enabled: true,
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              if (context.parsed.y !== null) {
                label += context.parsed.y;
              }
              return label;
            },
          },
        },
        datalabels: {
          // データラベルプラグインの設定を追加
          display: false, // データラベルを非表示に設定
        },
      },
      scales: {
        x: {
          type: "category",
          grid: {
            drawBorder: false,
            display: false, // グリッド線を非表示に設定
          },
          ticks: {
            font: {
              family: "'Kosugi Maru'",
              size: mobile.value ? 10 : 12,
            },
            color: mainTheme.colors?.secondary,
          },
        },
        y: {
          grid: {
            drawBorder: false,
            display: false, // グリッド線を非表示に設定
          },
          ticks: {
            font: {
              family: "'Kosugi Maru'",
              size: mobile.value ? 10 : 12,
            },
            color: mainTheme.colors?.secondary,
            stepSize: 1, // Y軸の目盛りを整数にする場合
            precision: 0, // 小数点以下の桁数を0にする
            callback: (value) => Number(value).toFixed(0), // 小数点を表示しないようにする
          },
        },
      },
    }));

    const categoryColor = ref(mainTheme.colors!.success);

    // タブの文字色
    const color = ref(mainTheme.colors?.secondary);

    return {
      mobile,
      tab,
      options,
      timeOptions,
      DETAIL_TAB_LENGTH,
      DETAIL_TAB_NAME1,
      DETAIL_TAB_NUM1,
      DETAIL_TAB_NAME2,
      DETAIL_TAB_NUM2,
      categoryColor,
      color
    };
  },
});
</script>