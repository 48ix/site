import * as React from 'react';
import { Box, useColorMode, useTheme } from '@chakra-ui/core';

const bg = { dark: 'whiteAlpha.50', light: 'blackAlpha.50' };
const color = { dark: 'white', light: 'black' };

const CodeBlock = props => {
  const { colorMode } = useColorMode();
  return (
    <Box
      fontFamily="mono"
      mt={5}
      p={3}
      border="1px"
      borderColor="inherit"
      rounded="md"
      bg={bg[colorMode]}
      color={color[colorMode]}
      fontSize="sm"
      whiteSpace="pre-wrap"
      as="pre"
      {...props}
    />
  );
};

export default CodeBlock;
