<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ attrs }">
      <div>
        <v-container v-if="!mobile">
          <v-row v-if="comments && comments.length !== 0">
            <v-col cols="6">
              <Msg fontWeight="normal" fontSize="1.5em">{{
                COMMENT_TITLE
              }}</Msg>
            </v-col>
            <v-col cols="6" class="text-end">
              <Button :variant="btnVariant" @click="openDialog">
                {{ COMMENT_BUTTON }}
              </Button>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="12">
              <Button :variant="btnVariant" @click="openDialog">
                {{ COMMENT_BUTTON }}
              </Button>
            </v-col>
          </v-row>
          <v-card
            v-if="comments && comments.length !== 0"
            style="margin: 2% 0 10% 0"
          >
            <v-list
              v-for="(comment, index) in comments"
              :key="index"
              lines="two"
              style="width: 100%"
            >
              <v-list-item
                :subtitle="comment.createdAt + ' ID:' + comment.hashedUserId"
                :prepend-avatar="iconImg[comment.iconId]"
              >
                <div style="margin: 0.5% 0">
                  <span>{{ comment.comment }}</span>
                </div>
              </v-list-item>
              <v-divider v-if="index !== comments.length - 1"></v-divider>
            </v-list>
          </v-card>
          <InfiniteLoading
            v-if="!isInfiniteDisabled"
            @infinite="load"
            :immediate-check="false"
            :reverse="false"
          >
            <template #spinner>
              <div class="text-center" style="padding: 10%">
                <v-progress-circular
                  indeterminate
                  color="primary"
                  :size="100"
                  :width="10"
                ></v-progress-circular>
              </div>
            </template>
            <template #complete>
              <span></span>
            </template>
            <template #error>
              <span></span>
            </template>
          </InfiniteLoading>
        </v-container>

        <v-container v-else style="margin-top: 5%">
          <v-row v-if="comments && comments.length !== 0">
            <v-col cols="4" />
            <v-col cols="4" class="text-center">
              <Msg fontWeight="normal" fontSize="1.2em">{{
                COMMENT_TITLE
              }}</Msg>
            </v-col>
            <v-col cols="4" class="text-end">
              <IconButton
                :icon="icons.mdiCommentPlus"
                :size="large"
                :variant="btnVariant"
                @click="openDialog"
              />
            </v-col>
          </v-row>
          <v-row v-else>
            <v-row justify="center">
              <v-col cols="auto">
                <IconButton
                  :icon="icons.mdiCommentPlus"
                  :size="large"
                  :variant="btnVariant"
                  @click="openDialog"
                />
              </v-col>
            </v-row>
          </v-row>
          <v-card
            v-if="comments && comments.length !== 0"
            style="margin: 2% 0 10% 0"
          >
            <v-list
              v-for="(comment, index) in comments"
              :key="index"
              lines="two"
              style="width: 100%"
            >
              <v-list-item
                :subtitle="comment.createdAt + ' ID:' + comment.hashedUserId"
                :prepend-avatar="iconImg[comment.iconId]"
              >
                <div style="margin: 2% 0">
                  <span>{{ comment.comment }}</span>
                </div>
              </v-list-item>
              <v-divider v-if="index !== comments.length - 1"></v-divider>
            </v-list>
          </v-card>
          <InfiniteLoading
            v-if="!isInfiniteDisabled"
            @infinite="load"
            :immediate-check="false"
            :reverse="false"
          >
            <template #spinner>
              <div class="text-center" style="padding: 10%">
                <v-progress-circular
                  indeterminate
                  color="primary"
                  :size="100"
                  :width="10"
                ></v-progress-circular>
              </div>
            </template>
            <template #complete>
              <span></span>
            </template>
            <template #error>
              <span></span>
            </template>
          </InfiniteLoading>
        </v-container>
        <v-container> </v-container>
      </div>
    </template>
    <v-card>
      <v-card-text>
        <v-btn-toggle v-if="!mobile" v-model="toggle" color="primary">
          <Button v-for="n in 10" :key="n" @click="setIcon(n)">
            <v-avatar>
              <v-img :src="iconImg[n]" />
            </v-avatar>
          </Button>
        </v-btn-toggle>
        <v-tabs v-else v-model="tab" align-tabs="center">
          <v-tab :value="n" v-for="n in 10" :key="n" @click="setIcon(n)">
            <v-avatar>
              <v-img :src="iconImg[n]" />
            </v-avatar>
          </v-tab>
        </v-tabs>
        <v-container fluid>
          <InputSet
            type="textArea"
            :labelText="commentLabel"
            :textAreaModel="content"
            @input="content = $event"
            :rules="commentRule"
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
          color="blue darken-1"
          text
          @click="dialog = false"
          :onClick="() => comment(questionId, iconNum, content)"
          :disabled="errFlg || isLoading"
        >
          {{ COMMENT_BUTTON }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { useDisplay } from "vuetify";
import { mdiCommentPlus } from "@mdi/js";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

import Button from "@/components/atoms/Button.vue";
import IconButton from "@/components/atoms/IconButton.vue";
import Msg from "@/components/atoms/Msg.vue";
import InputSet from "@/components/molecules/InputSet.vue";
import {
  COMMENT_MIN_LENGTH,
  COMMENT_MAX_LENGTH,
  COMMENT_NULL_TEXT,
  COMMENT_BUTTON,
  COMMENT_TITLE,
  LOADING_END,
  CANCEL_BUTTON,
  ICON_IMG,
} from "@/constants";

export default defineComponent({
  components: {
    InfiniteLoading,
    Button,
    IconButton,
    Msg,
    InputSet,
  },
  props: {
    questionId: {
      type: String,
      required: true,
    },
    comments: {
      type: Array as PropType<Comment[]>,
    },
    postComment: {
      type: Function,
      required: true,
    },
    load: {
      type: Function,
      required: true,
    },
    isInfiniteDisabled: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const isLoading = ref(false);
    const { mobile } = useDisplay();

    const iconImg = ICON_IMG;

    const icons = ref({
      mdiCommentPlus,
    });
    const btnVariant = ref("elevated");

    const errFlg = computed(() => {
      const length = content.value.length;
      return (
        !content.value ||
        length < COMMENT_MIN_LENGTH ||
        length > COMMENT_MAX_LENGTH
      );
    });

    const content = ref<string>("");
    const commentRule = ref({
      required: (value: string) => !!value || COMMENT_NULL_TEXT,
      textLength: (value: string) => {
        const length = value.length;
        return (
          (length >= COMMENT_MIN_LENGTH && length <= COMMENT_MAX_LENGTH) ||
          COMMENT_MIN_LENGTH +
            "~" +
            COMMENT_MAX_LENGTH +
            "文字以内で入力してください。"
        );
      },
    });

    const confirmBtnColor = ref("#3A98B9");
    const confirmBtnTextColor = ref("white");

    // ダイアログの表示
    const dialog = ref(false);
    const openDialog = () => {
      dialog.value = true;
    };

    const toggle = ref(null);

    const tab = ref(0);
    const iconNum = ref(0);
    const setIcon = (num: number) => {
      iconNum.value = num;
      tab.value = num;
    };

    const commentLabel = ref(COMMENT_NULL_TEXT);

    const comment = async (
      questionId: string,
      iconNum: number,
      content: string
    ) => {
      if (isLoading.value) {
        return;
      }
      try {
        if(iconNum === 0) {
          iconNum = 1;
        }
        isLoading.value = true; // ローディング開始
        await props.postComment(questionId, iconNum, content);
      } catch (error) {
        console.error("コメント投稿エラーが発生しました:", error);
      } finally {
        isLoading.value = false; // ローディング終了
      }
    };

    return {
      iconImg,
      isLoading,
      COMMENT_BUTTON,
      COMMENT_TITLE,
      LOADING_END,
      CANCEL_BUTTON,
      mobile,
      icons,
      btnVariant,
      confirmBtnColor,
      confirmBtnTextColor,
      dialog,
      openDialog,
      toggle,
      tab,
      iconNum,
      setIcon,
      content,
      commentLabel,
      commentRule,
      comment,
      errFlg,
    };
  },
});
</script>