import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import hydrate from 'next-mdx-remote/hydrate';
import renderToString from 'next-mdx-remote/render-to-string';
import slug from 'remark-slug';
import { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { Button } from '@chakra-ui/react';
import { useMobile, useToc } from '~context';
import { useTitleCase } from 'use-title-case';
import { getHeadings } from '~util';
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
  Fees,
  Table,
  Strong,
  Keyboard,
  LGButton,
  CodeBlock,
  TableCell,
  Admonition,
  BlockQuote,
  InlineCode,
  TableHeader,
  SlackInvite,
  Contributors,
  ConnectionL2,
  ConnectionL3,
  SupportButton,
  ExternalLinkIcon,
} from '~components';

import type { MdxRemote } from 'next-mdx-remote/types';

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
  ASN,
  Fees,
  Button,
  LGButton,
  Admonition,
  SlackInvite,
  Contributors,
  ConnectionL2,
  ConnectionL3,
  SupportButton,
  ExtLink: ExternalLinkIcon,
};

import type { GetStaticProps, GetStaticPaths } from 'next';

type FrontMatter = {
  id?: string;
  title?: string;
  keywords?: string[];
  description?: string;
  defaultTitle?: boolean;
  hideToc?: boolean;
};

type Props = {
  rightToc: TocHeading[];
  source: MdxRemote.Source;
  frontMatter: FrontMatter;
  isMdx: true;
};
type Query = { page: string };

const DOCS_PATH = path.join(process.cwd(), 'docs');

const Page: React.FC<Props> = (props: Props) => {
  const { source, frontMatter, rightToc } = props;
  const {
    id,
    title: pageTitle,
    description = '',
    keywords = [],
    defaultTitle = true,
    hideToc = false,
  } = frontMatter;
  const title = useTitleCase();
  const displayName = title(pageTitle);

  const isMobile = useMobile();
  const { hidden, hide, show } = useToc();
  const content = hydrate(source, { components });

  useEffect(() => {
    if (hideToc === true && hidden === false) {
      show();
    } else if (hideToc === false && hidden === true) {
      hide();
    }
  }, []);
  return (
    <>
      <NextSeo
        title={displayName}
        description={description}
        additionalMetaTags={[{ name: 'keywords', content: keywords.join(',') }]}
        openGraph={{
          title: displayName,
          url: `https://48ix.net/${id}`,
          description: description,
        }}
      />
      {!isMobile && !hidden && <DToc headings={rightToc} />}
      {isMobile && !hidden && <MToc headings={rightToc} />}
      {defaultTitle && <H1>{displayName}</H1>}
      {content}
    </>
  );
};

export const getStaticProps: GetStaticProps<Props, Query> = async ctx => {
  const page = ctx.params?.page ?? '404';

  const filePath = path.join(DOCS_PATH, `${page}.mdx`);
  const source = fs.readFileSync(filePath);

  const { content, data } = matter(source);
  let rightToc = [] as TocHeading[];
  rightToc = await getHeadings(content, 3);

  const mdxSource = await renderToString(content, {
    components,
    mdxOptions: { remarkPlugins: [slug] },
    scope: data,
  });

  return {
    props: {
      rightToc,
      source: mdxSource,
      frontMatter: data,
      isMdx: true,
    },
  };
};

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  const paths = fs
    .readdirSync(DOCS_PATH)
    .filter(path => /\.mdx?$/.test(path))
    .map(path => path.replace(/\.mdx?$/, ''))
    .map(page => ({ params: { page } }));

  return {
    paths,
    fallback: false,
  };
};

export default Page;
