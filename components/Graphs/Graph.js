import * as React from 'react';
import { useMemo } from 'react';
import { Box, Flex, Icon, Text, useColorMode, useTheme } from '@chakra-ui/core';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import dayjs from 'dayjs';
import { buildData } from './getData';

const GraphTooltip = ({ payload, label, avg, avgUnit, ...props }) => {
  const { colorMode } = useColorMode();
  const bg = { dark: 'dark.700', light: 'dark.600' };
  const color = { dark: 'red.300', light: 'red.300' };
  const time = dayjs(label).toString();
  const [data] = payload;
  return (
    <Box bg={bg[colorMode]} px={4} py={2} borderRadius="md">
      <Flex justifyContent="space-between">
        <Flex alignItems="center" color="white" justifyContent="space-between" {...props}>
          <Icon
            name={data?.name === 'inBits' ? 'triangle-down' : 'triangle-up'}
            size="10px"
            mr={1}
          />
          <Text as="span" fontWeight={500} fontSize="sm">
            {data?.value}
          </Text>
          <Text as="span" ml={1} fontSize="sm">{`${data?.payload.inUnit}ps`}</Text>
        </Flex>
      </Flex>
      <Flex>
        <Text fontSize="xs" color={color[colorMode]}>
          {`${avg} ${avgUnit}ps Average`}
        </Text>
      </Flex>
      <Flex>
        <Text fontSize="xs" opacity={0.6} color="white">
          {time}
        </Text>
      </Flex>
    </Box>
  );
};

const Graph = ({ circuitId, ...props }) => {
  const { colorMode } = useColorMode();
  const theme = useTheme();
  const topColor = { dark: theme.colors.blue[300], light: theme.colors.blue[500] };
  const bottomColor = { dark: theme.colors.teal[300], light: theme.colors.teal[600] };
  const gridColor = { dark: theme.colors.whiteAlpha[400], light: theme.colors.blackAlpha[400] };
  const labelColor = { dark: theme.colors.whiteAlpha[600], light: theme.colors.blackAlpha[600] };
  const refLineColor = { dark: theme.colors.red[400], light: theme.colors.red[500] };
  const { avgIn, avgOut, avgInUnit, avgOutUnit, graphData } = useMemo(() => buildData(circuitId));

  return (
    <Flex flexDir="column" flex="1 0 auto" width="100%" minHeight={400} height={400} {...props}>
      <ResponsiveContainer>
        <AreaChart
          data={graphData}
          syncId={circuitId}
          margin={{
            top: 1,
            right: 30,
            left: 0,
            bottom: 0,
          }}>
          <CartesianGrid strokeDasharray="2 2" stroke={gridColor[colorMode]} />
          <XAxis dataKey="time" hide />
          <YAxis
            tick={{
              stroke: gridColor[colorMode],
              strokeWidth: 0.1,
              fontSize: '12',
              fill: gridColor[colorMode],
            }}
            label={{
              value: 'Ingress',
              angle: -90,
              position: 'insideLeft',
              style: { textAnchor: 'middle', fontSize: '80%' },
              fill: labelColor[colorMode],
            }}
          />
          <Tooltip content={<GraphTooltip avg={avgIn} avgUnit={avgInUnit} />} />
          <ReferenceLine y={avgIn} stroke={refLineColor[colorMode]} strokeWidth={0.5} />
          <Area
            animationDuration={750}
            type="linear"
            dataKey="inBits"
            stroke={topColor[colorMode]}
            fill={topColor[colorMode]}
          />
        </AreaChart>
      </ResponsiveContainer>
      <ResponsiveContainer>
        <AreaChart
          data={graphData}
          syncId={circuitId}
          margin={{
            top: 1,
            right: 30,
            left: 0,
            bottom: 0,
          }}>
          <CartesianGrid strokeDasharray="2 2" stroke={gridColor[colorMode]} />
          <XAxis dataKey="time" hide />
          <YAxis
            reversed
            tick={{
              stroke: gridColor[colorMode],
              strokeWidth: 0.1,
              fontSize: '12',
              fill: gridColor[colorMode],
            }}
            label={{
              value: 'Egress',
              angle: -90,
              position: 'insideLeft',
              style: { textAnchor: 'middle', fontSize: '80%' },
              fill: labelColor[colorMode],
            }}
          />
          <Tooltip content={<GraphTooltip avg={avgOut} avgUnit={avgOutUnit} />} />
          <ReferenceLine y={avgOut} stroke={refLineColor[colorMode]} strokeWidth={0.5} />
          <Area
            animationDuration={750}
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

Graph.displayName = 'Graph';
GraphTooltip.displayName = 'GraphTooltip';

export default Graph;
