import * as React from 'react';
import { Button, useColorMode } from '@chakra-ui/core';

const btnColor = { dark: 'teal', light: 'blue' };

const LGButton = props => {
  const { colorMode } = useColorMode();
  return (
    <Button
      as="a"
      mx={[6, 6, 4, 4]}
      mt={8}
      mr={[null, null, 4, 4]}
      leftIcon="search"
      variantColor={btnColor[colorMode]}
      fontWeight="normal"
      variant="solid"
      aria-label="Looking Glass"
      href="https://lg.48ix.net"
      target="_blank"
      rel="noopener noreferrer"
      {...props}>
      Looking Glass
    </Button>
  );
};

export default LGButton;
