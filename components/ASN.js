import * as React from 'react';
import { Text, useColorMode } from '@chakra-ui/core';

const color = { dark: 'red.300', light: 'blue.500' };

const ASN = ({ as, ...props }) => {
  const { colorMode } = useColorMode();
  return (
    <Text as="span" color={color[colorMode]} fontWeight={600} fontFamily="mono" {...props}>
      {as || '65000'}
    </Text>
  );
};

ASN.displayName = 'ASN';

export default ASN;
