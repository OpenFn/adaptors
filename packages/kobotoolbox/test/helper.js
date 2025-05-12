export function responseWithPagination(itemms, query: {start: 0, limit},settings: {url, defaultLimit: 1e3, maxLimit: 3e4} items, options = {}) {

}

// export function responseWithPagination(baseUrl, items, options = {}) {
//   console.log('Was called with', { baseUrl, count: items.length, options });
//   // TODO rename limit to maxPageSize (which defaults to whatever kobo defaults to)
//   const { start = 0, limit, pageSize } = options;
//   const maxResults = limit || 1e4;
//   let shouldFetchMoreItems = false;
//   const effectiveLimit = maxResults || pageSize;
//   const startIndex = parseInt(start) || 0;

//   // Calculate the slice of items to return
//   const endIndex = Math.min(startIndex + effectiveLimit, items.length);
//   const results = items.slice(startIndex, endIndex);

//   // Determine if there are more items
//   const hasMoreItems = endIndex < items.length;

//   shouldFetchMoreItems = !limit && results.length < maxResults && hasMoreItems;
//   console.log({ shouldFetchMoreItems });

//   // Construct the next URL if there are more items
//   const next = shouldFetchMoreItems
//     ? `${baseUrl}?format=json&start=${endIndex}&limit=${effectiveLimit}`
//     : null;

//   return {
//     count: items.length,
//     next,
//     previous:
//       startIndex > 0
//         ? `${baseUrl}?format=json&start=${Math.max(
//             0,
//             startIndex - effectiveLimit
//           )}&limit=${effectiveLimit}`
//         : null,
//     results,
//   };
// }

// Example usage in tests:
/*
describe('requestWithPagination', () => {
  it('handles pagination correctly', async () => {
    const testData = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
      { id: 4, name: 'Item 4' },
      { id: 5, name: 'Item 5' }
    ];

    testServer
      .intercept({
        path: /\/api\/v2\/assets\/.*\/data/,
        method: 'GET',
      })
      .reply(200, req => {
        return responseWithPagination(
          `${req.origin}${req.path}`,
          testData,
          {
            limit: req.query.limit,
            start: req.query.start,
            pageSize: req.query.pageSize
          }
        );
      });
  });
});
*/
