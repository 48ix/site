import * as React from 'react';
import { chakra, Box, Heading as ChakraHeading } from '@chakra-ui/react';
import { ComponentLink } from '~components';
import { useColorValue } from '~context';
import { useActiveHash } from '~hooks';

import type { BoxProps, LinkProps } from '@chakra-ui/react';

interface HeadingProps extends NoChildren<LinkProps> {
  isChild: boolean;
  isActive: boolean;
  children: TocHeading;
}

interface HeadingsProps extends NoChildren<LinkProps> {
  isChild: boolean;
  ids: string[];
  headings: TocHeading[];
}

interface TocContentProps extends BoxProps {
  contentHeight?: string;
  headings: TocHeading[];
  isChild?: boolean;
}

interface DTocProps extends BoxProps {
  isChild: boolean;
  headings: TocHeading[];
}

function getHeadingIds(headings: TocHeading[]): string[] {
  const headingIds = [] as string[];

  function getId(item: TocHeading): void {
    headingIds.push(item.id);
    if (!item.children) {
      return;
    }
    item.children.forEach(child => getId(child));
  }

  headings.forEach(obj => getId(obj));
  return headingIds;
}

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

const Heading: React.FC<HeadingProps> = (props: HeadingProps) => {
  const { children, isChild, isActive, ...rest } = props;
  const activeColor = useColorValue('blue.500', 'teal.300');
  const inactiveColor = useColorValue('gray.700', 'whiteAlpha.700');
  return (
    <ComponentLink
      side="right"
      href={`#${children.id}`}
      ml={isChild ? 2 : undefined}
      fontWeight={isActive ? 'medium' : undefined}
      color={isActive ? activeColor : inactiveColor}
      {...rest}>
      {children.value}
    </ComponentLink>
  );
};

const Headings: React.FC<HeadingsProps> = (props: HeadingsProps) => {
  const { headings, isChild, ids, ...rest } = props;
  const activeHash = useActiveHash(ids, '5px');
  if (!headings.length) {
    return null;
  }
  return (
    <>
      {headings.map(heading => (
        <React.Fragment key={`${heading.id}-group`}>
          <Heading
            isChild={isChild}
            key={`${heading.id}-parent`}
            isActive={activeHash === heading.id}
            {...rest}>
            {heading}
          </Heading>
          <Headings key={`${heading.id}-child`} ids={ids} isChild headings={heading.children} />
        </React.Fragment>
      ))}
    </>
  );
};

export const TocContent: React.FC<TocContentProps> = (props: TocContentProps) => {
  const { contentHeight = 'calc(100vh - 4rem)', isChild = false, headings, ...rest } = props;
  const headingIds = getHeadingIds(headings);
  const borderColor = useColorValue('red.300', 'yellow.200');
  const key = `${headings[0].id}-top`;
  return (
    <Box
      as="aside"
      overflowY="auto"
      position="relative"
      borderRightWidth="1px"
      top={{ base: 0, lg: 16 }}
      {...rest}>
      <Box
        pb={6}
        px={6}
        as="nav"
        fontSize="sm"
        height={contentHeight}
        pt={{ base: 6, lg: 16 }}
        aria-label="Page Navigation">
        <Box borderLeftWidth="1px" borderColor={borderColor} pl={3}>
          {headings.length !== 0 && (
            <ChakraHeading
              mb={2}
              fontSize="xs"
              color={borderColor}
              letterSpacing="wide"
              textTransform="uppercase">
              Contents
            </ChakraHeading>
          )}
          <Headings headings={headings} ids={headingIds} isChild={isChild} key={key} />
        </Box>
      </Box>
    </Box>
  );
};

export const DToc: React.FC<DTocProps> = (props: DTocProps) => {
  const { borderColor, headings, isChild, ...rest } = props;
  return (
    <TocContainer {...rest}>
      <TocContent headings={headings} isChild={isChild} borderColor={borderColor} />
    </TocContainer>
  );
};
