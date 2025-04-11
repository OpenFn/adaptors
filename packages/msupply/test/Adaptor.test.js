import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import { getItemsWithStats, insertOutboundShipment, request, upsertOutboundShipment } from '../src/Adaptor.js';
import testData from './fixtures.json' assert {type: 'json'}



const testServer = enableMockClient('https://fake.server.com');

let state = {
  configuration: {
    "username": "username",
    "password": "password",
    "baseUrl": "https://fake.server.com"
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

    const { data } = await getItemsWithStats({
      body: {
        variables: testData.getItemsWithStats.variables,
      },
      headers: {
        Authorization: "Bearer xyz"
      }
    })(state);

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

    const { data } = await insertOutboundShipment({
      body: {
        variables: testData.insertOutboundShipment.variables,
      },      
      headers: {
        Authorization: "Bearer xyz"
      }
    })(state);

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

    const { data } = await upsertOutboundShipment({
      body: {
       variables: testData.upsertOutboundShipment.variables, 
      },
      headers: {
        Authorization: "Bearer xyz"
      }
    })(state);

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

    const { data } = await request({
      body: {
        query: `query stockLines(
          $first: Int,
          $offset: Int,
          $key: StockLineSortFieldInput!,
          $desc: Boolean,
          $filter: StockLineFilterInput,
          $storeId: String!
        ) {
          stockLines(
            storeId: $storeId,
            filter: $filter,
            page: {first: $first, offset: $offset},
            sort: {key: $key, desc: $desc}
          ) {
            ... on StockLineConnector {
              __typename
              nodes {
                item {
                  code
                  name
                  unitName
                }
              }
              totalCount
            }
          }
        }
        `,
        variables: testData.request.variables,
      },
      headers: {
        Authorization: "Bearer xyz"
      }
    })(state);

    expect(data).to.eql(testData.request.response);
  });
});
