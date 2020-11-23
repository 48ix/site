import { Flex } from '@chakra-ui/react';
import { useColorValue } from '~context';

export const CardBody = ({ onClick = () => false, ...props }) => {
  const bg = useColorValue('white', 'original.dark');
  const color = useColorValue('original.dark', 'white');
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
