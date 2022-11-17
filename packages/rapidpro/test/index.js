import { expect } from 'chai';
import nock, { back } from 'nock';
import ClientFixtures, { fixtures } from './ClientFixtures';

import Adaptor from '../lib';
const { execute, create, dataValue } = Adaptor;

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
      expect(finalState).to.eql({ references: [], data: null });
    });
  });
});

describe('create', () => {
  before(() => {
    nock('https://fake.server.com')
      .post('/api/patients')
      .reply(200, (uri, requestBody) => {
        return { ...requestBody, fullName: 'Mamadou', gender: 'M' };
      });

    nock('https://fake.server.com')
      .post('/api/noAccess')
      .reply(404, (uri, requestBody) => {
        return { detail: 'Not found.' };
      });

    nock('https://fake.server.com')
      .post('/api/differentError')
      .reply(500, (uri, requestBody) => {
        return { body: 'Other error.' };
      });
  });

  it('makes a post request to the right endpoint', async () => {
    const state = {
      configuration: {
        baseUrl: 'https://fake.server.com',
        username: 'hello',
        password: 'there',
      },
      data: {
        fullName: 'Mamadou',
        gender: 'M',
      },
    };

    const finalState = await execute(
      create('api/patients', {
        name: dataValue('fullName')(state),
        gender: dataValue('gender')(state),
      })
    )(state);

    expect(finalState.data).to.eql({
      fullName: 'Mamadou',
      gender: 'M',
    });
  });

  it('throws an error for a 404', async () => {
    const state = {
      configuration: {
        baseUrl: 'https://fake.server.com',
        username: 'hello',
        password: 'there',
      },
    };

    const error = await execute(create('api/noAccess', { name: 'taylor' }))(
      state
    ).catch(error => {
      return error;
    });
    expect(error.message).to.eql('Request failed with status code 404');
  });

  it('handles and throws different kinds of errors', async () => {
    const state = {
      configuration: {
        baseUrl: 'https://fake.server.com',
        username: 'hello',
        password: 'there',
      },
    };

    const error = await execute(
      create('api/differentError', { name: 'taylor' })
    )(state).catch(error => {
      return error;
    });
    expect(error.message).to.eql('Request failed with status code 500');
  });
});

describe('createPatient', () => {
  before(() => {
    nock('https://fakepatient.server.com')
      .post('/api/patients')
      .reply(200, (uri, requestBody) => {
        return { ...requestBody, fullName: 'Mamadou', gender: 'M' };
      });
  });

  it('makes a post request to the patient endpoint', async () => {
    const state = {
      configuration: {
        baseUrl: 'https://fakepatient.server.com',
        username: 'hello',
        password: 'there',
      },
      data: {
        fullName: 'Mamadou',
        gender: 'M',
      },
    };

    const finalState = await execute(
      create('api/patients', {
        name: dataValue('fullName')(state),
        gender: dataValue('gender')(state),
      })
    )(state);

    expect(finalState.data).to.eql({
      fullName: 'Mamadou',
      gender: 'M',
    });
  });

});
