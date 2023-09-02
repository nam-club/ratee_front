<template>
    <v-app>
        <Header :logo="logo" :title="headerTitle" />
        <DetailView style="margin:5%" :questionnaire="questionnaire" />
    </v-app>
</template>

<script lang="ts">
import Header from '@/components/organisms/Header.vue'
import DetailView from '@/components/organisms/DetailView.vue'

export default defineComponent({
    components: {
        Header,
        DetailView
    },
    props: {
        questionnaire: {
            type: Object,
            required: true,
        },
    },
    setup() {
        const logo = '/logo.png' // 画像のパスを指定してください
        const headerTitle = ref('ratee')

        return {
            logo,
            headerTitle
        }
    }
})
</script>