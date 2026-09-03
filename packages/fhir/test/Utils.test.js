import { expect } from 'chai';

import { getTLSOptions } from '../src/Utils.js';

describe('getTLSOptions', () => {
  it('prefers requestOptions.tls over configuration.tls', () => {
    const configuration = {
      tls: { ca: 'config-ca', cert: 'config-cert' },
    };

    const requestOptions = {
      tls: { ca: 'request-ca', cert: 'request-cert' },
    };

    const result = getTLSOptions(configuration, requestOptions);
    expect(result).to.deep.equal(requestOptions.tls);
  });

  it('falls back to configuration.tls if requestOptions.tls is not provided', () => {
    const configuration = {
      tls: { ca: 'config-ca', cert: 'config-cert' },
    };

    const result = getTLSOptions(configuration, {});
    expect(result).to.deep.equal(configuration.tls);
  });

  it('returns undefined if no TLS config is found', () => {
    const result = getTLSOptions({}, {});
    expect(result).to.be.undefined;
  });
});
