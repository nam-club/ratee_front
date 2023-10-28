<template>
    <form @submit.prevent="submit" style="margin:5% 20%">
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <template v-slot:activator="{ attrs }">
                <div>
                    <InputSet type="textField" :caption="FORM_TITLE_TEXT" :captionLabel="FORM_CAPTION_REQUIRED_LABEL" :labelText="FORM_TITLE_LABEL" :textModel="title"
                        @input="title = $event" :rules="titleRule" />
                    <InputSet type="textsField" :caption="FORM_CHOICE_TEXT" :captionLabel="FORM_CAPTION_REQUIRED_LABEL" :textsModel="choices"
                        @update:textsModel="choices = $event" :addText="FORM_ADD_CHOICE_TEXT" :rules="choiceRule" />

                    <InputSet type="selectBox" :caption="FORM_CATEGORY_TEXT" :captionLabel="FORM_CAPTION_REQUIRED_LABEL" :selectItems="categoryNames"
                        :selectModel="categoryName" @update:selectModel="setCategoryName" />
                    <InputSet type="chipBox" :caption="FORM_TAG_TEXT" :labelText="FORM_TAG_LABEL" :chipsModel="tags"
                        @update:chipsModel="tags = $event" :rules="tagRule" />

                    <InputSet type="checkBox" :labelText="FORM_COMMENT_LABEL" :checkModel="enableComment"
                        @update:checkModel="enableComment = $event" />
                    <InputSet type="checkBox" :labelText="FORM_MULTI_LABEL" :checkModel="enableMultiAns"
                        @update:checkModel="enableMultiAns = $event" />

                    <v-container>
                        <v-row no-gutters>
                            <v-col cols="5" justify="center">
                                <nuxt-link to="/" style="text-decoration: none; color: inherit;">
                                    <Button :color="cancelBtnColor" :textColor="cancelBtnTextColor"
                                        :buttonStyle="cancelBtnStyle">キャンセル</Button>
                                </nuxt-link>
                            </v-col>
                            <v-col cols="2" />
                            <v-col cols="5" justify="center">
                                <Button :color="confirmBtnColor" :textColor="confirmBtnTextColor"
                                    :buttonStyle="confirmBtnStyle" @click="openDialog" :disabled="errFlg">確認画面を開く</Button>
                            </v-col>
                        </v-row>
                    </v-container>
                </div>
            </template>
            <v-card>
                <v-toolbar dark color="primary">
                    <v-toolbar-title>確認画面</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-divider></v-divider>
                <Paragraph type="text" :caption="FORM_TITLE_TEXT" :text="title" />
                <Paragraph type="multiText" :caption="FORM_CHOICE_TEXT" :texts="choices" />
                <Paragraph type="text" :caption="FORM_CATEGORY_TEXT" :text="categoryName" />
                <Paragraph type="chips" :caption="FORM_TAG_TEXT" :chips="tags" />
                <Paragraph type="checkBox" :isChecked="enableComment" :labelText="FORM_COMMENT_LABEL" />
                <Paragraph type="checkBox" :isChecked="enableMultiAns" :labelText="FORM_MULTI_LABEL" />
                <v-container>
                    <v-row no-gutters>
                        <v-col cols="5" justify="center">
                            <Button :color="cancelBtnColor" :textColor="cancelBtnTextColor" :buttonStyle="cancelBtnStyle"
                                @click="dialog = false">キャンセル</Button>
                        </v-col>
                        <v-col cols="2" />
                        <v-col cols="5" justify="center">
                            <nuxt-link to="/" style="text-decoration: none; color: inherit;">
                                <Button :color="confirmBtnColor" :textColor="confirmBtnTextColor"
                                    :buttonStyle="confirmBtnStyle"
                                    :onClick="() => createQuestionnaire(title, choices, categoryId, tags, options)">投稿する</Button>
                            </nuxt-link>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>
    </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import Button from '@/components/atoms/Button.vue'
import InputSet from '@/components/molecules/InputSet.vue'
import Paragraph from '@/components/molecules/Paragraph.vue'
import { Category } from '@/types';
import {
    FORM_CAPTION_REQUIRED_LABEL,
    FORM_TITLE_TEXT, FORM_TITLE_LABEL, FORM_CHOICE_TEXT, FORM_ADD_CHOICE_TEXT, FORM_CATEGORY_TEXT, FORM_TAG_TEXT, FORM_TAG_LABEL, FORM_COMMENT_LABEL, FORM_MULTI_LABEL, FORM_ERR_TITLE, FORM_ERR_TEXT,
    TITLE_MIN_LENGTH, TITLE_MAX_LENGTH, CHOICE_MIN_LENGTH, CHOICE_MAX_LENGTH, CHOICES_MAX_LENGTH, CHOICES_MIN_LENGTH, TAG_MIN_LENGTH, TAG_MAX_LENGTH, TAGS_MAX_LENGTH, TAGS_MIN_LENGTH
} from '@/constants';

