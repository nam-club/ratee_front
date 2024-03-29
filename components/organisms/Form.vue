<template>
    <div v-if="!isLoading">
        <form v-if="!mobile" @submit.prevent="submit" style="margin:5% 10%">
            <v-card style="padding: 2% 5%">
                <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                    <template v-slot:activator="{ attrs }">
                        <div>
                            <InputSet type="textField" :caption="FORM_TITLE_TEXT"
                                :captionLabel="FORM_CAPTION_REQUIRED_LABEL" :labelText="FORM_TITLE_LABEL" :textModel="title"
                                @input="title = $event" :rules="titleRule" />
                            <InputSet type="textsField" :caption="FORM_CHOICE_TEXT"
                                :captionLabel="FORM_CAPTION_REQUIRED_LABEL" :textsModel="choices"
                                @update:textsModel="choices = $event" :addText="FORM_ADD_CHOICE_TEXT" :rules="choiceRule"
                                :errCondition="hasDuplicateChoices" />
                            <InputSet type="selectBox" :caption="FORM_CATEGORY_TEXT"
                                :captionLabel="FORM_CAPTION_REQUIRED_LABEL" :selectItems="categoryNames"
                                :selectModel="categoryName" @update:selectModel="setCategoryName" />
                            <InputSet type="chipBox" :caption="FORM_TAG_TEXT" :labelText="FORM_TAG_LABEL" :chipsModel="tags"
                                @update:chipsModel="tags = $event" :rules="tagRule" />

                            <InputSet type="switchButton" :labelText="FORM_COMMENT_LABEL" :checkModel="enableComment"
                                @update:checkModel="enableComment = $event" />
                            <InputSet type="switchButton" :labelText="FORM_MULTI_LABEL" :checkModel="enableMultiAns"
                                @update:checkModel="enableMultiAns = $event" />

                            <v-container>
                                <v-row no-gutters>
                                    <v-col cols="5" justify="center">
                                        <nuxt-link to="/" style="text-decoration: none; color: inherit;">
                                            <Button :color="cancelBtnColor" :textColor="cancelBtnTextColor"
                                                :variant="cancelBtnVariant" :buttonStyle="cancelBtnStyle">キャンセル</Button>
                                        </nuxt-link>
                                    </v-col>
                                    <v-col cols="2" />
                                    <v-col cols="5" justify="center">
                                        <Button :color="confirmBtnColor" :textColor="confirmBtnTextColor"
                                            :variant="confirmBtnVariant" :buttonStyle="confirmBtnStyle" @click="openDialog"
                                            :disabled="errFlg">確認画面を開く</Button>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </div>
                    </template>
                    <v-card>
                        <v-toolbar dark color="secondary">
                            <v-toolbar-title>確認画面</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-divider></v-divider>
                        <v-card style="margin: 1%;">
                            <Paragraph type="text" :caption="FORM_TITLE_TEXT" :text="title"
                                :paragraphStyle="paragraphStyle" />
                            <Paragraph type="multiText" :caption="FORM_CHOICE_TEXT" :texts="choices"
                                :paragraphStyle="paragraphStyle" />
                            <Paragraph type="text" :caption="FORM_CATEGORY_TEXT" :text="categoryName"
                                :paragraphStyle="paragraphStyle" />
                            <Paragraph type="chips" :caption="FORM_TAG_TEXT" :chips="tags"
                                :paragraphStyle="paragraphStyle" />
                            <Paragraph type="switchButton" :isChecked="enableComment" :labelText="FORM_COMMENT_LABEL"
                                :paragraphStyle="switchStyle" />
                            <Paragraph type="switchButton" :isChecked="enableMultiAns" :labelText="FORM_MULTI_LABEL"
                                :paragraphStyle="switchStyle" />
                        </v-card>
                        <v-container>
                            <v-row no-gutters>
                                <v-col cols="5" justify="center">
                                    <Button :color="cancelBtnColor" :textColor="cancelBtnTextColor"
                                        :variant="cancelBtnVariant" :buttonStyle="cancelBtnStyle"
                                        @click="dialog = false">キャンセル</Button>
                                </v-col>
                                <v-col cols="2" />
                                <v-col cols="5" justify="center">
                                    <Button :color="confirmBtnColor" :textColor="confirmBtnTextColor"
                                        :buttonStyle="confirmBtnStyle" :variant="confirmBtnVariant"
                                        @click="onSubmit">投稿する</Button>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-dialog>
            </v-card>
        </form>

        <form v-else @submit.prevent="submit" style="margin:20% 5%">
            <v-card style="padding: 2% 5%">
                <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                    <template v-slot:activator="{ attrs }">
                        <div>
                            <InputSet type="textField" :caption="FORM_TITLE_TEXT"
                                :captionLabel="FORM_CAPTION_REQUIRED_LABEL" :labelText="FORM_TITLE_LABEL" :textModel="title"
                                @input="title = $event" :rules="titleRule" />
                            <InputSet type="textsField" :caption="FORM_CHOICE_TEXT"
                                :captionLabel="FORM_CAPTION_REQUIRED_LABEL" :textsModel="choices"
                                @update:textsModel="choices = $event" :addText="FORM_ADD_CHOICE_TEXT" :rules="choiceRule" />

                            <InputSet type="selectBox" :caption="FORM_CATEGORY_TEXT"
                                :captionLabel="FORM_CAPTION_REQUIRED_LABEL" :selectItems="categoryNames"
                                :selectModel="categoryName" @update:selectModel="setCategoryName" />
                            <InputSet type="chipBox" :caption="FORM_TAG_TEXT" :labelText="FORM_TAG_LABEL" :chipsModel="tags"
                                @update:chipsModel="tags = $event" :rules="tagRule" />

                            <InputSet type="switchButton" :labelText="FORM_COMMENT_LABEL" :checkModel="enableComment"
                                @update:checkModel="enableComment = $event" />
                            <InputSet type="switchButton" :labelText="FORM_MULTI_LABEL" :checkModel="enableMultiAns"
                                @update:checkModel="enableMultiAns = $event" />

                            <v-container>
                                <v-row no-gutters>
                                    <v-col cols="5" justify="center">
                                        <nuxt-link to="/" style="text-decoration: none; color: inherit;">
                                            <Button :color="cancelBtnColor" :textColor="cancelBtnTextColor"
                                                :variant="cancelBtnVariant" :buttonStyle="cancelBtnStyle">キャンセル</Button>
                                        </nuxt-link>
                                    </v-col>
                                    <v-col cols="2" />
                                    <v-col cols="5" justify="center">
                                        <Button :color="confirmBtnColor" :textColor="confirmBtnTextColor"
                                            :variant="confirmBtnVariant" :buttonStyle="confirmBtnStyle" @click="openDialog"
                                            :disabled="errFlg">確認画面を開く</Button>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </div>
                    </template>
                    <v-card>
                        <v-toolbar dark color="secondary">
                            <v-toolbar-title>確認画面</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-divider></v-divider>
                        <v-card style="margin: 2%;">
                            <Paragraph type="text" :caption="FORM_TITLE_TEXT" :text="title"
                                :paragraphStyle="paragraphStyle" />
                            <Paragraph type="multiText" :caption="FORM_CHOICE_TEXT" :texts="choices"
                                :paragraphStyle="paragraphStyle" />
                            <Paragraph type="text" :caption="FORM_CATEGORY_TEXT" :text="categoryName"
                                :paragraphStyle="paragraphStyle" />
                            <Paragraph type="chips" :caption="FORM_TAG_TEXT" :chips="tags"
                                :paragraphStyle="paragraphStyle" />
                            <Paragraph type="switchButton" :isChecked="enableComment" :labelText="FORM_COMMENT_LABEL"
                                :paragraphStyle="switchStyle" />
                            <Paragraph type="switchButton" :isChecked="enableMultiAns" :labelText="FORM_MULTI_LABEL"
                                :paragraphStyle="switchStyle" />
                        </v-card>
                        <v-container>
                            <v-row no-gutters>
                                <v-col cols="5" justify="center">
                                    <Button :color="cancelBtnColor" :textColor="cancelBtnTextColor"
                                        :variant="cancelBtnVariant" :buttonStyle="cancelBtnStyle"
                                        @click="dialog = false">キャンセル</Button>
                                </v-col>
                                <v-col cols="2" />
                                <v-col cols="5" justify="center">
                                    <Button :color="confirmBtnColor" :textColor="confirmBtnTextColor"
                                        :buttonStyle="confirmBtnStyle" :variant="confirmBtnVariant"
                                        @click="onSubmit">投稿する</Button>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-dialog>
            </v-card>
        </form>
    </div>
    <div v-else class="text-center center-content">
        <v-progress-circular indeterminate color="primary" :size="100" :width="10"></v-progress-circular>
    </div>
