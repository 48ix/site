import { useRouter } from 'next/router';
import { Box, Text } from '@chakra-ui/react';
import { useColorValue, useConfig, useBreakpointValue } from '~context';
import { ComponentLink, TopNavLink } from './NavLink';

const NavGroupHeading = props => (
  <Text
    mb={2}
    fontSize="xs"
    color="gray.400"
    fontWeight="medium"
    letterSpacing="wide"
    textTransform="uppercase"
    {...props}
  />
);

export const AsideContent = ({ contentHeight = 'calc(100vh - 4rem)', ...props }) => {
  const { pathname } = useRouter();
  const config = useConfig();

  const titleColor = useColorValue('blackAlpha.900', 'whiteAlpha.900');
  const isMobile = useBreakpointValue({ base: true, md: true, lg: false }) ?? true;

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
          {isMobile && (
            <TopNavLink href="/" fontWeight="bold">
              Home
            </TopNavLink>
          )}
          {config.links.map(link => (
            <TopNavLink key={link.id} href={link.id}>
              {link.title}
            </TopNavLink>
          ))}
        </Box>
        {config.sections.map(section => (
          <Box key={section.id} as="section" mb={10}>
            <NavGroupHeading color={titleColor}>{section.title}</NavGroupHeading>
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
    top="0"
    left="0"
    right="0"
    pos="fixed"
    width="100%"
    maxW="18rem"
    height="100%"
    display={['none', null, 'block']}
    {...props}
  />
);

export const Aside = ({ borderColor, ...props }) => {
  return (
    <AsideContainer {...props}>
      <AsideContent borderColor={borderColor} />
    </AsideContainer>
  );
};
