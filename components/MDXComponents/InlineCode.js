import * as React from 'react';
import { Code, useColorMode } from '@chakra-ui/core';

const color = { dark: 'red', light: 'gray' };

const InlineCode = props => {
  const { colorMode } = useColorMode();
  return <Code variantColor={color[colorMode]} fontSize="0.84em" {...props} />;
};

InlineCode.displayName = 'InlineCode';

export default InlineCode;
