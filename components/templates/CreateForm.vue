<template>
    <v-app>
        <div v-if="categories.length">
            <Header :logo="logo" :title="headerTitle" />
        </div>
        <Form :categories="categories" />
    </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Header from '@/components/organisms/Header.vue'
import Form from '@/components/organisms/Form.vue'
import { Category } from '@/types';

export default defineComponent({
    components: {
        Header,
        Form
    },
    props: {
        categories: {
            type: Array as () => Category[],
            required: true,
        }
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