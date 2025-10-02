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

// const createPaginatingEndpoint = (testServer, path, data) => {
//   // Set up a totally generic interceptor at the path
//   testServer
//     .intercept({
//       path,
//       method: 'GET',
//     })
//     .reply(req => {
//       // I can't remember this syntax
//       const { pageSize, token } = req.params;

//       return getPaginatedResponse(data, token, pageSize);
//     });
// };

export const mockEntries = (totalRecords, pageSize, nextPage = 0) => {
  const data = Array(totalRecords)
    .fill()
    .map((_, i) => ({
      id: `entry-${i}`,
    }));

  const isFirstPage = nextPage === 0;
  const isLastPage = nextPage >= totalRecords;

  const calcNextPageToken = isFirstPage ? pageSize + 1 : nextPage + 1;

  const entries = data.slice(nextPage, pageSize);
  const revision = Math.floor(Math.random() * 100);

  const shouldFetchMoreContent = nextPage !== undefined;
  const nextPageToken = shouldFetchMoreContent ? calcNextPageToken : undefined;

  console.log({ nextPageToken });
  return {
    entries,
    nextPageToken,
    revision,
  };
};