export default defineComponent({
    components: {
        Button,
        InputSet,
        Paragraph
    },
    props: {
        categories: {
            type: Array as PropType<Category[]>,
            required: true,
        },
        createQuestionnaire: {
            type: Function,
            required: true
        },
    },
    setup(props) {
        const errFlg = computed(() => {
            return !title.value || title.value.length < TITLE_MIN_LENGTH || title.value.length > TITLE_MAX_LENGTH || !choices.value || choices.value.length < CHOICES_MIN_LENGTH || choices.value.length > CHOICES_MAX_LENGTH || choices.value.some(choice => !choice || choice === '' || choice.length < CHOICE_MIN_LENGTH || choice.length > CHOICE_MAX_LENGTH || !categoryId.value || categoryId.value === '');
        });

        const title = ref<string>('');
        const titleRule = ref({
            required: (value: string) => !!value || 'タイトルを入力してください。',
            textLength: (value: string) => {
                const length = value.length;
                return (length >= TITLE_MIN_LENGTH && length <= TITLE_MAX_LENGTH) || TITLE_MIN_LENGTH + '~' + TITLE_MAX_LENGTH + '文字以内で入力してください。';
            },
        });

        const choiceStyle = ref({ margin: 0 });
        const choices = ref(['', '']);
        const choiceRule = ref({
            textsMaxLength: CHOICES_MAX_LENGTH,
            textsMinLength: CHOICES_MIN_LENGTH,
            required: (value: string) => !!value || '選択肢を入力してください。',
            textLength: (value: string) => {
                const length = value.length;
                return (length >= CHOICE_MIN_LENGTH && length <= CHOICE_MAX_LENGTH) || CHOICE_MIN_LENGTH + '~' + CHOICE_MAX_LENGTH + '文字以内で入力してください。';
            },
        });

        const categoryNames = ref<string[]>([]);
        if (props.categories) {
            categoryNames.value = props.categories.map((item: Category) => item.name);
        }
        const categoryId = ref('');
        const categoryName = ref('');
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

        const tags = ref([]);
        const tagRule = ref({
            tagsMaxLength: TAGS_MAX_LENGTH,
            tagsMinLength: TAGS_MIN_LENGTH,
            textLength: (value: string) => {
                const length = value.length;
                return (length <= TAG_MAX_LENGTH) || TAG_MIN_LENGTH + '~' + TAG_MAX_LENGTH + '文字以内で入力してください。';
            },
        });

        const enableComment = ref(false);
        const enableMultiAns = ref(false);

        const options = ref({});
        options.value = { "enableComment": enableComment, "enableMultiAns": enableMultiAns }

        const cancelBtnColor = ref("#f5f5f5");
        const cancelBtnTextColor = ref('#515254');
        const cancelBtnStyle = ref({ fontSize: '1.2em', height: '100%', width: '100%', padding: '5%', display: 'block' });

        const confirmBtnColor = ref("#3A98B9");
        const confirmBtnTextColor = ref('white');
        const confirmBtnStyle = ref({ fontSize: '1.2em', height: '100%', width: '100%', padding: '5%', display: 'block' });

        // ダイアログの表示
        const dialog = ref(false);
        const openDialog = () => {
            //if (!checkValidate()) {
                dialog.value = true;
            /*} else {
                console.error('Validation errors present, cannot open dialog.');
            }*/
        }

        // バリデーションチェック関数
        /*const checkValidate = (): boolean => {
            errFlg.value = false;

            console.log(title.value)
            console.log(choices.value)
            console.log(categoryId.value)
            console.log(tags.value)

            // タイトルのエラーチェック
            if (!title.value || title.value === '' || (title.value.length < TITLE_MIN_LENGTH || title.value.length > TITLE_MAX_LENGTH)) {
                errFlg.value = true;

                // 選択肢のエラーチェック
            } else if (!choices.value || choices.value.length < CHOICES_MIN_LENGTH || choices.value.length > CHOICES_MAX_LENGTH || choices.value.some(choice => !choice || choice === '' || choice.length < CHOICE_MIN_LENGTH || choice.length > CHOICE_MAX_LENGTH) || !categoryId.value || categoryId.value === '' || !tags.value || tags.value.length < TAGS_MIN_LENGTH || tags.value.length > TAGS_MAX_LENGTH) {
                errFlg.value = true;

                // カテゴリのエラーチェック
            } else if (!categoryId.value || categoryId.value === '') {
                errFlg.value = true;

                // タグのエラーチェック
            } else if (!tags.value || tags.value.length < TAGS_MIN_LENGTH || tags.value.length > TAGS_MAX_LENGTH) {
                errFlg.value = true;
            }

            console.log(errFlg.value)

            return errFlg.value;
        }*/

        return {
            FORM_TITLE_TEXT,
            FORM_TITLE_LABEL,
            title,
            titleRule,
            FORM_CHOICE_TEXT,
            choiceStyle,
            choices,
            choiceRule,
            FORM_ADD_CHOICE_TEXT,
            FORM_CATEGORY_TEXT,
            categoryNames,
            categoryId,
            categoryName,
            setCategoryName,
            FORM_TAG_TEXT,
            FORM_TAG_LABEL,
            tags,
            tagRule,
            FORM_COMMENT_LABEL,
            enableComment,
            FORM_MULTI_LABEL,
            enableMultiAns,
            options,
            cancelBtnStyle,
            cancelBtnColor,
            cancelBtnTextColor,
            confirmBtnStyle,
            confirmBtnColor,
            confirmBtnTextColor,
            dialog,
            openDialog,
            errFlg,
            FORM_ERR_TITLE,
            FORM_ERR_TEXT,
            FORM_CAPTION_REQUIRED_LABEL
        }
    }
})
</script>
