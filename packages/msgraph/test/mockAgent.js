import { MockAgent } from 'undici';
import { fixtures } from './fixtures';

const mockAgent = new MockAgent();

const mockPool = mockAgent.get('https://graph.microsoft.com');

const jsonResponse = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${fixtures.accessToken}`,
};

const headersWithInvalidToken = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${fixtures.invalidToken}`,
};

const headersWithExpiredToken = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${fixtures.expiredToken}`,
};

// MockPool for getDrive()
mockPool
  .intercept({
    path: '/v1.0/sites/openfn.sharepoint.com/drive',
    method: 'GET',
    headers: headersWithExpiredToken,
  })
  .reply(401, fixtures.expiredTokenResponse);

mockPool
  .intercept({
    path: '/v1.0/sites/noAccess/drive',
    method: 'GET',
    headers: headers,
  })
  .reply(400, fixtures.invalidRequestResponse);

mockPool
  .intercept({
    path: '/v1.0/sites/openfn.sharepoint.com/drive',
    method: 'GET',
    headers: headers,
  })
  .reply(200, fixtures.driveResponse, jsonResponse)
  .persist();

mockPool
  .intercept({
    path: '/v1.0/drives/b!YXzpkoLwR06bxC8tNdg71m_',
    method: 'GET',
    headers: headers,
  })
  .reply(200, fixtures.driveResponse, jsonResponse)
  .persist();

// MockPool for getFolder()
mockPool
  .intercept({
    path: '/v1.0/drives/b!YXzpkoLwR06bxC8tNdg71m_/root:/%2FSample%20Data',
    method: 'GET',
    headers: headers,
  })
  .reply(200, fixtures.itemResponse, jsonResponse)
  .persist();

mockPool
  .intercept({
    path: '/v1.0/drives/b!YXzpkoLwR06bxC8tNdg71m_/root:/%2FSample%20Data:/children',
    method: 'GET',
    headers: headers,
  })
  .reply(200, fixtures.itemsResponse, jsonResponse)
  .persist();

mockPool
  .intercept({
    path: '/v1.0/drives/b!YXzpkoLwR06bxC8tNdg71m_/items/01LUM6XOCKDTZKQC7AVZF2VMHE2I3O6OY3',
    method: 'GET',
    headers: headers,
  })
  .reply(200, fixtures.itemResponse, jsonResponse)
  .persist();

mockPool
  .intercept({
    path: '/v1.0/drives/b!YXzpkoLwR06bxC8tNdg71m_/items/01LUM6XOCKDTZKQC7AVZF2VMHE2I3O6OY3/children',
    method: 'GET',
    headers: headers,
  })
  .reply(200, fixtures.itemsResponse, jsonResponse)
  .persist();

//MockPool for getFile()
mockPool
  .intercept({
    path: '/v1.0/drives/b!YXzpkoLwR06bxC8tNdg71m_/root:/%2FSample%20Data%2Ftest.csv',
    method: 'GET',
    headers: headers,
  })
  .reply(200, fixtures.itemWithDownloadUrl, jsonResponse)
  .persist();

mockPool
  .intercept({
    path: '/v1.0/drives/b!YXzpkoLwR06bxC8tNdg71m_/root:/%2FSample%20Data%2Ftest.csv:/content',
    method: 'GET',
    headers: headers,
  })
  .reply(200, fixtures.itemContent)
  .persist();

mockPool
  .intercept({
    path: '/v1.0/drives/b!YXzpkoLwR06bxC8tNdg71m_/items/01LUM6XOGRONYNTZ26DBBJPTN5IFTQPBIW',
    method: 'GET',
    headers: headers,
  })
  .reply(200, fixtures.itemWithDownloadUrl, jsonResponse)
  .persist();

mockPool
  .intercept({
    path: '/v1.0/drives/b!YXzpkoLwR06bxC8tNdg71m_/items/01LUM6XOGRONYNTZ26DBBJPTN5IFTQPBIW/content',
    method: 'GET',
    headers: headers,
  })
  .reply(200, fixtures.itemContent)
  .persist();

mockPool
  .intercept({
    path: '/v1.0/sites/openfn.sharepoint.com/drive/items/01LUM6XOGVJ2OK2Z5RJRAKU3WAK2MTC5XD:/2023_09_19T07_29_09_369Z.xls:/content',
    method: 'PUT',
    headers: headers,
  })
  .reply(200, fixtures.submitXlsResponse);

export default mockAgent;
