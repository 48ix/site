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
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';
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
  return (
    <Stack isInline>
      <StatGroup>
        <Stat>
          <StatLabel fontWeight="lighter" whiteSpace="pre">
            Current
          </StatLabel>
          <StatNumber fontSize="xs" whiteSpace="pre">
            {humanData(current)}
          </StatNumber>
        </Stat>
        <Stat>
          <StatLabel fontWeight="lighter" whiteSpace="pre">
            Peak
          </StatLabel>
          <StatNumber fontSize="xs" whiteSpace="pre">
            {humanData(peak)}
          </StatNumber>
        </Stat>
      </StatGroup>
      <Flex>
        <Sparklines data={data} svgHeight={40} margin={5} {...props}>
          <SparklinesLine color={lineColor[colorMode]} style={{ fill: 'none' }} />
          <SparklinesReferenceLine
            value={average}
            style={{
              stroke: refLineColor[colorMode],
              strokeDasharray: '2,2',
            }}
          />
        </Sparklines>
      </Flex>
    </Stack>
  );
};

HeaderGraph.displayName = 'HeaderGraph';

export default HeaderGraph;
