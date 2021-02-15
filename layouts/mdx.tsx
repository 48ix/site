import { useEffect } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { NextSeo } from 'next-seo';
import { useMobile, useToc } from '~context';
import { useTitleCase } from 'use-title-case';
import {
  P,
  Br,
  Em,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Hr,
  Li,
  Ol,
  Ul,
  ASN,
  Pre,
  Link,
  DToc,
  MToc,
  Table,
  Strong,
  Keyboard,
  CodeBlock,
  TableCell,
  Admonition,
  BlockQuote,
  InlineCode,
  TableHeader,
  ExternalLinkIcon,
} from '~components';

import type { Components } from '@mdx-js/react';

const components = {
  p: P,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  br: Br,
  hr: Hr,
  em: Em,
  ul: Ul,
  ol: Ol,
  li: Li,
  a: Link,
  pre: Pre,
  table: Table,
  kbd: Keyboard,
  td: TableCell,
  strong: Strong,
  code: CodeBlock,
  th: TableHeader,
  inlineCode: InlineCode,
  blockquote: BlockQuote,
  // Custom Components
  ASN: ASN,
  Admonition: Admonition,
  ExtLink: ExternalLinkIcon,
} as Components;

interface MDXFrontMatter extends Dict {
  id: string;
  title: string;
  keywords?: string[];
  defaultTitle?: boolean;
  hideToc?: boolean;
  __resourcePath: string;
}

interface MDXDefaultLayoutProps {
  frontMatter: MDXFrontMatter;
  children: React.ReactNode;
  rightToc: TocHeading[];
}

export const MDXDefaultLayout: React.FC<MDXDefaultLayoutProps> = (props: MDXDefaultLayoutProps) => {
  const { frontMatter, children, rightToc } = props;
  const title = useTitleCase();

  const {
    id,
    title: pageTitle,
    description,
    keywords = [],
    defaultTitle = true,
    hideToc = false,
    __resourcePath,
  } = frontMatter;

  let pageId = id;

  if (typeof pageId === 'undefined') {
    [pageId] = __resourcePath.split('.mdx');
  }

  const displayName = title(pageTitle);

  const isMobile = useMobile();
  const { hidden, hide, show } = useToc();

  useEffect(() => {
    if (hideToc === true && hidden === false) {
      show();
    } else if (hideToc === false && hidden === true) {
      hide();
    }
  }, []);

  return (
    <MDXProvider components={components}>
      <NextSeo
        title={displayName}
        description={description}
        additionalMetaTags={[{ name: 'keywords', content: keywords.join(',') }]}
        openGraph={{
          title: displayName,
          url: `https://48ix.net/${pageId}`,
          description: description,
        }}
      />
      {!isMobile && !hidden && <DToc headings={rightToc} />}
      {isMobile && !hidden && <MToc headings={rightToc} />}
      {defaultTitle && <H1>{displayName}</H1>}
      {children}
    </MDXProvider>
  );
};
