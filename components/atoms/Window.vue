<template>
    <v-window v-model="tab">
        <v-window-item v-for="n in 3" :key="n" :value="n">
            <v-container fluid>
                <v-row>
                    <v-col v-for="i in 6" :key="i" cols="12" md="4">
                        <v-img :src="`https://picsum.photos/500/300?image=${i * n * 5 + 10}`"
                            :lazy-src="`https://picsum.photos/10/6?image=${i * n * 5 + 10}`" aspect-ratio="1"></v-img>
                    </v-col>
                </v-row>
            </v-container>
        </v-window-item>
    </v-window>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        tab: {
            type: String,
            required: true,
        },
    },
})
</script>