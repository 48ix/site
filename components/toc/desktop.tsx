import { chakra } from '@chakra-ui/react';
import { TocContent } from './content';

import type { DTocProps } from './types';

const TocContainer = chakra('div', {
  baseStyle: {
    top: 0,
    right: 0,
    h: '100%',
    pos: 'fixed',
    width: '100%',
    maxW: '18rem',
    display: { base: 'none', md: undefined, lg: 'block' },
  },
});

export const DToc: React.FC<DTocProps> = (props: DTocProps) => {
  const { borderColor, headings, isChild = false, ...rest } = props;
  return (
    <TocContainer {...rest}>
      <TocContent headings={headings} isChild={isChild} borderColor={borderColor} />
    </TocContainer>
  );
};
