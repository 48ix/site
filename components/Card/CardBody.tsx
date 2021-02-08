import { Flex } from '@chakra-ui/react';
import { useColorValue } from '~context';

import type { FlexProps } from '@chakra-ui/react';

export const CardBody: React.FC<FlexProps> = (props: FlexProps) => {
  const bg = useColorValue('white', 'dark.500');
  const color = useColorValue('dark.500', 'white');
  return (
    <Flex
      bg={bg}
      w="100%"
      maxW="100%"
      rounded="md"
      color={color}
      borderWidth="1px"
      overflow="hidden"
      direction="column"
      {...props}
    />
  );
};
