import { useMemo } from 'react';
import { ChakraProvider, useBreakpointValue, useColorModeValue, useToken } from '@chakra-ui/react';
import { makeTheme } from '~util';
import siteConfig from '../siteConfig';

import type { UIProviderProps } from './types';

export const UIProvider = (props: UIProviderProps) => {
  const { children } = props;
  const theme = useMemo(() => makeTheme(siteConfig.theme), []);
  return (
    <ChakraProvider resetCSS theme={theme}>
      {children}
    </ChakraProvider>
  );
};

export const useColorToken = (light: string, dark: string) =>
  useColorModeValue(useToken('colors', light), useToken('colors', dark));

export const useMobile = (): boolean =>
  useBreakpointValue({ base: true, md: true, lg: false, xl: false }) ?? false;

export {
  useTheme,
  useColorMode,
  useBreakpointValue,
  useColorModeValue as useColorValue,
} from '@chakra-ui/react';
