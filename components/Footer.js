import * as React from 'react';
import { Box, Flex, Stack, Text, useColorMode } from '@chakra-ui/core';
import Subscribe from './Subscribe';
import { useConfig } from './Provider';
import SocialIcon from './SocialIcon';

const textColor = { dark: 'whiteAlpha.600', light: 'gray.500' };

const Footer = props => {
  const { colorMode } = useColorMode();
  const config = useConfig();
  return (
    <Box as="footer" mb={12} pt={12} pb={4} {...props}>
      <Stack
        flexDir={{ sm: 'column-reverse', md: 'column-reverse', lg: 'row', xl: 'row' }}
        fontSize="xs"
        justify="space-between"
        alignItems="center"
        flex="1 0 100%">
        <Flex justifyItems="flex-start" my={{ sm: 6, md: 6, lg: 0, xl: 0 }}>
          <Stack>
            <Stack justifyContent={['center', 'center', 'flex-start', 'flex-start']} isInline>
              {Object.keys(config.social).map(name => (
                <SocialIcon name={name} key={name} />
              ))}
            </Stack>
            <Text fontWeight="medium" color={textColor[colorMode]} whiteSpace="nowrap">
              {`Copyright © ${new Date().getFullYear()} `}
              <Text as="span">{config.orgName}</Text>
            </Text>
          </Stack>
        </Flex>
        <Subscribe />
      </Stack>
    </Box>
  );
};

Footer.displayName = 'Footer';

export default Footer;
