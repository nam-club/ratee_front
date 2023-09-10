<template>
    <div>
        <Msg fontWeight="normal" fontSize="1.5em">コメント</Msg>
        <v-card>
            <v-list lines="two" style="width: 100%;">
                <v-list-item v-for="(comment, index) in comments" :key="index" :title="comment.comment"
                    :subtitle="comment.createdAt + ' ID:' + comment.ipaddrHashed"
                    :prepend-avatar="'https://randomuser.me/api/portraits/lego/'+comment.iconId+'.jpg'">
                </v-list-item>
            </v-list>
        </v-card>
    </div>
</template>

<script lang="ts">
import Msg from '@/components/atoms/Msg.vue'

export default defineComponent({
    components: {
        Msg,
    },
    props: {
        comments: {
            type: Array as PropType<Comment[]>
        },
    },
    setup(props) {

        console.log(props.comments)
        return {

        }
    }
})
</script>