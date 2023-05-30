import { expect } from 'chai';
import nock from 'nock';
import { execute, getFHIR, dataValue } from '../src/Adaptor.js';

describe('execute', () => {
  it('executes each operation in sequence', done => {
    const state = {};
    const operations = [
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
    const state = {};

    execute()(state).then(finalState => {
      expect(finalState).to.eql({ references: [], data: null });
    });
  });
});

describe('getFHIR', () => {
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

  it('makes a get request to the right endpoint', async () => {
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
      getFHIR('Patients', {
        family: dataValue('fullName')(state),
      })
    )(state);

    expect(finalState.data).to.eql({
      family: 'Ba',
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

    const error = await execute(getFHIR('api/noAccess', { family: 'taylor' }))(
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
      getFHIR('api/differentError', { family: 'taylor' })
    )(state).catch(error => {
      return error;
    });
    expect(error.message).to.eql('Request failed with status code 500');
  });
});
