<template>
  <v-app class="bg-background" :class="{ 'app-header': isApp }">
    <div v-if="categories.length">
      <Header />
    </div>
    <Form
      :categories="categories"
      :createQuestionnaire="createQuestionnaire"
      style="margin: 0 0 10% 0"
    />
  </v-app>
</template>

<style scoped>
.app-header {
  margin-top: 10%; /* Adjust the margin as needed */
}
</style>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Header from "@/components/organisms/Header.vue";
import Form from "@/components/organisms/Form.vue";
import { Category } from "@/types";

export default defineComponent({
  components: {
    Header,
    Form,
  },
  props: {
    categories: {
      type: Array as PropType<Category[]>,
      required: true,
    },
    createQuestionnaire: {
      type: Function,
      required: true,
    },
    isApp: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const contentsBg = ref("#E8D5C4");

    return {
      contentsBg,
    };
  },
});
</script>