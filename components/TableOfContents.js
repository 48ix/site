import * as React from 'react';
import { Fragment } from 'react';
import { Box, useColorMode, Heading as Title } from '@chakra-ui/core';
import { ComponentLink } from './NavLink';
import useActiveHash from '../hooks/useActiveHash';

const borderColor = { dark: 'yellow.200', light: 'red.300' };
const headingColor = {
  false: { dark: 'whiteAlpha.700', light: 'gray.700' },
  true: { dark: 'teal.300', light: 'blue.500' },
};

const Heading = ({ children, isChild, isActive, ...props }) => {
  const { colorMode } = useColorMode();
  return (
    <ComponentLink
      key={children.id}
      href={`#${children.id}`}
      ml={isChild ? 2 : null}
      side="right"
      fontWeight={isActive ? 'medium' : null}
      color={headingColor[isActive][colorMode]}
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
    <Fragment>
      {headings.map(heading => (
        <Fragment key={heading.id}>
          <Heading
            key={`${heading.id}-parent`}
            isChild={isChild}
            isActive={activeHash === heading.id}
            {...props}>
            {heading}
          </Heading>
          <Headings key={`${heading.id}-child`} ids={ids} isChild headings={heading.children} />
        </Fragment>
      ))}
    </Fragment>
  );
};

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

export const TocContent = ({ contentHeight = 'calc(100vh - 4rem)', headings, ...props }) => {
  const { colorMode } = useColorMode();
  const headingIds = getHeadingIds(headings);
  return (
    <Box
      as="aside"
      top={[0, 0, 16]}
      overflowY="auto"
      position="relative"
      borderRightWidth="1px"
      {...props}>
      <Box
        as="nav"
        height={contentHeight}
        aria-label="Page Navigation"
        fontSize="sm"
        px={6}
        pb={6}
        pt={[6, 6, 16, 16]}>
        <Box borderLeftWidth="1px" borderColor={borderColor[colorMode]} pl={3}>
          {headings.length !== 0 && (
            <Title
              fontSize="xs"
              color={borderColor[colorMode]}
              letterSpacing="wide"
              mb={2}
              textTransform="uppercase">
              Contents
            </Title>
          )}
          <Headings headings={headings} ids={headingIds} />
        </Box>
      </Box>
    </Box>
  );
};

const TocContainer = props => (
  <Box
    pos="fixed"
    top="0"
    right="0"
    width="100%"
    height="100%"
    maxW="18rem"
    display={['none', null, 'block']}
    {...props}
  />
);

const Toc = ({ borderColor, headings, isChild, ...props }) => {
  return (
    <TocContainer {...props}>
      <TocContent headings={headings} isChild={isChild} borderColor={borderColor} />
    </TocContainer>
  );
};

export default Toc;
