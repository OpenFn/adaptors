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

// export const mockEntries = (totalRecords, pageSize, currentPage = 0) => {
//   const data = Array.from({ length: totalRecords }, (_, i) => ({
//     id: `entry-${i}`,
//   }));

//   // Calculate the start and end indices for the current page
//   const startIndex = !currentPage ? 0 : currentPage + 1;
//   const endIndex = Math.min(startIndex + pageSize, totalRecords);
//   console.log({ endIndex });

//   const entries = data.slice(startIndex, endIndex);
//   const revision = Math.floor(Math.random() * 100);

//   // Determine if this is the last page
//   const isLastPage = endIndex >= totalRecords;
//   const nextPageToken = isLastPage ? undefined : currentPage + endIndex;

//   return {
//     entries,
//     nextPageToken,
//     revision,
//   };
// };

export const mockEntries = (totalRecords, pageSize, currentToken) => {
  const data = Array.from({ length: totalRecords }, (_, i) => ({
    id: `entry-${i}`,
  }));

  // Decode the token (for the first request, token is undefined)
  const startIndex = currentToken ? parseInt(currentToken, 10) : 0;

  // Slice entries for this page
  const entries = data.slice(startIndex, startIndex + pageSize);

  // Calculate nextPageToken
  const nextStartIndex = startIndex + pageSize;
  const nextPageToken = entries.length === 0 ? undefined : `${nextStartIndex}`;

  const revision = Math.floor(Math.random() * 100);

  return {
    entries,
    nextPageToken,
    revision,
  };
};

// export const mockEntries = (totalRecords, pageSize, currentToken) => {
//   const data = Array.from({ length: totalRecords }, (_, i) => ({
//     id: `entry-${i}`,
//   }));

//   // Decode token; first request has undefined token → start at 0
//   const startIndex = currentToken ? parseInt(currentToken, 10) : 0;

//   // Slice the data for this page
//   const entries = data.slice(startIndex, startIndex + pageSize);

//   // Always calculate the next token
//   const nextStartIndex = startIndex + pageSize;

//   // Only return undefined token when we're *past the end of data*
//   const nextPageToken =
//     nextStartIndex < totalRecords ? `${nextStartIndex}` : 'END';

//   // If the startIndex is already past totalRecords, return empty entries
//   const safeEntries = startIndex >= totalRecords ? [] : entries;
//   const revision = Math.floor(Math.random() * 100);

//   // On the last "empty" request, no token is returned
//   const tokenToReturn = safeEntries.length === 0 ? undefined : nextPageToken;

//   return {
//     entries: safeEntries,
//     nextPageToken: tokenToReturn,
//     revision,
//   };
// };
