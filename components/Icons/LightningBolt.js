import * as React from 'react';

const LightningBolt = ({ color, size = '1.5rem', ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        height: size,
        width: size,
      }}
      viewBox="0 0 16 16"
      strokeWidth={0}
      stroke="currentColor"
      fill="currentColor"
      {...props}>
      <path
        fillRule="evenodd"
        d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"
        clipRule="evenodd"
        fill={color || 'currentColor'}
      />
    </svg>
  );
};

export default LightningBolt;
