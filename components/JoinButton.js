import { Button } from '@chakra-ui/react';
import { useColorValue, useJoinForm } from '~context';

export const JoinButton = props => {
  const color = useColorValue('blue', 'teal');
  const { onOpen } = useJoinForm();
  return (
    <Button
      variant="solid"
      fontWeight="normal"
      colorScheme={color}
      mx={[6, 6, null, null]}
      ml={[null, null, 8, 8]}
      mr={[null, null, 4, 4]}
      aria-label="Join 48 IX"
      onClick={onOpen}
      {...props}>
      Join 48 IX
    </Button>
  );
};
