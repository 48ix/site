import * as React from 'react';
import { Button, useColorMode } from '@chakra-ui/core';
import { useGlobalState } from './Provider';

const btnColor = { dark: 'teal', light: 'blue' };

const JoinButton = props => {
  const { colorMode } = useColorMode();
  const { joinFormOnOpen } = useGlobalState();
  return (
    <Button
      mx={[6, 6, null, null]}
      ml={[null, null, 8, 8]}
      mr={[null, null, 4, 4]}
      variantColor={btnColor[colorMode]}
      variant="solid"
      aria-label="Join 48 IX"
      onClick={joinFormOnOpen}
      {...props}>
      Join 48 IX
    </Button>
  );
};

JoinButton.displayName = 'JoinButton';

export default JoinButton;
