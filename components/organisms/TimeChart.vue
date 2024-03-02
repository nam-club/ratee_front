<template>
    <AreaChart :chartData="chartData" :options="options" />
  </template>
    
  <script>
  import { ref, watch } from 'vue';
  import AreaChart from '@/components/molecules/AreaChart.vue';
  
  export default {
    components: {
      AreaChart,
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
  
      const processData = (data) => {
        console.log(data);
        const labels = new Set();
        const datasets = [];
        const dataPoints = Object.entries(data.data);
  
        // データセットの初期化
        for (let i = 1; i <= 10; i++) {
          datasets.push({
            label: `選択肢${i}`,
            data: [],
            fill: true,
            borderColor: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`,
            tension: 0.1
          });
        }
  
        dataPoints.forEach(([date, values]) => {
          const formattedDate = data.interval === 'daily' ? date : date.substring(0, 7);
          labels.add(formattedDate);
  
          Object.entries(values).forEach(([key, value], index) => {
            datasets[index].data.push(value);
          });
        });
  
        chartData.value.labels = Array.from(labels);
        chartData.value.datasets = datasets;
      };
  
      processData(props.timeData)

      console.log(chartData)
  
      return {
        chartData,
      };
    },
  };
  </script>  