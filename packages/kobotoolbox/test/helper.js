//TODO: We should track iterations for testing purpose
export function responseWithPagination(items, query, settings) {
  const { url, defaultLimit = 1e3, maxLimit = 3e4 } = settings;
  const { start = 0, limit } = query;

  const response = {
    results: [],
    next: null,
    previous: null,
    count: items.length,
    requestCount: 0,
  };

  let startIndex = start;
  const hasStartIndex = startIndex > 0;
  console.log({ startIndex });
  let shouldFetchMoreContent = false;
  let effectiveLimit = limit ?? maxLimit;
  // if (limit) {
  //   effectiveLimit = Math.min(limit, maxLimit);
  // }
  // if (!limit && defaultLimit !== 1e3) {
  //   effectiveLimit = defaultLimit;
  // }
  // if (!limit && defaultLimit === 1e3) {
  //   effectiveLimit = Math.min(maxLimit, items.length);
  // }
  let endIndex = Math.min(startIndex + effectiveLimit, items.length);

  console.log({ effectiveLimit });
  do {
    response.results.push(
      ...items.slice(startIndex, startIndex + effectiveLimit)
    );
    const reachedLimit = effectiveLimit >= response.results.length;
    shouldFetchMoreContent =
      !reachedLimit && response.results.length < maxLimit;

    response.requestCount++;
    startIndex += defaultLimit;

    if (effectiveLimit >= items.length) {
      response.next = null;
      response.previous =
        effectiveLimit === maxLimit && hasStartIndex
          ? `${url}?format=json&limit=${effectiveLimit}`
          : null;
    } else {
      response.next = `${url}?format=json&start=${startIndex}&limit=${effectiveLimit}`;

      response.previous =
        startIndex <= defaultLimit
          ? null
          : `${url}?format=json&start=${Math.max(
              0,
              startIndex - defaultLimit
            )}&limit=${effectiveLimit}`;
    }

    console.log({
      effectiveLimit,
      endIndex,
      startIndex,
      defaultLimit,
      shouldFetchMoreContent,
      currentResults: response.results.length,
      reachedLimit,
    });
  } while (shouldFetchMoreContent);

  return response;
}
