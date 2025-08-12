import testData from './odooFixtures.json' assert { type: 'json' };

export class MockOdooWithSearch {
  constructor(data = []) {
    this.data = data;
  }

  searchRead(model, domain, fields, args) {
    const { offset = 0, limit } = args;

    const result = this.data
      .filter(item => {
        const stripModel = model.replace('res.', '');
        return (
          item['im_status'].includes(stripModel) &&
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
