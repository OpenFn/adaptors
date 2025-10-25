import { expect } from 'chai';
import {
  create,
  read,
  update,
  deleteRecord,
  getList,
  getCount,
  setMockClient,
} from '../src/Adaptor.js';

const configuration = {
  baseUrl: 'https://test.erpnext.com',
  apiKey: 'test_api_key',
  apiSecret: 'test_api_secret',
};

const state = { configuration };

describe('create', () => {
  it('should create a document', async () => {
    const mockClient = {
      db: () => ({
        createDoc: (doctype, data) => {
          expect(doctype).to.eql('Customer');
          expect(data).to.eql({
            customer_name: 'Acme Corporation',
            customer_type: 'Company',
          });
          return Promise.resolve({ name: 'CUST-00001' });
        },
      }),
    };
    setMockClient(mockClient);

    const { data } = await create('Customer', {
      customer_name: 'Acme Corporation',
      customer_type: 'Company',
    })(state);

    expect(data).to.eql({ name: 'CUST-00001' });
  });

  it('should create and download the full created record when downloadCreatedRecord is true', async () => {
    const mockClient = {
      db: () => ({
        createDoc: (doctype, data) => {
          expect(doctype).to.eql('Customer');
          expect(data).to.eql({ customer_name: 'Test Corp' });
          return Promise.resolve({ name: 'CUST-00002' });
        },
        getDoc: (doctype, name) => {
          expect(doctype).to.eql('Customer');
          expect(name).to.eql('CUST-00002');
          return Promise.resolve({
            name: 'CUST-00002',
            customer_name: 'Test Corp',
            customer_type: 'Company',
            territory: 'All Territories',
            customer_group: 'Commercial',
          });
        },
      }),
    };
    setMockClient(mockClient);

    const { data } = await create(
      'Customer',
      { customer_name: 'Test Corp' },
      { downloadCreatedRecord: true }
    )(state);

    expect(data.name).to.eql('CUST-00002');
    expect(data.customer_name).to.eql('Test Corp');
    expect(data.territory).to.eql('All Territories');
  });

  it('should throw an error when creation fails', async () => {
    const mockClient = {
      db: () => ({
        createDoc: () => {
          throw new Error('Duplicate entry');
        },
      }),
    };
    setMockClient(mockClient);

    try {
      await create('Customer', { customer_name: 'Duplicate' })(state);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
      expect(error.message).to.contain('Duplicate entry');
    }
  });
});

describe('read', () => {
  it('should read a document by name', async () => {
    const mockClient = {
      db: () => ({
        getDoc: (doctype, name) => {
          expect(doctype).to.eql('Customer');
          expect(name).to.eql('CUST-00001');
          return Promise.resolve({
            name: 'CUST-00001',
            customer_name: 'Acme Corporation',
            customer_type: 'Company',
            territory: 'All Territories',
          });
        },
      }),
    };
    setMockClient(mockClient);

    const { data } = await read('Customer', 'CUST-00001')(state);

    expect(data.name).to.eql('CUST-00001');
    expect(data.customer_name).to.eql('Acme Corporation');
    expect(data.customer_type).to.eql('Company');
  });

  it('should read a document with specific fields', async () => {
    const mockClient = {
      db: () => ({
        getDoc: (doctype, name) => {
          expect(doctype).to.eql('Sales Order');
          expect(name).to.eql('SO-00001');
          return Promise.resolve({
            name: 'SO-00001',
            customer: 'CUST-00001',
            grand_total: 5000,
            status: 'Draft',
            delivery_date: '2025-01-31',
          });
        },
      }),
    };
    setMockClient(mockClient);

    const { data } = await read('Sales Order', 'SO-00001', [
      'customer',
      'grand_total',
      'status',
    ])(state);

    expect(data.name).to.eql('SO-00001');
    expect(data.customer).to.eql('CUST-00001');
    expect(data.grand_total).to.eql(5000);
    expect(data.status).to.eql('Draft');
    expect(data.delivery_date).to.be.undefined;
  });

  it('should throw an error when document not found', async () => {
    const mockClient = {
      db: () => ({
        getDoc: () => {
          throw new Error('Document not found');
        },
      }),
    };
    setMockClient(mockClient);

    try {
      await read('Customer', 'INVALID-ID')(state);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
      expect(error.message).to.contain('Document not found');
    }
  });
});

describe('update', () => {
  it('should update a document', async () => {
    const mockClient = {
      db: () => ({
        updateDoc: (doctype, name, data) => {
          expect(doctype).to.eql('Customer');
          expect(name).to.eql('CUST-00001');
          expect(data).to.eql({
            customer_name: 'Updated Corp Name',
            mobile_no: '+1234567890',
          });
          return Promise.resolve({ name: 'CUST-00001' });
        },
      }),
    };
    setMockClient(mockClient);

    const { data } = await update('Customer', 'CUST-00001', {
      customer_name: 'Updated Corp Name',
      mobile_no: '+1234567890',
    })(state);

    expect(data.name).to.eql('CUST-00001');
  });

  it('should throw an error when update fails', async () => {
    const mockClient = {
      db: () => ({
        updateDoc: () => {
          throw new Error('Document not found');
        },
      }),
    };
    setMockClient(mockClient);

    try {
      await update('Customer', 'INVALID', { customer_name: 'Test' })(state);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
      expect(error.message).to.contain('Document not found');
    }
  });
});

