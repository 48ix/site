import dynamic from 'next/dynamic';
import { Button } from '@chakra-ui/react';
import { useColorValue } from '~context';

const Search = dynamic(() => import('@meronex/icons/bi').then(i => i.BiSearch));

export const LGButton = props => {
  const color = useColorValue('blue', 'teal');
  return (
    <Button
      as="a"
      mt={8}
      target="_blank"
      variant="solid"
      leftIcon={<Search />}
      mx={[6, 6, 4, 4]}
      fontWeight="normal"
      colorScheme={color}
      mr={[null, null, 4, 4]}
      rel="noopener noreferrer"
      aria-label="Looking Glass"
      href="https://lg.48ix.net"
      {...props}>
      Looking Glass
    </Button>
  );
};
