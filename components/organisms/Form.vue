<template>
    <form @submit.prevent="submit" style="margin:5% 20%">
        <InputSet type="textField" :listNum="1" :caption="titleText" :labelText="titleLabel" />
        <InputSet type="textField" :listNum="choiceListNum" :caption="choiceText" :addText="addChoiceText" />

        <InputSet type="selectBox" :listNum="1" :caption="categoryText" :selectItems="categoryItems" />
        
        <InputSet type="chipBox" :listNum="1" :caption="tagText" :labelText="tagLabel" />

        <v-checkbox label="Option" type="checkbox"></v-checkbox>

        <v-btn class="me-4" type="submit">
            submit
        </v-btn>

        <v-btn>
            clear
        </v-btn>
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
            tagLabel
        }
    }
})
</script>
