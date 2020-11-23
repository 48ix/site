import dynamic from 'next/dynamic';
import { IconButton } from '@chakra-ui/react';
import { useColorValue, useConfig } from '~context';
import { title } from '~util';

const Github = dynamic(() => import('@meronex/icons/fa').then(i => i.FaGithub));
const Twitter = dynamic(() => import('@meronex/icons/fa').then(i => i.FaTwitter));

const iconMap = { github: Github, twitter: Twitter };

export const SocialIcon = ({ name }) => {
  const { social } = useConfig();
  const Icon = iconMap[name];
  const displayName = title(name);

  const color = useColorValue('blackAlpha.600', 'whiteAlpha.400');
  const hoverColor = useColorValue('black', 'red.300');

  return (
    <IconButton
      as="a"
      color={color}
      variant="link"
      fontSize="24px"
      target="__blank"
      alt={displayName}
      icon={<Icon />}
      href={social[name].url}
      aria-label={displayName}
      _hover={{ color: hoverColor }}
    />
  );
};
