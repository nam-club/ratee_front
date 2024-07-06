<template>
  <div>
    <v-container v-if="!mobile">
      <Msg fontWeight="normal" fontSize="1.5em" style="margin: 2% 0">{{
        RECOMMEND_TITLE
      }}</Msg>
      <v-row>
        <v-col
          v-for="(recommend, index) in recommends"
          :key="index"
          cols="12"
          sm="4"
        >
          <nuxt-link
            :to="`${DETAIL_LINK}/${recommend.id}`"
            style="text-decoration: none; color: inherit"
          >
            <Button :buttonStyle="btnStyle" :variant="btnVariant">
              {{ truncate(recommend.content, 20) }}
            </Button>
          </nuxt-link>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else style="margin-top: 5%">
      <v-row>
        <v-col cols="12" class="text-center">
          <Msg fontWeight="normal" fontSize="1em">{{ RECOMMEND_TITLE }}</Msg>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="(recommend, index) in recommends"
          :key="index"
          cols="12"
          sm="4"
          class="text-center"
        >
          <nuxt-link
            :to="{path: `${DETAIL_LINK}/${recommend.id}`, query: currentQuery}"
            style="text-decoration: none; color: inherit"
          >
            <Button :buttonStyle="mobileBtnStyle" :variant="btnVariant">
              {{ truncate(recommend.content, 20) }}
            </Button>
          </nuxt-link>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { useDisplay } from "vuetify";
import Msg from "@/components/atoms/Msg.vue";
import { Questionnaire } from "~/composables/questionnaireStates";
import { DETAIL_LINK, RECOMMEND_TITLE } from "@/constants";

export default defineComponent({
  components: {
    Msg,
  },
  props: {
    recommends: {
      type: Array as PropType<Questionnaire[]>,
    },
  },
  setup(props) {
    const { mobile } = useDisplay();
    const route = useRoute();
    // 現在のクエリパラメータを取得
    const currentQuery = route.query;

    const btnVariant = ref("elevated");
    const btnStyle = ref({ width: "100%" });
    const mobileBtnStyle = ref({ width: "22em" });

    const truncate = (text: string, maxLength: number) => {
      if (text.length > maxLength) {
        return text.slice(0, maxLength) + "...";
      }
      return text;
    };

    return {
      mobile,
      DETAIL_LINK,
      currentQuery,
      RECOMMEND_TITLE,
      btnVariant,
      btnStyle,
      truncate,
      mobileBtnStyle,
    };
  },
});
</script>