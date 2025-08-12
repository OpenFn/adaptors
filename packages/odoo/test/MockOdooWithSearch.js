import testData from './odooFixtures.json' assert { type: 'json' };

export class MockOdooWithSearch {
  constructor(data = []) {
    this.data = data;
  }

  searchRead(model, domain, fields, args) {
    const { offset = 0, limit } = args;

    const result = this.data
      .filter(item => {
        return (
          item['im_status'].includes(model) &&
          item['is_company'] === domain['is_company']
        );
      })
      .map(item => {
        return Object.fromEntries(
          Object.entries(item).filter(([key]) => fields.includes(key))
        );
      })
      .slice(offset, offset + limit);

    return result;
  }
}

const mock = new MockOdooWithSearch(testData);
const result = mock.searchRead('partner', { is_company: true }, ['name'], {
  limit: 10,
});

export const searchReadRecord = async (
  model,
  domain,
  fields = [],
  { offset = 0, limit = 1000, pageSize = 200 }
) => {
  const results = [];
  if (limit <= 0 || pageSize <= 0) {
    return { rows: results, nextOffset: null };
  }

  let totalFetched = 0;
  let nextOffset = offset;

  while (totalFetched < limit) {
    const remainingItems = limit - totalFetched;
    const fetchSize = Math.min(pageSize, remainingItems);

    const rows = mock.searchRead(model, domain, fields, {
      offset: nextOffset,
      limit: fetchSize,
    });

    // nothing more to fetch if no results returned
    if (!rows || rows.length === 0) {
      nextOffset = null;
      break;
    }

    results.push(...rows);
    totalFetched += rows.length;

    // If we get fewer than requested, we have reached the end
    if (rows.length < fetchSize) {
      nextOffset = null;
      break;
    }

    // Update the next offset for the next iteration
    nextOffset += rows.length;
  }

  console.log({ rows: results, nextOffset });

  return { rows: results, nextOffset };
};

searchReadRecord('partner', { is_company: true }, ['name'], {
  offset: 0,
  pageSize: 1,
});
