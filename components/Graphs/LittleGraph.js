import * as React from 'react';
import { useMemo } from 'react';
import { Flex, useTheme, useColorMode } from '@chakra-ui/core';
import { AreaChart, Area, ResponsiveContainer, YAxis, ReferenceLine } from 'recharts';
import { buildData } from './data';

const margin = { top: 1, right: 0, left: 0, bottom: 5 };

const LittleGraph = ({ data, yRef = false, ...props }) => {
  const { colorMode } = useColorMode();
  const { colors } = useTheme();
  const refColor = { dark: colors.original.red, light: colors.original.red };
  const topColor = { dark: colors.blue[400], light: colors.blue[500] };
  const bottomColor = { dark: colors.teal[300], light: colors.teal[400] };

  let utilizationData = { graphData: [] };
  if (data) {
    utilizationData = useMemo(() => buildData(data), [data]);
  }

  let topRef, bottomRef;
  if (yRef) {
    topRef = utilizationData.inAvg ?? 0;
    bottomRef = utilizationData.outAvg ?? 0;
  }
  return (
    <Flex
      display="inline-flex"
      flexDirection="column"
      flex="1 0 auto"
      width={150}
      height={50}
      pointerEvents="none"
      {...props}>
      <ResponsiveContainer>
        <AreaChart data={utilizationData.graphData} margin={margin}>
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
        <AreaChart width={200} height={60} data={utilizationData.graphData} margin={margin}>
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
