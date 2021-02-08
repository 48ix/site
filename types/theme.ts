import type { ChakraTheme, ColorHues } from '@chakra-ui/react';

type DefaultColorNames = keyof ChakraTheme['colors'] | 'dark' | 'light';

export type ChangeableColors = Exclude<
  DefaultColorNames,
  'transparent' | 'blackAlpha' | 'whiteAlpha' | 'black' | 'white' | 'current'
>;

export type ThemeColors = ChakraTheme['colors'] & {
  dark: ColorHues;
  light: ColorHues;
};

export type ColorNames = keyof ThemeColors;

export type FontWeights = Exclude<
  ChakraTheme['fontWeights'],
  'black' | 'hairline' | 'thin' | 'extrabold'
>;

type FontConfig = {
  body: string;
  heading: string;
  mono: string;
};

export type ThemeConfig = {
  colors: { [key in DefaultColorNames]: string };
  fonts: FontConfig;
  fontWeights: FontWeights;
};

export interface ThemeFonts {
  body: string;
  heading: string;
  mono: string;
}

export type Theme = Exclude<ChakraTheme, 'fontWeights' | 'colors'> & {
  fontWeights: FontWeights;
  colors: ThemeColors;
};

export type { ChakraTheme as DefaultTheme } from '@chakra-ui/theme';

export type { Styles } from '@chakra-ui/theme-tools';
