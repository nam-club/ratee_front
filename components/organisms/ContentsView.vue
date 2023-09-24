<template>
    <v-card class="bg-secondary" dark>
        <v-tabs v-model="tab" color="primary" dark align-tabs="center">
            <v-tab :value="1" @click="changeQuestionnaires(TAB_ID1)">{{ TAB_NAME1 }}</v-tab>
            <v-tab :value="2" @click="changeQuestionnaires(TAB_ID2)">{{ TAB_NAME2 }}</v-tab>
            <v-tab :value="3" @click="changeQuestionnaires(TAB_ID3)">{{ TAB_NAME3 }}</v-tab>
            <v-tab :value="4" @click="changeQuestionnaires(TAB_ID4)">{{ TAB_NAME4 }}</v-tab>
        </v-tabs>
        <v-window v-model="tab">
            <v-window-item v-for="n in 4" :key="n" :value="n">
                <AnswerBox style="margin:5%" :questionnaires="questionnaires"
                    :answerQuestionnaire="answerQuestionnaire" />
            </v-window-item>
        </v-window>
    </v-card>
</template>

<script lang="ts">
import AnswerBox from '@/components/organisms/AnswerBox.vue'
import { TAB_ID1, TAB_NAME1, TAB_ID2, TAB_NAME2, TAB_ID3, TAB_NAME3, TAB_ID4, TAB_NAME4 } from '@/constants';

export default {
    components: {
        AnswerBox
    },
    props: {
        questionnaires: {
            type: Array as PropType<Questionnaire[]>
        },
        changeQuestionnaires: {
            type: Function,
            required: true
        },
        answerQuestionnaire: {
            type: Function,
            required: true
        }
    },
    data: () => ({
        tab: null,
    }),
    setup(props) {

        return {
            TAB_ID1,
            TAB_NAME1,
            TAB_ID2,
            TAB_NAME2,
            TAB_ID3,
            TAB_NAME3,
            TAB_ID4,
            TAB_NAME4,
        }
    }
}
</script>