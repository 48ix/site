import { Button } from '@chakra-ui/react';
import { useColorValue, useJoinForm } from '~context';

import type { ButtonProps } from '@chakra-ui/react';

export const JoinButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  const color = useColorValue('blue', 'teal');
  const { onOpen } = useJoinForm();
  return (
    <Button
      ml={{ lg: 8 }}
      mr={{ lg: 4 }}
      variant="solid"
      onClick={onOpen}
      fontWeight="normal"
      colorScheme={color}
      aria-label="Join 48 IX"
      mx={{ base: 6, lg: undefined }}
      {...props}>
      Join 48 IX
    </Button>
  );
};
