import { expect } from 'chai';

import {
  create,
  update,
  read,
  deleteRecord,
  setMockClient,
} from '../src/Adaptor.js';

const configuration = {
  baseUrl: 'https://test.odoo.com/odoo',
  password: 'somepassword',
  username: 'someusername',
  database: 'somedatabase',
};

const state = { configuration };

describe('read record', () => {
  it('should read a record', async () => {
    const mock = {
      read: (model, id, fields) => {
        expect(model).to.eql('product.product');
        expect(id).to.eql([2]);
        expect(fields).to.eql(['name']);

        return [
          {
            id: 2,
            name: 'Saas Product',
          },
        ];
      },
    };
    setMockClient(mock);

    const { data } = await read('product.product', [2], ['name'])(state);
    expect(data[0].id).to.eql(2);
    expect(data[0].name).to.eql('Saas Product');
  });
});

describe('create', () => {
  it('should create a record', async () => {
    const mock = {
      create: (model, data, options) => {
        expect(model).to.eql('res.partner');
        expect(data).to.eql({ name: 'Jane Doe' });
        expect(options).to.eql(23);
        return 15;
      },
    };
    setMockClient(mock);

    const { data } = await create(
      'res.partner',
      { name: 'Jane Doe' },
      { externalId: 23 }
    )(state);
    expect(data).to.eql(15);
  });
});

describe('update', () => {
  it('should update a record', async () => {
    const mock = {
      update: (model, id, data) => {
        expect(model).to.eql('product.product');
        expect(id).to.eql(4);
        expect(data).to.eql({ name: 'Testing Product' });
        return true;
      },
    };
    setMockClient(mock);

    const { data } = await update('product.product', 4, {
      name: 'Testing Product',
    })(state);
    expect(data).to.eql(true);
  });

  it('should throw an error if a record does not exist', async () => {
    const mock = {
      update: (model, id, data) => {
        expect(model).to.eql('product.product');
        expect(id).to.eql(4);
        expect(data).to.eql({ name: 'Testing Product' });
        throw new Error(
          'Error: XML-RPC fault: Record does not exist or has been deleted.'
        );
      },
    };
    setMockClient(mock);

    await update('product.product', 4, {
      name: 'Testing Product',
    })(state).catch(error => {
      expect(error).to.be.an('error');
      return error;
    });
  });
});

describe('delete', () => {
  it('should delete a record', async () => {
    const mock = {
      delete: (model, id) => {
        expect(model).to.eql('product.product');
        expect(id).to.eql(4);
        return true;
      },
    };
    setMockClient(mock);

    const { data } = await deleteRecord('product.product', 4)(state);
    expect(data).to.eql(true);
  });
});
