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
          
        // 色の配列を定義
        const colors = ['#7fbfff', '#e0876f', '#9dd0ba', '#e2b27e', '#d6adff', '#9d8e87', '#abb1b5', '#e3e548', '#e3adc1', '#25b7c0'  /* 他の色 */];
  
        const backgroundColors = computed(() => {
            return props.questionnaire.choices.map((choice, index) => {
                // データごとに異なる色を割り当てる
                return colors[index % colors.length];
            });
        });

        const borderColors = computed(() => {
            return props.questionnaire.choices.map(choice => choice.isMyChoice ? 'black' : 'transparent');
        });

        const borderWidths = computed(() => {
            return props.questionnaire.choices.map(choice => choice.isMyChoice ? 2 : 0);
        });
          
        const chartData = computed(() => ({
            labels: labels.value,
            datasets: [{ 
                data: dataset.value, 
                fill: true, 
                backgroundColor: backgroundColors.value,
                borderColor: borderColors.value,
                borderWidth: borderWidths.value,
                borderRadius: Number.MAX_VALUE,
            }],
        }));
  
        return {
            chartData,
        };
    },
};
</script>  
