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
import LittleGraph from './Graphs/LittleGraph';
import filesize from 'filesize';

const lineColor = { dark: 'white', light: 'gray' };

const exampleCurrent = 200000000; // 200M
const examplePeak = 2000000000; // 2G

const humanData = data => {
  data = data / 8;
  const dataStr = filesize(data, { bits: true, base: 8 });
  return `${dataStr}ps`;
};

const HeaderGraph = ({ current = exampleCurrent, peak = examplePeak, ...props }) => {
  const { colorMode } = useColorMode();
  const theme = useTheme();
  const refLineColor = { dark: theme.colors.original.red, light: theme.colors.original.red };
  const topColor = { dark: theme.colors.teal[300], light: theme.colors.blue[500] };
  const bottomColor = { dark: theme.colors.teal[700], light: theme.colors.blue[200] };
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
