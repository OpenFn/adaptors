import { expect } from 'chai';

import { createBirthRecord, get } from '../src/Adaptor.js';
import { setupMockServer } from './mock.js';
import { testBirthData, birthCreationResponse } from './fixtures.js';

// enableMockClient registers a mock agent for this origin for the whole
// test process, so set it up once at module load
setupMockServer('https://bdr.npontu.com');

describe('createBirthRecord', () => {
  it('creates a birth record', async () => {
    const state = {
      configuration: {
        token: 'fake-test-token',
        baseUrl: 'https://bdr.npontu.com',
      },
      data: testBirthData,
    };

    const finalState = await createBirthRecord(state => state.data)(state);

    expect(finalState).to.exist;
    expect(finalState.data).to.exist;
    expect(finalState.data.api_data.document_number).to.equal(
      birthCreationResponse.api_data.document_number
    );
  });

  it('forwards the request body to the endpoint', async () => {
    const state = {
      configuration: {
        token: 'fake-test-token',
        baseUrl: 'https://bdr.npontu.com',
      },
      data: testBirthData,
    };

    const finalState = await createBirthRecord(state => state.data)(state);

    expect(finalState.data.api_status).to.equal('success');
    // Verify the response echoes back data from our fixture
    expect(finalState.data.api_data.child_first_name).to.equal('FRANCIS');
  });
});

describe('get', () => {
  it('retrieves a birth record via GET', async () => {
    const state = {
      configuration: {
        token: 'fake-test-token',
        baseUrl: 'https://bdr.npontu.com',
      },
    };

    const finalState = await get(
      '/api/v1/UserManagementService/integrations/registrations/birth/123'
    )(state);

    expect(finalState).to.exist;
    expect(finalState.data).to.exist;
    expect(finalState.data.api_data.document_number).to.equal(
      birthCreationResponse.api_data.document_number
    );
  });
});
