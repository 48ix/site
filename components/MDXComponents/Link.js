import * as React from 'react';
import { forwardRef } from 'react';
import NextLink from 'next/link';
import { PseudoBox, useColorMode } from '@chakra-ui/core';

const color = { dark: 'teal.500', light: 'blue.500' };

const Link = forwardRef(({ href, ...props }, ref) => {
  const { colorMode } = useColorMode();
  return (
    <NextLink href={href}>
      <PseudoBox
        as="a"
        ref={ref}
        color={color[colorMode]}
        cursor="pointer"
        textDecoration="underline"
        outline="none"
        _hover={{ opacity: '0.8' }}
        _focus={{ boxShadow: 'outline' }}
        {...props}
      />
    </NextLink>
  );
});

Link.displayName = 'Link';

export default Link;
