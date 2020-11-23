import { Box, Kbd, List, ListItem, Text } from '@chakra-ui/react';

export const P = props => (
  <Text pl={2} as="p" mt={4} fontWeight="normal" opacity={0.9} lineHeight="tall" {...props} />
);

export const Em = props => <Text as="em" opacity={0.9} {...props} />;

export const Strong = props => <Text as="strong" opacity={1} fontWeight={800} {...props} />;

export const Ul = props => (
  <List pl={10} mt={2} pt={1} pb={2} spacing={2} styleType="circle" {...props} />
);

export const Ol = props => (
  <List pl={10} mt={2} pt={1} pb={2} spacing={2} as="ol" styleType="decimal" {...props} />
);

export const Li = props => <ListItem {...props} />;

export const Br = props => <Box as="span" display="block" height="24px" {...props} />;

export const Hr = props => <Box as="hr" borderTopWidth="1px" my={8} {...props} />;

export const Pre = props => <Box my="2em" rounded="sm" {...props} />;

export const Keyboard = props => <Kbd {...props} />;
