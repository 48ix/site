import * as React from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { Box, Heading, Text, useColorMode } from '@chakra-ui/core';
import NotFound from '../404';
import queryString from 'query-string';

const readQuery = query => {
  let parsed = {};
  try {
    const [encoded] = Object.keys(query);
    const decoded = decodeURIComponent(atob(encoded));
    parsed = queryString.parse(decoded);
  } catch (err) {
    console.warn(err);
  }
  return parsed;
};

const highlightColor = { dark: 'teal.300', light: 'blue.500' };
const textColor = { dark: 'whiteAlpha.600', light: 'blackAlpha.700' };

const Subscribe = () => {
  const router = useRouter();
  const { colorMode } = useColorMode();
  if (Object.keys(router.query).length === 0) {
    return <NotFound />;
  }
  const { emailAddr, listName } = readQuery(router.query);
  if (typeof emailAddr === 'undefined' || typeof listName === 'undefined') {
    return <NotFound />;
  }
  return (
    <>
      <NextSeo noindex nofollow />
      <Box mt={32} textAlign="center">
        <Heading>Thank you for subscribing!</Heading>
        <Box mt={4}>
          <Text color={textColor[colorMode]}>
            <Text as="span" color={highlightColor[colorMode]}>
              {`${emailAddr} `}
            </Text>
            has been added to the
            <Text as="span" color={highlightColor[colorMode]}>{` ${listName} `}</Text>
            mailing list.
          </Text>
        </Box>
      </Box>
    </>
  );
};

Subscribe.displayName = 'Subscribe';

export default Subscribe;
