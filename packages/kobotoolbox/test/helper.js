import { DEFAULT_PAGE_SIZE, DEFAULT_LIMIT } from '../src/util';

export function responseWithPagination(items, query, settings) {
  const {
    url,
    pageLimit = DEFAULT_PAGE_SIZE,
    defaultLimit = DEFAULT_LIMIT,
  } = settings;
  const { start = 0, limit } = query;

  const response = {
    results: [],
    next: null,
    previous: null,
    count: items.length,
    requestCount: 0,
  };

  let startIndex = parseInt(start);
  const hasStartIndex = startIndex > 0;
  let shouldFetchMoreContent = false;
  let effectiveLimit = limit ?? pageLimit;
  let isUsingDefaultLimit = !limit && pageLimit === DEFAULT_PAGE_SIZE;

  let maxResults = defaultLimit;
  const hasNoLimitWithStartIndex = !limit && hasStartIndex;
  if (hasNoLimitWithStartIndex) {
    maxResults = items.length - startIndex;
  }

  do {
    response.results.push(
      ...items.slice(startIndex, startIndex + effectiveLimit)
    );
    const fetchedAll =
      response.results.length ===
      (limit < items.length ? effectiveLimit : items.length);

    const reachedMaxLimit = response.results.length >= maxResults;

    shouldFetchMoreContent = !fetchedAll && !reachedMaxLimit && false;

    response.requestCount++;
    startIndex += effectiveLimit;

    response.next =
      startIndex >= items.length ||
      limit > items.length || // If there are less items than the limit, return all and no next link
      (!limit && !hasStartIndex && fetchedAll) || // If there are no items, start = 0 and no limit, return all and no next link
      (fetchedAll && hasNoLimitWithStartIndex) // If there are more items, no limit and start > 0, return all and no next link
        ? null
        : `${url}?format=json&start=${startIndex}&limit=${effectiveLimit}`;

    response.previous =
      !hasStartIndex && startIndex <= effectiveLimit
        ? null
        : hasNoLimitWithStartIndex && isUsingDefaultLimit
        ? `${url}?format=json&limit=${defaultLimit}` // If no limit and start >0
        : `${url}?format=json&start=${Math.max(
            0,
            startIndex - effectiveLimit
          )}&limit=${effectiveLimit}`;
  } while (shouldFetchMoreContent);

  return response;
}
