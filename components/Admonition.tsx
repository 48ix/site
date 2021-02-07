import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { chakra, Box, Heading, HStack, Icon, Text } from '@chakra-ui/react';
import { useColorValue } from '~context';
import { useOpposingColor } from '~hooks';
import { useTitleCase } from 'use-title-case';

import type { BoxProps, HeadingProps, IconProps } from '@chakra-ui/react';

const Note = dynamic<MeronexIcon>(() => import('@meronex/icons/go').then(i => i.GoNote));
const Tip = dynamic<MeronexIcon>(() => import('@meronex/icons/go').then(i => i.GoLightBulb));
const Warning = dynamic<MeronexIcon>(() => import('@meronex/icons/vsc').then(i => i.VscWarning));
const Critical = dynamic<MeronexIcon>(() => import('@meronex/icons/im').then(i => i.ImFire));
const Information = dynamic<MeronexIcon>(() =>
  import('@meronex/icons/bi').then(i => i.BiInfoCircle),
);

type AdmonitionTypes = 'information' | 'critical' | 'warning' | 'note' | 'tip';

interface AdmonitionIconProps extends IconProps {
  type: AdmonitionTypes;
}

interface AdmonitionProps extends BoxProps {
  title: string;
  message?: string;
  type?: AdmonitionTypes;
  hideIcon?: boolean;
}

const AdmonitionContainer = chakra('div', {
  baseStyle: {
    borderRadius: 'lg',
    width: 'fit-content',
    p: { base: 4, lg: 6 },
    mx: { base: 4, lg: 8 },
    my: { base: 4, lg: 12 },
  },
});

const AdmonitionBody = chakra('div', { baseStyle: { fontSize: 'sm', fontWeight: 'normal' } });

const AdmonitionHeader: React.FC<HeadingProps> = (props: HeadingProps) => {
  const { children, ...rest } = props;
  const title = useTitleCase();
  return (
    <Heading as="h3" fontWeight="bold" fontSize="md" {...rest}>
      {title(children)}
    </Heading>
  );
};

const AdmonitionIcon: React.FC<AdmonitionIconProps> = (props: AdmonitionIconProps) => {
  const { type, ...rest } = props;
  const icon = useMemo(() => {
    switch (type) {
      case 'information':
        return Information;
      case 'critical':
        return Critical;
      case 'warning':
        return Warning;
      case 'note':
        return Note;
      case 'tip':
        return Tip;
    }
  }, [type]);

  return <Icon as={icon} boxSize={{ base: 8, lg: 5 }} {...rest} />;
};

export const Admonition: React.FC<AdmonitionProps> = (props: AdmonitionProps) => {
  const { title, message, children, type = 'note', hideIcon = false, ...rest } = props;

  const bg = useColorValue(
    {
      information: 'blue.400',
      note: 'gray.100',
      tip: 'green.500',
      warning: 'yellow.400',
      critical: 'red.400',
    } as { [k in AdmonitionTypes]: string },
    {
      information: 'blue.300',
      note: 'gray.200',
      tip: 'green.300',
      warning: 'yellow.300',
      critical: 'red.300',
    } as { [k in AdmonitionTypes]: string },
  )[type];

  const color = useOpposingColor(bg);

  return (
    <AdmonitionContainer bg={bg} color={color} {...rest}>
      <HStack isInline align="center" mb={4}>
        {!hideIcon && <AdmonitionIcon type={type} />}
        {title && <AdmonitionHeader>{title}</AdmonitionHeader>}
      </HStack>
      <AdmonitionBody fontSize="sm" fontWeight="normal">
        {message ?? children}
      </AdmonitionBody>
    </AdmonitionContainer>
  );
};