</template>

<style scoped>
.center-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    /* 画面の高さに合わせて */
}
</style>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useDisplay } from 'vuetify'
import { useRouter } from 'vue-router';
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
        const router = useRouter();
        const isLoading = ref(false);
        const { mobile } = useDisplay();
        const hasDuplicateChoices = ref(false); // 選択肢の重複チェック

        const errFlg = computed(() => {
            // choices.value から空文字 ('') を除外した新しい配列を作成
            const nonEmptyChoices = choices.value.filter(choice => choice !== '');

            // 新しい配列で Set を作成し、そのサイズが非空の要素の数と異なる場合、
            // 重複が存在すると判断（ただし空文字の重複は無視）
            hasDuplicateChoices.value = new Set(nonEmptyChoices).size !== nonEmptyChoices.length;

            return !title.value || title.value.length < TITLE_MIN_LENGTH || title.value.length > TITLE_MAX_LENGTH || !choices.value || choices.value.length < CHOICES_MIN_LENGTH || choices.value.length > CHOICES_MAX_LENGTH || choices.value.some(choice => !choice || choice === '' || choice.length < CHOICE_MIN_LENGTH || choice.length > CHOICE_MAX_LENGTH) || !categoryId.value || categoryId.value === '' || hasDuplicateChoices.value;
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
        const cancelBtnVariant = ref("outlined");
        const cancelBtnStyle = ref({ width: '100%', display: 'block' });

        const confirmBtnColor = ref("#3A98B9");
        const confirmBtnTextColor = ref("#f5f5f5");
        const confirmBtnVariant = ref("elevated");
        const confirmBtnStyle = ref({ width: '100%', display: 'block' });

        // ダイアログの表示
        const dialog = ref(false);
        const openDialog = () => {
            dialog.value = true;
        }

        const paragraphStyle = ref({ margin: '1% 0 0 2%' });
        const switchStyle = ref({ margin: '0 2%' });

        const homeLink: Ref<HTMLAnchorElement | null> = ref(null); // nuxt-linkへの参照を追加

        // 投稿内容を送信する
        const onSubmit = async () => {
            isLoading.value = true; // ローディング開始
            try {
                console.log(1);
                await props.createQuestionnaire(title.value, choices.value, categoryId.value, tags.value, options.value);
                router.push('/');
                console.log(2);
            } catch (error) {
                console.error("アンケート投稿エラーが発生しました:", error);
            } finally {
                isLoading.value = false; // ローディング終了
            }
        };

        return {
            mobile,
            FORM_TITLE_TEXT,
            FORM_TITLE_LABEL,
            title,
            titleRule,
            FORM_CHOICE_TEXT,
            choiceStyle,
            choices,
            choiceRule,
            hasDuplicateChoices,
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
            cancelBtnVariant,
            confirmBtnStyle,
            confirmBtnColor,
            confirmBtnTextColor,
            confirmBtnVariant,
            dialog,
            openDialog,
            paragraphStyle,
            switchStyle,
            errFlg,
            FORM_ERR_TITLE,
            FORM_ERR_TEXT,
            FORM_CAPTION_REQUIRED_LABEL,
            onSubmit,
            isLoading
        }
    }
})
</script>
