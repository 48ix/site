import { createClient as createContentfulClient } from 'contentful';

import type { EntryCollection } from 'contentful';
import type { ClientParams } from '~types';

function createClient(options: ClientParams = {}) {
  const space = process.env.CONTENTFUL_SPACE;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  if (typeof space === 'undefined') {
    throw new Error('CONTENTFUL_SPACE is missing from environment variables');
  } else if (typeof accessToken === 'undefined') {
    throw new Error('CONTENTFUL_ACCESS_TOKEN is missing from environment variables');
  }
  return createContentfulClient({ space, accessToken, ...options });
}

export async function getContent<T extends unknown>(
  contentType: string,
  query?: any,
): Promise<EntryCollection<T>> {
  let params = { content_type: contentType };

  if (typeof query !== 'undefined') {
    params = { ...params, ...query };
  }
  const client = createClient();
  const entries = await client.getEntries<T>(params);
  const parsed = client.parseEntries<T>(entries);
  return parsed;
}
