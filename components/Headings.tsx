import { Box, Heading } from '@chakra-ui/react';
import { useColorValue, useMobile } from '~context';
import { useTitleCase } from 'use-title-case';

import type { HeadingProps } from '@chakra-ui/react';

interface BaseHeadingProps extends HeadingProps {
  withBorder?: boolean;
}

const BaseHeading: React.FC<BaseHeadingProps> = (props: BaseHeadingProps) => {
  const { withBorder, children, ...rest } = props;
  const color = useColorValue('blue.500', 'teal.300');
  const borderColor = useColorValue('blackAlpha.300', 'whiteAlpha.300');
  const title = useTitleCase();

  let borderProps = {} as HeadingProps;
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
          content: `""`,
          height: '6rem',
          display: 'block',
          marginTop: '-6rem',
          visibility: 'hidden',
        },
        '&[id]:hover a': { opacity: 1 },
      }}
      {...borderProps}
      {...rest}>
      <Box pointerEvents="auto" position="relative">
        {props.id && !useMobile && (
          <Box
            as="a"
            opacity="0"
            color={color}
            outline="none"
            fontWeight="light"
            aria-label="anchor"
            position="absolute"
            href={`#${props.id}`}
            left={props.as === 'h2' ? '-2rem' : '-1rem'}
            _focus={{ opacity: 1, boxShadow: 'outline' }}>
            #
          </Box>
        )}
        {title(children)}
      </Box>
    </Heading>
  );
};

export const H1 = (props: HeadingProps) => (
  <BaseHeading as="h1" my="1em" size="xl" withBorder {...props} />
);
export const H2 = (props: HeadingProps) => (
  <BaseHeading as="h2" fontWeight="light" fontSize="2rem" {...props} />
);
export const H3 = (props: HeadingProps) => (
  <BaseHeading pl={1} as="h3" size="md" withBorder fontWeight="normal" {...props} />
);
export const H4 = (props: HeadingProps) => (
  <BaseHeading as="h4" pl={1} size="md" fontWeight="medium" {...props} />
);
export const H5 = (props: HeadingProps) => (
  <BaseHeading as="h5" pl={1} size="sm" fontWeight="medium" {...props} />
);
export const H6 = (props: HeadingProps) => (
  <BaseHeading as="h6" pl={1} size="sm" fontWeight="bold" {...props} />
);
