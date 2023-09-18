<template>
    <v-dialog v-model="dialog">
        <template v-slot:activator="{ attrs }">
            <div>
                <v-container>
                    <v-row v-if="comments && comments.length !== 0">
                        <v-col cols="6">
                            <Msg fontWeight="normal" fontSize="1.5em">コメント</Msg>
                        </v-col>
                        <v-col cols="6" class="text-end">
                            <Button :color="confirmBtnColor" :buttonStyle="confirmBtnStyle"
                                @click="openDialog">コメントを投稿する</Button>
                        </v-col>
                    </v-row>
                    <v-row v-else>
                        <v-col cols="12">
                            <Button :color="confirmBtnColor" :buttonStyle="confirmBtnStyle"
                                @click="openDialog">コメントを投稿する</Button>
                        </v-col>
                    </v-row>
                    <v-card v-if="comments && comments.length !== 0" style="margin:2% 0">
                        <v-list lines="two" style="width: 100%;">
                            <v-list-item v-for="(comment, index) in comments" :key="index" :title="comment.comment"
                                :subtitle="comment.createdAt + ' ID:' + comment.ipaddrHashed"
                                :prepend-avatar="'https://randomuser.me/api/portraits/lego/' + comment.iconId + '.jpg'">
                            </v-list-item>
                            <v-divider inset></v-divider>
                        </v-list>
                    </v-card>
                </v-container>
            </div>
        </template>
        <v-card>
            <v-card-text>
                <v-btn-toggle v-model="toggle" color="primary">
                    <Button v-for="n in 9" :key="n" @click="setIcon(n)">
                        <v-avatar>
                            <v-img :src="'https://randomuser.me/api/portraits/lego/' + n + '.jpg'" />
                        </v-avatar>
                    </Button>
                </v-btn-toggle>
                <v-container fluid>
                    <InputSet type="textArea" :labelText="commentLabel" :textAreaModel="content"
                        @input="content = $event" />
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey darken-1" text @click="dialog = false" style="margin: 0 2%">
                    戻る
                </v-btn>
                <v-btn color="blue darken-1" text @click="dialog = false"
                    :onClick="() => postComment(questionId, iconNum, content)">
                    コメントを投稿する
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import Button from '@/components/atoms/Button.vue'
import Msg from '@/components/atoms/Msg.vue'
import InputSet from '@/components/molecules/InputSet.vue'

export default defineComponent({
    components: {
        Button,
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

        const confirmBtnColor = ref("#3A98B9")
        const confirmBtnStyle = ref({ color: 'white' });

        // ダイアログの表示
        const dialog = ref(false)
        const openDialog = () => {
            dialog.value = true
        }

        const toggle = ref(null);
        const iconNum = ref(0);
        const setIcon = (num: number) => {
            iconNum.value = num;
        }

        const content = ref('')
        const commentLabel = ref('コメントを入力してください。');

        return {
            confirmBtnColor,
            confirmBtnStyle,
            dialog,
            openDialog,
            toggle,
            iconNum,
            setIcon,
            content,
            commentLabel
        }
    }
})
</script>