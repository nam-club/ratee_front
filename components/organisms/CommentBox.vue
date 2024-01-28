<template>
    <v-dialog v-model="dialog">
        <template v-slot:activator="{ attrs }">
            <div>
                <v-container v-if="!mobile">
                    <v-row v-if="comments && comments.length !== 0">
                        <v-col cols="6">
                            <Msg fontWeight="normal" fontSize="1.5em">コメント</Msg>
                        </v-col>
                        <v-col cols="6" class="text-end">
                            <Button :variant="btnVariant" @click="openDialog">
                                {{ COMMENT_BUTTON }}
                            </Button>
                        </v-col>
                    </v-row>
                    <v-row v-else>
                        <v-col cols="12">
                            <Button :variant="btnVariant" @click="openDialog">
                                {{ COMMENT_BUTTON }}
                            </Button>
                        </v-col>
                    </v-row>
                    <v-card v-if="comments && comments.length !== 0" style="margin:2% 0 10% 0">
                        <v-list lines="two" style="width: 100%;">
                            <v-list-item v-for="(comment, index) in comments" :key="index" :title="comment.comment"
                                :subtitle="comment.createdAt + ' ID:' + comment.ipaddrHashed"
                                :prepend-avatar="'https://randomuser.me/api/portraits/lego/' + comment.iconId + '.jpg'">
                            </v-list-item>
                            <v-divider inset></v-divider>
                        </v-list>
                    </v-card>
                </v-container>

                <v-container v-else>
                    <v-row v-if="comments && comments.length !== 0">
                        <v-col cols="6">
                            <Msg fontWeight="normal" fontSize="1.5em">コメント</Msg>
                        </v-col>
                        <v-col cols="6" class="text-end">
                            <IconButton :icon="icons.mdiCommentPlus" :size="large" :variant="btnVariant"
                                @click="openDialog" />
                        </v-col>
                    </v-row>
                    <v-row v-else>
                        <v-row justify="center">
                            <v-col cols="auto">
                                <Button :variant="btnVariant" @click="openDialog">{{ COMMENT_BUTTON }}</Button>
                            </v-col>
                        </v-row>
                    </v-row>
                    <v-card v-if="comments && comments.length !== 0" style="margin:2% 0 10% 0">
                        <v-list lines="two" style="width: 100%;">
                            <v-list-item v-for="(comment, index) in comments" :key="index" :title="comment.comment"
                                :subtitle="comment.createdAt + ' ID:' + comment.ipaddrHashed"
                                :prepend-avatar="'https://randomuser.me/api/portraits/lego/' + comment.iconId + '.jpg'">
                            </v-list-item>
                            <v-divider inset></v-divider>
                        </v-list>
                    </v-card>
                </v-container>
                <v-container>

                </v-container>
            </div>
        </template>
        <v-card>
            <v-card-text>
                <v-btn-toggle v-if="!mobile" v-model="toggle" color="primary">
                    <Button v-for="n in 9" :key="n" @click="setIcon(n)">
                        <v-avatar>
                            <v-img :src="'https://randomuser.me/api/portraits/lego/' + n + '.jpg'" />
                        </v-avatar>
                    </Button>
                </v-btn-toggle>
                <v-tabs v-else v-model="tab" align-tabs="center">
                    <v-tab :value="n" v-for="n in 9" :key="n" @click="setIcon(n)">
                        <v-avatar>
                            <v-img :src="'https://randomuser.me/api/portraits/lego/' + n + '.jpg'" />
                        </v-avatar>
                    </v-tab>
                </v-tabs>
                <v-container fluid>
                    <InputSet type="textArea" :labelText="commentLabel" :textAreaModel="content" @input="content = $event"
                        :rules="commentRule" />
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey darken-1" text @click="dialog = false" style="margin: 0 2%">
                    戻る
                </v-btn>
                <v-btn color="blue darken-1" text @click="dialog = false"
                    :onClick="() => postComment(questionId, iconNum, content)" :disabled="errFlg">
                    {{ COMMENT_BUTTON }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { useDisplay } from 'vuetify'
import { mdiCommentPlus } from '@mdi/js';
import Button from '@/components/atoms/Button.vue'
import IconButton from '@/components/atoms/IconButton.vue'
import Msg from '@/components/atoms/Msg.vue'
import InputSet from '@/components/molecules/InputSet.vue'
import {
    COMMENT_MIN_LENGTH, COMMENT_MAX_LENGTH, COMMENT_NULL_TEXT, COMMENT_BUTTON
} from '@/constants';

export default defineComponent({
    components: {
        Button,
        IconButton,
        Msg,
        InputSet
    },
    props: {
        questionId: {
            type: String,
            required: true
        },
        comments: {
            type: Array as PropType<Comment[]>
        },
        postComment: {
            type: Function,
            required: true
        },
    },
    setup(props) {
        const { mobile } = useDisplay();
        const icons = ref({
            mdiCommentPlus,
        })
        const btnVariant = ref("elevated");

        const errFlg = computed(() => {
            const length = content.value.length;
            return !content.value || length < COMMENT_MIN_LENGTH || length > COMMENT_MAX_LENGTH;
        });


        const content = ref<string>('');
        const commentRule = ref({
            required: (value: string) => !!value || COMMENT_NULL_TEXT,
            textLength: (value: string) => {
                const length = value.length;
                return (length >= COMMENT_MIN_LENGTH && length <= COMMENT_MAX_LENGTH) || COMMENT_MIN_LENGTH + '~' + COMMENT_MAX_LENGTH + '文字以内で入力してください。';
            },
        });

        const confirmBtnColor = ref("#3A98B9");
        const confirmBtnTextColor = ref('white');

        // ダイアログの表示
        const dialog = ref(false)
        const openDialog = () => {
            dialog.value = true
        }

        const toggle = ref(null);

        const tab = ref(0);
        const iconNum = ref(0);
        const setIcon = (num: number) => {
            iconNum.value = num;
            tab.value = num;
        }

        const commentLabel = ref(COMMENT_NULL_TEXT);

        return {
            mobile,
            icons,
            btnVariant,
            COMMENT_BUTTON,
            confirmBtnColor,
            confirmBtnTextColor,
            dialog,
            openDialog,
            toggle,
            tab,
            iconNum,
            setIcon,
            content,
            commentLabel,
            commentRule,
            errFlg
        }
    }
})
</script>