describe('deleteRecord', () => {
  it('should delete a document', async () => {
    const mockClient = {
      db: () => ({
        deleteDoc: (doctype, name) => {
          expect(doctype).to.eql('Customer');
          expect(name).to.eql('CUST-00001');
          return Promise.resolve({ message: 'Deleted' });
        },
      }),
    };
    setMockClient(mockClient);

    const { data } = await deleteRecord('Customer', 'CUST-00001')(state);

    expect(data.message).to.eql('Deleted');
  });

  it('should throw an error when delete fails', async () => {
    const mockClient = {
      db: () => ({
        deleteDoc: () => {
          throw new Error('Cannot delete submitted document');
        },
      }),
    };
    setMockClient(mockClient);

    try {
      await deleteRecord('Sales Order', 'SO-00001')(state);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
      expect(error.message).to.contain('Cannot delete submitted document');
    }
  });
});

describe('getList', () => {
  it('should fetch a list of documents', async () => {
    const mockClient = {
      db: () => ({
        getDocList: (doctype, options) => {
          expect(doctype).to.eql('Customer');
          expect(options).to.eql({});
          return Promise.resolve([
            { name: 'CUST-00001', customer_name: 'Acme Corp' },
            { name: 'CUST-00002', customer_name: 'Beta Inc' },
          ]);
        },
      }),
    };
    setMockClient(mockClient);

    const { data } = await getList('Customer')(state);

    expect(data).to.be.an('array');
    expect(data).to.have.length(2);
    expect(data[0].name).to.eql('CUST-00001');
    expect(data[1].name).to.eql('CUST-00002');
  });

  it('should fetch a list with filters', async () => {
    const mockClient = {
      db: () => ({
        getDocList: (doctype, options) => {
          expect(doctype).to.eql('Sales Order');
          expect(options.filters).to.eql({ status: 'Draft' });
          return Promise.resolve([
            { name: 'SO-00001', status: 'Draft', grand_total: 5000 },
            { name: 'SO-00002', status: 'Draft', grand_total: 3000 },
          ]);
        },
      }),
    };
    setMockClient(mockClient);

    const { data } = await getList('Sales Order', {
      filters: { status: 'Draft' },
    })(state);

    expect(data).to.be.an('array');
    expect(data).to.have.length(2);
    expect(data[0].status).to.eql('Draft');
  });

  it('should fetch a list with fields, filters, and pagination', async () => {
    const mockClient = {
      db: () => ({
        getDocList: (doctype, options) => {
          expect(doctype).to.eql('Item');
          expect(options.filters).to.eql({ item_group: 'Products' });
          expect(options.fields).to.eql([
            'item_code',
            'item_name',
            'standard_rate',
          ]);
          expect(options.limit).to.eql(50);
          if (options.offset !== undefined) {
            expect(options.offset).to.eql(0);
          }
          return Promise.resolve([
            {
              item_code: 'ITEM-001',
              item_name: 'Product 1',
              standard_rate: 100,
            },
            {
              item_code: 'ITEM-002',
              item_name: 'Product 2',
              standard_rate: 150,
            },
          ]);
        },
      }),
    };
    setMockClient(mockClient);

    const { data } = await getList('Item', {
      filters: { item_group: 'Products' },
      fields: ['item_code', 'item_name', 'standard_rate'],
      limit: 50,
      offset: 0,
    })(state);

    expect(data).to.be.an('array');
    expect(data).to.have.length(2);
    expect(data[0].item_code).to.eql('ITEM-001');
  });

  it('should throw an error when getList fails', async () => {
    const mockClient = {
      db: () => ({
        getDocList: () => {
          throw new Error('Invalid doctype');
        },
      }),
    };
    setMockClient(mockClient);

    try {
      await getList('InvalidDocType')(state);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
      expect(error.message).to.contain('Invalid doctype');
    }
  });
});

describe('getCount', () => {
  it('should count all documents', async () => {
    const mockClient = {
      db: () => ({
        getCount: (doctype, filters) => {
          expect(doctype).to.eql('Customer');
          expect(filters).to.eql({});
          return Promise.resolve(150);
        },
      }),
    };
    setMockClient(mockClient);

    const { data } = await getCount('Customer')(state);

    expect(data).to.eql(150);
  });

  it('should count documents with filters', async () => {
    const mockClient = {
      db: () => ({
        getCount: (doctype, filters) => {
          expect(doctype).to.eql('Sales Order');
          expect(filters).to.eql({ status: 'Open' });
          return Promise.resolve(25);
        },
      }),
    };
    setMockClient(mockClient);

    const { data } = await getCount('Sales Order', { status: 'Open' })(state);

    expect(data).to.eql(25);
  });

  it('should throw an error when getCount fails', async () => {
    const mockClient = {
      db: () => ({
        getCount: () => {
          throw new Error('Invalid doctype');
        },
      }),
    };
    setMockClient(mockClient);

    try {
      await getCount('InvalidDocType')(state);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
      expect(error.message).to.contain('Invalid doctype');
    }
  });
});
