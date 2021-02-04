import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { Box, chakra, Button, Divider, Flex, Heading, Grid, Text } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { Logo, Feature } from '~components';
import { useConfig, useColorValue, useJoinForm } from '~context';

const Equals = dynamic<MeronexIcon>(() => import('@meronex/icons/fa').then(i => i.FaEquals));
const Heart = dynamic<MeronexIcon>(() => import('@meronex/icons/bs').then(i => i.BsHeartFill));
const LightningBolt = dynamic<MeronexIcon>(() =>
  import('@meronex/icons/bs').then(i => i.BsLightningFill),
);
const FoldedMap = dynamic<MeronexIcon>(() =>
  import('@meronex/icons/ri').then(i => i.RiTreasureMapLine),
);

const Container = chakra('div', { baseStyle: { mx: 'auto' } });

const Home = () => {
  const config = useConfig();
  const accent = useColorValue('blue.500', 'teal.500');
  const colorScheme = useColorValue('blue', 'teal');
  const text = useColorValue('black', 'white');
  const { onOpen } = useJoinForm();
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
            color={accent}
            fontWeight="bold"
            textAlign={{ base: 'justify', lg: 'inherit' }}>
            <Text as="span" fontWeight="normal" color={text}>{`Arizona's `}</Text>
            <br />
            Open Internet Exchange
          </Heading>

          <Text as="h2" opacity="0.7" fontSize="xl" mt={6}>
            The neutral interconnection fabric for a better internet.
          </Text>

          <Box mt={12}>
            <Button m={2} size="lg" fontWeight="normal" onClick={onOpen} colorScheme={colorScheme}>
              Join the Exchange
            </Button>
            <NextLink href="/network" passHref>
              <Button
                m={2}
                as="a"
                size="lg"
                fontWeight="normal"
                rightIcon={<FoldedMap size="1.5em" />}>
                Where to Connect
              </Button>
            </NextLink>
          </Box>
        </Container>
      </Box>

      <Divider my={16} />

      <Container px={4}>
        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }}
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

export default Home;
