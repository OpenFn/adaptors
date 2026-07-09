import { expect } from 'chai';

import { createBirthRecord, get } from '../src/Adaptor.js';
import { testBirthData } from './fixtures.js';

// ─── Configuration ───────────────────────────────────────────────
// Integration tests hit the real BDR beta server.
// Replace the token below with valid beta credentials before running.
// Run with: pnpm test:integration
// ─────────────────────────────────────────────────────────────────

const CONFIG = {
  // Fake token — replace with real beta credentials to run integration tests
  token: 'FAKE-INTEGRATION-TOKEN-REPLACE-ME',
  baseUrl: 'https://bdrbeta.npontu.com',
};

describe('Integration — createBirthRecord', function() {
  this.timeout(60000);

  it('creates a birth record against the real BDR API', async () => {
    const state = {
      configuration: CONFIG,
      data: testBirthData,
    };

    const finalState = await createBirthRecord(state => state.data)(state);

    expect(finalState).to.exist;
    expect(finalState.data).to.exist;
    expect(finalState.data.api_status).to.equal('success');
    expect(finalState.data.api_data.document_number).to.exist;
  });
});

describe('Integration — get', function() {
  this.timeout(60000);

  it('retrieves a birth record via GET against the real BDR API', async () => {
    // First create a record to get a document_number
    const createState = {
      configuration: CONFIG,
      data: testBirthData,
    };

    const created = await createBirthRecord(state => state.data)(createState);
    const documentNumber = created.data.api_data.document_number;

    expect(documentNumber).to.exist;

    // Now fetch it back via GET
    const getState = {
      configuration: CONFIG,
    };

    const finalState = await get(
      `/api/v1/UserManagementService/integrations/registrations/birth/${documentNumber}`
    )(getState);

    expect(finalState).to.exist;
    expect(finalState.data).to.exist;
    expect(finalState.data.api_data.document_number).to.equal(documentNumber);
  });
});
