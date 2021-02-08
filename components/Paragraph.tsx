import { chakra, Kbd, List, ListItem } from '@chakra-ui/react';

import type { ListProps, ListItemProps, KbdProps } from '@chakra-ui/react';

export const P = chakra('p', {
  baseStyle: { mt: 4, pl: 2, fontWeight: 'normal', opacity: 0.9, lineHeight: 'tall' },
});

export const Em = chakra('em', { baseStyle: { opacity: 0.9 } });

export const Strong = chakra('strong', { baseStyle: { opacity: 1, fontWeight: 800 } });

export const Ul: React.FC<ListProps> = (props: ListProps) => (
  <List pl={10} mt={2} pt={1} pb={2} spacing={2} styleType="circle" {...props} />
);

export const Ol: React.FC<ListProps> = (props: ListProps) => (
  <List pl={10} mt={2} pt={1} pb={2} spacing={2} as="ol" styleType="decimal" {...props} />
);

export const Li: React.FC<ListItemProps> = (props: ListItemProps) => <ListItem {...props} />;

export const Br = chakra('span', { baseStyle: { display: 'block', height: '24px' } });

export const Hr = chakra('hr', { baseStyle: { borderTopWidth: '1px', my: 8 } });

export const Pre = chakra('pre', { baseStyle: { my: '2em', rounded: 'sm' } });

export const Keyboard: React.FC<KbdProps> = (props: KbdProps) => <Kbd {...props} />;
