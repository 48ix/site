import * as React from 'react';
import { Flex, useTheme, useColorMode } from '@chakra-ui/core';
import { AreaChart, Area, ResponsiveContainer, YAxis, ReferenceLine } from 'recharts';
import { buildData } from './getData';

const LittleGraph = ({
  circuitId,
  topColor = false,
  bottomColor = false,
  yRef = false,
  refColor = false,
  ...props
}) => {
  const { colorMode } = useColorMode();
  const theme = useTheme();
  let dataColorTop = { dark: theme.colors.red[300], light: theme.colors.red[500] };
  let dataColorBottom = { dark: theme.colors.red[300], light: theme.colors.red[500] };
  let dataRefColor = { dark: theme.colors.teal[300], light: theme.colors.teal[500] };
  if (topColor) {
    dataColorTop = topColor;
  }
  if (bottomColor) {
    dataColorBottom = bottomColor;
  }
  if (refColor) {
    dataRefColor = refColor;
  }

  const { graphData: data, avgIn, avgOut } = buildData(circuitId, 'day');
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
        <AreaChart
          data={data}
          margin={{
            top: 1,
            right: 0,
            left: 0,
            bottom: 5,
          }}>
          {yRef && <ReferenceLine y={topRef} stroke={dataRefColor[colorMode]} strokeWidth={0.5} />}
          <Area
            animationDuration={200}
            type="linear"
            dataKey="inBits"
            stroke={dataColorTop[colorMode]}
            fill={dataColorTop[colorMode]}
          />
        </AreaChart>
      </ResponsiveContainer>
      <ResponsiveContainer>
        <AreaChart
          width={200}
          height={60}
          data={data}
          margin={{
            top: 1,
            right: 0,
            left: 0,
            bottom: 5,
          }}>
          <YAxis reversed hide />
          {yRef && (
            <ReferenceLine y={bottomRef} stroke={dataRefColor[colorMode]} strokeWidth={0.5} />
          )}
          <Area
            animationDuration={200}
            type="linear"
            dataKey="outBits"
            stroke={dataColorBottom[colorMode]}
            fill={dataColorBottom[colorMode]}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Flex>
  );
};

LittleGraph.displayName = 'LittleGraph';
export default LittleGraph;
