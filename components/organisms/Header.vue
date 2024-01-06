<template>
    <v-app-bar v-if="!mobile" class="px-0 app-bar">
        <!-- 左端に配置されるボタン -->
        <v-btn icon @click="toggleMenu"
            style="text-decoration: none; color: inherit; position: fixed; left: 0; top: 0; margin: 10px;">
            <v-icon>{{ icons.mdiMenu }}</v-icon>
        </v-btn>
        <nuxt-link to="/" style="text-decoration: none; color: inherit; ">
            <img :src="titleImg" style="width: 10%;" @load="imageLoaded" @error="imageError" class="logo-img" />
        </nuxt-link>
    </v-app-bar>
    <v-app-bar v-else class="px-0 app-bar" style="display: flex;">
        <!-- 左端に配置されるボタン -->
        <v-btn icon @click="toggleMenu"
            style="text-decoration: none; color: inherit; position: fixed; left: 0; top: 0; margin: 10px;">
            <v-icon>{{ icons.mdiMenu }}</v-icon>
        </v-btn>
        <!-- 中央に配置されるコンテナ -->
        <nuxt-link to="/" style="text-decoration: none; color: inherit; display: flex; justify-content: center;">
            <img :src="titleImg" style="width: 35%;" @load="imageLoaded" @error="imageError" />
        </nuxt-link>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" temporary>
        <v-list>
            <template v-for="(item, index) in menus" :key="item.title">
                <!-- リストアイテム -->
                <nuxt-link :to="item.path" style="text-decoration: none; color: inherit;">
                    <v-list-item>
                        <v-icon left>{{ item.icon }}</v-icon>
                        {{ item.title }}
                    </v-list-item>
                </nuxt-link>

                <!-- 最後のアイテム以外の後に Divider を挿入 -->
                <v-divider v-if="index < menus.length - 1"></v-divider>
            </template>
        </v-list>
    </v-navigation-drawer>
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
    mdiMenu
} from '@mdi/js'
import { TITLE_IMG, MENUS } from '@/constants';

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

        const drawer = ref(false) // ドロワーの状態を管理するためのリアクティブプロパティ

        const toggleMenu = () => {
            drawer.value = !drawer.value // ドロワーの状態を切り替える
        }

        const menus = MENUS;

        return {
            mobile,
            titleImg,
            icons,
            drawer,
            menus,
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
    margin-left: 5%;
}
</style>
