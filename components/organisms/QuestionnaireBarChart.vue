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
              return `${choice.voteCount}人`;
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
            color: (context) => {
              // データ値が棒グラフの幅より大きい場合は黒、そうでない場合は白
              const value = context.dataset.data[context.dataIndex];
              const meta = context.chart.getDatasetMeta(0);
              const w = meta.data[context.dataIndex]?.width || 0;
              return w && context.chart.ctx.measureText(`${value}%`).width > w
                ? "#000000"
                : "#FFFFFF";
            },
            anchor: (context) => {
              // データ値が棒グラフの幅より大きい場合は'end'、そうでない場合は'center'
              const value = context.dataset.data[context.dataIndex];
              const meta = context.chart.getDatasetMeta(0);
              const w = meta.data[context.dataIndex]?.width || 0;
              return w && context.chart.ctx.measureText(`${value}%`).width > w
                ? "end"
                : "center";
            },
            align: (context) => {
              // データ値が棒グラフの幅より大きい場合は'end'、そうでない場合は'center'
              const value = context.dataset.data[context.dataIndex];
              const meta = context.chart.getDatasetMeta(0);
              const w = meta.data[context.dataIndex]?.width || 0;
              return w && context.chart.ctx.measureText(`${value}%`).width > w
                ? "end"
                : "center";
            },
            font: {
              size: 14,
              family: "'Kosugi Maru'",
            },
            formatter: (value) => (value === 0 ? "" : `${value}%`), // パーセント記号を追加
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
