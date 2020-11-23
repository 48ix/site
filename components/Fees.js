import dynamic from 'next/dynamic';
import {
  Box,
  Flex,
  List,
  Text,
  Badge,
  Stack,
  Button,
  Heading,
  ListIcon,
  ListItem,
} from '@chakra-ui/react';
import { ProductJsonLd } from 'next-seo';
import { useColorValue, useConfig, useJoinForm, useJoinTerm } from '~context';

const LightningBolt = dynamic(() => import('@meronex/icons/bs').then(i => i.BsLightningFill));
const Hashtag = dynamic(() => import('@meronex/icons/fi').then(i => i.FiHash));
const Minus = dynamic(() => import('@meronex/icons/fa').then(i => i.FaMinus));
const Check = dynamic(() => import('@meronex/icons/fa').then(i => i.FaCheck));

const FeatureList = () => {
  const listColor = useColorValue('gray.700', 'light.300');
  const hashColor = useColorValue('purple.500', 'purple.300');
  const smf = useColorValue('yellow.400', 'yellow.300');
  const mmf = useColorValue('teal.500', 'teal.300');
  const contracts = useColorValue('green.600', 'green.300');
  const speed = useColorValue('red.500', 'red.300');
  return (
    <Box color={listColor} fontWeight="semibold" fontSize="sm" ml={2} mt={4}>
      <List style={{ columnCount: 2 }} spacing={1}>
        <ListItem>
          <ListIcon as={Hashtag} color={hashColor} />
          Per Port
        </ListItem>
        <ListItem>
          <ListIcon as={Minus} color={smf} />
          Single-mode fiber
        </ListItem>
        <ListItem>
          <ListIcon as={Minus} color={mmf} />
          Multi-mode fiber
        </ListItem>
        <ListItem>
          <ListIcon as={Check} color={contracts} />
          No contracts
        </ListItem>
        <ListItem>
          <ListIcon as={LightningBolt} color={speed} />1 or 10 Gbps
        </ListItem>
      </List>
    </Box>
  );
};

/**
 * A single price card.
 * @param {string} price Price, no dollar sign
 * @param {string} interval Interval, no forward-slash
 * @param {string} formId ID to set as the selected value when opening the join form
 * @param {Object[]} badges Array of badges, format: {text: '<text>', color: '<color>'}
 */
const Fee = ({ price, interval, formId = 'annual', badges = [], ...props }) => {
  const { onOpen } = useJoinForm();
  const { setTerm } = useJoinTerm();
  const intervalColor = useColorValue('gray.800', 'gray.300');

  const handleClick = () => {
    setTerm(formId);
    onOpen();
  };
  return (
    <>
      <Button
        p={6}
        maxW="sm"
        rounded="lg"
        display="flex"
        height="unset"
        my={[4, 4, 0]}
        flex="1 0 100%"
        variant="ghost"
        borderWidth="1px"
        overflow="hidden"
        textAlign="unset"
        lineHeight="unset"
        verticalAlign="unset"
        onClick={handleClick}
        flexDirection="column"
        {...props}>
        <Box h="100%" w="100%">
          <Heading mt={1} as="h2" fontWeight="medium" fontSize="5xl" lineHeight="tight" isTruncated>
            <Text mr={1} as="span" fontWeight="light">
              {`$`}
            </Text>
            {`${price}`}
            <Text ml={1} as="span" color={intervalColor} fontSize="md">
              {`/ ${interval}`}
            </Text>
          </Heading>
          <FeatureList />
          {badges.length !== 0 && (
            <Stack pt={4} isInline justifyContent="flex-end">
              {badges.map(badge => (
                <Badge key={badge.text} rounded="md" px={2} colorScheme={badge.color || 'blue'}>
                  {badge.text || 'You forgot something'}
                </Badge>
              ))}
            </Stack>
          )}
        </Box>
      </Button>
    </>
  );
};

export const Fees = () => {
  const config = useConfig();
  return (
    <>
      <Flex
        my={[4, 4, 8]}
        flex="1 0 100%"
        justify={['center', 'center', 'space-between']}
        align="stretch"
        flexDirection={['column', 'column', 'row']}>
        <Fee price={60} interval="month" formId="monthly" />
        <Fee
          price={600}
          interval="year"
          formId="annual"
          badges={[{ text: '16% Savings', color: 'green' }]}
        />
      </Flex>
      <ProductJsonLd
        productName="Port"
        description="Internet Exchange Port, 1 Gbps or 10 Gbps"
        brand="48 IX"
        offers={[
          {
            price: 60,
            priceCurrency: 'USD',
            url: `${config.url}/fees`,
          },
          {
            price: 600,
            priceCurrency: 'USD',
            url: `${config.url}/fees`,
          },
        ]}
      />
    </>
  );
};
