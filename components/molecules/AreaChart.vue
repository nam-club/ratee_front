<template>
  <div class="chart-container">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>
  
<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler } from 'chart.js'

// Chart.jsの必要な部分を登録
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler)

export default {
  name: 'AreaChart',
  components: {
    Line
  },
  props: {
    chartData: {
      type: Object,
      required: true,
      default: () => ({
        datasets: [{
          fill: true, // この行を追加
          // 他のデータセットの設定...
        }]
      })
    },
    chartOptions: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
  
<style>
.chart-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>