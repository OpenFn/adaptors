import { expect, assert } from 'chai';
import * as builders from '../src/builders.js';
import { identifier } from '../src/utils.js';

describe('Patient', () => {
  it('should create a simple Patient', () => {
    const resource = builders.patient('Patient', {});
    assert.isOk(resource);
  });

  it('should create a simple Patient with identifier', () => {
    const resource = builders.patient('Patient', {
      identifier: {
        value: '738472983',
        system: 'urn:oid:2.16.840.1.113883.2.4.6.3',
      },
    });
    assert.isOk(resource);
  });

  /**
   * Ways we might use the util
   *
   * signature: util.identifier(value, extras)
   *
   * // identifier without system (would use the adaptor default)
   * util.identifer('abcd')
   *
   * // use util.value() to create system value pair, and add a usage
   * util.identifer(util.value('abcd', 'urn:oid:1.2.36.146.595.217.0.1'), { use: 'usual' }) //
   *
   * // use value to create system value pair, and add a usage
   * util.identifer('abcd', { system: 'urn:oid:1.2.36.146.595.217.0.1', use: 'usual' })
   *
   * // Pass value and system object, plus extras
   * util.identifer({ value: 'abcd', system: 'urn:oid:1.2.36.146.595.217.0.1' }, { use: 'usual' })
   *
   * // everything in together
   * util.identifer({ value: 'abcd', system: 'urn:oid:1.2.36.146.595.217.0.1', use: 'usual' })
   */
  it('should create a simple Patient with identifier and util', () => {
    const resource = builders.patient('Patient', {
      identifier: {
        value: '738472983',
        system: 'urn:oid:2.16.840.1.113883.2.4.6.3',
      },
    });
    assert.isOk(resource);
  });

  it('should create an example patient', () => {
    const resource = builders.patient('Patient', {});
    assert.isOk(resource);
  });
});
