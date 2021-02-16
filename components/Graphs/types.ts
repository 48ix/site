import type { FlexProps } from '@chakra-ui/react';
import type { TooltipProps } from 'recharts';
import type { UtilizationCircuitResponse } from '~types';

export interface GraphTooltipProps
  extends FlexProps,
    Omit<
      TooltipProps<number, string>,
      'onAnimationStart' | 'onAnimationEnd' | 'position' | 'cursor'
    > {
  avg: number;
  unit: string;
}

export interface BaseGraphProps extends FlexProps {
  data?: UtilizationCircuitResponse;
}

export interface LittleGraphProps extends BaseGraphProps {
  yRef?: boolean;
}
