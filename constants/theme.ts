/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#2D8659';
const tintColorDark = '#4CAF50';

export const Colors = {
  light: {
    text: '#2C1810',
    background: '#F5F1E8',
    tint: tintColorLight,
    icon: '#8B7355',
    tabIconDefault: '#8B7355',
    tabIconSelected: tintColorLight,
    card: '#FFFFFF',
    border: '#E0D5C7',
    primary: '#2D8659',
    secondary: '#D4AF37',
  },
  dark: {
    text: '#F5F1E8',
    background: '#1A1410',
    tint: tintColorDark,
    icon: '#A89B8C',
    tabIconDefault: '#A89B8C',
    tabIconSelected: tintColorDark,
    card: '#2C241C',
    border: '#3D362E',
    primary: '#4CAF50',
    secondary: '#FFD700',
  },
};

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
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
