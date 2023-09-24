<template>
    <v-card class="bg-secondary" dark>
        <v-tabs v-model="tab" color="primary" dark align-tabs="center">
            <v-tab :value="1" @click="changeQuestionnaires(TAB_ID1)">{{ TAB_NAME1 }}</v-tab>
            <v-tab :value="2" @click="changeQuestionnaires(TAB_ID2)">{{ TAB_NAME2 }}</v-tab>
            <v-tab :value="3" @click="changeQuestionnaires(TAB_ID3)">{{ TAB_NAME3 }}</v-tab>
            <v-tab :value="4">{{ TAB_NAME4 }}</v-tab>
        </v-tabs>
        <v-window v-model="tab">
            <v-window-item v-for="n in 4" :key="n" :value="n">
                <div v-if="n === 4">
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
                                <v-container v-else>
                                    <v-row>
                                        <v-col cols="10" class="align-self-center">
                                            <InputSet type="selectBox" :selectItems="categoryNames"
                                                :selectModel="categoryName" @update:selectModel="setCategoryName" />
                                        </v-col>
                                        <v-col cols="2">
                                            <v-btn icon @click="searchQuestionnaires(typeName, categoryId)">
                                                <v-icon>{{ icons.mdiMagnify }}</v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-col>
                        </v-row>
                    </v-container>
                    <AnswerBox style="margin:5%" :questionnaires="questionnaires" :answerQuestionnaire="answerQuestionnaire"
                        :answerSearchQuestionnaire="answerSearchQuestionnaire" :searchType="typeName" :searchWord="word" :searchCategory="categoryId" />
                </div>
                <AnswerBox v-else style="margin:5%" :questionnaires="questionnaires" :answerQuestionnaire="answerQuestionnaire"
                    :answerSearchQuestionnaire="answerSearchQuestionnaire" />
            </v-window-item>
        </v-window>
    </v-card>
</template>

<script lang="ts">
import { mdiPlus, mdiMagnify } from '@mdi/js';
import InputSet from '@/components/molecules/InputSet.vue'
import AnswerBox from '@/components/organisms/AnswerBox.vue'
import { TAB_ID1, TAB_NAME1, TAB_ID2, TAB_NAME2, TAB_ID3, TAB_NAME3, TAB_ID4, TAB_NAME4, FORM_TITLE_TEXT, FORM_CATEGORY_TEXT, SEARCH_LABEL, SEARCH_TYPES } from '@/constants';
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

        const categoryNames = ref<string[]>([])
        console.log(props.categories);

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

        return {
            icons,
            TAB_ID1,
            TAB_NAME1,
            TAB_ID2,
            TAB_NAME2,
            TAB_ID3,
            TAB_NAME3,
            TAB_ID4,
            TAB_NAME4,
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