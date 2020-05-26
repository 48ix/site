import * as React from 'react';
import { Box, Kbd, List, ListItem, Text } from '@chakra-ui/core';
import { H1, H2, H3, H4, H5, H6 } from './Headings';
import CodeBlock from './CodeBlock';
import InlineCode from './InlineCode';
import Pre from './Pre';
import { TableCell, TableHeader, Table } from './Table';
import Link from './Link';
import BlockQuote from './BlockQuote';
import Admonition from '../Admonition';
import ASN from '../ASN';

export default {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  inlineCode: InlineCode,
  code: CodeBlock,
  pre: Pre,
  kbd: Kbd,
  br: props => <Box as="p" height="24px" {...props} />,
  hr: props => <Box as="hr" borderTopWidth="1px" my={8} {...props} />,
  table: Table,
  th: TableHeader,
  td: TableCell,
  a: Link,
  p: props => (
    <Text pl={2} as="p" mt={4} opacity="0.9" fontWeight="normal" lineHeight="tall" {...props} />
  ),
  em: props => <Text as="em" opacity="0.8" {...props} />,
  strong: props => <Text as="strong" opacity="1" fontWeight={800} {...props} />,
  ul: props => <List pl={10} mt={2} pt={1} pb={2} spacing={2} styleType="circle" {...props} />,
  ol: props => (
    <List pl={10} mt={2} pt={1} pb={2} spacing={2} as="ol" styleType="decimal" {...props} />
  ),
  li: props => <ListItem {...props} />,
  blockquote: BlockQuote,
  Admonition: Admonition,
  ASN: ASN,
};
