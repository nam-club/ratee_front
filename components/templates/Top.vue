<template>
  <v-app
    class="bg-secondary-lighten-6"
    style="display: flex; flex-direction: column"
    :class="{ 'app-header': isApp }"
  >
    <Header />
    <div style="margin: 0 0 20% 0">
      <ContentsView
        :nQuestionnaires="nQuestionnaires"
        :tQuestionnaires="tQuestionnaires"
        :rQuestionnaires="rQuestionnaires"
        :sQuestionnaires="sQuestionnaires"
        :searchQuestionnaires="searchQuestionnaires"
        :answerNewsQuestionnaire="answerNewsQuestionnaire"
        :answerTrendQuestionnaire="answerTrendQuestionnaire"
        :answerRankingQuestionnaire="answerRankingQuestionnaire"
        :answerSearchQuestionnaire="answerSearchQuestionnaire"
        :categories="categories"
        :isLoading="isLoading"
        :load="load"
        :isInfiniteDisabled="isInfiniteDisabled"
      />
    </div>
    <Footer :buttonText="footerButtonText" />
  </v-app>
</template>

<style scoped>
.app-header {
  margin-top: 10%; /* Adjust the margin as needed */
}
</style>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Header from "@/components/organisms/Header.vue";
import ContentsView from "@/components/organisms/ContentsView.vue";
import Footer from "@/components/organisms/Footer.vue";
import { Questionnaire } from "~/composables/questionnaireStates";
import { Category } from "@/types";

export default defineComponent({
  components: {
    Header,
    ContentsView,
    Footer,
  },
  props: {
    nQuestionnaires: {
      type: Array as PropType<Questionnaire[]>,
    },
    tQuestionnaires: {
      type: Array as PropType<Questionnaire[]>,
    },
    rQuestionnaires: {
      type: Array as PropType<Questionnaire[]>,
    },
    sQuestionnaires: {
      type: Array as PropType<Questionnaire[]>,
    },
    searchQuestionnaires: {
      type: Function,
      required: true,
    },
    answerNewsQuestionnaire: {
      type: Function,
      required: true,
    },
    answerTrendQuestionnaire: {
      type: Function,
      required: true,
    },
    answerRankingQuestionnaire: {
      type: Function,
      required: true,
    },
    answerSearchQuestionnaire: {
      type: Function,
      required: true,
    },
    categories: {
      type: Array as PropType<Category[]>,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
    load: {
      type: Function,
      required: true,
    },
    isInfiniteDisabled: {
      type: Boolean,
      required: true,
    },
    isApp: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const footerButtonText = ref("アンケートを作る");

    return {
      footerButtonText,
    };
  },
});
</script>