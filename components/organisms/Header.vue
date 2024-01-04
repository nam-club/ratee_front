<template>
    <v-app-bar v-if="!mobile" class="px-0 app-bar">
        <nuxt-link to="/" style="text-decoration: none; color: inherit;">
            <img :src="titleImg" style="width: 10%;" @load="imageLoaded" @error="imageError" class="logo-img" />
        </nuxt-link>
        <v-spacer></v-spacer>
    </v-app-bar>
    <v-app-bar v-else class="px-0 app-bar" style="display: flex;">
        <!-- 左端に配置されるボタン -->
        <v-btn icon @click="toggleMenu"
            style="text-decoration: none; color: inherit; position: fixed; left: 0; top: 0; margin: 10px;">
            <v-icon>{{ icons.mdiMenu }}</v-icon>
        </v-btn>
        <!-- 中央に配置されるコンテナ -->
        <nuxt-link to="/" style="text-decoration: none; color: inherit; display: flex; justify-content: center;">
            <img :src="titleImg" style="width: 35%;" @load="imageLoaded" @error="imageError" class="logo-img" />
        </nuxt-link>
    </v-app-bar>
</template>

<style scoped>
.logo-img {
    height: auto;
    /* 高さは自動調整 */
}
</style>
  
<script>
import { defineComponent } from 'vue'
import { useDisplay } from 'vuetify'
import {
    mdiMenu,
} from '@mdi/js'
import { TITLE_IMG } from '@/constants';

export default defineComponent({
    setup() {
        const { mobile } = useDisplay()

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

        const toggleMenu = () => {
            // ここでハンバーガーメニューの開閉処理を行う
        }

        return {
            mobile,
            titleImg,
            icons,
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
