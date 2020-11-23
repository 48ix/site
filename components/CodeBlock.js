import { Box } from '@chakra-ui/react';
import { useColorValue } from '~context';

export const CodeBlock = props => {
  const bg = useColorValue('blackAlpha.50', 'whiteAlpha.50');
  const color = useColorValue('black', 'white');
  return (
    <Box
      fontFamily="mono"
      mt={5}
      p={3}
      border="1px"
      borderColor="inherit"
      rounded="md"
      bg={bg}
      color={color}
      fontSize="sm"
      whiteSpace="pre-wrap"
      as="pre"
      {...props}
    />
  );
};
