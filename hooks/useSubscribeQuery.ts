import { useMemo } from 'react';
import queryString from 'query-string';

import type { ParsedQuery } from 'query-string';

interface SubscribeQuery {
  emailAddr?: string;
  listName?: string;
  error?: string;
}

export function useSubscribeQuery(query: ParsedQuery) {
  return useMemo(() => {
    let parsedQuery = {} as SubscribeQuery;
    try {
      const [encoded] = Object.keys(query);
      const decoded = decodeURIComponent(atob(encoded));
      const parsed = queryString.parse(decoded) as Omit<SubscribeQuery, 'error'>;
      parsedQuery = { ...parsedQuery, ...parsed };
    } catch (err) {
      parsedQuery.error = err.message;
    }
    return parsedQuery;
  }, [query]);
}
