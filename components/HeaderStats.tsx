import { useMemo } from 'react';
import NextLink from 'next/link';
import {
  Flex,
  Stat,
  Stack,
  Button,
  Spinner,
  StatLabel,
  StatGroup,
  StatNumber,
} from '@chakra-ui/react';
import { LittleGraph } from '~components';
import { useColorValue } from '~context';
import { useUtilization, useIXF } from '~hooks';
import filesize from 'filesize';

import type { ButtonProps, StatProps, StackProps } from '@chakra-ui/react';
import type { UtilizationAllResponse } from '~types';

interface StatisticProps extends StatProps {
  label: React.ReactNode;
  value: React.ReactNode;
}

interface HeaderGraphProps extends ButtonProps {
  data: UtilizationAllResponse | undefined;
}

interface HeaderStatsProps extends StackProps {}

function humanData(data: number) {
  const dataStr = filesize(data / 8, { bits: true, base: 8 });
  return `${dataStr}ps`;
}

const Statistic: React.FC<StatisticProps> = (props: StatisticProps) => {
  const { label, value, ...rest } = props;
  return (
    <Stat pr={{ base: 1, lg: 4 }} textAlign={{ base: 'right', lg: undefined }} {...rest}>
      <StatLabel
        opacity={0.8}
        whiteSpace="pre"
        fontWeight="normal"
        fontSize={{ base: 'xs', lg: undefined }}>
        {label}
      </StatLabel>
      <StatNumber fontSize="xs" whiteSpace="pre">
        {value}
      </StatNumber>
    </Stat>
  );
};

const HeaderGraph: React.FC<HeaderGraphProps> = (props: HeaderGraphProps) => {
  const { data, ...rest } = props;
  return (
    <NextLink href="/traffic" passHref>
      <Button
        aria-label="View Statistics"
        isLoading={!data}
        variant="link"
        _hover={{ textDecoration: 'none' }}
        {...rest}>
        {data && <LittleGraph data={data} yRef />}
      </Button>
    </NextLink>
  );
};

export const HeaderStats: React.FC<HeaderStatsProps> = (props: HeaderStatsProps) => {
  const { data, isLoading } = useUtilization<UtilizationAllResponse>('all');
  const lineColor = useColorValue('black', 'white');
  const spinnerColor = useColorValue('red.500', 'yellow.200');
  const ixf = useIXF();

  const dataCurrent = useMemo(() => humanData(data?.ingress?.slice(-1)[0]?.[1] ?? 0), [isLoading]);
  const dataPeak = useMemo(() => humanData(data?.ingress_peak ?? 0), [isLoading]);

  let numAsns = 0;

  if (typeof ixf !== 'undefined') {
    numAsns = new Set(ixf.member_list).size;
  }

  return (
    <Stack isInline {...props} alignItems="center" justifyContent="space-around">
      <StatGroup
        flexDir={['column', 'column', 'row']}
        alignItems={['flex-end', 'flex-end', null]}
        color={lineColor}>
        {numAsns === 0 ? (
          <Statistic label="ASNs" value={<Spinner size="xs" color={spinnerColor} />} />
        ) : (
          <Statistic label="ASNs" value={numAsns} />
        )}
        <Statistic label="Current" value={dataCurrent} />
        <Statistic label="Peak" value={dataPeak} />
      </StatGroup>
      <Flex>
        <HeaderGraph data={data} />
      </Flex>
    </Stack>
  );
};
