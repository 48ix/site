import * as React from 'react';
import dynamic from 'next/dynamic';
import { IconButton, useColorMode } from '@chakra-ui/core';

const StripedSun = dynamic(() => import('./Icons/StripedSun'));
const Moon = dynamic(() => import('./Icons/Moon'));

const icon = { dark: Moon, light: StripedSun };
const color = { dark: 'yellow.200', light: 'red.300' };
const hoverColor = { dark: 'red.100', light: 'red.600' };

const ColorModeButton = ({ ...props }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const label = `${colorMode === 'dark' ? 'Hurt' : 'Rest'} your eyes`;
  return (
    <IconButton
      mx={4}
      variant="ghost"
      fontSize="28px"
      icon={icon[colorMode]}
      color={color[colorMode]}
      onClick={toggleColorMode}
      aria-label={label}
      alt={label}
      _hover={{ backgroundColor: 'unset', color: hoverColor[colorMode] }}
      {...props}
    />
  );
};

export default ColorModeButton;
