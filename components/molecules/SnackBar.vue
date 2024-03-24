<template>
    <v-snackbar v-model="computedSnackbarModel" multi-line location="top">
        {{ snackbarText }}
        <template v-slot:actions>
            <IconButton :icon="icons.mdiClose" variant="text" @click="closeSnackbar" />
        </template>
    </v-snackbar>
</template>

<script lang="ts">
import { mdiClose } from '@mdi/js';

import IconButton from '@/components/atoms/IconButton.vue'

export default {
    components: {
        IconButton,
    },
    props: {
        snackbar: {
            type: Boolean,
            required: true
        },
        snackbarText: {
            type: String,
            required: true
        },
    },
    setup(props, { emit }) {
        const icons = ref({
            mdiClose
        })

        // `computed`を`setup`内で使用するための修正
        const computedSnackbarModel = computed({
            get: () => props.snackbar,
            set: (value) => {
                emit('update:snackbar', value);
            }
        });

        // スナックバーを閉じる関数
        const closeSnackbar = () => {
            emit('update:snackbar', false);
        }

        return {
            icons,
            computedSnackbarModel,
            closeSnackbar
        }
    }
}
</script>
