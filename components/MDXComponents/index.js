import * as React from 'react';
import { Box, Kbd, Text } from '@chakra-ui/core';
import { H1, H2, H3, H4, H5, H6 } from './Headings';
import CodeBlock from './CodeBlock';
import InlineCode from './InlineCode';
import Pre from './Pre';
import { TableCell, TableHeader, Table } from './Table';
import Link from './Link';
import BlockQuote from './BlockQuote';

export default {
  h1: H1,
  h2: H2,
  h3: H3,
  h3: H4,
  h3: H5,
  h3: H6,
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
  p: props => <Text pl={2} as="p" mt={4} fontWeight="normal" lineHeight="tall" {...props} />,
  strong: props => <Text as="strong" fontWeight={800} {...props} />,
  ul: props => <Box as="ul" pt={4} pl={10} {...props} />,
  ol: props => <Box as="ol" pt={4} pl={10} {...props} />,
  li: props => <Box as="li" pb={1} {...props} />,
  blockquote: BlockQuote,
};
