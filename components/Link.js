import { forwardRef } from 'react';
import NextLink from 'next/link';
import { Box, Link as ChakraLink } from '@chakra-ui/react';
import { useColorValue } from '~context';

const BaseLink = forwardRef((props, ref) => (
  <Box
    ref={ref}
    outline="none"
    as={ChakraLink}
    cursor="pointer"
    textDecoration="none"
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

export const Link = forwardRef(({ href, ...props }, ref) => {
  const color = useColorValue('blue.500', 'teal.500');

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

  return <LinkComponent ref={ref} color={color} href={href} {...props} />;
});
