import { Box, Heading } from '@chakra-ui/react';
import { useColorValue, useMobile } from '~context';
import { title } from '~util';

const BaseHeading = ({ withBorder = false, ...props }) => {
  const color = useColorValue('blue.500', 'teal.300');
  const borderColor = useColorValue('blackAlpha.300', 'whiteAlpha.300');

  let borderProps = {};
  if (withBorder) {
    borderProps.borderBottomWidth = '1px';
    borderProps.borderColor = borderColor;
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
        {props.id && !useMobile && (
          <Box
            aria-label="anchor"
            as="a"
            position="absolute"
            left={props.as === 'h2' ? '-2rem' : '-1rem'}
            color={color}
            fontWeight="light"
            outline="none"
            _focus={{ opacity: 1, boxShadow: 'outline' }}
            opacity="0"
            href={`#${props.id}`}>
            #
          </Box>
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
