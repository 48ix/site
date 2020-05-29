import * as React from 'react';
import { useCallback, useMemo, Profiler } from 'react';
import { Flex, useTheme, useColorMode } from '@chakra-ui/core';
import { AreaChart, Area, ResponsiveContainer, YAxis, ReferenceLine } from 'recharts';
import { buildData } from './getData';

const LittleGraph = ({ circuitId, yRef = false, ...props }) => {
  const { colorMode } = useColorMode();
  const { colors } = useTheme();
  const refColor = { dark: colors.original.red, light: colors.original.red };
  const topColor = { dark: colors.teal[300], light: colors.blue[500] };
  const bottomColor = { dark: colors.teal[700], light: colors.blue[200] };

  const { graphData: data, avgIn, avgOut } = useCallback(buildData(circuitId, 'day'), [circuitId]);

  const margin = useMemo(() => ({ top: 1, right: 0, left: 0, bottom: 5 }));

  let topRef, bottomRef;
  if (yRef) {
    topRef = avgIn;
    bottomRef = avgOut;
  }

  return (
    <Flex
      display="inline-flex"
      flexDirection="column"
      flex="1 0 auto"
      width={150}
      height={50}
      {...props}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={margin}>
          {yRef && <ReferenceLine y={topRef} stroke={refColor[colorMode]} strokeWidth={0.5} />}
          <Area
            animationDuration={200}
            type="linear"
            dataKey="inBits"
            stroke={topColor[colorMode]}
            fill={topColor[colorMode]}
          />
        </AreaChart>
      </ResponsiveContainer>
      <ResponsiveContainer>
        <AreaChart width={200} height={60} data={data} margin={margin}>
          <YAxis reversed hide />
          {yRef && <ReferenceLine y={bottomRef} stroke={refColor[colorMode]} strokeWidth={0.5} />}
          <Area
            animationDuration={200}
            type="linear"
            dataKey="outBits"
            stroke={bottomColor[colorMode]}
            fill={bottomColor[colorMode]}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Flex>
  );
};

export default LittleGraph;
