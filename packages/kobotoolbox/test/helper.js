export const responseWithPagination = (url, objects, options) => {
  const { pageSize, start, limit } = options;

  const startIndex =
    start !== undefined ? Math.max(0, parseInt(start) || 0) : undefined;
  const pageLimit =
    pageSize !== undefined ? Math.max(1, parseInt(pageSize) || 0) : undefined;
  const totalLimit = limit ? Math.max(1, parseInt(limit)) : 1e4;

  const totalCount = objects.length;

  let results;
  if (totalLimit && !pageSize) {
    results = objects.slice(0, totalLimit);
  } else if (startIndex !== undefined && pageLimit !== undefined) {
    results = objects.slice(startIndex, startIndex + pageLimit);
  } else {
    results = objects;
  }

  const baseUrl = `${url}?format=json`;
  const previous =
    startIndex !== undefined && pageLimit !== undefined
      ? `${baseUrl}&start=${startIndex}&limit=${pageLimit}`
      : null;

  let next = null;
  if (totalLimit && startIndex + totalLimit < totalCount) {
    next = `${baseUrl}&start=${
      startIndex ? startIndex + totalLimit : totalLimit
    }&limit=${totalLimit}`;
  } else if (
    !totalLimit &&
    startIndex !== undefined &&
    pageLimit !== undefined &&
    totalCount > startIndex + pageLimit
  ) {
    next = `${baseUrl}&start=${startIndex + pageLimit}&limit=${pageLimit}`;
  }

  return {
    count: totalCount,
    next,
    previous,
    results,
  };
};
