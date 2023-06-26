import { MockAgent } from 'undici';

const mockAgent = new MockAgent();

const mockPool = mockAgent.get('https://api.openconceptlab.org');

// For get()
mockPool
  .intercept({
    path: '/orgs/OpenFn',
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  })
  .reply(200, {
    type: 'Organization',
    uuid: '370',
    id: 'OpenFn',
    public_access: 'View',
    name: 'Open Function Group',
    company: 'Open Function Group',
    website: 'https://www.openfn.org',
    location: 'USA',
  });

mockPool
  .intercept({
    path: '/orgs/noAccess',
    method: 'GET',
  })
  .reply(404, {
    message: 'Not found',
    status: 'error',
    code: 404,
  });

//For getMappings
mockPool
  .intercept({
    path: '/orgs/OpenFn/sources/st-lucia-dhis2-dataElems/HEAD/mappings',
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  })
  .reply(200, {
    data: [
      {
        retired: false,
        map_type: 'SAME-AS',
        source: 'st-lucia-dhis2-dataElems',
        owner: 'OpenFn',
        owner_type: 'Organization',
        from_concept_code: '2',
        from_concept_name: 'Sample Org B',
        to_concept_code: 'n2xYlNbsfko',
        to_concept_name: 'Sample Org B',
        url: '/orgs/OpenFn/sources/st-lucia-dhis2-dataElems/mappings/2/',
        version: '4913769',
        type: 'Mapping',
      },
    ],
  });

export default mockAgent;
