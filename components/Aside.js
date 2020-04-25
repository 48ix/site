import * as React from 'react';
import { Box, Heading, useColorMode } from '@chakra-ui/core';
import { ComponentLink, TopNavLink } from './NavLink';
import { useConfig } from './Provider';

const titleColor = { dark: 'whiteAlpha.900', light: 'blackAlpha.900' };

const NavGroupHeading = props => (
  <Heading
    fontSize="xs"
    color="gray.400"
    letterSpacing="wide"
    mb={2}
    textTransform="uppercase"
    {...props}
  />
);

export const AsideContent = ({ contentHeight = 'calc(100vh - 4rem)', ...props }) => {
  const { colorMode } = useColorMode();
  const config = useConfig();
  return (
    <Box top="4rem" position="relative" overflowY="auto" borderRightWidth="1px" {...props}>
      <Box as="nav" height={contentHeight} aria-label="Main Navigation" fontSize="sm" p="6">
        <Box mb="8">
          {config.links.map(link => (
            <TopNavLink key={link.id} href={link.id}>
              {link.title}
            </TopNavLink>
          ))}
        </Box>
        {config.sections.map(section => (
          <Box key={section.id} as="section" mb="10">
            <NavGroupHeading color={titleColor[colorMode]}>{section.title}</NavGroupHeading>
            {section.sections.map(link => (
              <ComponentLink key={link.id} href={link.id}>
                {link.title}
              </ComponentLink>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const AsideContainer = props => (
  <Box position="fixed" left="0" width="100%" height="100%" top="0" right="0" {...props} />
);

const Aside = props => {
  return (
    <AsideContainer {...props}>
      <AsideContent />
    </AsideContainer>
  );
};

export default Aside;
