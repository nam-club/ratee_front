<template>
    <v-card v-for="(questionnaire, index) in questionnaires" :key="index" style="margin:1%">
        <v-container>
            <v-row class="justify-center">
                <v-col xs12 sm6 md6 align-self="center">
                    <Msg fontWeight="normal" size="2em">{{ questionnaire.content }}</Msg>
                </v-col>
                <v-col xs12 sm6 md6>
                    <v-container>
                        <v-row class="justify-center" v-for="(choice, index) in questionnaire.choices" :key="index">
                            <v-col xs12 sm12 md12 align-self="center">
                                <Button :color="btnColor" :textColor="btnTextColor" :variant="btnVariant" :width="btnWidth">
                                    {{ choice.name }}
                                </Button>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
import Msg from '@/components/atoms/Msg.vue'
import Button from '@/components/atoms/Button.vue'
export default defineComponent({
    components: {
        Msg,
        Button
    },
    setup() {
        const questionnaires = ref(
            [
                {
                    id: "A01",
                    content: "好きな動物は？",
                    choices: [
                        { name: "イヌ", voteCount: 12, reasons: ["可愛いから"] },
                        { name: "ネコ", voteCount: 10, reasons: ["猫しか勝たん"] },
                        { name: "ゾウ", voteCount: 6, reasons: ["強いから"] },
                        { name: "キリン", voteCount: 8, reasons: ["イカしてるから"] },
                    ],
                    category: "生物",
                    tags: ["ペット", "犬", "猫", "動物"],
                    createdAt: "2019-08-24T14:15:22Z"
                },
                {
                    id: "A02",
                    content: "国内旅行するならどこ？",
                    choices: [
                        { name: "北海道", voteCount: 22, reasons: ["ご飯が美味しいから"] },
                        { name: "沖縄", voteCount: 18, reasons: ["海が綺麗だから"] },
                        { name: "京都", voteCount: 16, reasons: ["日本人だから"] },
                        { name: "福岡", voteCount: 17, reasons: ["博多グルメ最強"] },
                    ],
                    category: "旅行",
                    tags: ["国内旅行", "都道府県", "日本"],
                    createdAt: "2019-08-26T10:22:09Z"
                },
            ]
        );

        const btnColor = ref("#3A98B9");
        const btnTextColor = ref("white");
        const btnVariant = ref("elevated");
        const btnWidth = ref("100%");

        return {
            questionnaires,
            btnColor,
            btnTextColor,
            btnVariant,
            btnWidth
        }
    }
})
</script>