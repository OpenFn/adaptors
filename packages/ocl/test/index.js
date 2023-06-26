import { expect } from 'chai';
import { execute, get, getMappings } from '../src/Adaptor.js';

import MockAgent from './ClientFixtures.js';
import { setGlobalDispatcher } from 'undici';

setGlobalDispatcher(MockAgent);

describe('execute', () => {
  it('executes each operation in sequence', done => {
    const state = {};
    const operations = [
      state => {
        return { counter: 1 };
      },
      state => {
        return { counter: 2 };
      },
      state => {
        return { counter: 3 };
      },
    ];

    execute(...operations)(state)
      .then(finalState => {
        expect(finalState).to.eql({ counter: 3 });
      })
      .then(done)
      .catch(done);
  });

  it('assigns references, data to the initialState', () => {
    const state = {};

    execute()(state).then(finalState => {
      expect(finalState).to.eql({ references: [], data: null });
    });
  });
});

describe('get', () => {
  it('makes a get request to the right endpoint', async () => {
    const state = {
      configuration: {
        baseUrl: 'https://api.openconceptlab.org',
      },
    };

    const finalState = await execute(get('orgs/OpenFn'))(state);

    expect(finalState.data).to.eql({
      type: 'Organization',
      uuid: '370',
      id: 'OpenFn',
      public_access: 'View',
      name: 'Open Function Group',
      company: 'Open Function Group',
      website: 'https://www.openfn.org',
      location: 'USA',
    });
  });

  it('throws an error for a 404', async () => {
    const state = {
      configuration: {
        baseUrl: 'https://api.openconceptlab.org',
      },
    };

    const error = await execute(get('orgs/noAccess'))(state).catch(error => {
      return error;
    });

    expect(error.message).to.contains('Not found');
  });
});

describe('getMappings', () => {
  it('get mappings for a given owner and source', async () => {
    const state = {
      configuration: {
        baseUrl: 'https://api.openconceptlab.org',
      },
    };

    const finalState = await execute(
      getMappings('OpenFn', 'st-lucia-dhis2-dataElems', {
        repository: 'sources',
      })
    )(state);

    expect(finalState.data).to.eql({
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
  });
});
