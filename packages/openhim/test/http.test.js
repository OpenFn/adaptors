import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import { post, get, put, _delete, request } from '../src/http';

const testServer = enableMockClient('https://platform-http-tests.openhim.org');
const jsonHeaders = {
  headers: {
    'Content-Type': 'application/json',
  },
};
const configuration = {
  username: 'test',
  password: 'strongpassword',
  apiUrl: 'https://platform-http-tests.openhim.org',
};

const state = {
  configuration,
};

describe('get', () => {
  it('should GET a record', async () => {
    testServer
      .intercept({
        path: '/transactions',
        method: 'GET',
      })
      .reply(200, [{ _id: '001', clientID: '1234' }]);

    const { data } = await get('/transactions')(state);
    expect(data[0].clientID).to.eql('1234');
  });

  it('should make a GET request with an id', async () => {
    testServer
      .intercept({
        path: '/transactions/001',
        method: 'GET',
      })
      .reply(
        200,
        {
          _id: '001',
          clientID: '1234',
        }
      );

    const { data } = await get('/transactions/001')(state);
    expect(data.clientID).to.eql('1234');
    expect(data._id).to.eql('001');
  });
});

describe('post', () => {
  it('should create a record', async () => {
    testServer
      .intercept({
        path: '/clients',
        method: 'POST',
      })
      .reply(200, 'Client created successfully');

    const { data } = await post(
      '/clients',
      {
        roles: ['fhir'],
        clientID: 'fhir-server-5',
        name: 'FHIR Server',
      },
      {
        parseAs: 'text',
      }
    )(state);
    expect(data).to.eql('Client created successfully');
  });
});

describe('put', () => {
  it('should update a record', async () => {
    testServer
      .intercept({
        path: '/clients/someId',
        method: 'PUT',
      })
      .reply(200, 'Successfully updated client.');

    const { data } = await put(
      '/clients/someId',
      {
        _id: 'someId',
        roles: ['fhir'],
        clientID: 'fhir-server-5',
        name: 'FHIR Server',
      },
      {
        parseAs: 'text',
      }
    )(state);
    expect(data).to.eql('Successfully updated client.');
  });
});

describe('delete', () => {
  it('should delete a record', async () => {
    testServer
      .intercept({
        path: '/clients/someId',
        method: 'DELETE',
      })
      .reply(200, 'Successfully removed client with ID someId');

    const { data } = await _delete('/clients/someId', {
      parseAs: 'text',
    })(state);
    expect(data).to.eql('Successfully removed client with ID someId');
  });
});

describe('request', () => {
  it('should make a POST request', async () => {
    testServer
      .intercept({
        path: '/clients',
        method: 'POST',
      })
      .reply(200, 'Client created successfully');

    const { data } = await request(
      'POST',
      '/clients',
      {
        roles: ['fhir'],
        clientID: 'fhir-server-5',
        name: 'FHIR Server',
      },
      {
        parseAs: 'text',
      }
    )(state);
    expect(data).to.eql('Client created successfully');
  });

  it('should make a GET request', async () => {
    testServer
      .intercept({
        path: '/transactions',
        method: 'GET',
      })
      .reply(200, [{ _id: '001', clientID: '1234' }]);

    const { data } = await request('GET', '/transactions')(state);
    expect(data[0].clientID).to.eql('1234');
  });
});
