import { Box, Text, Flex, Icon, Heading } from '@chakra-ui/react';
import { useColorValue } from '~context';

import type { FeatureProps } from './types';

export const Feature: React.FC<FeatureProps> = (props: FeatureProps) => {
  const { title, icon, children } = props;
  const accent = useColorValue('blue.500', 'teal.500');
  return (
    <Box {...props}>
      <Flex mt={6} mb={4} direction="row" align="center">
        <Flex
          boxSize={12}
          bg={accent}
          rounded="full"
          align="center"
          justify="center"
          display="inline-flex">
          <Box boxSize={6} color="white" as={icon} />
        </Flex>
        <Heading as="h3" size="md" fontSize="3xl" fontWeight="medium" ml={4} display="inline">
          {title}
        </Heading>
      </Flex>

      <Text fontSize="sm" opacity="0.7">
        {children}
      </Text>
    </Box>
  );
};
