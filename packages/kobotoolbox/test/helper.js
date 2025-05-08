// export const responseWithPagination = (url, objects, options) => {
//   const { pageSize, start, limit } = options;

//   const startIndex =
//     start !== undefined ? Math.max(0, parseInt(start) || 0) : undefined;
//   const pageLimit =
//     pageSize !== undefined ? Math.max(1, parseInt(pageSize) || 0) : undefined;
//   const totalLimit = limit ? Math.max(1, parseInt(limit)) : 1e4;

//   const totalCount = objects.length;

//   let results;
//   if (totalLimit && !pageSize) {
//     results = objects.slice(0, totalLimit);
//   } else if (startIndex !== undefined && pageLimit !== undefined) {
//     results = objects.slice(startIndex, startIndex + pageLimit);
//   } else {
//     results = objects;
//   }

//   const baseUrl = `${url}?format=json`;
//   const previous =
//     startIndex !== undefined && pageLimit !== undefined
//       ? `${baseUrl}&start=${startIndex}&limit=${pageLimit}`
//       : null;

//   let next = null;
//   if (totalLimit && startIndex + totalLimit < totalCount) {
//     next = `${baseUrl}&start=${
//       startIndex ? startIndex + totalLimit : totalLimit
//     }&limit=${totalLimit}`;
//   } else if (
//     !totalLimit &&
//     startIndex !== undefined &&
//     pageLimit !== undefined &&
//     totalCount > startIndex + pageLimit
//   ) {
//     next = `${baseUrl}&start=${startIndex + pageLimit}&limit=${pageLimit}`;
//   }

//   return {
//     count: totalCount,
//     next,
//     previous,
//     results,
//   };
// };

// helper.js

export function responseWithPagination(baseUrl, items, options = {}) {
  const { start = 0, limit, pageSize } = options;
  const effectiveLimit = limit || pageSize || items.length;
  const startIndex = parseInt(start) || 0;

  // Calculate the slice of items to return
  const endIndex = Math.min(startIndex + effectiveLimit, items.length);
  const results = items.slice(startIndex, endIndex);

  // Determine if there are more items
  const hasMoreItems = endIndex < items.length;

  // Construct the next URL if there are more items
  const next = hasMoreItems
    ? `${baseUrl}?format=json&start=${endIndex}&limit=${effectiveLimit}`
    : null;

  return {
    count: items.length,
    next,
    previous:
      startIndex > 0
        ? `${baseUrl}?format=json&start=${Math.max(
            0,
            startIndex - effectiveLimit
          )}&limit=${effectiveLimit}`
        : null,
    results,
  };
}

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
