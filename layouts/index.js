import * as React from 'react';
import { NextSeo } from 'next-seo';
import title from 'title';
import { H1 } from '../components/MDXComponents/Headings';

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
  return ({ children }) => (
    <>
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
      {defaultTitle && <H1>{displayName}</H1>}
      {children}
    </>
  );
};

MDXDefaultLayout.displayName = 'MDXDefaultLayout';

export default MDXDefaultLayout;
