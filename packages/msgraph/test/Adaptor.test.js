import { expect } from 'chai';
import { execute, create, getSites, getDrives } from '../src/Adaptor.js';

import MockAgent from './mockAgent.js';
import { setGlobalDispatcher } from 'undici';

setGlobalDispatcher(MockAgent);

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

describe('getSites', () => {
  it('Access the root SharePoint site within a tenant.', async () => {
    const state = {
      configuration: {
        accessToken: 'aGVsbG86dGhlcmU=',
      },
    };

    const finalState = await execute(getSites())(state);

    expect(JSON.parse(finalState.data)).to.eql({
      '@odata.context':
        'https://graph.microsoft.com/v1.0/$metadata#sites/$entity',
      createdDateTime: '2022-11-21T07:08:13.55Z',
      description: '',
      id: 'openfn.sharepoint.com,f47ac10b-58cc-4372-a567-0e02b2c3d479,df35c8e4-7e9e-4f5d-af19-4918c6412a94',
      lastModifiedDateTime: '2023-06-27T11:46:47Z',
      name: '',
      webUrl: 'https://openfn.sharepoint.com',
      displayName: 'Communication site',
      root: {},
      siteCollection: {
        hostname: 'openfn.sharepoint.com',
      },
    });
  });

  it('Access a sharePoint site using the siteId.', async () => {
    const state = {
      configuration: {
        accessToken: 'aGVsbG86dGhlcmU=',
      },
    };

    const finalState = await execute(getSites('openfn.sharepoint.com'))(state);

    expect(JSON.parse(finalState.data)).to.eql({
      '@odata.context':
        'https://graph.microsoft.com/v1.0/$metadata#sites/$entity',
      createdDateTime: '2022-11-21T07:08:13.55Z',
      description: '',
      id: 'openfn.sharepoint.com,f47ac10b-58cc-4372-a567-0e02b2c3d479,df35c8e4-7e9e-4f5d-af19-4918c6412a94',
      lastModifiedDateTime: '2023-06-27T11:46:47Z',
      name: '',
      webUrl: 'https://openfn.sharepoint.com',
      displayName: 'Communication site',
      root: {},
      siteCollection: {
        hostname: 'openfn.sharepoint.com',
      },
    });
  });

  it('throws 400 error', async () => {
    const state = {
      configuration: {
        accessToken: 'aGVsbG86dGhlcmU=',
      },
    };

    const error = await execute(getSites('noAccess'))(state).catch(error => {
      return error;
    });

    expect(error.message).to.contain('Invalid hostname for this tenancy');
  });
});

describe('getDrives', () => {
  it("Access a Site's default document library", async () => {
    const state = {
      configuration: {
        accessToken: 'aGVsbG86dGhlcmU=',
      },
    };

    const finalState = await execute(getDrives('openfn.sharepoint.com'))(state);

    expect(JSON.parse(finalState.data)).to.eql({});
  });
});
