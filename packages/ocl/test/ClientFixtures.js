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
    data: {
      type: 'Organization',
      uuid: '370',
      id: 'OpenFn',
      public_access: 'View',
      name: 'Open Function Group',
      company: 'Open Function Group',
      website: 'https://www.openfn.org',
      location: 'USA',
      members: 2,
      created_on: '2023-05-01T12:51:30.844376Z',
      updated_on: '2023-05-01T12:51:56.775901Z',
      url: '/orgs/OpenFn/',
      extras: {},
      created_by: 'taylordowns2000',
      updated_by: 'taylordowns2000',
      sources_url: '/orgs/OpenFn/sources/',
      public_sources: 1,
      collections_url: '/orgs/OpenFn/collections/',
      public_collections: 0,
      logo_url: null,
      description: '',
      text: '',
    },
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
        external_id: null,
        retired: false,
        map_type: 'SAME-AS',
        source: 'st-lucia-dhis2-dataElems',
        owner: 'OpenFn',
        owner_type: 'Organization',
        from_concept_code: '2',
        from_concept_name: 'Sample Org B',
        from_concept_url: '',
        to_concept_code: 'n2xYlNbsfko',
        to_concept_name: 'Sample Org B',
        to_concept_url: null,
        from_source_owner: '',
        from_source_owner_type: null,
        from_source_url: null,
        from_source_name: null,
        to_source_owner: '',
        to_source_owner_type: null,
        to_source_url: null,
        to_source_name: null,
        url: '/orgs/OpenFn/sources/st-lucia-dhis2-dataElems/mappings/2/',
        version: '4913769',
        id: '2',
        versioned_object_id: 4913769,
        versioned_object_url:
          '/orgs/OpenFn/sources/st-lucia-dhis2-dataElems/mappings/2/',
        is_latest_version: false,
        update_comment: null,
        version_url:
          '/orgs/OpenFn/sources/st-lucia-dhis2-dataElems/mappings/2/4913770/',
        uuid: '4913769',
        version_created_on: '2023-05-01T13:01:27.653162Z',
        from_source_version: null,
        to_source_version: null,
        type: 'Mapping',
        sort_weight: null,
      },
    ],
  });

export default mockAgent;
