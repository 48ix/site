import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { IconButton } from '@chakra-ui/react';
import { useColorValue, useConfig } from '~context';
import { useTitleCase } from 'use-title-case';

import type { IconButtonProps } from '@chakra-ui/react';

const Github = dynamic<MeronexIcon>(() => import('@meronex/icons/fa').then(i => i.FaGithub));
const Twitter = dynamic<MeronexIcon>(() => import('@meronex/icons/fa').then(i => i.FaTwitter));

type SocialNetworks = 'github' | 'twitter';

interface SocialIconProps extends Omit<IconButtonProps, 'aria-label'> {
  name: SocialNetworks;
}

export const SocialIcon: React.FC<SocialIconProps> = (props: SocialIconProps) => {
  const { name, ...rest } = props;
  const { social } = useConfig();

  const Icon = useMemo(() => {
    switch (name) {
      case 'github':
        return Github;
      case 'twitter':
        return Twitter;
    }
  }, [name]);

  const title = useTitleCase();
  const displayName = title(name);

  const color = useColorValue('blackAlpha.600', 'whiteAlpha.400');
  const hoverColor = useColorValue('black', 'red.300');

  return (
    <IconButton
      as="a"
      color={color}
      variant="link"
      fontSize="24px"
      icon={<Icon />}
      target="__blank"
      alt={displayName}
      href={social[name].url}
      aria-label={displayName}
      _hover={{ color: hoverColor }}
      {...rest}
    />
  );
};
