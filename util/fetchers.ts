import type { QueryFunctionContext } from 'react-query';

/**
 * Fetch typed JSON from an endpoint.
 *
 * @param ctx react-query function context.
 */
export async function getJson<T extends Dict | EmptyInterface>(
  ctx: QueryFunctionContext<string>,
): Promise<T> {
  const [url] = ctx.queryKey;
  const res = await fetch(url, { mode: 'cors', headers: { accept: 'application/json' } });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  try {
    const data = (await res.json()) as T;
    return data;
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      throw new Error(`Error parsing JSON: ${err.message}`);
    } else {
      throw err;
    }
  }
}
