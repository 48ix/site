import * as React from 'react';
import {
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Stack,
  useTheme,
  useColorMode,
} from '@chakra-ui/core';
// import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';
import LittleGraph from './Graphs/LittleGraph';
import filesize from 'filesize';

const lineColor = { dark: 'white', light: 'gray' };

const exampleData = [
  100000000, // 100M
  50000000, // 50M
  300000000, // 300M
  100000000, // 100M
  120000000, // 120M
  80000000, // 80M
  80000000, // 60M
  40000000, // 40M
  100000000, // 100M
  300000000, // 300M
  600000000, // 600M
  1000000000, // 1G
  500000000, // 500M
  600000000, // 600M
  800000000, // 800M
  1000000000, // 1G
  150000000, // 1.5G
];
const exampleCurrent = 200000000; // 200M
const examplePeak = 2000000000; // 2G
const exampleAvg = 120000000; // 120M

const humanData = data => {
  data = data / 8;
  const dataStr = filesize(data, { bits: true, base: 8 });
  return `${dataStr}ps`;
};

const HeaderGraph = ({
  data = exampleData,
  current = exampleCurrent,
  peak = examplePeak,
  average = exampleAvg,
  ...props
}) => {
  const { colorMode } = useColorMode();
  const theme = useTheme();
  const refLineColor = { dark: theme.colors.original.red, light: theme.colors.original.red };
  const topColor = { dark: theme.colors.whiteAlpha[800], light: theme.colors.blackAlpha[800] };
  const bottomColor = { dark: theme.colors.whiteAlpha[600], light: theme.colors.blackAlpha[600] };
  return (
    <Stack isInline {...props} alignItems="center" justifyContent="space-around">
      <StatGroup
        flexDir={['column', 'column', 'row']}
        alignItems={['flex-end', 'flex-end', null]}
        color={lineColor[colorMode]}>
        <Stat pr={[1, 1, null]} textAlign={['right', 'right', null]}>
          <StatLabel fontWeight="light" fontSize={['xs', 'xs', null]} whiteSpace="pre">
            Current
          </StatLabel>
          <StatNumber fontSize="xs" whiteSpace="pre">
            {humanData(current)}
          </StatNumber>
        </Stat>
        <Stat pr={[1, 1, null]} textAlign={['right', 'right', null]}>
          <StatLabel fontWeight="light" fontSize={['xs', 'xs', null]} whiteSpace="pre">
            Peak
          </StatLabel>
          <StatNumber fontSize="xs" whiteSpace="pre">
            {humanData(peak)}
          </StatNumber>
        </Stat>
      </StatGroup>
      <Flex>
        <LittleGraph
          circuitId="1.84047.19322.5026"
          yRef
          refColor={refLineColor}
          topColor={topColor}
          bottomColor={bottomColor}
        />
      </Flex>
    </Stack>
  );
};

HeaderGraph.displayName = 'HeaderGraph';

export default HeaderGraph;
