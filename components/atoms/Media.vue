<template>
    <h2>{{ value }}</h2>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export type Title = String
export default Vue.extend({
  props: {
    content: {
      type: String as PropType<Title>,
      default: '',
      required: true,
    },
  },
  computed: {
    value(): String {
      return this.content !== '' ? this.content : 'タイトル'
    },
  },
})
</script>