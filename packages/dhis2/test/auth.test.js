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
  it('should set a PAT auth header', () => {
    const headers = util.configureAuth({ pat: 'mytoken' });
    expect(headers).to.eql({ Authorization: 'ApiToken mytoken' });
  });

  it('should set a basic auth header', () => {
    const headers = util.configureAuth({ username: 'admin', password: 'district' });
    expect(headers).to.eql(makeBasicAuthHeader('admin', 'district'));
  });

  it('should throw if pat is empty', () => {
    expect(() => util.configureAuth({ pat: '' })).to.throw(
      'Invalid authorization credentials. Include a PAT or a username and password in state.configuration'
    );
  });

  it('should throw if username is empty', () => {
    expect(() => util.configureAuth({ username: '', password: 'district' })).to.throw(
      'Invalid authorization credentials. Include a PAT or a username and password in state.configuration'
    );
  });

  it('should throw if password is empty', () => {
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