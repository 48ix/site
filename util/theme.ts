import {
  parseToHsla,
  transparentize,
  readableColorIsBlack,
  hsla,
  saturate,
  desaturate,
} from 'color2k';
import { extendTheme } from '@chakra-ui/react';
import { propNames } from '@chakra-ui/styled-system';
import { mode, getColor } from '@chakra-ui/theme-tools';

import type { Theme, ThemeConfig, ChangeableColors } from '~types';

const defaultBodyFonts = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Helvetica',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
];

const defaultHeadingFonts = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Helvetica',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
];

const defaultMonoFonts = [
  'SFMono-Regular',
  'Melno',
  'Monaco',
  'Consolas',
  '"Liberation Mono"',
  '"Courier New"',
  'monospace',
];

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

export const isLight = (color: string) => readableColorIsBlack(color);
export const isDark = (color: string) => !readableColorIsBlack(color);

function formatFont(font: string): string {
  const fontList = font.split(' ');
  const fontFmt = fontList.length >= 2 ? `'${fontList.join(' ')}'` : fontList.join(' ');
  return fontFmt;
}

export function googleFontUrl(fontFamily: keyof Theme['fonts'], fontWeights: number[]) {
  const urlWeights = fontWeights.join(',');
  const fontName = fontFamily.split(/, /)[0].trim().replace(/'|"/g, '');
  const urlFont = fontName.split(/ /).join('+');
  const urlBase = `https://fonts.googleapis.com/css?family=${urlFont}:${urlWeights}&display=swap`;
  return urlBase;
}

function alphaColors(color: string) {
  return {
    50: transparentize(color, Number((1 - 0.04).toFixed(2))),
    100: transparentize(color, Number((1 - 0.08).toFixed(2))),
    200: transparentize(color, Number((1 - 0.12).toFixed(2))),
    300: transparentize(color, Number((1 - 0.16).toFixed(2))),
    400: transparentize(color, Number((1 - 0.24).toFixed(2))),
    500: transparentize(color, Number((1 - 0.38).toFixed(2))),
    600: transparentize(color, Number((1 - 0.48).toFixed(2))),
    700: transparentize(color, Number((1 - 0.6).toFixed(2))),
    800: transparentize(color, Number((1 - 0.8).toFixed(2))),
    900: transparentize(color, Number((1 - 0.92).toFixed(2))),
  };
}

function generateColors(colorInput: string) {
  const colorMap = Object();

  const lightnessMap = [0.95, 0.85, 0.75, 0.65, 0.55, 0.45, 0.35, 0.25, 0.15, 0.05];
  const saturationMap = [0.32, 0.16, 0.08, 0.04, 0, 0, 0.04, 0.08, 0.16, 0.32];

  const colorHsla = parseToHsla(colorInput);
  const lightnessGoal = colorHsla[2];

  const closestLightness = lightnessMap.reduce((prev, curr) =>
    Math.abs(curr - lightnessGoal) < Math.abs(prev - lightnessGoal) ? curr : prev,
  );

  const baseColorIndex = lightnessMap.findIndex(l => l === closestLightness);

  const colors = lightnessMap
    .map(l => {
      const [h, s, _, a] = colorHsla;
      return hsla(h, s, l, a);
    })
    .map((color, i) => {
      const saturationDelta = saturationMap[i] - saturationMap[baseColorIndex];
      return saturationDelta >= 0
        ? saturate(color, saturationDelta)
        : desaturate(color, saturationDelta * -1);
    });

  const getColorNumber = (index: number) => (index === 0 ? 50 : index * 100);

  colors.map((color, i) => {
    const colorIndex = getColorNumber(i);
    colorMap[colorIndex] = color;
  });
  return colorMap;
}

function generatePalette(palette: { [k: string]: string }): Theme['colors'] {
  const generated = Object();

  for (const color of Object.keys(palette)) {
    if (!['black', 'white'].includes(color)) {
      generated[color] = generateColors(palette[color]);
    } else {
      generated[color] = palette[color];
      generated[`${color}Alpha`] = alphaColors(palette[color]);
    }
  }

  return generated;
}

const globalStyles = (props: Dict) => {
  return {
    html: { scrollBehavior: 'smooth' },
    body: {
      margin: 0,
      backgroundColor: mode('white', 'original.dark')(props),
      color: mode('black', 'original.light')(props),
      fontFamily: 'body',
      '*::selection': mode(
        { backgroundColor: 'red.300', color: 'white' },
        { backgroundColor: 'yellow.100', color: 'black' },
      )(props),
    },
    // See https://github.com/rcbyr/keen-slider/blob/master/src/keen-slider.scss
    ':root': Object.assign(
      {},
      ...themeColorKeys.map(c => ({
        [`--${c}`]: mode(
          getColor(props.theme, `original.${c}`),
          getColor(props.theme, `${c}.300`),
        )(props),
      })),
    ),
  };
};

function importFonts(
  userFonts: Omit<ThemeConfig, 'colors'>,
): [Theme['fonts'], Theme['fontWeights']] {
  const [body, mono, heading] = [defaultBodyFonts, defaultMonoFonts, defaultHeadingFonts];
  const { body: userBody, mono: userMono, heading: userHeading } = userFonts.fonts;
  const bodyFmt = formatFont(userBody);
  const monoFmt = formatFont(userMono);
  const headingFmt = formatFont(userHeading);
  if (userBody && !body.includes(bodyFmt)) {
    body.unshift(bodyFmt);
  }
  if (userMono && !mono.includes(monoFmt)) {
    mono.unshift(monoFmt);
  }
  if (userHeading && !mono.includes(monoFmt)) {
    heading.unshift(headingFmt);
  }
  return [
    {
      body: body.join(', '),
      heading: heading.join(', '),
      mono: mono.join(', '),
    },
    userFonts.fontWeights,
  ];
}
function isColorKey(key: string): key is ChangeableColors {
  return themeColorKeys.includes(key);
}

const importColors = (userColors: ThemeConfig['colors']): Theme['colors'] => {
  const generatedColors = generatePalette(userColors);
  let original = {} as Theme['colors']['original'];

  for (let [k, v] of Object.entries(userColors)) {
    if (isColorKey(k)) {
      original[k] = v;
    }
  }

  return {
    ...generatedColors,
    transparent: 'transparent',
    current: 'currentColor',
    original,
  };
};

export function makeTheme(userTheme: ThemeConfig): Theme {
  const [fonts, fontWeights] = importFonts({
    fonts: userTheme.fonts,
    fontWeights: userTheme.fontWeights,
  });

  const defaultTheme = extendTheme({
    colors: importColors(userTheme.colors),
    fonts,
    fontWeights,
    styles: { global: globalStyles },
  });
  return defaultTheme;
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
