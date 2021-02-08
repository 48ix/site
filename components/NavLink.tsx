import { forwardRef } from 'react';
import NextLink from 'next/link';
import { Box, Link } from '@chakra-ui/react';
import { useColorValue } from '~context';

import type { LinkProps } from '@chakra-ui/react';

const hoverTransform = { left: '2px', right: '-2px' };

interface SideNavLinkProps extends LinkProps {
  icon?: React.ReactNode;
}

interface TopNavLinkProps extends SideNavLinkProps {
  isActive?: boolean;
  href: string;
}

interface ComponentLinkProps extends TopNavLinkProps {
  side: 'left' | 'right';
}

export const SideNavLink = forwardRef<HTMLAnchorElement, SideNavLinkProps>((props, ref) => {
  const { children, icon, ...rest } = props;
  const color = useColorValue('gray.700', 'whiteAlpha.700');
  return (
    <Link
      as="a"
      px="2"
      py="1"
      mx={-2}
      ref={ref}
      color={color}
      display="flex"
      align="center"
      outline="none"
      cursor="pointer"
      fontWeight="normal"
      transition="all 0.2s"
      _notFirst={{ mt: 1 }}
      _focus={{ shadow: 'outline' }}
      {...rest}>
      {icon && <Box mr={3}>{icon}</Box>}
      <Box>{children}</Box>
    </Link>
  );
});

export const TopNavLink = forwardRef<HTMLAnchorElement, TopNavLinkProps>((props, ref) => {
  const { href, isActive = false, ...rest } = props;
  return (
    <NextLink href={href} passHref>
      <SideNavLink
        ref={ref}
        aria-current={isActive ? 'page' : undefined}
        _hover={{ color: !isActive ? 'inherit' : undefined }}
        {...(isActive && { color: 'teal.500', fontWeight: 'semibold' })}
        {...rest}
      />
    </NextLink>
  );
});

export const ComponentLink = forwardRef<HTMLAnchorElement, ComponentLinkProps>((props, ref) => {
  const { href, isActive = false, side = 'left', ...rest } = props;
  const activeBg = useColorValue('blackAlpha.100', 'whiteAlpha.100');
  const activeColor = useColorValue('blue.500', 'dark.200');
  const hoverColor = useColorValue('blackAlpha.900', 'whiteAlpha.900');
  return (
    <NextLink href={href} passHref>
      <SideNavLink
        ref={ref}
        aria-current={isActive ? 'page' : undefined}
        _hover={{
          color: hoverColor,
          transform: `translateX(${hoverTransform[side]})`,
        }}
        {...(isActive && {
          bg: activeBg,
          rounded: 'md',
          color: activeColor,
          _hover: {},
        })}
        {...props}
      />
    </NextLink>
  );
});
