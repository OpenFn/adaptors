import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import { request, post, get } from '../src/Adaptor.js';

const testServer = enableMockClient('https://test.openlmis.org');

describe.skip('request', () => {
  it('makes a post request to the right endpoint', async () => {
    // Setup a mock endpoint
    testServer
      .intercept({
        path: '/api/patients',
        method: 'POST',
        headers: {
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
      })
      // Set the reply from this endpoint
      // The body will be returned to state.data
      .reply(200, { id: 7, fullName: 'Mamadou', gender: 'M' });

    const state = {
      configuration: {
        baseUrl: 'https://test.openlmis.org',
        username: 'hello',
        password: 'there',
      },
      data: {
        fullName: 'Mamadou',
        gender: 'M',
      },
    };

    const finalState = await request('POST', 'patients', {
      name: state.data.fullName,
      gender: state.data.gender,
    })(state);

    expect(finalState.data).to.eql({
      fullName: 'Mamadou',
      gender: 'M',
      id: 7,
    });
  });

  it('throws an error if the service returns 403', async () => {
    testServer
      .intercept({
        path: '/api/noAccess',
        method: 'POST',
      })
      .reply(403);

    const state = {
      configuration: {
        baseUrl: 'https://test.openlmis.org',
        username: 'hello',
        password: 'there',
      },
    };

    const error = await request('POST', 'noAccess', { name: 'taylor' })(
      state
    ).catch(error => {
      return error;
    });

    expect(error.statusMessage).to.eql('Forbidden');
  });
});
