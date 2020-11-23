import { Box, Flex, HStack, Stack, Text } from '@chakra-ui/react';
import { useColorValue, useConfig } from '~context';
import { SocialIcon, Subscribe } from '~components';

export const Footer = props => {
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
          <Stack>
            <HStack justifyContent={{ base: 'center', lg: 'flex-start' }}>
              {Object.keys(config.social).map(name => (
                <SocialIcon name={name} key={name} />
              ))}
            </HStack>
            <Text fontWeight="medium" color={textColor} whiteSpace="nowrap">
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
