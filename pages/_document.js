import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

const Body = ({ children }) => (
  <body className="body">
    {children}
    <style jsx>{`
      .body {
        width: 100%;
        height: 100%;
        min-height: 100%;
        overflow-x: hidden;
        margin: 0;
      }
    `}</style>
  </body>
);

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://www.google-analytics.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
        </Head>
        <Body>
          <Main />
          <NextScript />
        </Body>
      </Html>
    );
  }
}

export default MyDocument;
