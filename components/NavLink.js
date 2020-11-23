import { cloneElement, forwardRef } from 'react';
import NextLink from 'next/link';
import { Box } from '@chakra-ui/react';
import { useColorValue } from '~context';

const hoverTransform = { left: '2px', right: '-2px' };

export const SideNavLink = forwardRef(({ children, icon, ...props }, ref) => {
  const color = useColorValue('gray.700', 'whiteAlpha.700');
  return (
    <Box
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
      color={color}
      _notFirst={{ mt: 1 }}
      {...props}>
      {icon && cloneElement(icon, { mr: 3 })}
      <Box>{children}</Box>
    </Box>
  );
});

export const TopNavLink = forwardRef(({ href, isActive = false, ...props }, ref) => (
  <NextLink href={href} passHref>
    <SideNavLink
      ref={ref}
      aria-current={isActive ? 'page' : undefined}
      _hover={{ color: !isActive ? 'inherit' : null }}
      {...(isActive && { color: 'teal.500', fontWeight: 'semibold' })}
      {...props}
    />
  </NextLink>
));

export const ComponentLink = forwardRef(
  ({ href, isActive = false, side = 'left', ...props }, ref) => {
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
  },
);
