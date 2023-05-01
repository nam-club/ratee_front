<template>
    <div>
        <Top />
    </div>
</template>

<script>
import { ref } from 'vue'
import Top from '@/components/templates/Top.vue'

export default {
    components: {
        Top
    },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=M+PLUS+1p&display=swap');

/* または、ローカルのフォントファイルを使用する場合 */
/*
@font-face {
  font-family: 'Roboto';
  src: url('~assets/fonts/Roboto-Regular.ttf') format('truetype');
}
*/

body {
  font-family: 'M PLUS 1p', sans-serif;
}
</style>