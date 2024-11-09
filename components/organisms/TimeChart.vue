<template>
  <LineChart :chartData="chartData" :chartOptions="chartOptions" />
</template>

<script lang="ts">
import { ref, watch, defineComponent } from "vue";
import LineChart from "@/components/molecules/LineChart.vue";

export default defineComponent({
  components: {
    LineChart,
  },
  props: {
    timeData: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const chartData = ref({ labels: [], datasets: [] });
    const chartOptions = computed(() => ({
      ...props.options,
      animation: false,
    }));

    const defaultColors = [
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(255, 159, 64, 1)",
      "rgba(199, 199, 199, 1)",
      "rgba(83, 102, 255, 1)",
      "rgba(220, 100, 200, 1)",
      "rgba(101, 143, 143, 1)",
    ];

    const processData = (obj) => {
      if (!obj || Object.keys(obj).length === 0) {
        return;
      }
      const labels = new Set();
      const datasets = [];
      const dataPoints = Object.entries(obj.data);
      const choices = Object.entries(obj.choices);

      choices.forEach(([key, value], index) => {
        const colorIndex = index % defaultColors.length;
        const borderColor = defaultColors[colorIndex];
        datasets.push({
          label: value,
          data: [],
          borderColor: borderColor,
          backgroundColor: borderColor.replace("1)", "0.2)"),
          cubicInterpolationMode: "monotone",
          tension: 0.4,
        });
      });

      dataPoints.forEach(([date, values]) => {
        labels.add(date);

        Object.entries(values).forEach(([key, value], index) => {
          const datasetIndex = choices.findIndex(
            ([choiceKey]) => choiceKey === key
          );
          if (datasetIndex !== -1) {
            datasets[datasetIndex].data.push(value);
          }
        });
      });

      chartData.value.labels = Array.from(labels);
      chartData.value.datasets = datasets;
    };

    watch(
      () => props.timeData,
      (newVal) => {
        processData(newVal);
      },
      {
        immediate: true,
      }
    );

    return {
      chartData,
      chartOptions
    };
  },
});
</script>