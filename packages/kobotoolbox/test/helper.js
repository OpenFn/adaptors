import { DEFAULT_REQUEST_LIMIT, DEFAULT_MAX_LIMIT } from '../src/util';

export function responseWithPagination(items, query, settings) {
  const {
    url,
    defaultLimit = DEFAULT_REQUEST_LIMIT,
    maxLimit = DEFAULT_MAX_LIMIT,
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
  let effectiveLimit = limit ?? defaultLimit;
  let isUsingDefaultLimit = !limit && defaultLimit === DEFAULT_REQUEST_LIMIT;
  // console.log({ isUsingDefaultLimit, limit, defaultLimit });

  let maxResults = maxLimit;
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

    shouldFetchMoreContent = !fetchedAll && !reachedMaxLimit;

    response.requestCount++;
    startIndex += effectiveLimit;

    response.next =
      startIndex === items.length ||
      limit > items.length || // If there are less items than the limit, return all and no next link
      (!limit && !hasStartIndex && fetchedAll) || // If there are no items, start = 0 and no limit, return all and no next link
      (fetchedAll && hasNoLimitWithStartIndex) // If there are more items, no limit and start > 0, return all and no next link
        ? null
        : `${url}?format=json&start=${startIndex}&limit=${effectiveLimit}`;

    response.previous =
      !hasStartIndex && startIndex <= effectiveLimit
        ? null
        : hasNoLimitWithStartIndex && isUsingDefaultLimit
        ? `${url}?format=json&limit=${maxLimit}` // If no limit and start >0
        : `${url}?format=json&start=${Math.max(
            0,
            startIndex - effectiveLimit
          )}&limit=${effectiveLimit}`;

    console.log({
      fetchedAll,
      hasNoLimitWithStartIndex,
      hasStartIndex,
      effectiveLimit,
      maxResults,
      startIndex,
      defaultLimit,
      shouldFetchMoreContent,
      currentResults: response.results.length,
      Req: response.requestCount,
      response,
    });
  } while (shouldFetchMoreContent);
  return response;
}
