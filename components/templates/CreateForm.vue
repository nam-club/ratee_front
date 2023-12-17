<template>
    <v-app class="bg-secondary">
        <div v-if="categories.length">
            <Header />
        </div>
        <Form :categories="categories" :createQuestionnaire="createQuestionnaire"/>
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
            type: Array as PropType<Category[]>,
            required: true,
        },
        createQuestionnaire: {
            type: Function,
            required: true
        },
    },
    setup() {
        const contentsBg = ref('#E8D5C4')

        return {
            contentsBg,
        }
    }
})
</script>