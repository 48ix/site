import * as React from 'react';
import { MDXProvider } from '@mdx-js/react';
import MDXComponents from '../components/MDXComponents';
import { NextSeo } from 'next-seo';
import { title } from '../util';
import { useMedia } from '../components/Provider';
import { H1 } from '../components/MDXComponents/Headings';
import TableOfContents from '../components/TableOfContents';
import MobileTableOfContents from '../components/MobileTableOfContents';

const MDXDefaultLayout = ({
  id,
  title: pageTitle,
  description,
  keywords = [],
  defaultTitle = true,
  __resourcePath,
}) => {
  let pageId = id;
  if (typeof pageId === 'undefined') {
    [pageId] = __resourcePath.split('.mdx');
  }
  const displayName = title(pageTitle);
  return ({ children: content, rightToc }) => {
    const { isLg, isXl } = useMedia();
    return (
      <MDXProvider components={MDXComponents}>
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
        {(isLg || isXl) && <TableOfContents headings={rightToc} />}
        {!(isLg || isXl) && <MobileTableOfContents headings={rightToc} />}
        {defaultTitle && <H1>{displayName}</H1>}
        {content}
      </MDXProvider>
    );
  };
};

MDXDefaultLayout.displayName = 'MDXDefaultLayout';

export default MDXDefaultLayout;
