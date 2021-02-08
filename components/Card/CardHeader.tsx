import { Flex, Text } from '@chakra-ui/react';
import { useColorValue } from '~context';

import type { FlexProps } from '@chakra-ui/react';

export const CardHeader: React.FC<FlexProps> = (props: FlexProps) => {
  const { children, ...rest } = props;
  const bg = useColorValue('blackAlpha.50', 'whiteAlpha.100');
  return (
    <Flex
      p={4}
      bg={bg}
      direction="column"
      roundedTopLeft={4}
      roundedTopRight={4}
      borderBottomWidth="1px"
      {...rest}>
      <Text fontWeight="bold">{children}</Text>
    </Flex>
  );
};
