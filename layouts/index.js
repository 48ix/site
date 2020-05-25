import * as React from 'react';
import { NextSeo } from 'next-seo';
import { H1 } from '../components/MDXComponents/Headings';

const MDXDefaultLayout = ({
  id,
  title,
  description,
  keywords = [],
  defaultTitle = true,
  __resourcePath,
}) => {
  let pageId = id;
  if (typeof pageId === 'undefined') {
    [pageId] = __resourcePath.split('.mdx');
  }
  return ({ children }) => (
    <>
      <NextSeo
        title={title}
        description={description}
        additionalMetaTags={[{ name: 'keywords', content: keywords.join(',') }]}
        openGraph={{
          title: title,
          url: `https://48ix.net/${pageId}`,
          description: description,
        }}
      />
      {defaultTitle && <H1>{title}</H1>}
      {children}
    </>
  );
};

MDXDefaultLayout.displayName = 'MDXDefaultLayout';

export default MDXDefaultLayout;
