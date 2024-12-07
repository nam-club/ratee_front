<template>
  <v-tabs
    v-if="!mobile"
    v-model="tab"
    color="primary"
    dark
    align-tabs="center"
    style="margin: 4% 0% 0.5% 0%"
  >
    <v-tab :value="TAB_NUM1"
      ><span style="font-size: 1.5em">{{ TAB_NAME1 }}</span></v-tab
    >
    <v-tab :value="TAB_NUM2"
      ><span style="font-size: 1.5em">{{ TAB_NAME2 }}</span></v-tab
    >
    <v-tab :value="TAB_NUM3"
      ><span style="font-size: 1.5em">{{ TAB_NAME3 }}</span></v-tab
    >
    <v-tab :value="TAB_NUM4"
      ><span style="font-size: 1.5em">{{ TAB_NAME4 }}</span></v-tab
    >
  </v-tabs>
  <v-card
    class="bg-secondary-lighten-7"
    variant="elevated"
    :class="{ back_mobile: mobile, back: !mobile }"
  >
    <v-window v-model="tab">
      <v-window-item v-for="n in TAB_LENGTH" :key="n" :value="n">
        <div v-if="!isLoading">
          <QuestionnaireCard
            v-if="n === TAB_NUM1"
            style="margin: 5%"
            :questionnaires="nQuestionnaires"
            :searchQuestionnaires="searchQuestionnaires"
            :answerQuestionnaire="answerNewsQuestionnaire"
            :answerSearchQuestionnaire="answerSearchQuestionnaire"
            :goToSearchTab="goToSearchTab"
          />
          <QuestionnaireCard
            v-else-if="n === TAB_NUM2"
            style="margin: 5%"
            :questionnaires="tQuestionnaires"
            :searchQuestionnaires="searchQuestionnaires"
            :answerQuestionnaire="answerTrendQuestionnaire"
            :answerSearchQuestionnaire="answerSearchQuestionnaire"
            :goToSearchTab="goToSearchTab"
          />
          <QuestionnaireCard
            v-else-if="n === TAB_NUM3"
            style="margin: 5%"
            :questionnaires="rQuestionnaires"
            :searchQuestionnaires="searchQuestionnaires"
            :answerQuestionnaire="answerRankingQuestionnaire"
            :answerSearchQuestionnaire="answerSearchQuestionnaire"
            :goToSearchTab="goToSearchTab"
            :verticalDisplay="true"
          />
          <div v-else-if="n === TAB_NUM4">
            <v-container v-if="!mobile">
              <v-row>
                <v-col cols="2" class="align-self-center">
                  <InputSet
                    type="selectBox"
                    :selectItems="SEARCH_TYPES"
                    :selectModel="typeName"
                    @update:selectModel="setTypeName"
                  />
                </v-col>
                <v-col
                  v-if="typeName !== FORM_CATEGORY_TEXT"
                  cols="10"
                  class="align-self-center"
                >
                  <InputSet
                    type="searchBox"
                    :textModel="word"
                    @input="word = $event"
                    :labelText="SEARCH_LABEL"
                    :search="search"
                  />
                </v-col>
                <v-col v-else cols="10" class="align-self-center">
                  <InputSet
                    type="searchSelectBox"
                    :selectItems="categoryNames"
                    :selectModel="categoryName"
                    @update:selectModel="setCategoryName"
                    :search="search"
                    :searchId="categoryId"
                  />
                </v-col>
              </v-row>
            </v-container>
            <v-container v-else>
              <InputSet
                type="selectBox"
                :selectItems="SEARCH_TYPES"
                :selectModel="typeName"
                @update:selectModel="setTypeName"
              />
              <InputSet
                v-if="typeName !== FORM_CATEGORY_TEXT"
                type="searchBox"
                :textModel="word"
                @input="word = $event"
                :labelText="SEARCH_LABEL"
                :search="search"
              />
              <InputSet
                v-else
                type="searchSelectBox"
                :selectItems="categoryNames"
                :selectModel="categoryName"
                @update:selectModel="setCategoryName"
                :search="search"
                :searchId="categoryId"
              />
            </v-container>
            <QuestionnaireCard
              v-if="sQuestionnaires?.length !== 0"
              style="margin: 5%"
              :questionnaires="sQuestionnaires"
              :searchQuestionnaires="searchQuestionnaires"
              :answerQuestionnaire="answerQuestionnaire"
              :answerSearchQuestionnaire="answerSearchQuestionnaire"
              :searchType="typeName"
              :searchWord="word"
              :searchCategory="categoryId"
              :goToSearchTab="goToSearchTab"
            />
            <Msg
              v-else-if="isSearched"
              color="grey"
              fontSize="1.5em"
              style="text-align: center; margin: 0 0 3% 0"
              >{{ SEARCH_NOT_FOUND }}</Msg
            >
          </div>
          <InfiniteLoading
            v-if="!isInfiniteDisabled && n === TAB_NUM1"
            :questionnaires="nQuestionnaires"
            @infinite="($state) => load($state, tab)"
            :immediate-check="false"
            :reverse="false"
          >
            <template #spinner>
              <div class="text-center" style="padding: 10%">
                <v-progress-circular
                  indeterminate
                  color="primary"
                  :size="100"
                  :width="10"
                ></v-progress-circular>
              </div>
            </template>
            <template #complete>
              <span></span>
            </template>
            <template #error>
              <span></span>
            </template>
          </InfiniteLoading>
        </div>
        <div v-else class="text-center" style="padding: 10%">
          <v-progress-circular
            indeterminate
            color="primary"
            :size="100"
            :width="10"
          ></v-progress-circular>
        </div>
      </v-window-item>
    </v-window>
  </v-card>
  <v-tabs
    v-if="mobile"
    v-model="tab"
    class="footer bg-background"
    color="primary"
    dark
    align-tabs="center"
    style="text-decoration: none; color: inherit"
  >
    <v-tab :value="TAB_NUM1"
      ><span style="font-size: 1em">{{ TAB_NAME1 }}</span></v-tab
    >
    <v-tab :value="TAB_NUM2"
      ><span style="font-size: 1em">{{ TAB_NAME2 }}</span></v-tab
    >
    <v-tab :value="TAB_NUM3"
      ><span style="font-size: 1em">{{ TAB_NAME3 }}</span></v-tab
    >
    <v-tab :value="TAB_NUM4"
      ><span style="font-size: 1em">{{ TAB_NAME4 }}</span></v-tab
    >
  </v-tabs>
