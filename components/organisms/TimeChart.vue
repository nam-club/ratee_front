<template>
    <AreaChart :chartData="chartData" :chartOptions="options" />
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

        const processData = (obj) => {
            if (!obj || Object.keys(obj).length === 0) {
                console.log('timeData is empty or undefined');
                return;
            }
            console.log(obj);
            const labels = new Set();
            const datasets = [];
            const dataPoints = Object.entries(obj.data);
            // choicesの取得方法を変更します。obj.choicesを直接使用します。
            const choices = Object.entries(obj.choices);

            choices.forEach(([key, value]) => {
                const borderColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
                console.log(key)
                // labelをobj.choicesのvalueに設定します。
                datasets.push({
                    label: value, // keyではなく、valueを使用
                    data: [],
                    fill: true,
                    borderColor: borderColor,
                    backgroundColor: borderColor.replace('rgb', 'rgba').replace(')', ', 0.2)'),
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4
                });
            });

            dataPoints.forEach(([date, values]) => {
                labels.add(date);

                Object.entries(values).forEach(([key, value], index) => {
                    // keyに基づいて正しいdatasetを見つけて、そのdataにvalueを追加します。
                    const datasetIndex = choices.findIndex(([choiceKey]) => choiceKey === key);
                    if (datasetIndex !== -1) { // 見つかった場合のみ追加
                        datasets[datasetIndex].data.push(value);
                    }
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