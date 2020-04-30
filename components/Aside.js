import * as React from 'react';
import { useRouter } from 'next/router';
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
  const { pathname } = useRouter();
  const { colorMode } = useColorMode();
  const config = useConfig();
  return (
    <Box
      as="aside"
      top={[0, 0, 16]}
      overflowY="auto"
      position="relative"
      borderRightWidth="1px"
      {...props}>
      <Box as="nav" height={contentHeight} aria-label="Main Navigation" fontSize="sm" p={6}>
        <Box mb={8}>
          {config.links.map(link => (
            <TopNavLink key={link.id} href={link.id}>
              {link.title}
            </TopNavLink>
          ))}
        </Box>
        {config.sections.map(section => (
          <Box key={section.id} as="section" mb={10}>
            <NavGroupHeading color={titleColor[colorMode]}>{section.title}</NavGroupHeading>
            {section.sections.map(link => (
              <ComponentLink
                key={link.id}
                href={link.id}
                isActive={pathname.replace('/', '') === link.id}>
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
  <Box
    pos="fixed"
    top="0"
    left="0"
    right="0"
    width="100%"
    height="100%"
    maxW="18rem"
    display={['none', null, 'block']}
    {...props}
  />
);

const Aside = ({ borderColor, ...props }) => {
  return (
    <AsideContainer {...props}>
      <AsideContent borderColor={borderColor} />
    </AsideContainer>
  );
};

export default Aside;
