const createEntriesResponse = (currentPage, totalPages, pageSize) => {
  const isLastPage = currentPage >= Math.ceil(totalPages / pageSize);
  return {
    entries: isLastPage
      ? [{ id: `entry-${currentPage}-last-page` }]
      : Array.from({ length: pageSize }, (_, i) => ({
          id: `entry-${currentPage}-${i}`,
        })),
    ...(isLastPage
      ? { nextPageToken: undefined }
      : { nextPageToken: currentPage + 1 }),
    revision: Math.floor(Math.random() * 100),
  };
};

export const mockEntriesPagination = (testServer, path, opts = {}) => {
  const { totalPage = 10, pageSize = 1, fields } = opts;
  // First page response
  testServer
    .intercept({
      path,
      method: 'GET',
      query: { token: 'user-api-token', pageSize, fields },
    })
    .reply(200, createEntriesResponse(1, totalPage, pageSize));

  // Subsequent pages
  for (let page = 2; page <= Math.ceil(totalPage / pageSize); page++) {
    testServer
      .intercept({
        path,
        method: 'GET',
        query: { token: 'user-api-token', pageSize, pageToken: page, fields },
      })
      .reply(200, createEntriesResponse(page, totalPage, pageSize));
  }
};

export const mockRateLimitExceeded = (testServer, path, opts = {}) => {
  const { totalPage = 10, pageSize = 1, fields } = opts;
  // First page response
  testServer
    .intercept({
      path,
      method: 'GET',
      query: { token: 'user-api-token', pageSize, fields },
    })
    .reply(200, createEntriesResponse(1, totalPage, pageSize));

  // Subsequent pages
  testServer
    .intercept({
      path,
      method: 'GET',
      query: { token: 'user-api-token', pageSize, pageToken: 2, fields },
    })
    .reply(403, { description: 'API rate limit exceeded', code: 403 });

  testServer
    .intercept({
      path,
      method: 'GET',
      query: { token: 'user-api-token', pageSize, pageToken: 2, fields },
    })
    .reply(200, createEntriesResponse(2, totalPage, pageSize));
};
