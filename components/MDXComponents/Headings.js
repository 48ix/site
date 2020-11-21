import { Box, Heading, PseudoBox, useColorMode } from '@chakra-ui/core';
import { title } from '../../util';
import { useMedia } from '../Provider';

const color = { dark: 'teal.300', light: 'blue.500' };
const borderColor = { dark: 'whiteAlpha.300', light: 'blackAlpha.300' };

const BaseHeading = ({ withBorder = false, ...props }) => {
  const { colorMode } = useColorMode();
  const { isLg, isXl } = useMedia();
  let borderProps = {};
  if (withBorder) {
    borderProps.borderBottomWidth = '1px';
    borderProps.borderColor = borderColor[colorMode];
    borderProps.lineHeight = 2;
  }
  return (
    <Heading
      mb={2}
      mt={12}
      css={{
        '&[id]': {
          pointerEvents: 'none',
        },
        '&[id]:before': {
          display: 'block',
          height: '6rem',
          marginTop: '-6rem',
          visibility: 'hidden',
          content: `""`,
        },
        '&[id]:hover a': { opacity: 1 },
      }}
      {...borderProps}
      {...props}>
      <Box pointerEvents="auto" position="relative">
        {props.id && (isLg || isXl) && (
          <PseudoBox
            aria-label="anchor"
            as="a"
            position="absolute"
            left={props.as === 'h2' ? '-2rem' : '-1rem'}
            color={color[colorMode]}
            fontWeight="light"
            outline="none"
            _focus={{ opacity: 1, boxShadow: 'outline' }}
            opacity="0"
            href={`#${props.id}`}>
            #
          </PseudoBox>
        )}
        {title(props.children)}
      </Box>
    </Heading>
  );
};

export const H1 = props => <BaseHeading as="h1" my="1em" size="xl" withBorder {...props} />;
export const H2 = props => <BaseHeading as="h2" fontWeight="light" fontSize="2rem" {...props} />;
export const H3 = props => (
  <BaseHeading pl={1} as="h3" size="md" withBorder fontWeight="normal" {...props} />
);
export const H4 = props => <BaseHeading as="h4" pl={1} size="md" fontWeight="medium" {...props} />;
export const H5 = props => <BaseHeading as="h5" pl={1} size="sm" fontWeight="medium" {...props} />;
export const H6 = props => <BaseHeading as="h6" pl={1} size="sm" fontWeight="bold" {...props} />;
