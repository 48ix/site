/** @jsx jsx */
import { jsx } from '@emotion/core';
import { PseudoBox, useColorMode } from '@chakra-ui/core';

const bg = { dark: 'whiteAlpha.100', light: 'blackAlpha.100' };
const border = { dark: 'whiteAlpha.300', light: 'blackAlpha.300' };

const BlockQuote = props => {
  const { colorMode } = useColorMode();
  return (
    <PseudoBox
      my={8}
      pl={4}
      pt={2}
      pb={4}
      borderLeftWidth={2}
      borderLeftStyle="solid"
      borderLeftColor={border[colorMode]}
      position="relative"
      fontFamily="body"
      fontSize="lg"
      lineHeight="tall"
      fontWeight="light"
      backgroundColor={bg[colorMode]}
      _before={{ fontFamily: 'mono', color: 'gray' }}
      {...props}
    />
  );
};

BlockQuote.displayName = 'BlockQuote';

export default BlockQuote;
