import { expect, assert } from 'chai';

import { addToBundle } from '../src/Adaptor';
import * as b from '../src/builders.js';

describe('addToBundle', () => {
  it('should add a resource to a bundle and generate fullUrl', () => {
    const state = {};

    const patient = b.patient({ id: 'joe' });
    addToBundle(patient)(state);

    expect(state.bundle.entry.length).to.equal(1);
    expect(state.bundle.entry[0].fullUrl).to.equal(
      'http://172.209.216.154/fhir/Patient/joe',
    );
  });
});
