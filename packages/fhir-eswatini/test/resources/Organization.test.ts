import { expect, assert } from 'chai';
import { builders } from '../../src/index';

describe('SzOrganization', () => {
  it('should create a simple SzOrganization', () => {
    const resource = builders.organization('SzOrganization', {});
    assert.isOk(resource);
  });
});
