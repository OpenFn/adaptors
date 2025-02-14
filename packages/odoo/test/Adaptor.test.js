import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import { create, update, read, deleteRecord } from '../src/Adaptor.js';

const configuration = {
  baseUrl: 'https://test.odoo.com/odoo',
  password: 'somepassword',
  username: 'someusername',
  database: 'somedatabase',
};

const state = { configuration };

describe('read record', () => {
  it('should read a record', () => {
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
    enableMockClient(mock);

    read('product.product', [2], ['name'])(state);
  });
});

describe('create', () => {
  it('should create a record', () => {
    const mock = {
      create: (model, data, options) => {
        expect(model).to.eql('res.partner');
        expect(data).to.eql({ name: 'Jane Doe' });
        expect(options).to.eql({ externalId: 23 });
        return {
          data: 15,
        };
      },
    };
    enableMockClient(mock);

    create('res.partner', { name: 'Jane Doe' }, { externalId: 23 })(state);
  });
});

describe('update', () => {
  it('should update a record', () => {
    const mock = {
      update: (model, id, data) => {
        expect(model).to.eql('product.product');
        expect(id).to.eql(4);
        expect(data).to.eql({ name: 'Testing Product' });
        return {
          data: true,
        };
      },
    };
    enableMockClient(mock);

    update('product.product', 4, { name: 'Testing Product' })(state);
  });
});

describe('delete', () => {
  it('should delete a record', () => {
    const mock = {
      deleteRecord: (model, id) => {
        expect(model).to.eql('product.product');
        expect(id).to.eql(4);
        return {
          data: true,
        };
      },
    };
    enableMockClient(mock);

    deleteRecord('product.product', 4)(state);
  });
});
