import * as React from 'react';
import { Stack, Image, Link, useColorMode } from '@chakra-ui/core';
import { useConfig } from './Provider';

const Contributors = () => {
  const { contributors } = useConfig();
  const { colorMode } = useColorMode();
  return (
    <Stack my={8} isInline justify="space-between">
      {contributors.map(org => (
        <Link key={org.id} href={org.link ?? '#'}>
          <Image
            width="300px"
            height="100px"
            src={`/contributor-logos/${org.id}.${org.imageFormat}`}
            alt={org.name}
            style={{ filter: colorMode === 'dark' ? 'grayscale(1) brightness(100)' : null }}
          />
        </Link>
      ))}
    </Stack>
  );
};

export default Contributors;
