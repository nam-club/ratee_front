<template>
    <BarChart :data="chartData" :options="options" />
</template>
  
<script>
import { computed } from 'vue';
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
            }],
        }));

        return {
            chartData,
        };
    },
};
</script>  
