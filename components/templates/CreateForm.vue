<template>
    <v-app>
        <Header :logo="logo" :title="headerTitle" />
        <Form />
    </v-app>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Header from '@/components/organisms/Header.vue'
import Form from '@/components/organisms/Form.vue'

export default defineComponent({
    components: {
        Header,
        Form
    },
    setup() {
        const logo = '/logo.png' // 画像のパスを指定してください
        const headerTitle = ref('ratee')
        const contentsBg = ref('#E8D5C4')

        return {
            logo,
            headerTitle,
            contentsBg
        }
    }
})
</script>