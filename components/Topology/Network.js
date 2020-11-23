import { Box } from '@chakra-ui/react';
import { useColorToken } from '~context';

export const Network = props => {
  //   const deviceStroke = { dark: colors.whiteAlpha[800], light: colors.blackAlpha[800] };
  //   const deviceFill = { dark: null, light: null };
  const deviceFill = useColorToken('blackAlpha.100', 'whiteAlpha.50');
  const vmStroke = useColorToken('blackAlpha.800', 'whiteAlpha.800');
  const deviceColor = useColorToken('blue.800', 'teal.100');
  const memberStroke = useColorToken('blue.500', 'red.300');
  const lineColor = useColorToken('blackAlpha.700', 'whiteAlpha.700');

  return (
    <Box overflowX="auto">
      <svg viewBox="-39.35 -49.743 910.7 598.743" width={910.7} height={598.743} {...props}>
        <g fill="none">
          <path
            id="peering-switch"
            stroke={null}
            fill={deviceFill}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M304 222h224v45.5H304z"
          />
          <text transform="translate(305 226.302)" fill={deviceColor}>
            <tspan fontSize={12} fontWeight={300} x={67.232} y={18}>
              {' Peering Switch '}
            </tspan>
            <tspan fontSize={8} fontWeight={300} x={82.544} y={31.448}>
              {' Cisco 4500-X '}
            </tspan>
          </text>
          <path
            id="host1"
            stroke={null}
            fill={deviceFill}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M-38.85 338.5h406.116v210H-38.85z"
          />
          <text transform="translate(-37.85 510.604)" fill={deviceColor}>
            <tspan fontSize={12} fontWeight={600} x={155.762} y={15}>
              {' Services Host 1 '}
            </tspan>
            <tspan fontSize={8} fontWeight={300} x={174.066} y={28.448}>
              {' VMware ESXi '}
            </tspan>
          </text>
          <path
            id="host2"
            stroke={null}
            fill={deviceFill}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M464.734 338.5H870.85v210H464.734z"
          />
          <text transform="translate(465.734 510.604)" fill={deviceColor}>
            <tspan fontSize={12} fontWeight={600} x={155.762} y={15}>
              {' Services Host 2 '}
            </tspan>
            <tspan fontSize={8} fontWeight={300} x={174.066} y={28.448}>
              {' VMware ESXi '}
            </tspan>
          </text>
          <circle
            cx={306}
            cy={394}
            r={32}
            stroke={vmStroke}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text transform="translate(281.4 385.804)" fill={deviceColor}>
            <tspan fontSize={8} fontWeight={600} x={2.185} y={7}>
              {' Route Server '}
            </tspan>
            <tspan fontSize={8} fontWeight={300} x={7.007} y={17.196}>
              {' FRRouting '}
            </tspan>
          </text>
          <circle
            cx={164.208}
            cy={394}
            r={32}
            stroke={vmStroke}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text transform="translate(139.608 385.804)" fill={deviceColor}>
            <tspan fontSize={8} fontWeight={600} x={-1.109} y={7}>
              {' RPKI Validator '}
            </tspan>
            <tspan fontSize={8} fontWeight={300} x={11.194} y={17.196}>
              {' GoRTR '}
            </tspan>
          </text>
          <circle
            cx={667.792}
            cy={394}
            r={32}
            stroke={vmStroke}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text transform="translate(643.192 385.804)" fill={deviceColor}>
            <tspan fontSize={8} fontWeight={600} x={-1.109} y={7}>
              {' RPKI Validator '}
            </tspan>
            <tspan fontSize={8} fontWeight={300} x={6.265} y={17.196}>
              {' Routinator '}
            </tspan>
          </text>
          <circle
            cx={526}
            cy={394}
            r={32}
            stroke={vmStroke}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text transform="translate(501.4 385.804)" fill={deviceColor}>
            <tspan fontSize={8} fontWeight={600} x={1.185} y={7}>
              {' Route Server '}
            </tspan>
            <tspan fontSize={8} fontWeight={300} x={7.007} y={17.196}>
              {' FRRouting '}
            </tspan>
          </text>
          <circle
            cx={22.416}
            cy={394}
            r={32}
            stroke={vmStroke}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text transform="translate(-2.184 385.804)" fill={deviceColor}>
            <tspan fontSize={8} fontWeight={600} x={-1.302} y={7}>
              {' Looking Glass '}
            </tspan>
            <tspan fontSize={8} fontWeight={300} x={6.716} y={17.196}>
              {' hyperglass '}
            </tspan>
          </text>
          <circle
            cx={809.584}
            cy={394}
            r={32}
            stroke={vmStroke}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text transform="translate(784.984 385.804)" fill={deviceColor}>
            <tspan fontSize={8} fontWeight={600} x={3.575} y={7}>
              {' Automation '}
            </tspan>
            <tspan fontSize={8} fontWeight={600} x={12.492} y={17.196}>
              {' Server '}
            </tspan>
          </text>
          <path
            stroke={lineColor}
            strokeLinejoin="bevel"
            strokeWidth={0.5}
            d="M387.749 267.5l-88.169 71M444.251 267.5l88.169 71M371.324 267.5l-139.43 71M460.676 267.5l139.43 71"
          />
          <circle
            cx={-6.85}
            cy={-17.243}
            r={32}
            stroke={memberStroke}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text transform="translate(-31.45 -23.383)" fill={memberStroke}>
            <tspan fontSize={10} fontWeight={600} x={0.24} y={10}>
              {' IX Member '}
            </tspan>
          </text>
          <circle
            cx={87.117}
            cy={-17.243}
            r={32}
            stroke={memberStroke}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text transform="translate(62.517 -23.383)" fill={memberStroke}>
            <tspan fontSize={10} fontWeight={600} x={0.24} y={10}>
              {' IX Member '}
            </tspan>
          </text>
          <circle
            cx={650.917}
            cy={-17.243}
            r={32}
            stroke={memberStroke}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text transform="translate(626.317 -23.383)" fill={memberStroke}>
            <tspan fontSize={10} fontWeight={600} x={0.24} y={10}>
              {' IX Member '}
            </tspan>
          </text>
          <circle
            cx={181.083}
            cy={-17.243}
            r={32}
            stroke={memberStroke}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text transform="translate(156.483 -23.383)" fill={memberStroke}>
            <tspan fontSize={10} fontWeight={600} x={0.24} y={10}>
              {' IX Member '}
            </tspan>
          </text>
          <circle
            cx={369.017}
            cy={-17.243}
            r={32}
            stroke={memberStroke}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text transform="translate(344.417 -23.383)" fill={memberStroke}>
            <tspan fontSize={10} fontWeight={600} x={0.24} y={10}>
              {' IX Member '}
            </tspan>
          </text>
          <circle
            cx={838.85}
            cy={-17.243}
            r={32}
            stroke={memberStroke}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text transform="translate(814.25 -23.383)" fill={memberStroke}>
            <tspan fontSize={10} fontWeight={600} x={0.24} y={10}>
              {' IX Member '}
            </tspan>
          </text>
          <g>
            <circle
              cx={462.983}
              cy={-17.243}
              r={32}
              stroke={memberStroke}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text transform="translate(438.383 -23.383)" fill={memberStroke}>
              <tspan fontSize={10} fontWeight={600} x={0.24} y={10}>
                {' IX Member '}
              </tspan>
            </text>
          </g>
          <g>
            <circle
              cx={744.883}
              cy={-17.243}
              r={32}
              stroke={memberStroke}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text transform="translate(720.283 -23.383)" fill={memberStroke}>
              <tspan fontSize={10} fontWeight={600} x={0.24} y={10}>
                {' IX Member '}
              </tspan>
            </text>
          </g>
          <g>
            <circle
              cx={275.05}
              cy={-17.243}
              r={32}
              stroke={memberStroke}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text transform="translate(250.45 -23.383)" fill={memberStroke}>
              <tspan fontSize={10} fontWeight={600} x={0.24} y={10}>
                {' IX Member '}
              </tspan>
            </text>
          </g>
          <g>
            <circle
              cx={556.95}
              cy={-17.243}
              r={32}
              stroke={memberStroke}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text transform="translate(532.35 -23.383)" fill={memberStroke}>
              <tspan fontSize={10} fontWeight={600} x={0.24} y={10}>
                {' IX Member '}
              </tspan>
            </text>
          </g>
          <g>
            <path
              stroke={lineColor}
              strokeLinejoin="bevel"
              strokeWidth={0.5}
              d="M20.358-.386L379.282 222"
            />
          </g>
          <g>
            <path
              stroke={lineColor}
              strokeLinejoin="bevel"
              strokeWidth={0.5}
              d="M112.148 2.697L387.442 222"
            />
          </g>
          <g>
            <path
              stroke={lineColor}
              strokeLinejoin="bevel"
              strokeWidth={0.5}
              d="M202.447 6.582L395.601 222"
            />
          </g>
          <g>
            <path
              stroke={lineColor}
              strokeLinejoin="bevel"
              strokeWidth={0.5}
              d="M290.215 10.945L403.761 222"
            />
          </g>
          <g>
            <path
              stroke={lineColor}
              strokeLinejoin="bevel"
              strokeWidth={0.5}
              d="M374.666 14.257L411.92 222"
            />
          </g>
          <g>
            <path
              stroke={lineColor}
              strokeLinejoin="bevel"
              strokeWidth={0.5}
              d="M457.334 14.257L420.08 222"
            />
          </g>
          <g>
            <path
              stroke={lineColor}
              strokeLinejoin="bevel"
              strokeWidth={0.5}
              d="M541.785 10.945L428.239 222"
            />
          </g>
          <g>
            <path
              stroke={lineColor}
              strokeLinejoin="bevel"
              strokeWidth={0.5}
              d="M629.553 6.582L436.399 222"
            />
          </g>
          <g>
            <path
              stroke={lineColor}
              strokeLinejoin="bevel"
              strokeWidth={0.5}
              d="M719.852 2.697L444.558 222"
            />
          </g>
          <g>
            <path
              stroke={lineColor}
              strokeLinejoin="bevel"
              strokeWidth={0.5}
              d="M811.642-.386L452.718 222"
            />
          </g>
        </g>
      </svg>
    </Box>
  );
};
