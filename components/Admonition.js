import * as React from 'react';
import { Box, Heading, Icon, Stack, Text, useColorMode, useTheme } from '@chakra-ui/core';
import { opposingColor } from '../util';

const iconMap = {
  important: 'info-outline',
  note: 'check',
  tip: 'star',
  warning: 'warning-2',
  critical: 'not-allowed',
};
const bgMap = {
  dark: {
    important: 'blue.300',
    note: 'gray.300',
    tip: 'green.300',
    warning: 'yellow.300',
    critical: 'red.300',
  },
  light: {
    important: 'blue.400',
    note: 'gray.400',
    tip: 'green.400',
    warning: 'yellow.400',
    critical: 'red.400',
  },
};

const AdmonitionContainer = ({ type, bg, ...props }) => (
  <Box borderRadius="md" p={6} m={8} backgroundColor={bg} maxW="75%" {...props} />
);

const AdmonitionHeader = props => (
  <Heading as="h3" fontWeight={600} fontSize="md" textTransform="capitalize" {...props} />
);

const AdmonitionIcon = ({ type, ...props }) => <Icon size={5} name={iconMap[type]} {...props} />;

const AdmonitionBody = ({ children, color, ...props }) => (
  <Box {...props}>
    <Text fontSize="sm" fontWeight={300} color={color}>
      {children}
    </Text>
  </Box>
);

const Admonition = ({ title, message, children, type = 'note', hideIcon = false, ...props }) => {
  if (message && !children) {
    children = message;
  }
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const background = bgMap[colorMode][type];
  const color = opposingColor(theme, background);

  return (
    <AdmonitionContainer type={type} bg={background} {...props}>
      <Stack isInline align="center" mb={4}>
        {!hideIcon && <AdmonitionIcon type={type} color={color} />}
        {title && <AdmonitionHeader color={color}>{title}</AdmonitionHeader>}
      </Stack>
      <AdmonitionBody color={color}>{children}</AdmonitionBody>
    </AdmonitionContainer>
  );
};

Admonition.displayName = 'Admonition';

export default Admonition;
