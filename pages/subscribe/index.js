import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { Box, Heading, Text } from '@chakra-ui/react';
import NotFound from '../404';
import queryString from 'query-string';
import { useColorValue } from '~context';

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

const Subscribe = () => {
  const router = useRouter();
  const highlightColor = useColorValue('blue.500', 'teal.300');
  const textColor = useColorValue('blackAlpha.700', 'whiteAlpha.600');

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
            <Text as="span" color={highlightColor}>
              {`${emailAddr} `}
            </Text>
            has been added to the
            <Text as="span" color={highlightColor}>{` ${listName} `}</Text>
            mailing list.
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default Subscribe;
