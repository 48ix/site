import * as React from 'react';
import { Box, useColorMode, useTheme } from '@chakra-ui/core';

const ConnectionL3 = props => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  const ixFill = { dark: colors.whiteAlpha[50], light: colors.blackAlpha[100] };
  const ixColor = { dark: colors.teal[300], light: colors.blue[500] };
  const memberStroke = { dark: colors.red[300], light: colors.red[500] };
  const lineColor = { dark: colors.whiteAlpha[300], light: colors.blackAlpha[500] };
  const crossConnectBg = { dark: colors.blue[300], light: colors.blue[500] };
  return (
    <Box mt={8} ml={4} maxW={['90%', '60%', '60%', '60%']} overflowX="auto">
      <svg viewBox="180 341 388.5 111.5" {...props}>
        <g fill="none">
          <path
            stroke={lineColor[colorMode]}
            strokeLinecap="square"
            strokeLinejoin="bevel"
            d="M291 396.75h166.5"
          />
          <circle
            cx={512.75}
            cy={396.75}
            r={55.25}
            stroke={memberStroke[colorMode]}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text transform="translate(473.55 378.302)" fill={memberStroke[colorMode]}>
            <tspan fontSize={16} fontWeight={400} x={9.408} y={15}>
              {'Member'}
            </tspan>
            <tspan fontSize={16} fontWeight={400} x={15.2} y={33.448}>
              {'Router'}
            </tspan>
          </text>
          <path
            d="M182.5 341.5H289a2 2 0 012 2V450a2 2 0 01-2 2H182.5a2 2 0 01-2-2V343.5a2 2 0 012-2z"
            fill={ixFill[colorMode]}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text transform="translate(185.5 378.302)" fill={ixColor[colorMode]}>
            <tspan fontSize={16} fontWeight={400} x={31.282} y={15}>
              {'48-IX'}
            </tspan>
            <tspan fontSize={16} fontWeight={400} x={25.962} y={33.448}>
              {'Switch'}
            </tspan>
          </text>
          <g>
            <path
              d="M347.39 390.634h53.72a2 2 0 012 2v8.232a2 2 0 01-2 2h-53.72a2 2 0 01-2-2v-8.232a2 2 0 012-2z"
              fill={crossConnectBg[colorMode]}
            />
            <text transform="translate(348.39 391.634)" fill="#f0f0f0">
              <tspan fontSize={8} fontWeight={300} x={0} y={8}>
                {'Cross Connect'}
              </tspan>
            </text>
          </g>
        </g>
      </svg>
    </Box>
  );
};

ConnectionL3.displayName = 'ConnectionL3';

export default ConnectionL3;
