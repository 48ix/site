import { Box, Heading as ChakraHeading } from '@chakra-ui/react';
import { useColorValue } from '~context';
import { Headings } from './headings';

import type { TocContentProps } from './types';

function getHeadingIds(headings: TocHeading[]): string[] {
  const headingIds = [] as string[];

  function getId(item: TocHeading): void {
    headingIds.push(item.id);
    if (!item.children) {
      return;
    }
    item.children.forEach(child => getId(child));
  }

  for (const heading of headings) {
    getId(heading);
  }

  return headingIds;
}

export const TocContent: React.FC<TocContentProps> = (props: TocContentProps) => {
  const { contentHeight = 'calc(100vh - 4rem)', isChild = false, headings, ...rest } = props;
  const headingIds = getHeadingIds(headings);
  const borderColor = useColorValue('red.300', 'yellow.200');
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
          <Headings headings={headings} ids={headingIds} isChild={isChild} />
        </Box>
      </Box>
    </Box>
  );
};
