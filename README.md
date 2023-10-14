# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Nuxt3のインストール & プロジェクトの作成
```bash
npx nuxi init ratee_front
```
※コマンドを実行できない場合はNode.jsをインストールしてください。

JSのライブラリをインストールしてください。
```bash
cd ratee_front
npm install
```

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## ローカルで起動する方法
```bash
npm run dev
```
コマンド実行後にブラウザで http://localhost:3000 にアクセスしてください。

※自動でブラウザを起動し、初期画面を開きたい場合
```bash
npm run dev -- -o
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## 基本構成
ルートディレクトリ直下に/pagesディレクトリを作成します。
/pages配下にindex.vueを作成します。
ルート直下のApp.vueを削除します。すると、起動時にindex.vueが自動で表示されるようになります。

## Atomicデザインの採用
ルートディレクトリ直下に/componentsディレクトリを作成します。
/components配下に「/atoms」「/molecules」「/organisms」「/templates」を作成します。
nuxt.config.tsの「defineNuxtConfig」関数内に以下を追記します。
```
components: [
        '~/components/atoms',
        '~/components/molecules',
        '~/components/organisms',
        '~/components/templates',
    ]
```
これでディレクトリ配下に作成したコンポーネントファイルが自動でインポートされるようになります。

## Vuetify3のインストール
```bash
npm install -D vuetify@next sass vite-plugin-vuetify
```
Nuxt のプラグインで Vuetify を読み込む
plugins/vuetify.tsを作成し、以下のコードを記述
```
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    // 他の設定をここに記述していく
  })

  // Vue.js で Vuetify を使用する
  nuxtApp.vueApp.use(vuetify)
})
```

assets/main.scssを作成し、以下を記述
```
@use "vuetify/styles";
```

nuxt.config.tsに以下を記述
```
import { defineNuxtConfig } from 'nuxt/config'
import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  build: {
    transpile: ['vuetify'],
  },
  hooks: {
    'vite:extendConfig': (config) => {
      config.plugins!.push(vuetify())
    },
  },
  vite: {
    ssr: {
      noExternal: ['vuetify'],
    },
    define: {
      'process.env.DEBUG': false,
    },
  },
  css: ['@/assets/main.scss'],
  components: [
        '~/components/templates',
        '~/components/atoms',
        '~/components/molecules',
        '~/components/organisms',
    ]
})
```

## Vuetify の設定をカスタマイズしやすいようにする
helpers/defaults.tsを作成し、以下を記述
```
import { DefaultsInstance } from 'vuetify/lib/framework.mjs'

export const defaults: DefaultsInstance = {
  VAppBar: {
    elevation: 0,
  },
  VBtn: {
    variant: 'flat',
    height: 38,
    rounded: 'lg',
    size: 'small',
  },
  VTextField: {
    color: 'primary',
    variant: 'outlined',
    density: 'comfortable',
  },
}
```

helpers/themes.tsを作成し、以下を記述
```
import { ThemeDefinition } from 'vuetify'

// テーマ名
export const MAIN_THEME = 'mainTheme'
// Light mode theme
export const mainTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#4f46e5',
    secondary: '#9333ea',
    error: '#ef4444',
    info: '#3b82f6',
    success: '#22c55e',
    warning: '#f59e0b',
  },
}

// Dark モードのテーマ名
export const MAIN_DARK_THEME = 'mainDarkTheme'
// Dark mode theme
export const mainDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#0C111B',
    surface: '#1f2937',
    primary: '#6366f1',
    secondary: '#9333ea',
    error: '#ef4444',
    info: '#3b82f6',
    success: '#22c55e',
    warning: '#f59e0b',
  },
}
```

mdiのフォントをインストール
```
npm install @mdi/font
```

plugins/vuetify.tsにプラグインを読み込み
```
import { createVuetify } from 'vuetify'
import { MAIN_THEME, mainTheme, MAIN_DARK_THEME, mainDarkTheme } from '@/helpers/themes'
import { defaults } from '@/helpers/defaults'
import '@mdi/font/css/materialdesignicons.css' // 使用するアイコンを読み込む `mdi-xxx`

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    defaults,
    display: {
      mobileBreakpoint: 'sm',
    },
    // add theme
    theme: {
      defaultTheme: MAIN_THEME,
      themes: {
        mainTheme,
        mainDarkTheme,
      },
      // primary-darken-9 primary-lighten-9 までできるようにする
      variations: {
        colors: ['primary', 'secondary', 'accent'],
        lighten: 9,
        darken: 9,
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
```

## 必要なアイコンのみを読み込む
```bash
npm install -D @mdi/js
```
plugins/vuetify.tsを以下に変更
```
import { createVuetify } from 'vuetify'
+ import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { MAIN_THEME, mainTheme, MAIN_DARK_THEME, mainDarkTheme } from '@/helpers/themes'
import { defaults } from '@/helpers/defaults'
- import '@mdi/font/css/materialdesignicons.css' // 使用するアイコンを読み込む `mdi-xxx`

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    defaults,
    display: {
      mobileBreakpoint: 'sm',
    },
+   // add icons
+   icons: {
+     defaultSet: 'mdi',
+     aliases,
+     sets: {
+       mdi,
+     },
+   },
    // add theme
    theme: {
      defaultTheme: MAIN_THEME,
      themes: {
        mainTheme,
        mainDarkTheme,
      },
      // primary-darken-9 primary-lighten-9 までできるようにする
      variations: {
        colors: ['primary', 'secondary', 'accent'],
        lighten: 9,
        darken: 9,
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
```

## Chart.jsのインストール
```bash
npm install vue-chartjs chart.js --save
```

## 無限スクロールのインストール
```bash
npm install v3-infinite-loading
```