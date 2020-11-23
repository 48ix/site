import dynamic from 'next/dynamic';
import { IconButton } from '@chakra-ui/react';
import { useColorMode, useColorValue } from '~context';

const StripedSun = dynamic(() => import('@meronex/icons/gi').then(i => i.GiStripedSun));
const Moon = dynamic(() => import('@meronex/icons/bs').then(i => i.BsMoon));

export const ColorModeButton = ({ ...props }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const label = `${colorMode === 'dark' ? 'Hurt' : 'Rest'} your eyes`;

  const Icon = colorMode === 'dark' ? Moon : StripedSun;
  const color = useColorValue('red.300', 'yellow.200');
  const hoverColor = useColorValue('red.600', 'red.100');

  return (
    <IconButton
      mx={4}
      alt={label}
      color={color}
      title={label}
      icon={<Icon />}
      variant="ghost"
      fontSize="28px"
      aria-label={label}
      onClick={toggleColorMode}
      _hover={{ backgroundColor: 'unset', color: hoverColor }}
      {...props}
    />
  );
};
