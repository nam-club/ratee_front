<template>
    <Bar
      :options="options"
      :data="data"
    />
  </template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    extends: Bar,
    components: { Bar },
    props: ['data', 'options'],
}
</script>