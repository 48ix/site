import * as React from 'react';
import { useMemo } from 'react';
import NextLink from 'next/link';
import useSWR from 'swr';
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
import filesize from 'filesize';

const lineColor = { dark: 'white', light: 'black' };

const humanData = data => {
  const dataStr = filesize(data, { bits: true, base: 8 });
  return `${dataStr}ps`;
};

const fetcher = async url => {
  const res = await fetch(url);
  return await res.json();
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
  const { data: utilization, error: utilizationError } = useSWR(
    `${process.env.NEXT_PUBLIC_UTILIZATION_URL}/utilization/all`,
    fetcher,
  );
  utilizationError && console.error(utilizationError);

  const { data: participants, error: participantsError } = useSWR(
    process.env.NEXT_PUBLIC_PARTICIPANT_URL,
    fetcher,
    { revalidateOnFocus: false, revalidateOnReconnect: false },
  );
  participantsError && console.error(participantsError);

  const dataCurrent = useMemo(() => humanData(utilization?.ingress?.slice(-1)[0]?.[1] ?? 0), [
    utilization,
  ]);
  const dataPeak = useMemo(() => humanData(utilization?.ingress_peak ?? 0), [utilization]);
  const asns = useMemo(() => participants?.rows.map(r => r.asn), [participants]);
  const numAsns = useMemo(() => new Set(asns).size, [asns]);
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
        <HeaderGraph data={utilization} />
      </Flex>
    </Stack>
  );
};

export default HeaderStats;
