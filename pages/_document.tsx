import Document, { Html, Head, Main, NextScript } from 'next/document';

import type { DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="dns-prefetch" href="//fonts.googleapis.com" />
          <link rel="dns-prefetch" href="//fonts.gstatic.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href={`https://fonts.googleapis.com/css2?family=Fira+Code:wght@400&family=Inter:wght@200;400;600;800&display=swap`}
            rel="stylesheet"
          />
          <link
            as="fetch"
            rel="preload"
            crossOrigin="anonymous"
            href={`${process.env.NEXT_PUBLIC_UTILIZATION_URL}/utilization/all`}
          />
          <link rel="preconnect" href="https://www.google-analytics.com" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
