<template>
    <v-card v-for="(questionnaire, index) in questionnaires" :key="index" style="margin:1%">
        <v-container>
            <v-row class="justify-center">
                <v-col xs12 sm6 md6 align-self="center">
                    <Msg fontWeight="normal" size="2em">{{ questionnaire.content }}</Msg>
                </v-col>
                <v-col xs12 sm6 md6>
                    <v-container v-if="questionnaire.answeredFlg === false">
                        <v-row class="justify-center" v-for="(choice, index) in questionnaire.choices" :key="index">
                            <v-col xs12 sm12 md12 align-self="center">
                                <Button :color="btnColor" :variant="btnVariant" :buttonStyle="btnStyle"
                                    :onClick="() => incrementVoteCount(questionnaire.id, choice.name)">
                                    {{ choice.name }}
                                </Button>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-container v-if="questionnaire.answeredFlg === true">
                        <BarChart :data="chartData" :options="options" />
                    </v-container>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
import Msg from '@/components/atoms/Msg.vue'
import Button from '@/components/atoms/Button.vue'
import BarChart from '@/components/molecules/BarChart.vue'
import { useQuestionnaires } from '@/composables/questionnareStates';

export default defineComponent({
    components: {
        Msg,
        Button,
        BarChart
    },
    setup() {
        const qStore = useQuestionnaires();
        console.log(qStore)
        const questionnaires = qStore.state;
        const btnColor = ref("#3A98B9");
        const btnVariant = ref("elevated");
        const btnStyle = ref({ width: '100%', color: 'white' });
        const chartData = ref({
            labels: ['イヌ', 'ネコ', 'ゾウ', 'キリン'],
            datasets: [{
                data: [12, 10, 6, 8],
                fill: true,
                backgroundColor: '#3A98B9',
            }]
        });
        const options = ref({
            responsive: true,
            indexAxis: 'y',
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false // レジェンド（ラベル）を非表示にする
                }
            },
            scales: {
                x: {
                    display: false, // x軸の目盛りと数値を非表示にする
                },
            },
        });

        const incrementVoteCount = (id, name) => {
            console.log("id:" + id + " name:" + name)
            console.log(qStore.incrementVoteCount(id, name));
        }

        return {
            questionnaires,
            incrementVoteCount,
            btnColor,
            btnVariant,
            btnStyle,
            chartData,
            options
        }
    }
})
</script>