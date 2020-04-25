/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Box, Heading, useColorMode } from '@chakra-ui/core';

const color = { dark: 'teal.800', light: 'blue.800' };

const BaseHeading = props => {
  const { colorMode } = useColorMode();
  return (
    <Heading
      mb="1em"
      mt="2em"
      css={{
        '&[id]': {
          pointerEvents: 'none',
        },
        '&[id]:before': {
          display: 'block',
          height: ' 6rem',
          marginTop: '-6rem',
          visibility: 'hidden',
          content: `""`,
        },
        '&[id]:hover a': { opacity: 1 },
      }}
      {...props}>
      <Box pointerEvents="auto">
        {props.children}
        {props.id && (
          <PseudoBox
            aria-label="anchor"
            as="a"
            color={color[colorMode]}
            fontWeight="normal"
            outline="none"
            _focus={{ opacity: 1, boxShadow: 'outline' }}
            opacity="0"
            ml="0.375rem"
            href={`#${props.id}`}>
            #
          </PseudoBox>
        )}
      </Box>
    </Heading>
  );
};

const H1 = props => <Heading as="h1" size="xl" my="1em" {...props} />;

const H2 = props => <BaseHeading as="h2" fontWeight="semibold" size="lg" {...props} />;

const H3 = props => <BaseHeading as="h3" size="md" fontWeight="md" {...props} />;

const H4 = props => <BaseHeading as="h4" size="md" fontWeight="semibold" {...props} />;

const H5 = props => <BaseHeading as="h5" size="sm" fontWeight="semibold" {...props} />;

const H6 = props => <BaseHeading as="h6" size="sm" fontWeight="bold" {...props} />;

export { H1, H2, H3, H4, H5, H6 };
