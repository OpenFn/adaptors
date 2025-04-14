import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import { getItemsWithStats, insertOutboundShipment, query, upsertOutboundShipment } from '../src/Adaptor.js';
import testData from './fixtures.json' assert {type: 'json'}



const testServer = enableMockClient('https://fake.server.com');

let state = {
  configuration: {
    "username": "username",
    "password": "password",
    "baseUrl": "https://fake.server.com",
    "token": "xyz"
  }
}

describe('Get items with stats', () => {
  it('makes a post request to the right endpoint', async () => {
    testServer
      .intercept({
        path: '/graphql',
        method: 'POST',
      })
      .reply(200, testData.getItemsWithStats.response);

    const { data } = await getItemsWithStats(testData.getItemsWithStats.variables)(state);

    expect(data).to.eql(testData.getItemsWithStats.response);
  });
});

describe('Create outbound shipments', () => {
  it('makes a post request to the right endpoint', async () => {
    testServer
      .intercept({
        path: '/graphql',
        method: 'POST',
      })
      .reply(200, testData.insertOutboundShipment.response);

    const { data } = await insertOutboundShipment(testData.insertOutboundShipment.variables)(state);

    expect(data).to.eql(testData.insertOutboundShipment.response);
  });
});

describe('Upsert outbound shipments', () => {
  it('makes a post request to the right endpoint', async () => {
    testServer
      .intercept({
        path: '/graphql',
        method: 'POST',
      })
      .reply(200, testData.upsertOutboundShipment.response);

    const { data } = await upsertOutboundShipment(testData.upsertOutboundShipment.variables)(state);

    expect(data).to.eql(testData.upsertOutboundShipment.response);
  });
});

describe('Request', () => {
  it('makes a post request to the right endpoint', async () => {
    testServer
      .intercept({
        path: '/graphql',
        method: 'POST',
      })
      .reply(200, testData.request.response);

    const { data } = await query(`
      query isCentralServer {
        isCentralServer
      }`
    )(state);

    expect(data).to.eql(testData.request.response);
  });
});
