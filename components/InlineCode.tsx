import { Code } from '@chakra-ui/react';
import { useColorValue } from '~context';

import { CodeProps } from '@chakra-ui/react';

export const InlineCode: React.FC<CodeProps> = (props: CodeProps) => {
  const color = useColorValue('blackAlpha', 'red');
  return <Code colorScheme={color} fontSize="sm" {...props} />;
};
