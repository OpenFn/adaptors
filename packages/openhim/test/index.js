import chai from 'chai';
const { expect } = chai;
import { enableMockClient } from '@openfn/language-common/util';

import Adaptor from '../src';
const {
  execute,
  createEncounter,
  getChannels,
  getClients,
  getTasks,
  getTransactions,
  createChannel,
  createTask,
  createClient,
} = Adaptor;

const testServer = enableMockClient('https://platform-tests.openhim.org');
const jsonHeaders = {
  headers: {
    'Content-Type': 'application/json',
  },
};
const configuration = {
  username: 'test',
  password: 'strongpassword',
  apiUrl: 'https://platform-tests.openhim.org',
};

const state = {
  configuration,
};

describe('execute', () => {
  it('executes each operation in sequence', done => {
    let state = {};
    let operations = [
      state => {
        return { counter: 1 };
      },
      state => {
        return { counter: 2 };
      },
      state => {
        return { counter: 3 };
      },
    ];

    execute(...operations)(state)
      .then(finalState => {
        expect(finalState).to.eql({ counter: 3 });
      })
      .then(done)
      .catch(done);
  });

  it('assigns references, data to the initialState', () => {
    let state = {};

    let finalState = execute()(state);

    execute()(state).then(finalState => {
      expect(finalState).to.eql({
        references: [],
        data: null,
      });
    });
  });
});

describe('encounter', () => {
  it('creates an encounter with given data', async () => {
    testServer
      .intercept({
        path: '/chw/encounter',
        method: 'POST',
      })
      .reply(201, 'User Authenticated Successfully');

    const { data } = await createEncounter({
      resourceType: 'Patient',
      id: 'example',
      identifier: [
        {
          fhir_comments: [
            '   MRN assigned by ACME healthcare on 6-May 2001   ',
          ],
          use: 'usual',
          type: {
            coding: [
              {
                system: 'http://hl7.org/fhir/v2/0203',
                code: 'MR',
              },
            ],
          },
          system: 'urn:oid:1.2.36.146.595.217.0.1',
          value: '12345',
          period: {
            start: '2001-05-06',
          },
          assigner: {
            display: 'Acme Healthcare',
          },
        },
      ],
      active: true,

      deceasedBoolean: false,

      managingOrganization: {
        reference: 'Organization/1',
      },
    })(state);
    expect(data).to.eql('User Authenticated Successfully');
  });
});

describe('getTransactions', () => {
  it('should GET all transctions', async () => {
    testServer
      .intercept({
        path: '/transactions',
        method: 'GET',
      })
      .reply(200, [{ _id: '001', clientID: '1234' }]);

    const { data } = await getTransactions()(state);
    expect(data[0].clientID).to.eql('1234');
    expect(data.length).to.eql(1);
  });

  it('should GET a single transaction', async () => {
    testServer
      .intercept({
        path: '/transactions/001',
        method: 'GET',
      })
      .reply(200, {
        _id: '001',
        clientID: '1234',
      });

    const { data } = await getTransactions({ transactionId: '001' })(state);
    expect(data.clientID).to.eql('1234');
    expect(data._id).to.eql('001');
  });

  it('should GET transactions with filters', async () => {
    testServer
      .intercept({
        path: '/transactions',
        method: 'GET',
        query: {
          filterLimit: 1,
          filterPage: 0,
          filterRepresentation: 'full',
          filters: '{"response.status":"200"}',
        },
      })
      .reply(200, [{ _id: '001', clientID: '1234' }]);

    const { data } = await getTransactions({
      filterLimit: 1,
      filterPage: 0,
      filterRepresentation: 'full',
      filters: '{"response.status":"200"}',
    })(state);
    expect(data[0].clientID).to.eql('1234');
  });
  it('should append undocumented query options to the url', async () => {
    let fullUrl;
    testServer
      .intercept({
        path: '/transactions',
        method: 'GET',
        query: {
          filterLimit: 1,
          filterPage: 0,
          filterRepresentation: 'full',
          filters: '{"response.status":"200"}',
          foo: 'bar',
        },
      })
      .reply(200, req => {
        fullUrl = `${req.origin}${req.path}?${new URLSearchParams(
          req.query
        ).toString()}`;
        return [{ _id: '001', clientID: '1234' }];
      });

    const { data } = await getTransactions({
      filterLimit: 1,
      filterPage: 0,
      filterRepresentation: 'full',
      filters: '{"response.status":"200"}',
      foo: 'bar',
    })(state);
    const urlParams = new URL(fullUrl).searchParams;

    expect(data[0].clientID).to.eql('1234');
    expect(urlParams.get('filterLimit')).to.equal('1');
    expect(urlParams.get('filterPage')).to.equal('0');
    expect(urlParams.get('filterRepresentation')).to.equal('full');
    expect(urlParams.get('filters')).to.equal('{"response.status":"200"}');
    expect(urlParams.get('foo')).to.equal('bar');
  });
});

