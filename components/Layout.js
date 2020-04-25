import * as React from 'react';
import { Box, useColorMode } from '@chakra-ui/core';
import Aside from './Aside';
import Header from './Header';

const bg = { dark: 'original.dark', light: 'white' };
const border = { dark: 'dark.300', light: 'original.dark' };

const Layout = ({ showAside = true, children }) => {
  const { colorMode } = useColorMode();
  return (
    <Box minH="100vh" backgroundColor={bg[colorMode]}>
      <Header />
      {showAside && (
        <Aside
          as="aside"
          borderColor={border[colorMode]}
          maxW="18rem"
          width="full"
          display={['none', null, 'block']}
        />
      )}
      <Box as="main" pl={[0, null, '18rem']} mt={16}>
        <Box mx={24} mb={12} maxWidth="46rem" pt={8} px={5}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

Layout.displayName = 'Layout';

export default Layout;
