import * as React from 'react';
import { Box, Flex, Stack, Text } from '@chakra-ui/core';
import Subscribe from './Subscribe';

const Footer = props => {
  return (
    <Box as="footer" pt={12} pb={4} {...props}>
      <Stack
        isInline
        fontSize="xs"
        justify="space-between"
        align="center"
        spacing={8}
        flex="1 0 100%">
        <Flex justify="flex-start">
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
