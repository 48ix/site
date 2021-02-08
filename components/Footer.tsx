import { Box, Flex, HStack, Stack, VStack, Text } from '@chakra-ui/react';
import { useColorValue, useConfig } from '~context';
import { SocialIcon, Subscribe } from '~components';

import type { BoxProps } from '@chakra-ui/react';
import type { SocialNetworks } from './SocialIcon';

export const Footer: React.FC<BoxProps> = (props: BoxProps) => {
  const config = useConfig();
  const textColor = useColorValue('gray.500', 'whiteAlpha.600');
  return (
    <Box as="footer" mb={12} pt={12} pb={4} {...props}>
      <Stack
        spacing={8}
        fontSize="xs"
        flex="1 0 100%"
        alignItems="center"
        justify="space-between"
        flexDir={{ base: 'column-reverse', lg: 'row' }}>
        <Flex justifyItems="flex-start" my={{ base: 6, lg: 0 }}>
          <VStack align={{ base: 'center', lg: 'flex-start' }}>
            <HStack align={{ base: 'center', lg: 'flex-start' }}>
              {Object.keys(config.social).map(name => {
                const social = (name as unknown) as SocialNetworks;
                return <SocialIcon name={social} key={name} />;
              })}
            </HStack>
            <Text px={2} fontWeight="medium" color={textColor} whiteSpace="nowrap">
              {`Copyright © ${new Date().getFullYear()} `}
              <Text as="span">{config.orgName}</Text>
            </Text>
          </VStack>
        </Flex>
        <Subscribe />
      </Stack>
    </Box>
  );
};
