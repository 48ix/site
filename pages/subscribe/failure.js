import * as React from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Heading,
  Link,
  Text,
  useColorMode,
} from '@chakra-ui/core';
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

const textColor = { dark: 'red.300', light: 'red.400' };
const highlightColor = { dark: 'whiteAlpha.800', light: 'blackAlpha.800' };

const Failure = () => {
  const router = useRouter();
  const { colorMode } = useColorMode();
  if (Object.keys(router.query).length === 0) {
    return <NotFound />;
  }
  const { emailAddr, listName, error } = readQuery(router.query);
  if (typeof emailAddr === 'undefined' || typeof listName === 'undefined') {
    return <NotFound />;
  }
  return (
    <>
      <NextSeo noindex nofollow />
      <Box mt={32} px={16} textAlign="center">
        <Heading color={textColor[colorMode]}>
          Something went wrong while attempting to subscribe
          <Text as="span" color={highlightColor[colorMode]}>
            {` ${emailAddr} `}
          </Text>
          to the
          <Text as="span" color={highlightColor[colorMode]}>{` ${listName} `}</Text>
          mailing list.
        </Heading>
        <Box mt={8}>
          <Text color="gray.500">
            <Link as="a" to="mailto:noc@48ix.net" isExternal>
              Please contact the NOC so we can look into this.
            </Link>
          </Text>
        </Box>
        {typeof error !== 'undefined' && (
          <Alert
            status="error"
            flexDirection="column"
            justifyContent="center"
            textAlign="center"
            mx="auto"
            borderRadius="md"
            mt={8}
            maxW={[null, null, '50%', '50%']}>
            <AlertIcon size="32px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Error Details
            </AlertTitle>
            <AlertDescription maxWidth="sm">{error}</AlertDescription>
          </Alert>
        )}
      </Box>
    </>
  );
};

export default Failure;
