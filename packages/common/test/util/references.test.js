import { expect } from 'chai';
import {
  expandReferences,
  normalizeOauthConfig,
} from '../../src/util/index.js';

describe('util expandReferences', () => {
  it('should not modify string references', () => {
    const name = 'mulder';
    const state = {};

    const [resolvedName] = expandReferences(state, name);

    expect(resolvedName).to.equal('mulder');
  });

  it('should ignore regex literals', () => {
    const regex = /scully/;
    const state = {};

    const [resolvedRegex] = expandReferences(state, regex);

    expect(resolvedRegex instanceof RegExp).to.be.true;
    expect(resolvedRegex.test('scully')).to.be.true;
  });

  it('should ignore regex instances', () => {
    const regex = new RegExp('scully');
    const state = {};

    const [resolvedRegex] = expandReferences(state, regex);

    expect(resolvedRegex instanceof RegExp).to.be.true;
    expect(resolvedRegex.test('scully')).to.be.true;
  });

  it('should expand function references', () => {
    const state = { name: 'mulder' };
    const name = s => s.name;

    const [resolvedName] = expandReferences(state, name);

    expect(resolvedName).to.equal('mulder');
  });

  it('should recursively expand function references', () => {
    const state = { name: 'mulder' };
    const name = s => s => s.name;

    const [resolvedName] = expandReferences(state, name);

    expect(resolvedName).to.equal('mulder');
  });

  it('should expand multiple references', () => {
    const state = { name: 'mulder', truth: 'out there' };
    const name = s => s.name;
    const truth = s => s.truth;

    const [resolvedName, resolvedTruth] = expandReferences(state, name, truth);

    expect(resolvedName).to.equal('mulder');
    expect(resolvedTruth).to.equal('out there');
  });

  it('should expand array references', () => {
    const state = { name: 'mulder' };
    const name = ['fox', s => s.name];

    const [resolvedName] = expandReferences(state, name);

    const [fname, sname] = resolvedName;
    expect(fname).to.equal('fox');
    expect(sname).to.equal('mulder');
  });

  it('should expand object references', () => {
    const state = { name: 'mulder' };
    const name = {
      first: 'fox',
      second: s => s.name,
    };

    const [resolvedName] = expandReferences(state, name);

    expect(resolvedName.first).to.equal('fox');
    expect(resolvedName.second).to.equal('mulder');
  });
});

describe('util normalizeOauthConfig', () => {
  it('should create an `accessToken` key for a standard OAuth2 JSON credential', () => {
    const configuration = { access_token: 'abc123' };

    const normalizedConfig = normalizeOauthConfig(configuration);

    expect(normalizedConfig).to.eql({
      ...configuration,
      accessToken: 'abc123',
    });
  });

  it('should use `accessToken` if `access_token` is not provided', () => {
    const configuration = { accessToken: 'def456' };

    const normalizedConfig = normalizeOauthConfig(configuration);

    expect(normalizedConfig).to.eql({
      accessToken: 'def456',
    });
  });

  it('should throw an error when both `accessToken` and `access_token` are provided', () => {
    const configuration = { access_token: 'abc123', accessToken: 'def456' };

    expect(function () {
      normalizeOauthConfig(configuration);
    }).to.throw('Both "accessToken" & "access_token" keys found');
  });
});
