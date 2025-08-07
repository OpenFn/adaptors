class MockOdooWithSearch {
  // this can be whatever we want
  constructor(data = []) {
    this.data = data;
  }

  // this needs to match the odoo client signature
  searchRead(model, domain, fields, args) {
    const { offset, pageSize, query } = args;

    const result = this.data
      .filter(/* do some kind of search */)
      .slice(offset, offset + pageSize);

    return result;
  }
}

// first we unit test this
// these are NOT pagination tests
// each just gets a single "page" of data
// const mock = new MockOdooWithSearch(data);
// const result = mock.searchRead({ limit: 10 });
// expect(result.length).to.equal(10);

// Then we write unit tests against the new operation with pagination
// const data = [item1, item2, item100];
// const mock = new MockOdooWithSearch(data);

// setMockClient(mock);

// searchReadRecord({ offset: 100, pageSize: 10 });