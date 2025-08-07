import testData from './odooFixtures.json' assert { type: 'json' };

class MockOdooWithSearch {
  // this can be whatever we want
  constructor(data = []) {
    this.data = data;
  }

  // this needs to match the odoo client signature
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

// first we unit test this
// these are NOT pagination tests
// each just gets a single "page" of data

const mock = new MockOdooWithSearch(testData);
const result = mock.searchRead('partner', { is_company: true }, ['name'], {
  limit: 10,
});
console.log({ result });

// expect(result.length).to.equal(10);

// Then we write unit tests against the new operation with pagination
// const data = [item1, item2, item100];
// const mock = new MockOdooWithSearch(data);

// setMockClient(mock);

// searchReadRecord({ offset: 100, pageSize: 10 });
