import { H1, H2, H3, H4, H5, H6 } from './Headings';
import { P, Em, Strong, Ul, Ol, Li, Hr, Br, Pre, Keyboard } from './Paragraph';
import CodeBlock from './CodeBlock';
import InlineCode from './InlineCode';
import { TableCell, TableHeader, Table } from './Table';
import Link from './Link';
import BlockQuote from './BlockQuote';
import Admonition from '../Admonition';
import ASN from '../ASN';
import ExternalLinkIcon from '../ExternalLinkIcon';

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
  kbd: Keyboard,
  br: Br,
  hr: Hr,
  table: Table,
  th: TableHeader,
  td: TableCell,
  a: Link,
  p: P,
  em: Em,
  strong: Strong,
  ul: Ul,
  ol: Ol,
  li: Li,
  blockquote: BlockQuote,
  Admonition: Admonition,
  ASN: ASN,
  ExtLink: ExternalLinkIcon,
};