describe('getChannels', () => {
  it('should GET all channels', async () => {
    testServer
      .intercept({
        path: '/channels',
        method: 'GET',
      })
      .reply(200, [{ _id: '0123', name: 'Channel Test' }]);

    const { data } = await getChannels()(state);
    expect(data[0].name).to.eql('Channel Test');
    expect(data.length).to.eql(1);
  });

  it('should GET a single channel', async () => {
    testServer
      .intercept({
        path: '/channels/0123',
        method: 'GET',
      })
      .reply(200, {
        _id: '0123',
        name: 'Channel Test',
      });

    const { data } = await getChannels('0123')(state);
    expect(data.name).to.eql('Channel Test');
    expect(data._id).to.eql('0123');
  });
});

describe('createChannel', () => {
  it('should create a single channel', async () => {
    testServer
      .intercept({
        path: '/channels',
        method: 'POST',
      })
      .reply(201, 'Channel successfully created');

    const { data } = await createChannel({
      requestBody: true,
      responseBody: true,
      rewriteUrlsConfig: [],
      rewriteUrls: false,
      addAutoRewriteRules: true,
      name: 'FHIR Server Testings',
      urlPattern: '^/fhir/.*$',
      methods: [
        'GET',
        'POST',
        'DELETE',
        'PUT',
        'OPTIONS',
        'HEAD',
        'TRACE',
        'CONNECT',
        'PATCH',
      ],
    })(state);
    expect(data).to.eql('Channel successfully created');
  });
});

describe('getClients', () => {
  it('should GET all clients', async () => {
    testServer
      .intercept({
        path: '/clients',
        method: 'GET',
      })
      .reply(200, [{ _id: '0123', name: 'Client Test' }]);

    const { data } = await getClients()(state);
    expect(data[0].name).to.eql('Client Test');
    expect(data.length).to.eql(1);
  });

  it('should GET  a single client', async () => {
    testServer
      .intercept({
        path: '/clients/0123',
        method: 'GET',
      })
      .reply(200, {
        _id: '0123',
        name: 'Client Test',
      });

    const { data } = await getClients('0123')(state);
    expect(data.name).to.eql('Client Test');
    expect(data._id).to.eql('0123');
  });
});

describe('createClient', () => {
  it('should create a single client', async () => {
    testServer
      .intercept({
        path: '/clients',
        method: 'POST',
      })
      .reply(201, 'Client successfully created');

    const { data } = await createClient({
      roles: ['fhir'],
      clientID: 'fhir-server-8',
      name: 'FHIR Server',
      passwordAlgorithm: 'sha512',
      passwordSalt: '3e74a280c568f27241e48e938edf21bf',
      passwordHash: '9a5158dc87a25da',
    })(state);
    expect(data).to.eql('Client successfully created');
  });
});

describe('getTasks', () => {
  it('should GET all tasks with required filters', async () => {
    testServer
      .intercept({
        path: '/tasks',
        method: 'GET',
        query: {
          filterLimit: 10,
          filterPage: 0,
          filters: '{}',
        },
      })
      .reply(200, [{ _id: '001', status: 'Completed' }]);

    const { data } = await getTasks({
      filterLimit: 10,
      filterPage: 0,
      filters: '{}',
    })(state);
    expect(data[0].status).to.eql('Completed');
    expect(data.length).to.eql(1);
  });

  it('should GET  a single task', async () => {
    testServer
      .intercept({
        path: '/tasks/001',
        method: 'GET',
        query: {
          filterLimit: 1,
          filterPage: 0,
          filters: '{}',
        },
      })
      .reply(200, {
        _id: '001',
        status: 'Completed',
      });

    const { data } = await getTasks({
      taskId: '001',
      filterLimit: 1,
      filterPage: 0,
      filters: '{}',
    })(state);
    expect(data.status).to.eql('Completed');
    expect(data._id).to.eql('001');
  });
});

describe('createTask', () => {
  it('should create a single task', async () => {
    testServer
      .intercept({
        path: '/tasks',
        method: 'POST',
      })
      .reply(201, 'User created task with id 0123');

    const { data } = await createTask({
      tids: [
        '5bb777777bbb66cc5d4444ee',
        '5ceec0bb3ca344f9a30df633',
        '5af732d1cbf94ba88b8f0bc0',
      ],
      batchSize: 2,
      paused: true,
    })(state);
    expect(data).to.eql('User created task with id 0123');
  });
});
