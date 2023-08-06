<template>
    <form @submit.prevent="submit" style="margin:5% 20%">
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <template v-slot:activator="{ attrs }">
                <div>
                    <InputSet type="textField" :caption="titleText" :labelText="titleLabel" :textModel="title"
                        @input="title = $event" />
                    <InputSet type="textsField" :caption="choiceText" :textsModel="choices"
                        @update:textsModel="choices = $event" :addText="addChoiceText" />

                    <InputSet type="selectBox" :caption="categoryText" :selectItems="categoryNames"
                        :selectModel="categoryName" @update:selectModel="setCategoryName" />
                    <InputSet type="tagBox" :caption="tagText" :labelText="tagLabel" />

                    <InputSet type="checkBox" :labelText="commentLabel" />
                    <InputSet type="checkBox" :labelText="multiAnsLabel" />

                    <v-container>
                        <v-row no-gutters>
                            <v-col cols="5" justify="center">
                                <nuxt-link to="/" style="text-decoration: none; color: inherit;">
                                    <Button :color="cancelBtnColor" :buttonStyle="cancelBtnStyle">キャンセル</Button>
                                </nuxt-link>
                            </v-col>
                            <v-col cols="2" />
                            <v-col cols="5" justify="center">
                                <Button :color="confirmBtnColor" :buttonStyle="confirmBtnStyle" v-bind="attrs"
                                    @click="openDialog">確認画面を開く</Button>
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
                <Paragraph type="text" :caption="titleText" :text="title" />
                <Paragraph type="multiText" :caption="choiceText" :texts="choices" />
                <Paragraph type="text" :caption="categoryText" :text="categoryName" />
                <Paragraph :caption="tagText" text="ええええ" />
                <Paragraph :text="commentLabel" />
                <Paragraph :text="multiAnsLabel" />
                <v-container>
                    <v-row no-gutters>
                        <v-col cols="5" justify="center">
                            <Button :color="cancelBtnColor" :buttonStyle="cancelBtnStyle"
                                @click="dialog = false">キャンセル</Button>
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
import Paragraph from '@/components/molecules/Paragraph.vue'

export default defineComponent({
    components: {
        InputSet,
        Paragraph
    },
    setup() {
        const titleText = ref('アンケート内容')
        const titleLabel = ref('アンケート内容を入力してください。')
        const title = ref('')

        const choiceText = ref('選択肢内容')
        const choiceStyle = ref({ margin: 0 })
        const addChoiceText = ref('選択肢を追加する')
        const choices = ref(['', '', '', ''])

        const categoryText = ref('カテゴリ')
        const categoryItems = ref([
            { id: "c1", name: "社会" },
            { id: "c2", name: "政治経済" },
            { id: "c3", name: "地域" },
            { id: "c4", name: "文化" },
            { id: "c5", name: "会社・職業" },
            { id: "c6", name: "テクノロジー" },
            { id: "c7", name: "医療・ヘルスケア" },
            { id: "c8", name: "学問" },
            { id: "c9", name: "教育" },
            { id: "c10", name: "生活" },
            { id: "c11", name: "食文化" },
            { id: "c12", name: "スポーツ" },
            { id: "c13", name: "旅行" },
            { id: "c14", name: "趣味" },
            { id: "c15", name: "テレビ・映画・芸能" },
            { id: "c16", name: "本" },
            { id: "c17", name: "アニメ" },
            { id: "c18", name: "音楽" },
            { id: "c19", name: "ゲーム" },
            { id: "c20", name: "悩み" },
            { id: "c21", name: "雑談" }
        ])
        const categoryNames = categoryItems.value.map((item) => item.name)
        const categoryId = ref('')
        const categoryName = ref('')
        const setCategoryName = (value) => {
            categoryName.value = value;
        }

        const tagText = ref('タグ')
        const tagLabel = ref('追加したいタグを入力してください。')
        const tags = ref([])

        const commentLabel = ref('コメントを有効にする')
        const enableComment = ref(false)

        const multiAnsLabel = ref('複数の回答を有効にする')
        const enableMultiAns = ref(false)

        const cancelBtnColor = ref("#f5f5f5")
        const cancelBtnStyle = ref({ color: '#515254', fontSize: '1.2em', height: '100%', width: '100%', padding: '5%', display: 'block' });

        const confirmBtnColor = ref("#3A98B9")
        const confirmBtnStyle = ref({ color: 'white', fontSize: '1.2em', height: '100%', width: '100%', padding: '5%', display: 'block' });

        const dialog = ref(false)
        const openDialog = () => {
            dialog.value = true
        }

        return {
            titleText,
            titleLabel,
            title,
            choiceText,
            choiceStyle,
            choices,
            addChoiceText,
            categoryText,
            categoryNames,
            categoryId,
            categoryName,
            setCategoryName,
            tagText,
            tagLabel,
            tags,
            commentLabel,
            enableComment,
            multiAnsLabel,
            enableMultiAns,
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
