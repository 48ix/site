import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import {
  Box,
  Link,
  Text,
  Alert,
  Heading,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
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

const Failure = () => {
  const router = useRouter();
  const textColor = useColorValue('red.400', 'red.300');
  const highlightColor = useColorValue('blackAlpha.800', 'whiteAlpha.800');

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
        <Heading color={textColor}>
          Something went wrong while attempting to subscribe
          <Text as="span" color={highlightColor}>
            {` ${emailAddr} `}
          </Text>
          to the
          <Text as="span" color={highlightColor}>{` ${listName} `}</Text>
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
            mt={8}
            mx="auto"
            status="error"
            borderRadius="md"
            textAlign="center"
            flexDirection="column"
            justifyContent="center"
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
