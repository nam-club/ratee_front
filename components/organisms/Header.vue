<template>
    <v-app-bar class="px-0 app-bar">
        <v-btn v-if="isMobile" icon @click="toggleMenu">
            <v-icon>{{ icons.mdiMenu }}</v-icon>
        </v-btn>
        <nuxt-link to="/" style="text-decoration: none; color: inherit;">
            <img :src="titleImg" @load="imageLoaded" @error="imageError" class="logo-img" />
        </nuxt-link>
        <v-spacer></v-spacer>

    </v-app-bar>
</template>

<style scoped>
.logo-img {
    width: 10%;
    /* ここで幅を設定 */
    height: auto;
    /* 高さは自動調整 */
}
</style>
  
<script>
import { defineComponent } from 'vue'
import {
    mdiMenu,
} from '@mdi/js'
import { TITLE_IMG } from '@/constants';

export default defineComponent({
    setup() {
        const titleImg = TITLE_IMG;

        const imageError = () => {
            console.error('画像の読み込みに失敗しました。');
        };

        // 画像が正常にロードされた場合の処理
        const imageLoaded = () => {
            imageLoaded.value = true;
            console.log('画像が正常にロードされました。');
        };

        const icons = ref({
            mdiMenu,
        })

        const isMobile = ref(false)

        const checkWidth = () => {
            isMobile.value = window.innerWidth < 960
        }

        onMounted(() => {
            window.addEventListener('resize', checkWidth)
            checkWidth()
        })

        onUnmounted(() => {
            window.removeEventListener('resize', checkWidth)
        })

        const toggleMenu = () => {
            // ここでハンバーガーメニューの開閉処理を行う
        }

        return {
            titleImg,
            icons,
            isMobile,
            toggleMenu,
            imageLoaded,
            imageError
        }
    }
})
</script>

<style scoped>
.app-bar {
    border-bottom: 1px solid #ccc;
}

.logo-img {
    margin-left: 2%;
}
</style>
