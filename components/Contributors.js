import * as React from 'react';
import { useState } from 'react';
import { Image, Link, Skeleton, Stack, useColorMode } from '@chakra-ui/core';
import { useConfig } from './Provider';

const Contributors = () => {
  const { contributors } = useConfig();
  const { colorMode } = useColorMode();
  return (
    <Stack my={8} isInline justify="space-between">
      {contributors.map(org => {
        const [loaded, setLoaded] = useState(false);
        return (
          <Skeleton key={org.id} isLoaded={loaded}>
            <Link href={org.link ?? '#'}>
              <Image
                onLoad={() => {
                  !loaded && setLoaded(true);
                }}
                width="300px"
                height="100px"
                src={`/contributor-logos/${org.id}.${org.imageFormat}`}
                alt={org.name}
                style={{ filter: colorMode === 'dark' ? 'grayscale(1) brightness(100)' : null }}
              />
            </Link>
          </Skeleton>
        );
      })}
    </Stack>
  );
};

export default Contributors;
