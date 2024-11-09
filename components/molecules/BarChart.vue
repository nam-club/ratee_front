<template>
    <Bar
      :options="options"
      :data="data"
    />
  </template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

// Datalabelsプラグインを追加
import ChartDataLabels from 'chartjs-plugin-datalabels'

// Datalabelsプラグインを登録
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLabels)

export default {
    extends: Bar,
    components: { Bar },
    props: ['data', 'options'],
}
</script>