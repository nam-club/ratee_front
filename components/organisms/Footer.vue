<template>
    <v-footer class="footer" style="height: 12%; width: 100%;">
        <v-row class="fill-height" align="center" justify="center">
            <v-col cols="auto" style="width: 20%;">
                <Button :color="btnColor" :variant="btnVariant" :buttonStyle="btnStyle">
                    {{ buttonText }}
                </Button>
            </v-col>
        </v-row>
    </v-footer>
</template>

<script>
import { defineComponent } from 'vue'
import Button from '@/components/atoms/Button.vue'

export default defineComponent({
    components: {
        Button
    },
    props: {
        // ボタンのテキストを定義
        buttonText: {
            type: String,
        },
    },
    setup() {
        const btnColor = ref("#3A98B9");
        const btnVariant = ref("elevated");
        const btnStyle = ref({color: 'white', fontSize:'1.5em', height: '100%', width: '100%', padding: '6%', display: 'block'});

        return {
            btnColor,
            btnStyle,
            btnVariant,
        }
    }
})
</script>

<style scoped>
.footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* 透過した黒色 */
    z-index: 100;
}
</style>