import * as React from 'react';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { Box, Button, Divider, Flex, Heading, Grid, Text, useColorMode } from '@chakra-ui/core';
import { NextSeo } from 'next-seo';
import { useGlobalState, useMedia, useConfig } from '../components/Provider';

const FaDollarSign = dynamic(() => import('react-icons/fa').then(i => i.FaDollarSign));
const IoMdBook = dynamic(() => import('react-icons/io').then(i => i.IoMdBook));
const IoIosGitNetwork = dynamic(() => import('react-icons/io').then(i => i.IoIosGitNetwork));
const LightningBolt = dynamic(() => import('../components/Icons/LightningBolt'));
const JoinForm = dynamic(() => import('../components/JoinForm'));
const StateOutline = dynamic(() => import('../components/Logo').then(i => i.StateOutline));

const accent = { dark: 'teal.500', light: 'blue.500' };
const accentVar = { dark: 'teal', light: 'blue' };

const Container = props => <Box mx="auto" {...props} />;

const Feature = ({ title, icon, children, ...props }) => {
  const { colorMode } = useColorMode();
  return (
    <Box {...props}>
      <Flex mt={6} mb={4} direction="row" align="center">
        <Flex
          display="inline-flex"
          rounded="full"
          size={12}
          bg={accent[colorMode]}
          align="center"
          justify="center">
          <Box size={6} color="white" as={icon} />
        </Flex>
        <Heading as="h2" size="md" fontWeight="medium" ml={4} display="inline">
          {title}
        </Heading>
      </Flex>

      <Text fontSize="sm" opacity="0.7">
        {children}
      </Text>
    </Box>
  );
};

export default () => {
  const { colorMode } = useColorMode();
  const { joinFormOnOpen } = useGlobalState();
  const { isSm, isMd } = useMedia();
  const config = useConfig();
  return (
    <>
      <NextSeo title={`${config.title} ❯ ${config.siteSlogan}`} titleTemplate="%s" />
      <Box as="section" pt={18} pb={24}>
        <Container textAlign="center">
          <Box mt={[null, null, 8, 8]} mb={8} display="inline-block">
            <StateOutline size={256} />
          </Box>
          <Heading as="h1" size="xl">
            <Text as="span" fontWeight="normal">{`Arizona's `}</Text>
            <br />
            <Text as="span" fontWeight="bold" color={accent[colorMode]}>
              Open Internet Exchange
            </Text>
          </Heading>

          <Text as="h2" opacity="0.7" fontSize="xl" mt={6}>
            {config.siteDescription}
          </Text>

          <Box mt={12}>
            <Button size="lg" variantColor={accentVar[colorMode]} m={2} onClick={joinFormOnOpen}>
              Join the Exchange
            </Button>
            <NextLink href="/connection-policy" passHref>
              <Button
                as="a"
                size="lg"
                m={2}
                leftIcon={props => <IoMdBook size="1.5em" {...props} />}>
                Read the Docs
              </Button>
            </NextLink>
          </Box>
        </Container>
      </Box>

      <Divider my={16} />

      <Container px={4}>
        <Grid
          templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }}
          gap={10}
          px={{ md: 8 }}>
          <Feature icon={FaDollarSign} title="Cost Effective">
            Routing through a well-connected internet exchange drastically reduces upstream transit
            costs.
          </Feature>
          <Feature icon={LightningBolt} title="Fast">
            Reduce hops, lower latency, increase bandwidth by using more direct paths between
            networks.
          </Feature>
          <Feature icon={IoIosGitNetwork} title="Reliable">
            Reduce reliance on upstream transit providers by peering directly.
          </Feature>
        </Grid>
      </Container>

      <Divider my={16} />
      {(isSm || isMd) && <JoinForm />}
    </>
  );
};
