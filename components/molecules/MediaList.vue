<template>
    <ul class="list">
        <li v-for="(item, index) in list" :key="index" class="list_item">
            <media :content="item" />
        </li>
    </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import Media, { Title } from '~/components/atoms/Media.vue'

type DataType = {
  list: Title[]
}
export default Vue.extend({
  components: {
    Media,
  },
  data(): DataType {
    return {
      list: ['テスト1', 'テスト2', 'テスト3'],
    }
  },
})
</script>

<style lang="scss" scoped>
.list {
  &_item {
    & + & {
      margin-top: 24px;
    }
  }
}
</style>