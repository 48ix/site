import type { BoxProps, LinkProps } from '@chakra-ui/react';

export interface HeadingProps extends NoChildren<LinkProps> {
  isChild: boolean;
  isActive: boolean;
  children: TocHeading;
}

export interface HeadingsProps extends NoChildren<LinkProps> {
  isChild: boolean;
  ids: string[];
  headings: TocHeading[];
}

export interface TocContentProps extends BoxProps {
  contentHeight?: string;
  headings: TocHeading[];
  isChild?: boolean;
}

export interface DTocProps extends BoxProps {
  isChild?: boolean;
  headings: TocHeading[];
}
