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
        console.log(props.timeData)
        const chartData = ref({ labels: [], datasets: [] });

        const processData = (obj) => {
            if (!obj || Object.keys(obj).length === 0) {
                console.log('timeData is empty or undefined');
                return;
            }
            console.log(obj);
            const labels = new Set();
            const datasets = [];
            const dataPoints = Object.entries(obj.data);
            const choices = Object.entries(dataPoints[0][1]);

            choices.forEach(([key, value]) => {
                const borderColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
                datasets.push({
                    label: key,
                    data: [],
                    fill: true,
                    borderColor: borderColor,
                    backgroundColor: borderColor.replace('rgb', 'rgba').replace(')', ', 0.2)'),
                    tension: 0.1
                });
            });

            dataPoints.forEach(([date, values]) => {
                labels.add(date);

                Object.entries(values).forEach(([key, value], index) => {
                    datasets[index].data.push(value);
                });
            });

            chartData.value.labels = Array.from(labels);
            chartData.value.datasets = datasets;
        };

        // timeDataの変更を監視
        watch(() => props.timeData, (newVal) => {
            processData(newVal);
        }, {
            immediate: true, // コンポーネントのマウント時にも実行
        });

        return {
            chartData,
        };
    },
};
</script>  