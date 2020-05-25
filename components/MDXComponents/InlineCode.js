import * as React from 'react';
import { Code, useColorMode } from '@chakra-ui/core';

const color = { dark: 'red', light: 'blackAlpha' };

const InlineCode = props => {
  const { colorMode } = useColorMode();
  return <Code variantColor={color[colorMode]} fontSize="sm" {...props} />;
};

InlineCode.displayName = 'InlineCode';

export default InlineCode;
