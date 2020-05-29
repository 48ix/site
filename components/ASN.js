import * as React from 'react';
import { Text, useColorMode } from '@chakra-ui/core';

const asnColor = { dark: 'red.300', light: 'blue.500' };
const prefixColor = { dark: 'whiteAlpha.900', light: 'blackAlpha.900' };

const ASN = ({ as, prefix = true, ...props }) => {
  const { colorMode } = useColorMode();
  return (
    <>
      {prefix && (
        <Text
          mr="0.15rem"
          as="span"
          color={prefixColor[colorMode]}
          fontWeight={600}
          fontFamily="mono"
          {...props}>
          AS
        </Text>
      )}
      <Text as="span" color={asnColor[colorMode]} fontWeight={600} fontFamily="mono" {...props}>
        {as || '62484'}
      </Text>
    </>
  );
};

export default ASN;
