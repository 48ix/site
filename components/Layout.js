import * as React from 'react';
import { Box, useColorMode } from '@chakra-ui/core';
import Aside from './Aside';
import Header from './Header';
import Footer from './Footer';

const bg = { dark: 'original.dark', light: 'white' };

const Layout = ({ showAside = true, children }) => {
  const { colorMode } = useColorMode();
  return (
    <Box minH="100vh" backgroundColor={bg[colorMode]}>
      <Header />
      {showAside && (
        <Aside as="aside" maxW="18rem" width="full" display={['none', null, 'block']} />
      )}
      <Box as="main" pl={[0, null, '18rem']} mt={16} pos="relative">
        <Box mx={24} mb={12} pt={8} px={5}>
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

Layout.displayName = 'Layout';

export default Layout;
