export const mockEntriesResponse = (currentPage, totalPages, pageSize) => {
  const isLastPage = currentPage >= totalPages;
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

export const mockEntries = (totalRecords, pageSize, currentToken) => {
  const data = Array.from({ length: totalRecords }, (_, i) => ({
    id: `entry-${i}`,
  }));

  const startIndex = currentToken ? parseInt(currentToken, 10) : 0;
  const entries = data.slice(startIndex, startIndex + pageSize);

  const nextStartIndex = startIndex + pageSize;
  const nextPageToken = entries.length === 0 ? undefined : `${nextStartIndex}`;

  const revision = Math.floor(Math.random() * 100);

  return {
    entries,
    nextPageToken,
    revision,
  };
};
