import * as React from 'react';
import dynamic from 'next/dynamic';
import NextHead from 'next/head';
import { Box, useColorMode, useTheme } from '@chakra-ui/core';
import { useMedia } from './Provider';

const Aside = dynamic(() => import('./Aside'));
const Header = dynamic(() => import('./Header'));
const Footer = dynamic(() => import('./Footer'));

const bg = { dark: 'original.dark', light: 'white' };
const borderColor = { dark: 'dark.300', light: 'blue.500' };

const SiteContainer = props => {
  const { colorMode } = useColorMode();
  return <Box minH="100vh" h="100%" bg={bg[colorMode]} {...props} />;
};

const Main = ({ children, ...props }) => (
  <Box
    as="main"
    mx={{ sm: 2, md: 2, lg: 20, xl: 32 }}
    pt={8}
    px={[null, null, 5]}
    overflowX="hidden"
    {...props}>
    {children}
  </Box>
);

const Layout = ({ children }) => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { isLg, isXl } = useMedia();
  return (
    <>
      <NextHead>
        <link rel="icon" type="image/png" sizes="32x32" href={`/favicon-${colorMode}-32x32.png`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`/favicon-${colorMode}-16x16.png`} />
      </NextHead>
      <SiteContainer>
        <Header borderColor={borderColor[colorMode]} />
        {(isLg || isXl) && <Aside borderColor={borderColor[colorMode]} />}
        <Main>
          <Box
            pr={{ _: 2, lg: 0, xl: 0 }}
            pl={{ _: 2, lg: '18rem', xl: '18rem' }}
            mt={[20, 20, 16, 16]}
            minH="70vh">
            {children}
          </Box>
          <Footer pl={{ sm: 0, md: 0, lg: '18rem', xl: '18rem' }} mt={16} />
        </Main>
      </SiteContainer>
    </>
  );
};

Main.displayName = 'Main';
SiteContainer.displayName = 'SiteContainer';
Layout.displayName = 'Layout';

export default Layout;
