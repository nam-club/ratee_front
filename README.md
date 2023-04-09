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

## StoryBookのインストール方法 & 起動
```bash
npx sb init --type vue3 --builder @storybook/builder-vite
```
以下を実行してStoryBookを起動
```bash
npm run storybook
```
※Nodeのバージョンが高すぎて起動できないと言われた場合、以下を実行
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
. ~/.bashrc
nvm use 16.19.0
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

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

## Composition APIをインストール
```bash
npm install @nuxtjs/composition-api --save
```
@nuxt/typesをインストール
```bash
npm install --save-dev @nuxt/types
```
tsconfig.jsonを開き、compilerOptionsに以下の設定を追加
```
  "compilerOptions": {
    "types": [
      "@nuxt/types"
    ]
  }
```
vue-class-component をインストール
```bash
npm install --save-dev vue-class-component
```
plugins/composition-api.tsファイルを作成し、以下のように設定
```
import Vue from 'vue';
import { reactive, computed, watchEffect } from '@nuxtjs/composition-api';
import { VueClass } from 'vue-class-component/lib/declarations';

declare module 'vue/types/vue' {
  interface Vue {
    $reactive: typeof reactive;
    $computed: typeof computed;
    $watchEffect: typeof watchEffect;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $reactive: typeof reactive;
    $computed: typeof computed;
    $watchEffect: typeof watchEffect;
  }
}

const plugin = (Vue: VueClass<Vue>) => {
  Vue.prototype.$reactive = reactive;
  Vue.prototype.$computed = computed;
  Vue.prototype.$watchEffect = watchEffect;
};

export default plugin;
```
nuxt.config.tsファイルで、.ts拡張子のファイルを読み込むように設定を追加
```
export default {
  // ...
  buildModules: [
    '@nuxtjs/composition-api/module'
  ]
  // ...
}
```


## ここから下は無視して良い

## TailwindCSSのインストール
```bash
npm install -D @nuxtjs/tailwindcss 
```
nuxt.config.jsのbuildModulesに追記
```
export default {
  buildModules: ['@nuxtjs/tailwindcss']
}
```
ルートディレクトリで、tailwind.config.jsファイルを作る
```bash
npx tailwindcss init
```
tailwind.config.jsの設定（保存時に自動リロード）
```
module.exports = {
  mode: "jit",
};
```
ルートディレクトリにtailwindのファイルを作成
```bash
mkdir assets
mkdir assets/css
touch assets/css/tailwind.css
```
tailwind.cssに以下を入力
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```
tailwind.config.jsのcontentに設定を追加
```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app.{vue,js,ts,jsx,tsx}",
    "./components/**/*.{vue,js,ts,jsx,tsx}",
    "./layouts/**/*.{vue,js,ts,jsx,tsx}",
    "./pages/**/*.{vue,js,ts,jsx,tsx}",
    "./plugins/**/*.{js,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## StoryBookにTailwindを反映
依存関係をインストール
```bash
npm install -D @storybook/addon-styling postcss autoprefixer postcss-loader
```
ts-nodeをインストール
```bash
npm install --save-dev ts-node
```
.gitignoreに下記を追記して追跡対象から除外
```
.nuxt-storybook
storybook-static
```
postcss.config.jsプロジェクトのルートにファイルを作成
```
// postcss.config.js

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```
.storybook/main.jsに設定を追加
```
module.exports = {
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-styling',
      options: {
        // Check out https://github.com/storybookjs/addon-styling/blob/main/docs/api.md
        // For more details on this addon's options.
        postCss: true,
      },
    },
  ],
  // snipped for brevity
};
```
.storybook/preview.jsにimport文を追加
```
import '../src/tailwind.css';
```
