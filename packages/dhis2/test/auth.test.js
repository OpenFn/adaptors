import chai from 'chai';
import { execute, create, update, upsert, get } from '../src/Adaptor.js';
import { dataValue } from '@openfn/language-common';
import { enableMockClient } from '@openfn/language-common/util';
import * as util from '../src/util.js';
import {
  makeBasicAuthHeader,
} from '@openfn/language-common/util';

const { expect } = chai;

const hostUrl = 'https://auth.dhis2.org';
const testServer = enableMockClient(hostUrl);


describe('configureAuth', () => {
  it('should prefer PAT over username and password when both are provided', () => {
    const headers = util.configureAuth({ pat: 'mytoken', username: 'admin', password: 'district' });
    expect(headers).to.eql({ Authorization: 'ApiToken mytoken' });
  });

  it('should throw if password is provided without a username', () => {
    expect(() => util.configureAuth({ username: '', password: 'district' })).to.throw(
      'Invalid authorization credentials. Include a PAT or a username and password in state.configuration'
    );
  });

  it('should throw if username is provided without a password', () => {
    expect(() => util.configureAuth({ username: 'admin', password: '' })).to.throw(
      'Invalid authorization credentials. Include a PAT or a username and password in state.configuration'
    );
  });

  it('should throw if no valid credentials are provided', () => {
    expect(() => util.configureAuth({})).to.throw(
      'Invalid authorization credentials. Include a PAT or a username and password in state.configuration'
    );
  });

})