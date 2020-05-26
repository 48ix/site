import * as React from 'react';
import { cloneElement, forwardRef } from 'react';
import NextLink from 'next/link';
import { Box, PseudoBox, useColorMode } from '@chakra-ui/core';

const stringToUrl = (str, path = '/') => {
  return `${path}${str.toLowerCase().split(' ').join('-')}`;
};

const color = { light: 'gray.700', dark: 'whiteAlpha.700' };

const SideNavLink = forwardRef(({ children, icon, ...props }, ref) => {
  const { colorMode } = useColorMode();
  return (
    <PseudoBox
      ref={ref}
      as="a"
      mx={-2}
      display="flex"
      cursor="pointer"
      align="center"
      px="2"
      py="1"
      transition="all 0.2s"
      fontWeight="normal"
      outline="none"
      _focus={{ shadow: 'outline' }}
      color={color[colorMode]}
      _notFirst={{ mt: 1 }}
      {...props}>
      {icon && cloneElement(icon, { mr: 3 })}
      <Box>{children}</Box>
    </PseudoBox>
  );
});

const TopNavLink = forwardRef(({ href, isActive = false, ...props }, ref) => {
  return (
    <NextLink href={href} passHref>
      <SideNavLink
        ref={ref}
        aria-current={isActive ? 'page' : undefined}
        _hover={{ color: !isActive ? 'inherit' : null }}
        {...(isActive && { color: 'teal.500', fontWeight: 'semibold' })}
        {...props}
      />
    </NextLink>
  );
});

const hoverColor = { dark: 'whiteAlpha.900', light: 'blackAlpha.900' };
const activeColor = { dark: 'dark.200', light: 'blue.500' };
const activeBg = { dark: 'whiteAlpha.100', light: 'blackAlpha.100' };
const hoverTransform = { left: '2px', right: '-2px' };

const ComponentLink = forwardRef(({ href, isActive = false, side = 'left', ...props }, ref) => {
  const { colorMode } = useColorMode();
  return (
    <NextLink href={href} passHref>
      <SideNavLink
        ref={ref}
        aria-current={isActive ? 'page' : undefined}
        _hover={{
          color: hoverColor[colorMode],
          transform: `translateX(${hoverTransform[side]})`,
        }}
        {...(isActive && {
          bg: activeBg[colorMode],
          rounded: 'md',
          color: activeColor[colorMode],
          _hover: {},
        })}
        {...props}
      />
    </NextLink>
  );
});

SideNavLink.displayName = 'SideNavLink';
TopNavLink.displayName = 'TopNavLink';
ComponentLink.displayName = 'ComponentLink';
export { ComponentLink, TopNavLink, SideNavLink, stringToUrl };
