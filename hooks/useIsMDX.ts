import { useState, useEffect } from 'react';

export function useIsMDX(children: React.ReactElement): boolean {
  const [isMDX, setIsMDX] = useState<boolean>(false);
  useEffect((): void => {
    if (typeof children !== 'undefined') {
      if (children.props.isMdx === true && isMDX === false) {
        setIsMDX(true);
      } else {
        if (isMDX === true) {
          setIsMDX(false);
        }
      }
    }
  }, [children.props]);
  return isMDX;
}
