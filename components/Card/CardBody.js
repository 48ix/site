import { Flex } from '@chakra-ui/react';
import { useColorValue } from '~context';

export const CardBody = ({ onClick = () => false, ...props }) => {
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
      onClick={onClick}
      overflow="hidden"
      direction="column"
      {...props}
    />
  );
};
