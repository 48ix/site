import * as React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';

const Footer = () => {
  return (
    <Box
      textAlign="center"
      pt={12}
      pb={4}
      pos="fixed"
      bottom="0"
      left="0"
      right="0"
      pl={[0, null, '18rem']}
      w="100%">
      <Flex justify="center" fontSize="xs">
        <Flex userSelect="none">
          <Text opacity="0.4">
            {`Copyright © ${new Date().getFullYear()} `}
            <Text as="span">48-IX Inc.</Text>
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

Footer.displayName = 'Footer';

export default Footer;
