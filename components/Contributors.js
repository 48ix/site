import { useState } from 'react';
import { Image, Link, Skeleton, Stack } from '@chakra-ui/react';
import { useColorValue, useConfig } from '~context';

export const Contributors = () => {
  const { contributors } = useConfig();
  const imageStyle = useColorValue({}, { filter: 'grayscale(1) brightness(100)' });
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
                style={imageStyle}
              />
            </Link>
          </Skeleton>
        );
      })}
    </Stack>
  );
};
