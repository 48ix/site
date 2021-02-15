import { useRef } from 'react';

let uniqueId = 0;
function getUniqueId() {
  return uniqueId++;
}

export function useUniqueId(prefix: string = ''): string {
  const idRef = useRef<number>();

  if (idRef.current === undefined) {
    idRef.current = getUniqueId();
  }

  return `${prefix}${idRef.current}`;
}
