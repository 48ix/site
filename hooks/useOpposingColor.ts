import { useState } from 'react';
import { useToken } from '@chakra-ui/react';
import { getColor, isLight } from '@chakra-ui/theme-tools';
import { useTheme } from '~context';

interface IOpposingOptions {
  light?: string;
  dark?: string;
}

export function useIsDark(color: string) {
  const theme = useTheme();
  if (typeof color === 'string' && color.match(/[a-zA-Z]+\.[a-zA-Z0-9]+/g)) {
    color = getColor(theme, color, color);
  }
  let opposingShouldBeDark = true;
  try {
    opposingShouldBeDark = isLight(color)(theme);
  } catch (err) {
    console.error(err);
  }
  return opposingShouldBeDark;
}

export function useOpposingColor(color: string, options?: IOpposingOptions): string {
  const [opposingColor, setOpposingColor] = useState<string>('inherit');
  const isBlack = useIsDark(color);

  const dark = useToken('colors', options?.dark ?? 'dark.500');
  const light = useToken('colors', options?.light ?? 'light.500');

  isBlack && opposingColor !== dark && setOpposingColor(dark);
  !isBlack && opposingColor !== light && setOpposingColor(light);

  return opposingColor;
}

export function useOpposingToken(color: string, options?: IOpposingOptions): string {
  const [opposingColor, setOpposingColor] = useState<string>('inherit');
  const isBlack = useIsDark(color);
  const dark = options?.dark ?? 'dark';
  const light = options?.light ?? 'light';

  isBlack && opposingColor !== dark && setOpposingColor(dark);
  !isBlack && opposingColor !== light && setOpposingColor(light);
  return opposingColor;
}
