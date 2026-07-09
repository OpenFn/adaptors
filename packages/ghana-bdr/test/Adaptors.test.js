import { expect } from 'chai';

import { createBirthRecord, get } from '../src/Adaptor.js';
import { setMockClient, resetClient } from '../src/Utils.js';
import { createMockAgent } from './mock.js';
import { testBirthData, birthCreationResponse } from './fixtures.js';

// Reset the module-level client singleton before each test so
// mock and real clients don't leak across tests
beforeEach(() => {
  resetClient();
});

describe('createBirthRecord', () => {
  it('creates a birth record', async () => {
    const mockAgent = createMockAgent();
    setMockClient(mockAgent);

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
    const mockAgent = createMockAgent();
    setMockClient(mockAgent);

    const state = {
      configuration: {
        token: 'fake-test-token',
        baseUrl: 'https://bdr.npontu.com',
      },
      data: testBirthData,
    };

    // The mock intercepts via MockAgent; because we use the same baseUrl
    // as createMockAgent, the request goes through the mock pool.
    const finalState = await createBirthRecord(state => state.data)(state);

    expect(finalState.data.api_status).to.equal('success');
    // Verify the response echoes back data from our fixture
    expect(finalState.data.api_data.child_first_name).to.equal('FRANCIS');
  });
});

describe('get', () => {
  it('retrieves a birth record via GET', async () => {
    const mockAgent = createMockAgent();
    setMockClient(mockAgent);

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
