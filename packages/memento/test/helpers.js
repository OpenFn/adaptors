export const mockEntriesResponse = (currentPage, totalPages, pageSize) => {
  const isLastPage = currentPage >= totalPages;
  console.log('isLastPage', isLastPage);
  return {
    entries: isLastPage
      ? [{ id: `entry-${currentPage}-last-page` }]
      : Array(pageSize)
          .fill()
          .map((_, i) => ({
            id: `entry-${currentPage}-${i}`,
          })),
    nextPageToken: isLastPage ? undefined : currentPage + 1,
    revision: Math.floor(Math.random() * 100),
  };
};

export const mockEntriesPagination = (testServer, path, opts = {}) => {
  const { totalRecords = 10, pageSize = 1, fields } = opts;
  const totalPages = Math.ceil(totalRecords / pageSize);
  // First page response
  testServer
    .intercept({
      path,
      method: 'GET',
      query: { token: 'user-api-token', pageSize, fields },
    })
    .reply(200, mockEntriesResponse(1, totalPages, pageSize));

  console.log('totalPages', totalPages);
  // Subsequent pages
  for (let page = 2; page <= totalPages; page++) {
    testServer
      .intercept({
        path,
        method: 'GET',
        query: { token: 'user-api-token', pageSize, pageToken: page, fields },
      })
      .reply(200, mockEntriesResponse(page, totalPages, pageSize));
  }
};

export const mockRateLimitExceeded = (testServer, path, opts = {}) => {
  const { totalRecords = 10, pageSize = 1, fields } = opts;
  const totalPages = Math.ceil(totalRecords / pageSize);
  // First page response
  testServer
    .intercept({
      path,
      method: 'GET',
      query: { token: 'user-api-token', pageSize, fields },
    })
    .reply(200, mockEntriesResponse(1, totalPages, pageSize));

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
    .reply(200, mockEntriesResponse(2, totalPages, pageSize));
};
