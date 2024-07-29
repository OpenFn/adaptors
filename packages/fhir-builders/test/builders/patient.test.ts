import { expect } from 'chai';

import patient from '../../src/builders/patient';

describe('Patient', () => {
  // TODO maybe
  it('should create a patient with a name', () => {
    const p = patient({ id: 'x' });
    console.log({ p });

    const p2 = p.name({ text: 'joe', use: 'official' });
    console.log({ p2 });
  });
});
