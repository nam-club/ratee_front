<template>
    <BarChart :data="chartData" :options="options" />
</template>
  
<script>
import { computed } from 'vue';

import { mainTheme } from '@/helpers/themes'
import BarChart from '@/components/molecules/BarChart.vue'; // Path to your BarChart component

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
        const labels = computed(() => props.questionnaire.choices.map(choice => choice.name));
        const dataset = computed(() => props.questionnaire.choices.map(choice => choice.voteCount));

        const backgroundColors = computed(() => {
            return props.questionnaire.choices.map(choice => choice.isMyChoice ? '#7fbfff' : '#abb1b5');
        });

        const chartData = computed(() => ({
            labels: labels.value,
            datasets: [{
                data: dataset.value,
                backgroundColor: backgroundColors.value,
                borderRadius: Number.MAX_VALUE,
                datalabels: {
                    color: (context) => {
                        // データ値が棒グラフの幅より大きい場合は黒、そうでない場合は白
                        const value = context.dataset.data[context.dataIndex];
                        const meta = context.chart.getDatasetMeta(0);
                        const w = meta.data[context.dataIndex].width;
                        return context.chart.ctx.measureText(value).width > w ? '#000000' : '#FFFFFF';
                    },
                    anchor: (context) => {
                        // データ値が棒グラフの幅より大きい場合は'end'、そうでない場合は'center'
                        const value = context.dataset.data[context.dataIndex];
                        const meta = context.chart.getDatasetMeta(0);
                        const w = meta.data[context.dataIndex].width;
                        return context.chart.ctx.measureText(value).width > w ? 'end' : 'center';
                    },
                    align: 'center',
                    font: {
                        size: 14,
                        family: "'Kosugi Maru'",
                    },
                    formatter: (value) => value === 0 ? '' : value // 0の場合は空文字を返す
                }
            }],
        }));

        return {
            chartData,
        };
    },
};
</script>  
