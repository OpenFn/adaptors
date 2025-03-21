import { certifyVaccination } from '../src'
import testData from "./fixtures.json" assert { type: 'json' };
import { enableMockClient } from '@openfn/language-common/util';
import { expect } from 'chai';


const configuration = {
  access_token: "access_token",
  baseUrl: "https://demo-divoc.egov.org.in"
};


const testServer = enableMockClient(configuration.baseUrl);
const jsonHeaders = {
  headers: {
    'Content-Type': 'application/json',
  },
};


describe('certify', () => {
  it('should certify a vaccination', async () => {
    testServer.intercept({
      path: /v1\/certify/,
      method: "POST"
    })
      .reply(200, { message: 'success' }, { ...jsonHeaders });

    const state = { configuration }

    const { data: { message } } = await certifyVaccination(testData.vaccination)(state);

    expect(message).to.eql('success');
  });

});