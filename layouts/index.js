import { useEffect } from 'react';
import { MDXProvider } from '@mdx-js/react';
import MDXComponents from '../components/MDXComponents';
import { NextSeo } from 'next-seo';
import { title } from '../util';
import { useGlobalState, useMedia } from '../components/Provider';
import { H1 } from '../components/MDXComponents/Headings';
import TableOfContents from '../components/TableOfContents';
import MobileTableOfContents from '../components/MobileTableOfContents';

const MDXDefaultLayout = props => {
  const { frontMatter, children, rightToc } = props;

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

  const { isSm, isMd, isLg, isXl } = useMedia();
  const { hideToc: currentHideToc, setHideToc } = useGlobalState();

  useEffect(() => {
    if (hideToc === true && currentHideToc === false) {
      setHideToc(true);
    } else if (hideToc === false && currentHideToc === true) {
      setHideToc(false);
    }
  });

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
      {(isLg || isXl) && !currentHideToc && <TableOfContents headings={rightToc} />}
      {(isSm || isMd) && !currentHideToc && <MobileTableOfContents headings={rightToc} />}
      {defaultTitle && <H1>{displayName}</H1>}
      {children}
    </MDXProvider>
  );
};

export default MDXDefaultLayout;
