import { extendTheme } from '@chakra-ui/react';
import { propNames } from '@chakra-ui/styled-system';
import { mode, getColor } from '@chakra-ui/theme-tools';
import { generateFontFamily, generatePalette } from 'palette-by-numbers';

import type { Palette } from 'palette-by-numbers';
import type { ThemeConfig, DefaultTheme } from '~types';

const themeColorKeys = [
  'orange',
  'yellow',
  'purple',
  'green',
  'light',
  'gray',
  'teal',
  'blue',
  'cyan',
  'pink',
  'dark',
  'red',
];

export function googleFontUrl(fontFamily: string, weights: number[] = [300, 400, 700]): string {
  const urlWeights = weights.join(',');
  const fontName = fontFamily.split(/, /)[0].trim().replace(/'|"/g, '');
  const urlFont = fontName.split(/ /).join('+');
  return `https://fonts.googleapis.com/css?family=${urlFont}:${urlWeights}&display=swap`;
}

const globalStyles = (props: Dict) => {
  return {
    html: { scrollBehavior: 'smooth' },
    body: {
      margin: 0,
      backgroundColor: mode('white', 'dark.500')(props),
      color: mode('black', 'light.500')(props),
      fontFamily: 'body',
      '*::selection': mode(
        { backgroundColor: 'red.300', color: 'white' },
        { backgroundColor: 'yellow.100', color: 'black' },
      )(props),
    },
    ':root': Object.assign(
      {},
      ...themeColorKeys.map(c => ({
        [`--${c}`]: mode(
          getColor(props.theme, `${c}.500`),
          getColor(props.theme, `${c}.300`),
        )(props),
      })),
    ),
  };
};

export function makeTheme(userTheme: ThemeConfig): DefaultTheme {
  const { body, mono, heading } = userTheme.fonts;
  const { fontWeights } = userTheme;
  const fonts = {
    body: generateFontFamily('sans-serif', body),
    heading: generateFontFamily('sans-serif', heading),
    mono: generateFontFamily('monospace', mono),
  };

  const colors = {} as { [k: string]: Palette };

  for (const [k, v] of Object.entries(userTheme.colors)) {
    colors[k] = generatePalette(v);
  }

  return extendTheme({
    colors,
    fonts,
    fontWeights,
    styles: { global: globalStyles },
  });
}

export function validProps(props: Dict) {
  let checked = {} as Dict;
  const allPropNames = new Set([
    ...propNames,
    'focusBorderColor',
    'errorBorderColor',
    'isTruncated',
    'layerStyle',
    'textStyle',
    'noOfLines',
    'children',
    'apply',
    '__css',
    'css',
    'key',
    'as',
    'sx',
  ]);
  for (let [k, v] of Object.entries(props)) {
    if (typeof v === 'function') {
      checked[k] = v;
    } else if (allPropNames.has(k)) {
      checked[k] = v;
    }
  }
  return checked;
}
