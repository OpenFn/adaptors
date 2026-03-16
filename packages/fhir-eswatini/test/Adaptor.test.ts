import { expect, assert } from 'chai';

import { addToBundle, mapValues } from '../src/Adaptor';
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

describe('mapValues', () => {
  it('should set a value map', () => {
    const state = {};

    mapValues('http://172.209.216.154:3447/fhir/ValueSet/SzTinkhundlaVS', {
      abc: '3',
    })(state);

    const resource = b.patient('SzPatient', {
      inkhundla: 'abc',
    });

    assert.deepEqual(resource.extension[0], {
      url: 'http://172.209.216.154:3447/fhir/StructureDefinition/SzInkhundlaExtension',

      valueCodeableConcept: {
        coding: [
          {
            system:
              'https://hapifhir.eswatinihie.com/fhir/CodeSystem/SzTinkhundlaCS',
            code: '3',
            display: 'LOBAMBA',
          },
        ],
        text: 'LOBAMBA',
      },
    });
    assert.isOk(resource);
  });
});
