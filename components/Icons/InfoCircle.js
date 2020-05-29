import * as React from 'react';

const InfoCircle = ({ color, size = '1.5rem', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1024 1024"
    style={{
      height: size,
      width: size,
    }}
    strokeWidth={0}
    stroke="currentColor"
    fill="currentColor"
    {...props}>
    <path
      d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
      fill={color || 'currentColor'}
    />
    <path
      d="M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"
      fill={color || 'currentColor'}
    />
  </svg>
);

export default InfoCircle;
