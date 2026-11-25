/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://unistyl.es/), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    background: '#F7F2E8',
    surface: '#FFFDF8',
    primary: '#4B2E20',
    secondary: '#7A4E36',
    accent: '#C6A582',
    border: '#E8DCC8',
    text: '#4B2E20',
    textSecondary: '#8A7665',
    textOnPrimary: '#FFFDF8',
    tabActiveBackground: '#4B2E20',
    tabActiveIcon: '#C6A582',
    tabActiveLabel: '#FFFDF8',
    tabInactive: '#8A7665',
    backgroundElement: '#FFFDF8',
    backgroundSelected: '#E8DCC8',
  },
  dark: {
    background: '#1F1712',
    surface: '#2B211B',
    primary: '#C6A582',
    secondary: '#D2B899',
    accent: '#B89068',
    border: '#49382D',
    text: '#F7F2E8',
    textSecondary: '#B9A694',
    textOnPrimary: '#1F1712',
    tabActiveBackground: '#38271F',
    tabActiveIcon: '#C6A582',
    tabActiveLabel: '#F7F2E8',
    tabInactive: '#B8A393',
    backgroundElement: '#2B211B',
    backgroundSelected: '#49382D',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
