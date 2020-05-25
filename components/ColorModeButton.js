import * as React from 'react';
import dynamic from 'next/dynamic';
import { IconButton, useColorMode } from '@chakra-ui/core';

const GiStripedSun = dynamic(() => import('react-icons/gi').then(i => i.GiStripedSun));
const IoIosMoon = dynamic(() => import('react-icons/io').then(i => i.IoIosMoon));

const icon = { dark: IoIosMoon, light: GiStripedSun };
const color = { dark: 'yellow.200', light: 'red.300' };
const hoverColor = { dark: 'red.100', light: 'red.600' };

const ColorModeButton = ({ ...props }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      mx={4}
      variant="ghost"
      fontSize="28px"
      icon={icon[colorMode]}
      color={color[colorMode]}
      onClick={toggleColorMode}
      aria-label={`Switch to ${colorMode} mode`}
      _hover={{ backgroundColor: 'unset', color: hoverColor[colorMode] }}
      {...props}
    />
  );
};

ColorModeButton.displayName = 'ColorModeButton';
export default ColorModeButton;
