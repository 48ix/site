import * as React from 'react';
import dynamic from 'next/dynamic';
import { IconButton, useColorMode } from '@chakra-ui/core';
import { useConfig } from './Provider';

const IoLogoGithub = dynamic(() => import('react-icons/io').then(i => i.IoLogoGithub));
const IoLogoTwitter = dynamic(() => import('react-icons/io').then(i => i.IoLogoTwitter));

const iconMap = { github: IoLogoGithub, twitter: IoLogoTwitter };
const color = { dark: 'whiteAlpha.400', light: 'blackAlpha.600' };
const hoverColor = { dark: 'red.300', light: 'black' };

const SocialIcon = ({ name, ...props }) => {
  const { colorMode } = useColorMode();
  const { social } = useConfig();
  return (
    <IconButton
      as="a"
      variant="link"
      fontSize="24px"
      target="__blank"
      icon={iconMap[name]}
      href={social[name].url}
      color={color[colorMode]}
      _hover={{ color: hoverColor[colorMode] }}
    />
  );
};

SocialIcon.displayName = 'SocialIcon';
export default SocialIcon;
