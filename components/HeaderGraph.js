import * as React from 'react';
import { useMemo } from 'react';
import { Flex, Stat, StatLabel, StatNumber, StatGroup, Stack, useColorMode } from '@chakra-ui/core';
import LittleGraph from './Graphs/LittleGraph';
import filesize from 'filesize';

const lineColor = { dark: 'white', light: 'gray' };

const humanData = data => {
  data = data / 8;
  const dataStr = filesize(data, { bits: true, base: 8 });
  return `${dataStr}ps`;
};

const HeaderGraph = props => {
  const current = 200000000;
  const peak = 2000000000;
  const { colorMode } = useColorMode();
  const dataCurrent = useMemo(() => humanData(current), [current]);
  const dataPeak = useMemo(() => humanData(peak), [peak]);
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
            {dataCurrent}
          </StatNumber>
        </Stat>
        <Stat pr={[1, 1, null]} textAlign={['right', 'right', null]}>
          <StatLabel fontWeight="light" fontSize={['xs', 'xs', null]} whiteSpace="pre">
            Peak
          </StatLabel>
          <StatNumber fontSize="xs" whiteSpace="pre">
            {dataPeak}
          </StatNumber>
        </Stat>
      </StatGroup>
      <Flex>
        <LittleGraph circuitId="1.84047.19322.5026" yRef />
      </Flex>
    </Stack>
  );
};

export default HeaderGraph;
