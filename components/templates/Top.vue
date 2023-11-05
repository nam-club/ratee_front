<template>
    <v-app>
        <Header :logo="logo" :title="headerTitle" />
        <ContentsView style="margin:5%" :questionnaires="questionnaires" :changeQuestionnaires="changeQuestionnaires" :searchQuestionnaires="searchQuestionnaires" :answerQuestionnaire="answerQuestionnaire" :answerSearchQuestionnaire="answerSearchQuestionnaire" :resetQuestionnaires="resetQuestionnaires" :categories="categories" />
        <Footer :buttonText="footerButtonText" />
    </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Header from '@/components/organisms/Header.vue'
import ContentsView from '@/components/organisms/ContentsView.vue'
import Footer from '@/components/organisms/Footer.vue'
import { Questionnaire } from '~/composables/questionnaireStates';
import { Category } from '@/types';

export default defineComponent({
    components: {
        Header,
        ContentsView,
        Footer
    },
    props: {
        questionnaires: {
            type: Array as PropType<Questionnaire[]>
        },
        changeQuestionnaires: {
            type: Function,
            required: true
        },
        searchQuestionnaires: {
            type: Function,
            required: true
        },
        answerQuestionnaire: {
            type: Function,
            required: true
        },
        answerSearchQuestionnaire: {
            type: Function,
            required: true
        },
        categories: {
            type: Array as PropType<Category[]>,
            required: true,
        },
        resetQuestionnaires: {
            type: Function,
            required: true
        },
    },
    setup() {
        const logo = '/logo.png' // 画像のパスを指定してください
        const headerTitle = ref('ratee')
        const footerButtonText = ref('アンケートを作る')

        return {
            logo,
            headerTitle,
            footerButtonText,
        }
    },
    
})
</script>