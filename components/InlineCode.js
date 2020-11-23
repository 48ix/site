import { Code } from '@chakra-ui/react';
import { useColorValue } from '~context';

export const InlineCode = props => {
  const color = useColorValue('blackAlpha', 'red');
  return <Code colorScheme={color} fontSize="sm" {...props} />;
};
