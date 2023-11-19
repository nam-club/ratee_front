<template>
    <v-card class="bg-secondary" dark>
        <v-tabs v-model="tab" color="primary" dark align-tabs="center">
            <v-tab :value="TAB_NUM1" @click="changeTab(TAB_ID1)">{{ TAB_NAME1 }}</v-tab>
            <v-tab :value="TAB_NUM2" @click="changeTab(TAB_ID2)">{{ TAB_NAME2 }}</v-tab>
            <v-tab :value="TAB_NUM3" @click="changeTab(TAB_ID3)">{{ TAB_NAME3 }}</v-tab>
            <v-tab :value="TAB_NUM4" @click="changeTab(TAB_ID4)">{{ TAB_NAME4 }}</v-tab>
        </v-tabs>
        <v-window v-model="tab">
            <v-window-item v-for="n in TAB_LENGTH" :key="n" :value="n">
                <div v-if="n === TAB_NUM4">
                    <v-container>
                        <v-row>
                            <v-col cols="2" class="align-self-center">
                                <InputSet type="selectBox" :selectItems="SEARCH_TYPES" :selectModel="typeName"
                                    @update:selectModel="setTypeName" />
                            </v-col>
                            <v-col cols="10" class="align-self-center">
                                <InputSet v-if="typeName !== FORM_CATEGORY_TEXT" type="searchBox" :text="word"
                                    @input="word = $event" :labelText="SEARCH_LABEL"
                                    :onClick="() => { searchQuestionnaires(typeName, word); }" />
                                <v-row v-else>
                                    <v-col cols="10" class="align-self-center">
                                        <InputSet type="selectBox" :selectItems="categoryNames" :selectModel="categoryName"
                                            @update:selectModel="setCategoryName" />
                                    </v-col>
                                    <v-col cols="2">
                                        <v-btn icon @click="searchQuestionnaires(typeName, categoryId)">
                                            <v-icon>{{ icons.mdiMagnify }}</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-container>
                    <AnswerBox style="margin:5%" :questionnaires="questionnaires"
                        :searchQuestionnaires="searchQuestionnaires" :answerQuestionnaire="answerQuestionnaire"
                        :answerSearchQuestionnaire="answerSearchQuestionnaire" :searchType="typeName" :searchWord="word"
                        :searchCategory="categoryId" :goToSearchTab="goToSearchTab" />
                </div>
                <AnswerBox v-else style="margin:5%" :questionnaires="questionnaires"
                    :searchQuestionnaires="searchQuestionnaires" :answerQuestionnaire="answerQuestionnaire"
                    :answerSearchQuestionnaire="answerSearchQuestionnaire" :goToSearchTab="goToSearchTab" />
            </v-window-item>
        </v-window>
    </v-card>
</template>

<script lang="ts">
import { mdiPlus, mdiMagnify } from '@mdi/js';
import InputSet from '@/components/molecules/InputSet.vue'
import AnswerBox from '@/components/organisms/AnswerBox.vue'
import { TAB_LENGTH, TAB_ID1, TAB_NAME1, TAB_NUM1, TAB_ID2, TAB_NAME2, TAB_NUM2, TAB_ID3, TAB_NAME3, TAB_NUM3, TAB_ID4, TAB_NAME4, TAB_NUM4, FORM_TITLE_TEXT, FORM_CATEGORY_TEXT, FORM_TAG_TEXT, SEARCH_LABEL, SEARCH_TYPES } from '@/constants';
import { Category } from '@/types';

export default {
    components: {
        InputSet,
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
        resetQuestionnaires: {
            type: Function,
            required: true
        },
        categories: {
            type: Array as PropType<Category[]>,
            required: true,
        }
    },
    data: () => ({
        tab: null,
    }),
    setup(props) {

        const icons = ref({
            mdiPlus,
            mdiMagnify
        })

        // 検索タイプ
        const typeName = ref(FORM_TITLE_TEXT)
        const setTypeName = (value: string) => {
            typeName.value = value;
        }

        // 検索ワード
        const word = ref('');

        // 検索カテゴリ
        const categoryNames = ref<string[]>([])

        watchEffect(() => {
            if (props.categories && props.categories.length > 0) {
                categoryNames.value = props.categories.map((item: Category) => item.name);
            }
        });

        const categoryId = ref('')
        const categoryName = ref('')
        const setCategoryId = (name: string) => {
            const category = props.categories.find((item: Category) => item.name === name);
            if (category) {
                categoryId.value = category.id;
            } else {
                console.error(`Category with name "${name}" not found`);
            }
        }
        const setCategoryName = (value: string) => {
            categoryName.value = value;
            setCategoryId(value);
        }

        // タブの値をリアクティブにする
        const tab = ref<number | null>(null);

        // タブを移動する
        const changeTab = async (id: string) => {
            await props.resetQuestionnaires();
            if (tab.value !== TAB_NUM4) {
                await props.changeQuestionnaires(id);
            }
        }

        // タグを押下して検索タブに移動する関数
        const goToSearchTab = (value: string) => {
            if (tab.value !== TAB_NUM4) {
                tab.value = TAB_NUM4;
            }
            word.value = value;
            typeName.value = FORM_TAG_TEXT;
        };

        return {
            icons,
            tab,
            changeTab,
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
            typeName,
            setTypeName,
            word,
            categoryNames,
            categoryId,
            categoryName,
            setCategoryName
        }
    }
}
</script>