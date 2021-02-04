import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import {
  Box,
  Text,
  Alert,
  Center,
  Heading,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import NotFound from '../404';

import { useColorValue } from '~context';
import { useSubscribeQuery } from '~hooks';

const Subscribe: React.FC = () => {
  const { query } = useRouter();

  if (Object.keys(query).length === 0) {
    return <NotFound />;
  }

  const highlightColor = useColorValue('blue.500', 'teal.300');
  const textColor = useColorValue('blackAlpha.700', 'whiteAlpha.600');

  const { emailAddr, listName, error } = useSubscribeQuery(query);

  if (typeof error !== 'undefined') {
    return (
      <Center mt={32}>
        <Alert
          status="error"
          height="200px"
          variant="subtle"
          borderRadius="lg"
          textAlign="center"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          maxW={{ base: '100%', lg: '50%' }}>
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Error
          </AlertTitle>
          <AlertDescription maxWidth="sm">{error}</AlertDescription>
        </Alert>
      </Center>
    );
  }

  if (typeof emailAddr === 'undefined' || typeof listName === 'undefined') {
    return <NotFound />;
  }

  return (
    <>
      <NextSeo noindex nofollow />
      <Box mt={32} textAlign="center">
        <Heading>Thank you for subscribing!</Heading>
        <Box mt={4}>
          <Text color={textColor}>
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
