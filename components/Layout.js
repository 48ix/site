import * as React from 'react';
import { Box, useColorMode } from '@chakra-ui/core';
import Aside from './Aside';
import Header from './Header';
import Footer from './Footer';

const bg = { dark: 'original.dark', light: 'white' };
const borderColor = { dark: 'dark.300', light: 'blue.500' };

const Main = ({ children, ...props }) => (
  <Box as="main" mx={64} pt={8} px={5} {...props}>
    {children}
  </Box>
);

const Layout = ({ showAside = true, children }) => {
  const { colorMode } = useColorMode();
  return (
    <Box minH="100vh" h="100%" bg={bg[colorMode]}>
      <Header borderColor={borderColor[colorMode]} />
      {showAside && <Aside borderColor={borderColor[colorMode]} />}
      <Main>
        <Box pl={[0, null, '18rem']} mt={16} minH="70vh">
          {children}
        </Box>
        <Footer pl={[0, null, '18rem']} mt={16} />
      </Main>
    </Box>
  );
};

Layout.displayName = 'Layout';

export default Layout;
