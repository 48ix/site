import { createContext, useContext, useMemo, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  ThemeProvider as ChakraThemeProvider,
  useDisclosure,
  useTheme,
} from 'components/DataTable/node_modules/@chakra-ui/core';
import { useMediaLayout } from 'use-media';
import { makeTheme } from '../util';
import { initGA, logPageView } from '../analytics';
import siteConfig from '../siteConfig';

const ColorModeProvider = dynamic(
  () =>
    import('components/DataTable/node_modules/@chakra-ui/core').then(mod => mod.ColorModeProvider),
  { ssr: false },
);

const MediaContext = createContext(null);
const ProviderContext = createContext(null);
const StateContext = createContext(null);

export const useConfig = () => useContext(ProviderContext);
export const useMedia = () => useContext(MediaContext);
export const useGlobalState = () => useContext(StateContext);

const ThemeProvider = ({ children }) => {
  const { theme: configTheme } = useConfig();
  const theme = useMemo(() => makeTheme(configTheme), [configTheme]);
  return <ChakraThemeProvider theme={theme}>{children}</ChakraThemeProvider>;
};

const MediaProvider = ({ children }) => {
  const { breakpoints } = useTheme();
  const { sm, md, lg, xl } = breakpoints;
  const isSm = useMediaLayout({ maxWidth: md });
  const isMd = useMediaLayout({ minWidth: md, maxWidth: lg });
  const isLg = useMediaLayout({ minWidth: lg, maxWidth: xl });
  const isXl = useMediaLayout({ minWidth: xl });
  let mediaSize = false;
  switch (true) {
    case isSm:
      mediaSize = 'sm';
      break;
    case isMd:
      mediaSize = 'md';
      break;
    case isLg:
      mediaSize = 'lg';
      break;
    case isXl:
      mediaSize = 'xl';
      break;
  }
  const value = useMemo(
    () => ({
      isSm,
      isMd,
      isLg,
      isXl,
      mediaSize,
    }),
    [mediaSize],
  );
  return <MediaContext.Provider value={value}>{children}</MediaContext.Provider>;
};

const StateProvider = ({ children }) => {
  const {
    isOpen: joinFormOpen,
    onOpen: joinFormOnOpen,
    onClose: joinFormOnClose,
  } = useDisclosure();
  const [joinFormTerm, setJoinFormTerm] = useState('annual');
  const [hideToc, setHideToc] = useState(false);
  const value = useMemo(() => ({
    joinFormOpen,
    joinFormOnOpen,
    joinFormOnClose,
    joinFormTerm,
    setJoinFormTerm,
    hideToc,
    setHideToc,
  }));
  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
};

export const Provider = ({ children }) => {
  const config = useMemo(() => siteConfig, [siteConfig]);
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA(process.env.GOOGLE_ANALYTICS_ID || null);
      window.GA_INITIALIZED = true;
    }
    logPageView();
  });
  return (
    <ProviderContext.Provider value={config}>
      <ThemeProvider>
        <ColorModeProvider>
          <MediaProvider>
            <StateProvider>{children}</StateProvider>
          </MediaProvider>
        </ColorModeProvider>
      </ThemeProvider>
    </ProviderContext.Provider>
  );
};
