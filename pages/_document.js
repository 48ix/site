import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { Box } from '@chakra-ui/core';

const Body = ({ children }) => (
  <Box as="body" w="100%" h="100%" minH="100%" overflowX="hidden" margin={0}>
    {children}
  </Box>
);

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <Body>
          <Main />
          <NextScript />
        </Body>
      </Html>
    );
  }
}

export default MyDocument;
