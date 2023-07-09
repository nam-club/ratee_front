<template>
    <form @submit.prevent="submit" style="margin:5% 20%">
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <template v-slot:activator="{ on, attrs }">
                <div>
                    <InputSet type="textField" :listNum="1" :caption="titleText" :labelText="titleLabel" />
                    <InputSet type="textField" :listNum="choiceListNum" :caption="choiceText" :addText="addChoiceText" />

                    <InputSet type="selectBox" :listNum="1" :caption="categoryText" :selectItems="categoryItems" />
                    <InputSet type="tagBox" :listNum="1" :caption="tagText" :labelText="tagLabel" />

                    <InputSet type="checkBox" :listNum="1" :labelText="commentLabel" />
                    <InputSet type="checkBox" :listNum="1" :labelText="multiAnsLabel" />

                    <v-container>
                        <v-row no-gutters>
                            <v-col cols="5" justify="center">
                                <nuxt-link to="/" style="text-decoration: none; color: inherit;">
                                    <Button :color="cancelBtnColor" :buttonStyle="cancelBtnStyle">キャンセル</Button>
                                </nuxt-link>
                            </v-col>
                            <v-col cols="2" />
                            <v-col cols="5" justify="center">
                                <Button :color="confirmBtnColor" :buttonStyle="confirmBtnStyle" v-bind="attrs" @click="openDialog">確認画面を開く</Button>
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
                <v-container>
                    <v-row no-gutters>
                        <v-col cols="5" justify="center">
                            <Button :color="cancelBtnColor" :buttonStyle="cancelBtnStyle" @click="dialog = false">キャンセル</Button>
                        </v-col>
                        <v-col cols="2" />
                        <v-col cols="5" justify="center">
                            <nuxt-link to="/" style="text-decoration: none; color: inherit;">
                                <Button :color="confirmBtnColor" :buttonStyle="confirmBtnStyle">投稿する</Button>
                            </nuxt-link>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>
    </form>
</template>

<script>
import { defineComponent, ref } from 'vue'

import InputSet from '@/components/molecules/InputSet.vue'

export default defineComponent({
    components: {
        InputSet
    },
    setup() {
        const titleText = ref('アンケート内容')
        const titleLabel = ref('アンケート内容を入力してください。')

        const choiceText = ref('選択肢内容')
        const choiceListNum = ref(4);
        const choiceStyle = ref({ margin: 0 })

        const addChoiceText = ref('選択肢を追加する')

        const categoryText = ref('カテゴリ')
        const categoryItems = ref(["社会", "政治経済", "地域", "文化", "会社・職業", "テクノロジー", "医療・ヘルスケア", "学問", "教育", "生活", "食文化", "スポーツ", "旅行", "趣味", "テレビ・映画・芸能", "本", "アニメ", "音楽", "ゲーム", "悩み", "雑談"])

        const tagText = ref('タグ')
        const tagLabel = ref('追加したいタグを入力してください。')

        const commentLabel = ref('コメントを有効にする')
        const multiAnsLabel = ref('複数の回答を有効にする')

        const cancelBtnColor = ref("#f5f5f5");
        const cancelBtnStyle = ref({ color: '#515254', fontSize: '1.2em', height: '100%', width: '100%', padding: '5%', display: 'block' });

        const confirmBtnColor = ref("#3A98B9");
        const confirmBtnStyle = ref({ color: 'white', fontSize: '1.2em', height: '100%', width: '100%', padding: '5%', display: 'block' });

        const dialog = ref(false);
        const openDialog = () => {
            dialog.value = true
            console.log(dialog)
        }

        return {
            titleText,
            titleLabel,
            choiceText,
            choiceListNum,
            choiceStyle,
            addChoiceText,
            categoryText,
            categoryItems,
            tagText,
            tagLabel,
            commentLabel,
            multiAnsLabel,
            cancelBtnStyle,
            cancelBtnColor,
            confirmBtnStyle,
            confirmBtnColor,
            dialog,
            openDialog
        }
    }
})
</script>
