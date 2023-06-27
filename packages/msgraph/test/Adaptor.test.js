import { expect } from 'chai';
import { execute, create, getSites, getDrives } from '../src/Adaptor.js';

import MockAgent, { fixtures } from './mockAgent.js';

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
        accessToken: fixtures.accessToken,
      },
    };

    const finalState = await execute(getSites())(state);

    expect(JSON.parse(finalState.data)).to.eql(fixtures.sitesResponse);
  });

  it('Access a sharePoint site using the siteId.', async () => {
    const state = {
      configuration: {
        accessToken: fixtures.accessToken,
      },
    };

    const finalState = await execute(getSites('openfn.sharepoint.com'))(state);

    expect(JSON.parse(finalState.data)).to.eql(fixtures.sitesResponse);
  });

  it('throws 400 error', async () => {
    const state = {
      configuration: {
        accessToken: fixtures.accessToken,
      },
    };

    const error = await execute(getSites('noAccess'))(state).catch(error => {
      return error;
    });

    expect(error.message).to.contain('Invalid hostname for this tenancy');
  });

  it('throws 401 error with invalidToken message', async () => {
    const state = {
      configuration: {
        accessToken: fixtures.invalidToken,
      },
    };

    const error = await execute(getSites('openfn.sharepoint.com'))(state).catch(
      error => {
        return error;
      }
    );

    expect(error.message).to.contain(
      'CompactToken parsing failed with error code: 80049217'
    );
  });

  it('throws 401 error with expiredToken message', async () => {
    const state = {
      configuration: {
        accessToken: fixtures.expiredToken,
      },
    };

    const error = await execute(getSites('openfn.sharepoint.com'))(state).catch(
      error => {
        return error;
      }
    );

    expect(error.message).to.contain(
      'Access token has expired or is not yet valid.'
    );
  });
});

describe('getDrives', () => {
  it('Get a drive for a site', async () => {
    const state = {
      configuration: {
        accessToken: fixtures.accessToken,
      },
    };

    const finalState = await execute(
      getDrives({ siteId: 'openfn.sharepoint.com', defaultDrive: true })
    )(state);

    expect(JSON.parse(finalState.data)).to.eql(fixtures.driveResponse);
  });
});
