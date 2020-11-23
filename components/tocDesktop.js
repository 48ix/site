import { Box, Heading as ChakraHeading } from '@chakra-ui/react';
import { ComponentLink } from '~components';
import { useColorValue } from '~context';
import { useActiveHash } from '~hooks';

const getHeadingIds = headings => {
  const headingIds = [];
  const getId = obj => {
    headingIds.push(obj.id);
    if (!obj.children) {
      return;
    }
    obj.children.forEach(child => getId(child));
  };
  headings.forEach(obj => getId(obj));
  return headingIds;
};

const Heading = ({ children, isChild, isActive, ...props }) => {
  const color = {
    false: useColorValue('gray.700', 'whiteAlpha.700'),
    true: useColorValue('blue.500', 'teal.300'),
  };
  return (
    <ComponentLink
      side="right"
      key={children.id}
      ml={isChild ? 2 : null}
      color={color[isActive]}
      href={`#${children.id}`}
      fontWeight={isActive ? 'medium' : null}
      {...props}>
      {children.value}
    </ComponentLink>
  );
};

const Headings = ({ headings, isChild, ids, ...props }) => {
  const activeHash = useActiveHash(ids, '5px');
  if (!headings.length) {
    return null;
  }
  return (
    <>
      {headings.map(heading => (
        <>
          <Heading
            key={`${heading.id}-parent`}
            isChild={isChild}
            isActive={activeHash === heading.id}
            {...props}>
            {heading}
          </Heading>
          <Headings key={`${heading.id}-child`} ids={ids} isChild headings={heading.children} />
        </>
      ))}
    </>
  );
};

export const TocContent = ({ contentHeight = 'calc(100vh - 4rem)', headings, ...props }) => {
  const headingIds = getHeadingIds(headings);
  const borderColor = useColorValue('red.300', 'yellow.200');
  return (
    <Box
      as="aside"
      top={[0, 0, 16]}
      overflowY="auto"
      position="relative"
      borderRightWidth="1px"
      {...props}>
      <Box
        pb={6}
        px={6}
        as="nav"
        fontSize="sm"
        pt={[6, 6, 16, 16]}
        height={contentHeight}
        aria-label="Page Navigation">
        <Box borderLeftWidth="1px" borderColor={borderColor} pl={3}>
          {headings.length !== 0 && (
            <ChakraHeading
              fontSize="xs"
              color={borderColor}
              letterSpacing="wide"
              mb={2}
              textTransform="uppercase">
              Contents
            </ChakraHeading>
          )}
          <Headings headings={headings} ids={headingIds} />
        </Box>
      </Box>
    </Box>
  );
};

const TocContainer = props => (
  <Box
    top="0"
    right="0"
    pos="fixed"
    width="100%"
    maxW="18rem"
    height="100%"
    display={['none', null, 'block']}
    {...props}
  />
);

export const DToc = ({ borderColor, headings, isChild, ...props }) => {
  return (
    <TocContainer {...props}>
      <TocContent headings={headings} isChild={isChild} borderColor={borderColor} />
    </TocContainer>
  );
};
