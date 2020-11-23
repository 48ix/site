import { Flex } from '@chakra-ui/react';

export const CardFooter = props => (
  <Flex
    p={4}
    direction="column"
    overflowX="hidden"
    overflowY="hidden"
    flexDirection="row"
    borderTopWidth="1px"
    roundedBottomLeft={4}
    roundedBottomRight={4}
    justifyContent="space-between"
    {...props}
  />
);
