import * as React from 'react';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { Box, Button, Divider, Flex, Heading, Grid, Text, useColorMode } from '@chakra-ui/core';
import { NextSeo } from 'next-seo';
import { useGlobalState, useConfig } from '../components/Provider';

const Equals = dynamic(() => import('../components/Icons/Equals'));
const Heart = dynamic(() => import('../components/Icons/Heart'));
const LightningBolt = dynamic(() => import('../components/Icons/LightningBolt'));
const FoldedMap = dynamic(() => import('../components/Icons/FoldedMap'));
const Logo = dynamic(() => import('../components/Logo').then(i => i.Logo));

const accent = { dark: 'teal.500', light: 'blue.500' };
const accentVar = { dark: 'teal', light: 'blue' };
const text = { dark: 'white', light: 'black' };

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
        <Heading as="h3" size="md" fontSize="3xl" fontWeight="medium" ml={4} display="inline">
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
  const config = useConfig();
  return (
    <>
      <NextSeo title={`${config.title} | ${config.siteSlogan}`} titleTemplate="%s" />
      <Box as="section" pt={18} pb={24}>
        <Container textAlign="center">
          <Box mt={[null, null, 8, 8]} mb={8} display="inline-block">
            <Logo size={256} />
          </Box>
          <Heading
            as="h1"
            fontSize="6xl"
            fontWeight="bold"
            color={accent[colorMode]}
            textAlign={['justify', 'justify', 'inherit']}>
            <Text as="span" fontWeight="normal" color={text[colorMode]}>{`Arizona's `}</Text>
            <br />
            Open Internet Exchange
          </Heading>

          <Text as="h2" opacity="0.7" fontSize="xl" mt={6}>
            The neutral interconnection fabric for a better internet.
          </Text>

          <Box mt={12}>
            <Button
              size="lg"
              fontWeight="normal"
              variantColor={accentVar[colorMode]}
              m={2}
              onClick={joinFormOnOpen}>
              Join the Exchange
            </Button>
            <NextLink href="/network" passHref>
              <Button
                as="a"
                fontWeight="normal"
                size="lg"
                m={2}
                rightIcon={props => <FoldedMap size="1.5em" {...props} />}>
                Where to Connect
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
          <Feature icon={Equals} title="Neutral">
            48 IX is a neutral, nonprofit team dedicated to advancing Arizona's internet
            connectivity.
          </Feature>
          <Feature icon={LightningBolt} title="Fast">
            Reduce hops, lower latency, and increase bandwidth through faster, more direct paths.
          </Feature>
          <Feature icon={Heart} title="Direct">
            Bring a better internet to Arizona through direct connectivity to ISPs, CDNs, & the
            cloud.
          </Feature>
        </Grid>
      </Container>

      <Divider my={16} />
    </>
  );
};
