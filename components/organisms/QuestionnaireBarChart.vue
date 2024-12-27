<template>
  <BarChart :data="chartData" :options="options" />
  <v-container>
    <v-row>
      <v-col cols="12" class="text-end">
        <Msg :color="msgColor" fontSize="0.9em">総投票数: {{ totalVotes }}</Msg>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script>
import { computed } from "vue";
import { useDisplay } from "vuetify";
import BarChart from "@/components/molecules/BarChart.vue"; // Path to your BarChart component
import { mainTheme } from "~/helpers/themes";

export default {
  components: {
    BarChart,
  },
  props: {
    questionnaire: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { mobile } = useDisplay();
    const msgColor = mainTheme.colors.secondary;

    const chartOptions = computed(() => ({
      ...props.options,
      animation: false,
      plugins: {
        legend: {
          display: false, // 凡例を非表示に設定
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const index = context.dataIndex;
              const choice = props.questionnaire.choices[index];
              return `${choice.voteCount}票`;
            },
          },
        },
      },
    }));

    const labels = computed(() =>
      props.questionnaire.choices.map((choice) => choice.name)
    );

    // 総投票数を計算
    const totalVotes = computed(() =>
      props.questionnaire.choices.reduce(
        (sum, choice) => sum + choice.voteCount,
        0
      )
    );

    // パーセンテージのデータセットを計算
    const dataset = computed(() =>
      props.questionnaire.choices.map((choice) =>
        totalVotes.value > 0
          ? Math.round((choice.voteCount / totalVotes.value) * 100)
          : 0
      )
    );

    const backgroundColors = computed(() => {
      return props.questionnaire.choices.map((choice) =>
        choice.isMyChoice ? "#7fbfff" : "#abb1b5"
      );
    });

    const chartData = computed(() => ({
      labels: labels.value,
      datasets: [
        {
          data: dataset.value,
          backgroundColor: backgroundColors.value,
          borderRadius: Number.MAX_VALUE,
          datalabels: {
            color: mainTheme.colors.secondary,
            anchor: "start",
            align: "right",
            font: {
              size: 14,
              family: "'Kosugi Maru'",
            },
            formatter: (value, context) => {
              const choiceName = props.questionnaire.choices[context.dataIndex].name;
              const canvas = document.createElement('canvas');
              const context2D = canvas.getContext('2d');
              context2D.font = "14px 'Kosugi Maru'"; // フォントを設定
              const textWidth = context2D.measureText(choiceName).width;
              
              // テキスト幅に応じた空白を計算
              const canvasWidth = mobile.value ? window.innerWidth/13 : window.innerWidth/32;
              const spaces = Math.max(0, canvasWidth - Math.floor(textWidth / 7));
              const spaceString = ' '.repeat(spaces);

              return `${choiceName}${spaceString}${value}%`;
            },
          },
        },
      ],
    }));

    return {
      msgColor,
      chartData,
      options: chartOptions,
      totalVotes,
    };
  },
};
</script>  
