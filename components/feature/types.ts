import type { BoxProps } from '@chakra-ui/react';

export interface FeatureProps extends BoxProps {
  title: string;
  icon: React.ComponentType;
}
