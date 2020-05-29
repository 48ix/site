import * as React from 'react';
import { forwardRef } from 'react';
import NextLink from 'next/link';
import { PseudoBox, useColorMode, Link as ChakraLink } from '@chakra-ui/core';

const color = { dark: 'teal.500', light: 'blue.500' };

const BaseLink = forwardRef((props, ref) => (
  <PseudoBox
    ref={ref}
    as={ChakraLink}
    cursor="pointer"
    textDecoration="none"
    outline="none"
    _hover={{ opacity: 0.8 }}
    _focus={{ boxShadow: 'outline' }}
    {...props}
  />
));

const ExternalLink = props => <BaseLink isExternal {...props} />;

const InternalLink = forwardRef(({ href, ...props }, ref) => (
  <NextLink href={href}>
    <BaseLink ref={ref} {...props} />
  </NextLink>
));

const componentMap = { internal: InternalLink, external: ExternalLink };

const Link = forwardRef(({ href, ...props }, ref) => {
  const { colorMode } = useColorMode();
  let componentType = 'internal';
  if (href.match(/(http|https|mailto)\:\/\/.*/g)) {
    componentType = 'external';
  } else {
    let prefix = '/';
    if (!href.includes('.mdx') && href.includes('#')) {
      prefix = '';
    }
    let parts = href.split('.mdx');
    href = [prefix, ...parts].join('');
  }

  const LinkComponent = componentMap[componentType];
  return <LinkComponent ref={ref} color={color[colorMode]} href={href} {...props} />;
});

export default Link;
