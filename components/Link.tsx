import { forwardRef } from 'react';
import NextLink from 'next/link';
import { Link as ChakraLink } from '@chakra-ui/react';
import { useColorValue } from '~context';

import type { LinkProps } from '@chakra-ui/react';

type RequiredLinkProps = LinkProps & { href: string };

const BaseLink = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <ChakraLink
    ref={ref}
    outline="none"
    cursor="pointer"
    textDecoration="none"
    _hover={{ opacity: 0.8 }}
    _focus={{ boxShadow: 'outline' }}
    {...props}
  />
));

const ExternalLink = forwardRef<HTMLAnchorElement, RequiredLinkProps>((props, ref) => (
  <BaseLink isExternal ref={ref} {...props} />
));

const InternalLink = forwardRef<HTMLAnchorElement, RequiredLinkProps>((props, ref) => {
  const { href, ...rest } = props;
  return (
    <NextLink href={href}>
      <BaseLink ref={ref} {...rest} />
    </NextLink>
  );
});

export const Link = forwardRef<HTMLAnchorElement, RequiredLinkProps>((props, ref) => {
  const { href, ...rest } = props;
  let link = href;
  let isInternal = false;

  const color = useColorValue('blue.500', 'teal.500');

  if (href.match(/(http|https|mailto)\:\/\/.*/g)) {
    isInternal = true;
  } else {
    let prefix = '/';
    if (!href.includes('.mdx') && href.includes('#')) {
      prefix = '';
    }
    let parts = href.split('.mdx');
    link = [prefix, ...parts].join('');
  }

  if (isInternal) {
    return <InternalLink ref={ref} color={color} href={link} {...rest} />;
  } else {
    return <ExternalLink ref={ref} color={color} href={link} {...rest} />;
  }
});
