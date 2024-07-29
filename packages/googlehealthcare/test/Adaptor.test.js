import { expect } from 'chai';
import { execute, createFhirResource } from '../src/Adaptor.js';

import MockAgent from './mockAgent.js';
import { setGlobalDispatcher } from 'undici';

setGlobalDispatcher(MockAgent);

describe('execute', () => {
  it('executes each operation in sequence', done => {
    const state = {
      configuration: { accessToken: 'aGVsbG86dGhlcmU' },
      data: {},
      references: [],
    };
    const operations = [
      state => {
        return { ...state, counter: 1 };
      },
      state => {
        return { ...state, counter: 2 };
      },
      state => {
        return { ...state, counter: 3 };
      },
    ];

    execute(...operations)(state)
      .then(finalState => {
        expect(finalState).to.eql({ ...state, counter: 3 });
      })
      .then(done)
      .catch(done);
  });

  it('assigns references, data to the initialState', () => {
    const state = { configuration: {}, data: {} };

    execute()(state).then(finalState => {
      expect(finalState).to.eql({ references: [], data: null });
    });
  });
});

describe('createFhirResource', () => {
  it('creates a patient resource to google cloud healthcare', async () => {
    const state = {
      configuration: {
        accessToken: 'aGVsbG86dGhlcmU=',
      },
      data: {
        fhirStore: {
          cloudRegion: 'us-east7',
          projectId: 'test-007',
          datasetId: 'fhir-007',
          fhirStoreId: 'testing-fhir-007',
        },
        resource: {
          resourceType: 'Patient',
          name: [{ use: 'official', family: 'Smith', given: ['Darcy'] }],
          gender: 'female',
          birthDate: '1970-01-01',
        },
      },
    };

    const finalState = await execute(
      createFhirResource(
        state => state.data.fhirStore,
        state => state.data.resource
      )
    )(state);

    expect(finalState.data).to.eql({
      data: {
        birthDate: '1970-01-01',
        gender: 'female',
        id: '08ab7dd6-4271-45b2-a6a7-0ecd5ddce29d',
        meta: {
          lastUpdated: '2023-06-23T16:40:46.202757+00:00',
          versionId: 'MTY4NzUzODQ0NjIwMjc1NzAwMA',
        },
        name: [
          {
            family: 'Smith',
            given: ['Darcy'],
            use: 'official',
          },
        ],
        resourceType: 'Patient',
      },
    });
  });

  it('throws an error for a 400', async () => {
    const state = {
      configuration: {
        accessToken: 'aGVsbG86dGhlcmU=',
      },
    };

    const error = await execute(
      createFhirResource(
        {
          cloudRegion: 'us-east7',
          projectId: 'test-007',
          datasetId: 'fhir-007',
          fhirStoreId: 'testing-fhir-007',
        },
        {
          name: 'taylor',
          resourceType: 'noAccess',
        }
      )
    )(state).catch(error => {
      return error;
    });

    expect(error.message).to.contains('unsupported resource type: noAccess');
  });

  it('throws an error for a 401', async () => {
    const state = {
      configuration: {
        accessToken: 'aGVsbG86dGhlcmU=a',
      },
    };

    const error = await execute(
      createFhirResource(
        {
          cloudRegion: 'us-east7',
          projectId: 'test-007',
          datasetId: 'fhir-007',
          fhirStoreId: 'testing-fhir-007',
        },
        {
          name: 'taylor',
          resourceType: 'Patient',
        }
      )
    )(state).catch(error => {
      return error;
    });

    expect(error.message).to.contains('Unauthorized');
  });

  it('throws an error if fhirStore infromation are not provided', async () => {
    const state = {
      configuration: {
        accessToken: 'aGVsbG86dGhlcmU=a',
      },
    };

    const error = await execute(
      createFhirResource(
        {},
        {
          name: 'taylor',
          resourceType: 'Patient',
        }
      )
    )(state).catch(error => {
      return error;
    });

    expect(error.message).to.contains(
      'Missing key(s) in fhirStore: cloudRegion, projectId, datasetId, fhirStoreId'
    );
  });
});
