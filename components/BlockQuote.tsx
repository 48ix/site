import { Box } from '@chakra-ui/react';
import { useColorValue } from '~context';

import type { BoxProps } from '@chakra-ui/react';

export const BlockQuote: React.FC<BoxProps> = (props: BoxProps) => {
  const bg = useColorValue('blackAlpha.100', 'whiteAlpha.100');
  const border = useColorValue('blackAlpha.300', 'whiteAlpha.300');
  return (
    <Box
      my={8}
      pl={4}
      pt={2}
      pb={4}
      fontSize="lg"
      fontFamily="body"
      lineHeight="tall"
      fontWeight="light"
      borderLeftWidth={2}
      position="relative"
      backgroundColor={bg}
      borderLeftStyle="solid"
      borderLeftColor={border}
      _before={{ fontFamily: 'mono', color: 'gray' }}
      {...props}
    />
  );
};
