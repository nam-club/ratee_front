import { ThemeDefinition } from 'vuetify'

// テーマ名
export const MAIN_THEME = 'mainTheme'
// Light mode theme
export const mainTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#3A98B9',
    secondary: '#545454',
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
    background: '#1f2937',
    surface: '#1f2937',
    primary: '#E8D5C4',
    secondary: '#546E7A',
    error: '#ef4444',
    info: '#3b82f6',
    success: '#22c55e',
    warning: '#f59e0b',
  },
}