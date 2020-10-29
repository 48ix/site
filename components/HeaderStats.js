import * as React from 'react';
import { useMemo } from 'react';
import NextLink from 'next/link';
import {
  Button,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Stack,
  useColorMode,
} from '@chakra-ui/core';
import LittleGraph from './Graphs/LittleGraph';
import { useUtilization, useParticipantStats } from '../hooks/useUtilization';
import filesize from 'filesize';

const lineColor = { dark: 'white', light: 'black' };

const humanData = data => {
  const dataStr = filesize(data / 8, { bits: true, base: 8 });
  return `${dataStr}ps`;
};

const Statistic = ({ label, value, ...props }) => {
  return (
    <Stat pr={[1, 1, 4]} textAlign={['right', 'right', null]} {...props}>
      <StatLabel opacity={0.8} fontWeight="normal" fontSize={['xs', 'xs', null]} whiteSpace="pre">
        {label}
      </StatLabel>
      <StatNumber fontSize="xs" whiteSpace="pre">
        {value}
      </StatNumber>
    </Stat>
  );
};

const HeaderGraph = ({ data, ...props }) => (
  <NextLink href="/traffic" passHref>
    <Button
      aria-label="View Statistics"
      isLoading={!data}
      variant="link"
      _hover={{ textDecoration: 'none' }}
      {...props}>
      {data && <LittleGraph data={data} yRef />}
    </Button>
  </NextLink>
);

const HeaderStats = props => {
  const { colorMode } = useColorMode();
  const { data, error, isError, isLoading } = useUtilization('all');

  isError && console.error(error);

  const { asns } = useParticipantStats();

  const dataCurrent = useMemo(() => humanData(data?.ingress?.slice(-1)[0]?.[1] ?? 0), [isLoading]);
  const dataPeak = useMemo(() => humanData(data?.ingress_peak ?? 0), [isLoading]);
  const numAsns = useMemo(() => new Set(asns).size, [asns.length]);

  return (
    <Stack isInline {...props} alignItems="center" justifyContent="space-around">
      <StatGroup
        flexDir={['column', 'column', 'row']}
        alignItems={['flex-end', 'flex-end', null]}
        color={lineColor[colorMode]}>
        <Statistic label="ASNs" value={numAsns} />
        <Statistic label="Current" value={dataCurrent} />
        <Statistic label="Peak" value={dataPeak} />
      </StatGroup>
      <Flex>
        <HeaderGraph data={data} />
      </Flex>
    </Stack>
  );
};

export default HeaderStats;
