<template>
    <v-app class="bg-secondary-darken-2" style="display: flex; flex-direction: column;">
        <Header />
        <ContentsView :questionnaires="questionnaires" :changeQuestionnaires="changeQuestionnaires"
         :searchQuestionnaires="searchQuestionnaires" :answerQuestionnaire="answerQuestionnaire" 
         :answerSearchQuestionnaire="answerSearchQuestionnaire" :resetQuestionnaires="resetQuestionnaires" 
         :categories="categories" :isLoading="isLoading" :load="load" :isInfiniteDisabled="isInfiniteDisabled" />
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
        isLoading: {
            type: Boolean,
            required: true,
        },
        load: {
            type: Function,
            required: true
        },
        isInfiniteDisabled: {
            type: Boolean,
            required: true,
        }
    },
    setup(props) {
        const footerButtonText = ref('アンケートを作る')

        watchEffect(() => {
            console.log("===Topコンポーネント===")
            console.log(props.questionnaires)
            console.log(props.isInfiniteDisabled)
        });

        return {
            footerButtonText,
        }
    },
    
})
</script>