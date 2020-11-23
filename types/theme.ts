import type { Theme as DefaultTheme } from '@chakra-ui/theme';

type DefaultColorNames = keyof DefaultTheme['colors'] | 'dark' | 'light';

type ColorHue = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

export type ChangeableColors = Exclude<
  DefaultColorNames,
  'transparent' | 'blackAlpha' | 'whiteAlpha' | 'black' | 'white' | 'current'
>;

export type OriginalColors = {
  original: { [key in ChangeableColors]: string };
};

export type ThemeColors = OriginalColors &
  DefaultTheme['colors'] & {
    dark: ColorHue;
    light: ColorHue;
  };

export type ColorNames = keyof ThemeColors;

export type FontWeights = Exclude<
  DefaultTheme['fontWeights'],
  'black' | 'hairline' | 'thin' | 'extrabold'
>;

export type ThemeConfig = {
  colors: { [key in DefaultColorNames]: string };
  fonts: DefaultTheme['fonts'];
  fontWeights: FontWeights;
};

export interface ThemeFonts {
  body: string;
  heading: string;
  mono: string;
}

export type Theme = Exclude<DefaultTheme, 'fontWeights' | 'colors'> & {
  fontWeights: FontWeights;
  colors: ThemeColors;
};

export type { Theme as DefaultTheme } from '@chakra-ui/theme';

export type { Styles } from '@chakra-ui/theme-tools';
