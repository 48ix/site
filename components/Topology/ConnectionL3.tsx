import { Box } from '@chakra-ui/react';
import { useColorToken } from '~context';

import type { BoxProps } from '@chakra-ui/react';

export const ConnectionL3: React.FC<BoxProps> = (props: BoxProps) => {
  const ixFill = useColorToken('blackAlpha.100', 'whiteAlpha.50');
  const ixColor = useColorToken('blue.500', 'teal.300');
  const memberStroke = useColorToken('red.500', 'red.300');
  const lineColor = useColorToken('blackAlpha.500', 'whiteAlpha.300');
  const crossConnectBg = useColorToken('blue.500', 'blue.300');

  return (
    <Box mt={8} ml={4} maxW={{ base: '90%', md: '60%' }} overflowX="auto" {...props}>
      <svg viewBox="180 341 388.5 111.5">
        <g fill="none">
          <path
            stroke={lineColor}
            strokeLinecap="square"
            strokeLinejoin="bevel"
            d="M291 396.75h166.5"
          />
          <circle
            cx={512.75}
            cy={396.75}
            r={55.25}
            stroke={memberStroke}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text transform="translate(473.55 378.302)" fill={memberStroke}>
            <tspan fontSize={16} fontWeight={400} x={9.408} y={15}>
              {'Member'}
            </tspan>
            <tspan fontSize={16} fontWeight={400} x={15.2} y={33.448}>
              {'Router'}
            </tspan>
          </text>
          <path
            d="M182.5 341.5H289a2 2 0 012 2V450a2 2 0 01-2 2H182.5a2 2 0 01-2-2V343.5a2 2 0 012-2z"
            fill={ixFill}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text transform="translate(185.5 378.302)" fill={ixColor}>
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
              fill={crossConnectBg}
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
