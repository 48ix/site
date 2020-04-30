import * as React from 'react';
import { Box, Flex, Stack, Text } from '@chakra-ui/core';
import Subscribe from './Subscribe';

const Footer = props => {
  return (
    <Box as="footer" pt={12} pb={4} {...props}>
      <Stack
        flexDir={{ sm: 'column-reverse', md: 'column-reverse', lg: 'row', xl: 'row' }}
        fontSize="xs"
        justify="space-between"
        alignItems="center"
        flex="1 0 100%">
        <Flex justifyItems="flex-start" my={{ sm: 6, md: 6, lg: 0, xl: 0 }}>
          <Text fontWeight="medium" opacity="0.4" whiteSpace="nowrap">
            {`Copyright © ${new Date().getFullYear()} `}
            <Text as="span">48-IX Inc.</Text>
          </Text>
        </Flex>
        <Subscribe />
      </Stack>
    </Box>
  );
};

Footer.displayName = 'Footer';

export default Footer;