</template>

<style scoped>
.back {
  margin: 0% 2% 0% 2%;
}

.back_mobile {
  margin: 15% 2% 0% 2%;
}

.footer {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  /* 透過した黒色 */
  z-index: 100;
}
</style>

<script lang="ts">
import { useDisplay } from "vuetify";
import { mdiPlus, mdiMagnify } from "@mdi/js";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import InputSet from "@/components/molecules/InputSet.vue";
import QuestionnaireCard from "~/components/organisms/QuestionnaireCard.vue";
import {
  TAB_LENGTH,
  TAB_ID1,
  TAB_NAME1,
  TAB_NUM1,
  TAB_ID2,
  TAB_NAME2,
  TAB_NUM2,
  TAB_ID3,
  TAB_NAME3,
  TAB_NUM3,
  TAB_ID4,
  TAB_NAME4,
  TAB_NUM4,
  FORM_TITLE_TEXT,
  FORM_CATEGORY_TEXT,
  FORM_TAG_TEXT,
  SEARCH_LABEL,
  SEARCH_TYPES,
  LOADING_END,
  SEARCH_NOT_FOUND,
} from "@/constants";
import { Category } from "@/types";

export default {
  components: {
    InfiniteLoading,
    InputSet,
    QuestionnaireCard,
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
  },
  setup(props) {
    const { mobile } = useDisplay();

    const icons = ref({
      mdiPlus,
      mdiMagnify,
    });

    // 検索タイプ
    const typeName = ref(FORM_TITLE_TEXT);
    const setTypeName = (value: string) => {
      typeName.value = value;
    };

    // 検索ワード
    const word = ref("");
    // 検索カテゴリ
    const categoryNames = ref<string[]>([]);
    // 検索実施ステータス
    const isSearched = ref(false);

    watchEffect(() => {
      if (props.categories && props.categories.length > 0) {
        categoryNames.value = props.categories.map(
          (item: Category) => item.name
        );
      }
    });

    const categoryId = ref("");
    const categoryName = ref("");
    const setCategoryId = (name: string) => {
      const category = props.categories.find(
        (item: Category) => item.name === name
      );
      if (category) {
        categoryId.value = category.id;
      } else {
        console.error(`Category with name "${name}" not found`);
      }
    };
    const setCategoryName = (value: string) => {
      categoryName.value = value;
      setCategoryId(value);
    };

    // タブの値をリアクティブにする
    const tab = ref<number | null>(null);

    // タグを押下して検索タブに移動する関数
    const goToSearchTab = (type: string, value: string) => {
      if (tab.value !== TAB_NUM4) {
        tab.value = TAB_NUM4;
      }
      word.value = value;
      typeName.value = type;
      if (type === FORM_CATEGORY_TEXT) {
        const category = props.categories.find(
          (item: Category) => item.id === value
        );
        if (category) {
          categoryName.value = category.name;
        } else {
          console.error(`Category with ID "${value}" not found`);
        }
      }
    };

    // 検索する
    const search = (word: string) => {
      console.log(word)
      props.searchQuestionnaires(typeName.value, word);
      isSearched.value = true;
    };

    return {
      mobile,
      icons,
      tab,
      search,
      goToSearchTab,
      TAB_LENGTH,
      TAB_ID1,
      TAB_NAME1,
      TAB_NUM1,
      TAB_ID2,
      TAB_NAME2,
      TAB_NUM2,
      TAB_ID3,
      TAB_NAME3,
      TAB_NUM3,
      TAB_ID4,
      TAB_NAME4,
      TAB_NUM4,
      FORM_CATEGORY_TEXT,
      SEARCH_LABEL,
      SEARCH_TYPES,
      LOADING_END,
      SEARCH_NOT_FOUND,
      typeName,
      setTypeName,
      word,
      categoryNames,
      categoryId,
      categoryName,
      setCategoryName,
      isSearched,
    };
  },
};
</script>