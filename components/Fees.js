import * as React from 'react';
import dynamic from 'next/dynamic';
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  List,
  ListItem,
  ListIcon,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/core';
import { ProductJsonLd } from 'next-seo';
import { useGlobalState, useConfig } from './Provider';

const AiOutlineNumber = dynamic(() => import('react-icons/ai').then(i => i.AiOutlineNumber));
const BsFillLightningFill = dynamic(() =>
  import('react-icons/bs').then(i => i.BsFillLightningFill),
);

const listColor = { dark: 'light.300', light: 'gray.700' };
const intervalColor = { dark: 'gray.300', light: 'gray.800' };

const FeatureList = () => {
  const { colorMode } = useColorMode();
  return (
    <Box color={listColor[colorMode]} fontWeight="semibold" fontSize="sm" ml={2} mt={4}>
      <List style={{ columnCount: 2 }} spacing={1}>
        <ListItem>
          <ListIcon
            icon={AiOutlineNumber}
            color={{ dark: 'purple.300', light: 'purple.500' }[colorMode]}
          />
          Per Port
        </ListItem>
        <ListItem>
          <ListIcon icon="minus" color={{ dark: 'yellow.300', light: 'yellow.400' }[colorMode]} />
          Single-mode fiber
        </ListItem>
        <ListItem>
          <ListIcon icon="minus" color={{ dark: 'teal.300', light: 'teal.500' }[colorMode]} />
          Multi-mode fiber
        </ListItem>
        <ListItem>
          <ListIcon icon="check" color={{ dark: 'green.300', light: 'green.600' }[colorMode]} />
          No contracts
        </ListItem>
        <ListItem>
          <ListIcon
            icon={BsFillLightningFill}
            color={{ dark: 'red.300', light: 'red.500' }[colorMode]}
          />
          1 or 10 Gbps
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
const Fee = ({ price, interval, formId, badges = [], ...props }) => {
  const { colorMode } = useColorMode();
  const { joinFormOnOpen, setJoinFormInterval } = useGlobalState();

  const handleClick = interval => {
    if (typeof interval !== 'undefined') {
      setJoinFormInterval(interval);
    }
    joinFormOnOpen();
  };
  return (
    <>
      <Button
        display="flex"
        flexDirection="column"
        flex="1 0 100%"
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        overflow="hidden"
        height="unset"
        variant="ghost"
        verticalAlign="unset"
        textAlign="unset"
        lineHeight="unset"
        p={6}
        my={[4, 4, 0]}
        onClick={() => handleClick(formId)}
        {...props}>
        <Box h="100%" w="100%">
          <Heading mt={1} as="h4" fontWeight="medium" fontSize="5xl" lineHeight="tight" isTruncated>
            <Text mr={1} as="span" fontWeight="light">
              {`$`}
            </Text>
            {`${price}`}
            <Text ml={1} as="span" color={intervalColor[colorMode]} fontSize="md">
              {`/ ${interval}`}
            </Text>
          </Heading>
          <FeatureList />
          {badges.length !== 0 && (
            <Stack pt={4} isInline justifyContent="flex-end">
              {badges.map(badge => (
                <Badge key={badge.text} rounded="md" px={2} variantColor={badge.color || 'blue'}>
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

const Fees = () => {
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
        productName="Port (Monthly)"
        description="Internet Exchange Port, 1 Gbps or 10 Gbps"
        brand="48 IX"
        offers={[
          {
            price: 60,
            priceCurrency: 'USD',
            url: `${config.url}/fees`,
          },
        ]}
      />
      <ProductJsonLd
        productName="Port (Annual)"
        description="Internet Exchange Port, 1 Gbps or 10 Gbps"
        brand="48 IX"
        offers={[
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

FeatureList.displayName = 'FeatureList';
Fee.displayName = 'Fee';
Fees.displayName = 'Fees';

export default Fees;
