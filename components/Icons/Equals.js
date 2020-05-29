import * as React from 'react';

const Equals = ({ color, size = '1.5rem', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    style={{
      height: size,
      width: size,
    }}
    strokeWidth={0}
    stroke="currentColor"
    fill="currentColor"
    {...props}>
    <path
      d="M416 304H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32zm0-192H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
      fill={color || 'currentColor'}
    />
  </svg>
);

export default Equals;
