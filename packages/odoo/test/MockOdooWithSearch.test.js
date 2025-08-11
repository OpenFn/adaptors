import { expect } from 'chai';
import { MockOdooWithSearch } from './MockOdooWithSearch';

const mockData = () => [
  {
    id: 1,
    name: 'A Ltd',
    is_company: true,
    im_status: 'im_partner',
    email: 'a@example.com',
  },
  {
    id: 2,
    name: 'B Ltd',
    is_company: true,
    im_status: 'im_partner',
    phone: '123',
  },
  { id: 3, name: 'C Sole', is_company: false, im_status: 'im_partner' },
  { id: 4, name: 'D NGO', is_company: true, im_status: 'im_vendor' },
  {
    id: 5,
    name: 'E Corp',
    is_company: true,
    im_status: 'im_partner',
    city: 'Nairobi',
  },
];

describe('MockOdooWithSearch.searchRead', () => {
  let data, mock;

  beforeEach(() => {
    data = mockData();
    mock = new MockOdooWithSearch(data);
  });

  it('filters by model (im_status includes) and is_company', () => {
    const rows = mock.searchRead('partner', { is_company: true }, ['name'], {
      limit: 10,
    });
    expect(rows).to.deep.equal([
      { name: 'A Ltd' },
      { name: 'B Ltd' },
      { name: 'E Corp' },
    ]);
  });

  it('projects only requested fields', () => {
    const rows = mock.searchRead(
      'partner',
      { is_company: true },
      ['name', 'email'],
      { limit: 10 }
    );
    expect(rows[0]).to.have.keys(['name', 'email']);
    expect(rows[1]).to.have.keys(['name']);
    expect(rows[2]).to.have.keys(['name']);
  });

  it('applies pagination: offset & limit', () => {
    const page1 = mock.searchRead('partner', { is_company: true }, ['name'], {
      limit: 1,
      offset: 0,
    });
    const page2 = mock.searchRead('partner', { is_company: true }, ['name'], {
      limit: 1,
      offset: 1,
    });
    const page3 = mock.searchRead('partner', { is_company: true }, ['name'], {
      limit: 1,
      offset: 2,
    });

    expect(page1).to.deep.equal([{ name: 'A Ltd' }]);
    expect(page2).to.deep.equal([{ name: 'B Ltd' }]);
    expect(page3).to.deep.equal([{ name: 'E Corp' }]);
  });
  it('returns empty array when no records match', () => {
    const rows = mock.searchRead('partner', { is_company: true }, ['name'], {
      limit: 10,
    });
    const none = mock.searchRead('customer', { is_company: true }, ['name'], {
      limit: 10,
    });
    expect(rows.length).to.be.greaterThan(0);
    expect(none).to.deep.equal([]);
  });
});
