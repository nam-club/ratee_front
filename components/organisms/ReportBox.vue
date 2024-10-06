<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ attrs }">
      <div v-if="!isReported">
        <v-container v-if="!mobile" class="d-flex justify-center">
          <Button @click="openDialog">
            {{ REPORT_BUTTON }}
          </Button>
        </v-container>
        <v-container v-else style="margin-top: 5%" class="d-flex justify-center">
          <Button @click="openDialog">
            {{ REPORT_BUTTON }}
          </Button>
        </v-container>
      </div>
    </template>
    <v-card>
      <v-card-text>
        <v-container fluid>
          <InputSet
            type="textArea"
            :labelText="reportLabel"
            :textAreaModel="content"
            @input="content = $event"
            :rules="reportRule"
          />
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="grey darken-1"
          text
          @click="dialog = false"
          style="margin: 0 2%"
        >
          {{ CANCEL_BUTTON }}
        </v-btn>
        <v-btn
          color="red lighten-1"
          text
          @click="dialog = false"
          :onClick="() => report(questionId, content)"
          :disabled="errFlg"
        >
          {{ REPORT_POST_BUTTON }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { useDisplay } from "vuetify";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

import Button from "@/components/atoms/Button.vue";
import Msg from "@/components/atoms/Msg.vue";
import InputSet from "@/components/molecules/InputSet.vue";
import {
  REPORT_BUTTON,
  REPORT_POST_BUTTON,
  REPORT_NULL_TEXT,
  REPORT_MAX_LENGTH,
  CANCEL_BUTTON,
} from "@/constants";

export default defineComponent({
  components: {
    InfiniteLoading,
    Button,
    Msg,
    InputSet,
  },
  props: {
    questionId: {
      type: String,
      required: true,
    },
    postReport: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const { mobile } = useDisplay();

    const errFlg = computed(() => {
      const length = content.value.length;
      return (
        !content.value ||
        length > REPORT_MAX_LENGTH
      );
    });

    const isReported = ref<boolean>(false);

    const content = ref<string>("");
    const reportRule = ref({
      required: (value: string) => !!value || REPORT_NULL_TEXT,
      textLength: (value: string) => {
        const length = value.length;
        return (
          ( length <= REPORT_MAX_LENGTH) ||
            REPORT_MAX_LENGTH +
            "文字以内で入力してください。"
        );
      },
    });

    // ダイアログの表示
    const dialog = ref(false);
    const openDialog = () => {
      dialog.value = true;
    };

    const toggle = ref(null);

    const reportLabel = ref(REPORT_NULL_TEXT);

    const report = async (
      questionId: string,
      reason: string
    ) => {
      try {
        await props.postReport(questionId, reason);
        isReported.value = true;
      } catch (error) {
        console.error("アンケート通報に失敗しました:", error);
      }
    };

    return {
      REPORT_BUTTON,
      REPORT_POST_BUTTON,
      CANCEL_BUTTON,
      mobile,
      dialog,
      openDialog,
      toggle,
      content,
      reportLabel,
      reportRule,
      report,
      errFlg,
      isReported
    };
  },
});
</script>