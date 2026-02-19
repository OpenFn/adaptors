import { expect, assert } from 'chai';
import { builders } from '../../src/index';

describe('SzEncounter', () => {
  it('should create a simple SzEncounter', () => {
    const resource = builders.encounter('SzEncounter', {});
    assert.isOk(resource);
  });

  it('should map class to an IG value', () => {
    const resource = builders.encounter('SzEncounter', {
      class: 'OPD',
    });
    assert.deepEqual(resource.class, {
      code: 'OPD',
      display: 'Outpatient Department',
      system:
        'https://hapifhir.eswatinihie.com/fhir/CodeSystem/SzEncounterClassificationCS',
    });
  });

  // TODO: map to a base fhir 4 value (if they want those)
});
