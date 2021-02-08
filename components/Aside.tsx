import { useRouter } from 'next/router';
import { chakra, Box } from '@chakra-ui/react';
import { useTitleCase } from 'use-title-case';
import { useColorValue, useConfig, useBreakpointValue } from '~context';
import { ComponentLink, TopNavLink } from './NavLink';

import type { BoxProps } from '@chakra-ui/react';

interface AsideContentProps extends BoxProps {
  contentHeight?: string;
}

const NavGroupHeading = chakra('p', {
  baseStyle: {
    mb: 2,
    fontSize: 'xs',
    color: 'gray.400',
    fontWeight: 'medium',
    letterSpacing: 'wide',
    textTransform: 'uppercase',
  },
});

const AsideContainer = chakra('div', {
  baseStyle: {
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    maxW: '18rem',
    height: '100%',
    position: 'fixed',
    display: { base: 'none', md: undefined, lg: 'block' },
  },
});

export const AsideContent: React.FC<AsideContentProps> = (props: AsideContentProps) => {
  const { contentHeight = 'calc(100vh - 4rem)', ...rest } = props;

  const { pathname } = useRouter();
  const config = useConfig();
  const title = useTitleCase();
  const titleColor = useColorValue('blackAlpha.900', 'whiteAlpha.900');
  const isMobile = useBreakpointValue({ base: true, md: true, lg: false }) ?? true;

  return (
    <Box
      as="aside"
      overflowY="auto"
      position="relative"
      borderRightWidth="1px"
      top={{ base: 0, lg: 16 }}
      {...rest}>
      <Box as="nav" height={contentHeight} aria-label="Main Navigation" fontSize="sm" p={6}>
        <Box mb={8}>
          {isMobile && (
            <TopNavLink href="/" fontWeight="bold">
              Home
            </TopNavLink>
          )}
          {config.links.map(link => (
            <TopNavLink key={link.id} href={link.id}>
              {title(link.title)}
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
                {title(link.title)}
              </ComponentLink>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export const Aside: React.FC<BoxProps> = (props: BoxProps) => {
  const { borderColor, ...rest } = props;
  return (
    <AsideContainer {...rest}>
      <AsideContent borderColor={borderColor} />
    </AsideContainer>
  );
};
