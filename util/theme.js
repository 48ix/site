import {
  parseToHsla,
  transparentize,
  readableColorIsBlack,
  hsla,
  saturate,
  desaturate,
} from 'color2k';
import { theme as chakraTheme } from '@chakra-ui/core';

const idCounter = {};

export function uniqueId(prefix) {
  if (!idCounter[prefix]) {
    idCounter[prefix] = 0;
  }

  const id = ++idCounter[prefix];
  if (prefix === undefined) {
    return `${id}`;
  }

  return `${prefix}${id}`;
}

export const isLight = color => readableColorIsBlack(color);
export const isDark = color => !readableColorIsBlack(color);

export function opposingColor(theme, color) {
  if (color.includes('.')) {
    const colorParts = color.split('.');
    if (colorParts.length !== 2) {
      throw Error(`Color is improperly formatted. Got '${color}'`);
    }
    const [colorName, colorOpacity] = colorParts;
    color = theme.colors[colorName][colorOpacity];
  }
  const opposing = isDark(color) ? theme.colors.white : theme.colors.black;
  return opposing;
}

export function googleFontUrl(fontFamily, weights = [200, 400, 500, 700]) {
  const urlWeights = weights.join(',');
  const fontName = fontFamily.split(/, /)[0].trim().replace(/'|"/g, '');
  const urlFont = fontName.split(/ /).join('+');
  const urlBase = `https://fonts.googleapis.com/css?family=${urlFont}:${urlWeights}&display=swap`;
  return urlBase;
}

function alphaColors(color) {
  return {
    50: transparentize(color, Number(1 - 0.04).toFixed(2)),
    100: transparentize(color, Number(1 - 0.08).toFixed(2)),
    200: transparentize(color, Number(1 - 0.12).toFixed(2)),
    300: transparentize(color, Number(1 - 0.16).toFixed(2)),
    400: transparentize(color, Number(1 - 0.24).toFixed(2)),
    500: transparentize(color, Number(1 - 0.38).toFixed(2)),
    600: transparentize(color, Number(1 - 0.48).toFixed(2)),
    700: transparentize(color, Number(1 - 0.6).toFixed(2)),
    800: transparentize(color, Number(1 - 0.8).toFixed(2)),
    900: transparentize(color, Number(1 - 0.92).toFixed(2)),
  };
}

function generateColors(colorInput) {
  const colorMap = {};

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

  const getColorNumber = index => (index === 0 ? 50 : index * 100);

  colors.map((color, i) => {
    const colorIndex = getColorNumber(i);
    colorMap[colorIndex] = color;
  });
  return colorMap;
}

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

const defaultMonoFonts = [
  'SFMono-Regular',
  'Melno',
  'Monaco',
  'Consolas',
  '"Liberation Mono"',
  '"Courier New"',
  'monospace',
];

function generatePalette(palette) {
  const generatedPalette = {};
  Object.keys(palette).map(color => {
    if (!['black', 'white'].includes(color)) {
      generatedPalette[color] = generateColors(palette[color]);
    } else {
      generatedPalette[color] = palette[color];
      generatedPalette[`${color}Alpha`] = alphaColors(palette[color]);
    }
  });
  return generatedPalette;
}

function formatFont(font) {
  const fontList = font.split(' ');
  const fontFmt = fontList.length >= 2 ? `'${fontList.join(' ')}'` : fontList.join(' ');
  return fontFmt;
}

function importFonts(userFonts) {
  const [body, mono] = [defaultBodyFonts, defaultMonoFonts];
  const bodyFmt = formatFont(userFonts.body);
  const monoFmt = formatFont(userFonts.mono);
  if (userFonts.body && !body.includes(bodyFmt)) {
    body.unshift(bodyFmt);
  }
  if (userFonts.mono && !mono.includes(monoFmt)) {
    mono.unshift(monoFmt);
  }
  return {
    body: body.join(', '),
    heading: body.join(', '),
    mono: mono.join(', '),
  };
}

function importColors(userColors = {}) {
  const generatedColors = generatePalette(userColors);
  return {
    transparent: 'transparent',
    current: 'currentColor',
    original: userColors,
    ...generatedColors,
  };
}

export function makeTheme(userTheme) {
  return {
    ...chakraTheme,
    colors: importColors(userTheme.colors),
    fonts: importFonts(userTheme.fonts),
    fontWeights: {
      light: 200,
      normal: 400,
      semibold: 600,
      medium: 600,
      bold: 800,
    },
  };
}