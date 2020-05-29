import * as React from 'react';

const Note = ({ color, size = '1.5rem', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 14 16"
    style={{
      height: size,
      width: size,
    }}
    strokeWidth={0}
    stroke="currentColor"
    fill="currentColor"
    fillRule="evenodd"
    {...props}>
    <path
      d="M3 10h4V9H3v1zm0-2h6V7H3v1zm0-2h8V5H3v1zm10 6H1V3h12v9zM1 2c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1H1z"
      fill={color || 'currentColor'}
    />
  </svg>
);

export default Note;
