import * as React from 'react';
import { useState, createRef, useEffect } from 'react';
import { Box, useColorMode, useTheme } from '@chakra-ui/core';
import { useSpring, animated } from 'react-spring';
import { uniqueId } from '../../util';

export const StateOutlineLogo = ({ size = 128, strokeWidth = 10, noanimate = false, ...props }) => {
  const ref = createRef();
  const { colorMode } = useColorMode();
  const { colors } = useTheme();
  const [offset, setOffset] = useState(0);
  const [id] = useState(uniqueId('logo_'));

  const lineAnimation = useSpring({
    dash: 0,
    from: {
      dash: offset,
    },
    config: { delay: 100, duration: 1000 },
    reset: true,
  });

  const letterAnimation = useSpring({
    opacity: 1,
    scale: 1,
    from: { opacity: 0, scale: 0.5 },
    config: { delay: 250, duration: 500 },
  });

  let Path = animated.path;
  if (noanimate) {
    Path = 'path';
  }

  const strokeColor = { dark: colors.teal[300], light: colors.blue[500] };
  const ixColor = { dark: colors.red[400], light: colors.gray[800] };

  useEffect(() => {
    setOffset(ref.current.getTotalLength());
  });

  return (
    <Box m={4} {...props}>
      <svg viewBox="0 0 616.25 439.22" width={size} {...props}>
        <defs>
          <clipPath id={id}>
            <path fill="none" d="M0 0h628v438H0z" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${id})`}>
          <Path
            fill="none"
            stroke={strokeColor[colorMode]}
            strokeLinecap="square"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
            ref={ref}
            strokeDasharray={offset}
            strokeDashoffset={lineAnimation.dash}
            d="M345.48 432.74h32.22V376.1M237.39 432.74L5 341.66l2.95-13.39 18.61-10.32-13.63-19.18 16.34-22.91 5.95-37.57 29.32-12.23M65.34 177.94l-13.46-5-27.08-40.75 4.85-62.82 22.9 15.27V5h54.58M235 5h142.7v56.65"
          />
          <Path
            style={letterAnimation}
            d="M110.06 267.72v-27.41l59.59-93.89H194v37.21h-14.12L145 238.89V240h86.3v27.7zm70.24 24.15v-32.53l.71-12V146.42h32.89v145.45zm126.28 2q-17 0-30.3-5.43t-20.88-14.79a33.5 33.5 0 01-3.23-37.65 37.65 37.65 0 0111.76-12.54 40.25 40.25 0 0116.58-6.46v-1.13a32.83 32.83 0 01-19.64-11.15 31.29 31.29 0 01-7.63-21 32.07 32.07 0 016.92-20.24q6.93-8.88 19-14t27.45-5.11a69.66 69.66 0 0127.39 5.17q12 5.11 19 14a32 32 0 016.92 20.24 31 31 0 01-7.7 21 33.12 33.12 0 01-19.57 11.12v1.1a40.23 40.23 0 0116.51 6.43A37.94 37.94 0 01360.94 236a33.31 33.31 0 01-3.23 37.67q-7.59 9.35-20.84 14.78t-30.29 5.41zm0-24.93a25.16 25.16 0 0011.36-2.45 19.06 19.06 0 007.71-6.85 19.19 19.19 0 000-20 19.68 19.68 0 00-7.78-6.93 26.33 26.33 0 00-22.48 0 19.7 19.7 0 00-7.81 6.93 18.21 18.21 0 00-2.84 10.08 17.93 17.93 0 002.81 9.91 19.24 19.24 0 007.74 6.85 24.8 24.8 0 0011.29 2.45zm0-63.56a20.64 20.64 0 009.83-2.28 16.93 16.93 0 006.75-6.32 17.37 17.37 0 002.45-9.16 16.63 16.63 0 00-2.45-9 17.16 17.16 0 00-6.71-6.14 20.82 20.82 0 00-9.87-2.24 21.12 21.12 0 00-9.88 2.24 16.42 16.42 0 00-9.16 15.16 17.21 17.21 0 002.45 9.13 17.44 17.44 0 006.78 6.32 20.53 20.53 0 009.81 2.28z"
            fill={strokeColor[colorMode]}
          />
          <Path
            style={letterAnimation}
            d="M463.33 146.42v145.45h-35.16V146.42zm57.6 0l26.57 46h1.13l26.85-46h39.35l-43.9 72.72 45.32 72.73h-40.34l-27.28-46.45h-1.13l-27.28 46.45h-40.05l45.1-72.73-44-72.72z"
            fill={ixColor[colorMode]}
          />
        </g>
      </svg>
    </Box>
  );
};
