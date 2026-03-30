import { expect, assert } from 'chai';
import { builders } from '../../src/index';

describe('SzEpisodeOfCare', () => {
  it('should create a simple SzEpisodeOfCare', () => {
    const resource = builders.episodeOfCare('SzEpisodeOfCare', {});
    assert.isOk(resource);
  });

  it('should create an example SzEpisodeOfCare', () => {
    const resource = builders.episodeOfCare('SzEpisodeOfCare', {
      id: '123',
      type: 'ART',
      patient: 'Patient/123',
      status: 'active',
    });

    // skip narrative generation
    delete resource.text;

    expect(resource).eql({
      resourceType: 'EpisodeOfCare',
      meta: {
        profile: [
          'https://hapifhir.eswatinihie.com/fhir/StructureDefinition/SzEpisodeOfCare',
        ],
      },
      id: '123',
      type: [
        {
          coding: [
            {
              code: 'art',
              display: 'ART',
              system:
                'https://hapifhir.eswatinihie.com/fhir/CodeSystem/SzEpisodeOfCareTypeCS',
            },
          ],
        },
      ],
      patient: { reference: 'Patient/123' },
      status: 'active',
    });
  });
});
