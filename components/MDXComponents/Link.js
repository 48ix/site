import * as React from 'react';
import { forwardRef } from 'react';
import NextLink from 'next/link';
import { PseudoBox, useColorMode, Link as ChakraLink } from '@chakra-ui/core';

const color = { dark: 'teal.500', light: 'blue.500' };

const BaseLink = props => (
  <PseudoBox
    as={ChakraLink}
    cursor="pointer"
    textDecoration="none"
    outline="none"
    _hover={{ opacity: '0.8' }}
    _focus={{ boxShadow: 'outline' }}
    {...props}
  />
);

const ExternalLink = props => <BaseLink isExternal {...props} />;

const InternalLink = ({ href, ...props }) => (
  <NextLink href={href}>
    <BaseLink {...props} />
  </NextLink>
);

const Link = forwardRef(({ href, ...props }, ref) => {
  let componentType = 'internal';
  if (href.match(/(http|https|mailto)\:\/\/.*/g)) {
    componentType = 'external';
  } else {
    href = '/' + href.match(/^(.+)\.mdx$/m)[1];
  }

  const componentMap = { internal: InternalLink, external: ExternalLink };
  const LinkComponent = componentMap[componentType];
  const { colorMode } = useColorMode();
  return <LinkComponent ref={ref} color={color[colorMode]} href={href} {...props} />;
});

Link.displayName = 'Link';

export default Link;
