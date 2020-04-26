import * as React from 'react';
import { Button, useColorMode } from '@chakra-ui/core';

const btnColor = { dark: 'teal', light: 'blue' };

const JoinButton = props => {
  const { colorMode } = useColorMode();
  return (
    <Button mx={8} variantColor={btnColor[colorMode]} variant="outline" {...props}>
      Join 48-IX
    </Button>
  );
};

JoinButton.displayName = 'JoinButton';

export default JoinButton;
