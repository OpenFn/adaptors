import { enableMockClient } from '@openfn/language-common/util';
import { expect } from 'chai';
import { request } from '../src/Utils';

import {
  execute,
  get,
  post,
  searchPatient,
  getPatient,
  searchPerson,
} from '../src';

const testServer = enableMockClient('https://fn.openmrs.org');
const jsonHeaders = {
  headers: {
    'Content-Type': 'application/json',
  },
};
const configuration = {
  username: 'test',
  password: 'strongpassword',
  instanceUrl: 'https://fn.openmrs.org',
};

describe('execute', () => {
  it('executes each operation in sequence', done => {
    let state = { configuration };
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

    execute()(state);

    execute()(state).then(finalState => {
      expect(finalState).to.eql({
        references: [],
        data: null,
      });
    });
  });
});

describe('request', () => {
  it('should search for a patient', async () => {
    testServer
      .intercept({
        path: '/ws/rest/v1/patient',
        query: { q: 'Sarah 1' },
        method: 'GET',
      })
      .reply(200, { results: [{ display: 'Sarah 1' }] }, { ...jsonHeaders });
    const state = { configuration };

    const { body } = await request(
      state,
      'GET',
      '/ws/rest/v1/patient',
      {},
      { q: 'Sarah 1' }
    );

    expect(body.results[0].display).to.eql('Sarah 1');
  });
  it('should auto-fetch patients with a limit', async () => {
    testServer
      .intercept({
        path: '/ws/rest/v1/patient',
        query: { q: 'Sarah', limit: 1 },
        method: 'GET',
      })
      .reply(
        200,
        {
          results: [{ display: 'Sarah 1' }],
          links: [
            {
              rel: 'next',
              uri: 'https://fn.openmrs.org/ws/rest/v1/patient?q=Sarah&limit=1&startIndex=1',
              resourceAlias: null,
            },
          ],
        },
        { ...jsonHeaders }
      );
    testServer
      .intercept({
        path: '/ws/rest/v1/patient',
        query: { q: 'Sarah', limit: 1, startIndex: 1 },
        method: 'GET',
      })
      .reply(
        200,
        {
          results: [{ display: 'Sarah 2' }],
        },
        { ...jsonHeaders }
      );

    const state = { configuration };
    const { body } = await request(
      state,
      'GET',
      '/ws/rest/v1/patient',
      {},
      { q: 'Sarah', limit: 1 }
    );
    expect(body.results[0].display).to.eql('Sarah 1');
    expect(body.results[1].display).to.eql('Sarah 2');
  });

  it('should not auto-fetch if the user sets startIdex', async () => {
    testServer
      .intercept({
        path: '/ws/rest/v1/patient',
        query: { q: 'Sarah', limit: 1, startIndex: 1 },
        method: 'GET',
      })
      .reply(
        200,
        {
          results: [{ display: 'Sarah 2' }],
        },
        { ...jsonHeaders }
      );

    const state = { configuration };
    const { body } = await request(
      state,
      'GET',
      '/ws/rest/v1/patient',
      {},
      { q: 'Sarah', limit: 1, startIndex: 1 }
    );

    expect(body.results[0].display).to.eql('Sarah 2');
  });
});

describe('get', () => {
  before(() => {
    testServer
      .intercept({
        path: '/ws/rest/v1/encounter/123',
        method: 'GET',
      })
      .reply(200, { uuid: '123' }, { ...jsonHeaders });
  });

  it('should get an encounter by uuid', async () => {
    const state = { configuration };

    const { data } = await execute(get('encounter/123'))(state);

    expect(data.uuid).to.eql('123');
  });
});

describe('post', () => {
  before(() => {
    testServer
      .intercept({
        path: '/ws/rest/v1/encounter',
        method: 'POST',
      })
      .reply(200, ({ body }) => body, {
        ...jsonHeaders,
      });
  });

  it('should post an encounter', async () => {
    const state = { configuration };

    const { data } = await execute(
      post('encounter', {
        patient: '123',
        encounterType: '123',
        location: '123',
        encounterProviders: [],
        visit: {
          patient: '123',
          visitType: '123',
          startDatetime: '2023-05-25T06:08:25.000+0000',
          stopDatetime: '2023-05-25T06:09:25.000+0000',
        },
      })
    )(state);

    expect(data.patient).to.eql('123');
  });
});

describe('getPatient', () => {
  before(() => {
    testServer
      .intercept({
        path: '/ws/rest/v1/patient/b52ec6f9-0e26-424c-a4a1-c64f9d571eb3',
        method: 'GET',
      })
      .reply(
        200,
        { uuid: 'b52ec6f9-0e26-424c-a4a1-c64f9d571eb3' },
        { ...jsonHeaders }
      );
  });

  it('should get a patient by uuid', async () => {
    const state = { configuration };

    const { data } = await execute(
      getPatient('b52ec6f9-0e26-424c-a4a1-c64f9d571eb3')
    )(state);

    expect(data.uuid).to.eql('b52ec6f9-0e26-424c-a4a1-c64f9d571eb3');
  });
});

describe('searchPerson', () => {
  before(() => {
    testServer
      .intercept({
        path: '/ws/rest/v1/person?q=Sarah',
        method: 'GET',
      })
      .reply(
        200,
        { results: [{ display: 'Sarah' }] },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  });

  it('should search for a person', async () => {
    const state = { configuration };

    const { data } = await execute(
      searchPerson({
        q: 'Sarah',
      })
    )(state);

    expect(data.results[0].display).to.eql('Sarah');
  });
});

describe('searchPatient', () => {
  before(() => {
    testServer
      .intercept({
        path: '/ws/rest/v1/patient?q=Sarah',
        method: 'GET',
      })
      .reply(
        200,
        { results: [{ display: 'Sarah' }] },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  });

  it('should search for a patient', async () => {
    const state = { configuration };

    const { data } = await execute(
      searchPatient({
        q: 'Sarah',
      })
    )(state);

    expect(data.results[0].display).to.eql('Sarah');
  });
});
