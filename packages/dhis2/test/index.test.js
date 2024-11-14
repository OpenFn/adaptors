import chai from 'chai';
import {
  execute,
  create,
  update,
  get,
  upsert,
  shouldUseNewTracker,
} from '../src/Adaptor';
import { dataValue } from '@openfn/language-common';
import { buildUrl, generateUrl, nestArray } from '../src/Utils';
import nock from 'nock';

const { expect } = chai;

const testServer = nock('https://play.dhis2.org/2.36.4');

describe('execute', () => {
  it('executes each operation in sequence', done => {
    let state = {
      configuration: {
        hostUrl: 'https://play.dhis2.org/demo',
      },
    };
    let operations = [
      () => ({ counter: 1 }),
      () => ({ counter: 2 }),
      () => ({ counter: 3 }),
    ];

    execute(...operations)(state)
      .then(finalState => {
        expect(finalState).to.eql({ counter: 3 });
      })
      .then(done)
      .catch(done);
  });

  it('assigns references, data to the initialState', () => {
    let state = {
      configuration: {
        hostUrl: 'https://play.dhis2.org/demo',
      },
    };

    const finalState = execute()(state);

    execute()(state).then(finalState => {
      expect(finalState).to.eql({
        configuration: {
          hostUrl: 'https://play.dhis2.org/demo',
        },
        references: [],
        data: null,
      });
    });
  });
});

describe('get', () => {
  const state = {
    configuration: {
      username: 'admin',
      password: 'district',
      hostUrl: 'https://play.dhis2.org/2.36.4',
    },
    data: {},
  };

  it('should make an authenticated GET to the right url when params are specified inside options as well as inside query', async () => {
    const query = {
      dataSet: 'pBOMPrpg1QX',
      period: 201401,
      orgUnit: 'DiszpKrYNg8',
      filter: ['this:Eq:that', 'then:gt:2'],
    };

    // NOTE: It appears that this is the dhis2-desired format for array params.
    const queryString =
      'dataSet=pBOMPrpg1QX&period=201401&orgUnit=DiszpKrYNg8' +
      '&filter=this:Eq:that&filter=then:gt:2' +
      '&fields=*';

    testServer
      .get(`/api/dataValueSets?${queryString}`)
      .matchHeader('authorization', 'Basic YWRtaW46ZGlzdHJpY3Q=')
      .reply(200, {
        httpStatus: 'OK',
        message: "you've got multiple filters and that's OK!",
      });

    const finalState = await execute(
      get('dataValueSets', query, { params: { fields: '*' } })
    )(state);

    expect(finalState.data).to.eql({
      httpStatus: 'OK',
      message: "you've got multiple filters and that's OK!",
    });
  });

  it('should handle arrays of params, like orgUnit', async () => {
    const query = {
      dataSet: 'pBOMPrpg1QX',
      period: 201401,
      orgUnit: ['DiszpKrYNg8', 'otherThing'],
    };

    // NOTE: It appears that this is the dhis2-desired format for array params.
    const queryString =
      'dataSet=pBOMPrpg1QX&period=201401&orgUnit=DiszpKrYNg8&orgUnit=otherThing' +
      '&fields=*';

    testServer
      .get(`/api/dataValueSets?${queryString}`)
      .matchHeader('authorization', 'Basic YWRtaW46ZGlzdHJpY3Q=')
      .reply(200, {
        httpStatus: 'OK',
        message: "you've got multiple filters and that's OK!",
      });

    const finalState = await execute(
      get('dataValueSets', query, { params: { fields: '*' } })
    )(state);

    expect(finalState.data).to.eql({
      httpStatus: 'OK',
      message: "you've got multiple filters and that's OK!",
    });
  });

  it('should make an authenticated GET to the right url no query', async () => {
    testServer
      .get('/api/dataValueSets')
      .matchHeader('authorization', 'Basic YWRtaW46ZGlzdHJpY3Q=')
      .reply(200, {
        httpStatus: 'OK',
        message:
          'no filters applied, dhis2 might complain about needing "at least one orgUnit"',
      });

    const finalState = await execute(get('dataValueSets'))(state);

    expect(finalState.data).to.eql({
      httpStatus: 'OK',
      message:
        'no filters applied, dhis2 might complain about needing "at least one orgUnit"',
    });
  });
});

describe.only('helperfunctions', () => {
  it('should use the new tracker for enrollments', () => {
    const result = shouldUseNewTracker('enrollments');
    expect(result).to.be.true;
  });

  it('should use the new tracker for events', () => {
    const result = shouldUseNewTracker('events');
    expect(result).to.be.true;
  });

  it('should use the new tracker for relationships', () => {
    const result = shouldUseNewTracker('relationships');
    expect(result).to.be.true;
  });

  it('should use the new tracker for new tracker events', () => {
    const result = shouldUseNewTracker('tracker/events');
    expect(result).to.be.true;
  });

  it('should use the new tracker for trackedEntityInstance', () => {
    const result = shouldUseNewTracker('trackedEntityInstance');
    expect(result).to.be.true;
  });

  it('should use the new tracker for trackedEntities', () => {
    const result = shouldUseNewTracker('trackedEntities');
    expect(result).to.be.true;
  });

  it('should use the new tracker for new tracker generally', () => {
    // This resource type does not exist but this function doesn't know that!
    const result = shouldUseNewTracker('tracker/something');
    expect(result).to.be.true;
  });

  it('should use the old API for dataValueSets', () => {
    const result = shouldUseNewTracker('dataValueSets');
    expect(result).to.be.false;
  });

  it('should use the old API for dataElements', () => {
    const result = shouldUseNewTracker('dataElements');
    expect(result).to.be.false;
  });
});

describe('create', () => {
  const state = {
    configuration: {
      username: 'admin',
      password: 'district',
      hostUrl: 'https://play.dhis2.org/2.36.4',
    },
    data: {
      program: 'program1',
      orgUnit: 'org50',
      trackedEntityType: 'nEenWmSyUEp',
      status: 'COMPLETED',
      date: '02-02-20',
    },
  };

  it('should make an authenticated POST to the right url', async () => {
    testServer
      .post('/api/tracker', {
        program: 'program1',
        orgUnit: 'org50',
        trackedEntityType: 'nEenWmSyUEp',
        status: 'COMPLETED',
        date: '02-02-20',
      })
      .times(2)
      .matchHeader('authorization', 'Basic YWRtaW46ZGlzdHJpY3Q=')
      .reply(200, {
        httpStatus: 'OK',
        message: 'the response',
      });

    const finalState = await execute(create('events', state.data))(state);

    expect(finalState.data).to.eql({
      httpStatus: 'OK',
      message: 'the response',
    });
  });

  it('should recursively expand references', async () => {
    testServer
      .post('/api/tracker', {
        program: 'abc',
        orgUnit: 'org50',
      })
      .reply(200, {
        httpStatus: 'OK',
        message: 'the response',
      });

    const finalState = await execute(
      create('events', { program: 'abc', orgUnit: state => state.data.orgUnit })
    )(state);

    expect(finalState.data).to.eql({
      httpStatus: 'OK',
      message: 'the response',
    });
  });
});

describe('post', () => {
  const state = {
    configuration: {
      username: 'admin',
      password: 'district',
      hostUrl: 'https://play.dhis2.org/2.36.4',
    },
    data: {
      program: 'program1',
      orgUnit: 'org50',
      trackedEntityType: 'nEenWmSyUEp',
      status: 'COMPLETED',
      date: '02-02-20',
    },
  };

  it('should make an authenticated POST to the right url', async () => {
    testServer
      .post('/api/tracker', {
        program: 'program1',
        orgUnit: 'org50',
        trackedEntityType: 'nEenWmSyUEp',
        status: 'COMPLETED',
        date: '02-02-20',
      })
      .times(2)
      .matchHeader('authorization', 'Basic YWRtaW46ZGlzdHJpY3Q=')
      .reply(200, {
        httpStatus: 'OK',
        message: 'the response',
      });

    const finalState = await execute(create('tracker', state.data))(state);

    expect(finalState.data).to.eql({
      httpStatus: 'OK',
      message: 'the response',
    });
  });

  it('should recursively expand references', async () => {
    testServer
      .post('/api/tracker', {
        program: 'abc',
        orgUnit: 'org50',
      })
      .reply(200, {
        httpStatus: 'OK',
        message: 'the response',
      });

    const finalState = await execute(
      create('tracker', {
        program: 'abc',
        orgUnit: state => state.data.orgUnit,
      })
    )(state);

    expect(finalState.data).to.eql({
      httpStatus: 'OK',
      message: 'the response',
    });
  });
});

describe('update', () => {
  const state = {
    configuration: {
      username: 'admin',
      password: 'district',
      hostUrl: 'https://play.dhis2.org/2.36.4',
    },
    data: {
      program: 'program',
      orgUnit: 'orgunit',
      status: 'COMPLETED',
      currentDate: '02-02-20',
    },
  };

  it('should make an authenticated PUT to the right url', async () => {
    testServer
      .put('/api/dataValueSets/AsQj6cDsUq4')
      .matchHeader('authorization', 'Basic YWRtaW46ZGlzdHJpY3Q=')
      .reply(200, {
        httpStatus: 'OK',
        message: 'the response',
      });

    const finalState = await execute(
      update('dataValueSets', 'AsQj6cDsUq4', state => ({
        ...state.data,
        date: state.data.currentDate,
      }))
    )(state);

    expect(finalState.data).to.eql({
      httpStatus: 'OK',
      message: 'the response',
    });
  });

  it('should recursively expand refs', async () => {
    testServer
      .put('/api/dataValueSets/AsQj6cDsUq4', {
        program: 'program',
        orgUnit: 'hardcoded',
        date: '02-02-20',
      })
      .reply(200, {
        httpStatus: 'OK',
        message: 'the response',
      });

    const finalState = await execute(
      update('dataValueSets', 'AsQj6cDsUq4', {
        program: dataValue('program'),
        orgUnit: 'hardcoded',
        date: resp => resp.data.currentDate,
      })
    )(state);

    expect(finalState.data).to.eql({
      httpStatus: 'OK',
      message: 'the response',
    });
  });
});

describe('upsert', () => {
  const state = {
    configuration: {
      username: 'admin',
      password: 'district',
      hostUrl: 'https://play.dhis2.org/2.36.4',
    },
    data: {
      org: 'orgunit',
      id: 'k68SkK5yDH9',
    },
  };

  it('should make a get and then an update if one item is found', async () => {
    testServer
      .get('/api/dataValueSets?orgUnit=DiszpKrYNg8')
      .reply(200, {
        httpStatus: 'OK',
        message: 'the response',
        dataValueSets: [{ id: 123 }],
      })
      .put('/api/dataValueSets/123')
      .reply(200, { httpStatus: 'OK', message: 'updated tei' });

    const finalState = await execute(
      upsert(
        'dataValueSets',
        {
          orgUnit: 'DiszpKrYNg8',
        },
        {
          orgUnit: 'DiszpKrYNg8',
          trackedEntityType: 'nEenWmSyUEp',
        }
      )
    )(state);

    expect(finalState.references).to.eql([
      {
        org: 'orgunit',
        id: 'k68SkK5yDH9',
      },
    ]);

    expect(finalState.data).to.eql({
      httpStatus: 'OK',
      message: 'updated tei',
    });
  });

  it('should make a get and then a create if nothing is found', async () => {
    testServer
      .get('/api/dataValueSets?orgUnit=DiszpKrYNg8')
      .reply(200, {
        httpStatus: 'OK',
        message: 'the response',
        dataValueSets: [],
      })
      .post('/api/dataValueSets')
      .reply(201, { httpStatus: 'OK', message: 'created tei' });

    const finalState = await execute(
      upsert(
        'dataValueSets',
        {
          orgUnit: 'DiszpKrYNg8',
        },
        {
          orgUnit: 'DiszpKrYNg8',
          trackedEntityType: 'nEenWmSyUEp',
        }
      )
    )(state);

    expect(finalState.references).to.eql([
      {
        org: 'orgunit',
        id: 'k68SkK5yDH9',
      },
    ]);

    expect(finalState.data).to.eql({
      httpStatus: 'OK',
      message: 'created tei',
    });
  });

  it('should make a get and FAIL if more than one thing is found', async () => {
    testServer.get('/api/dataValueSets?orgUnit=DiszpKrYNg8').reply(200, {
      httpStatus: 'OK',
      message: 'the response',
      dataValueSets: [{ id: 1 }, { id: 2 }, { id: 3 }],
    });

    const expectThrowsAsync = async (method, errorMessage) => {
      let error = null;
      try {
        await method();
      } catch (err) {
        error = err;
      }
      expect(error).to.be.an('Error');
      if (errorMessage) {
        expect(error.message).to.equal(errorMessage);
      }
    };

    await expectThrowsAsync(
      () =>
        execute(
          upsert(
            'dataValueSets',
            {
              orgUnit: 'DiszpKrYNg8',
            },
            {
              orgUnit: 'TSyzvBiovKh',
              trackedEntityType: 'nEenWmSyUEp',
            }
          )
        )(state),
      'Cannot upsert on Non-unique attribute. The operation found more than one records for your request.'
    );
  });

  it('should make a post only when new tracker is called', async () => {
    testServer
      .post('/api/tracker', {
        orgUnit: 'DiszpKrYNg8',
        trackedEntityType: 'nEenWmSyUEp',
        attributes: [
          {
            attribute: 'w75KJ2mc4zz',
            value: 'Qassim',
          },
        ],
      })
      .reply(200, {
        httpStatus: 'OK',
        message: 'created tei',
      });

    const finalState = await execute(
      upsert(
        'events',
        {
          orgUnit: 'DiszpKrYNg8',
          trackedEntities: ['F8yKM85NbxW'],
        },
        {
          orgUnit: 'DiszpKrYNg8',
          trackedEntityType: 'nEenWmSyUEp',
          attributes: [
            {
              attribute: 'w75KJ2mc4zz',
              value: 'Qassim',
            },
          ],
        }
      )
    )(state);

    expect(finalState.data).to.eql({
      httpStatus: 'OK',
      message: 'created tei',
    });
  });
});

describe('URL builders', () => {
  const fixture = {};

  before(done => {
    fixture.configuration = {
      username: 'admin',
      password: 'district',
      hostUrl: 'https://play.dhis2.org/2.36.4',
    };
    fixture.options = {};
    fixture.resourceType = 'dataValueSets';
    done();
  });

  describe('buildUrl', () => {
    it('the proper URL gets built from the "entity" string and the config', done => {
      const configuration = { ...fixture.configuration, apiVersion: 33 };

      const finalURL = buildUrl(
        '/' + 'events',
        configuration.hostUrl,
        configuration.apiVersion
      );

      const expectedURL = 'https://play.dhis2.org/2.36.4/api/33/events';

      expect(finalURL).to.eq(expectedURL);

      done();
    });
  });

  describe('generateURL', () => {
    it('should generate basic URL', done => {
      const finalURL = generateUrl(
        fixture.configuration,
        fixture.options,
        fixture.resourceType
      );
      const expectedURL = 'https://play.dhis2.org/2.36.4/api/dataValueSets';

      expect(finalURL).to.eq(expectedURL);
      done();
    });

    it('should generate URL with specific api version from configuration', done => {
      const configuration = { ...fixture.configuration, apiVersion: 33 };

      const finalURL = generateUrl(
        configuration,
        fixture.options,
        fixture.resourceType
      );
      const expectedURL = `https://play.dhis2.org/2.36.4/api/${configuration.apiVersion}/dataValueSets`;

      expect(finalURL).to.eq(expectedURL);
      done();
    });

    it('should generate URL with specific api version from options', done => {
      const options = { ...fixture.options, apiVersion: 33 };

      const finalURL = generateUrl(
        fixture.configuration,
        options,
        fixture.resourceType
      );
      const expectedURL = 'https://play.dhis2.org/2.36.4/api/33/dataValueSets';

      expect(finalURL).to.eq(expectedURL);
      done();
    });

    it('should generate URL without caring about other options', done => {
      const options = {
        ...fixture.options,
        apiVersion: 33,
        params: { filter: ['a:eq:b', 'c:ge:d'] },
      };

      const finalURL = generateUrl(
        fixture.configuration,
        options,
        fixture.resourceType
      );

      const expectedURL = 'https://play.dhis2.org/2.36.4/api/33/dataValueSets';

      expect(finalURL).to.eq(expectedURL);
      done();
    });
  });
});

describe('nestArray', () => {
  it('when an array is passed it gets nested inside that "entity" key', async () => {
    const state = {
      configuration: {
        username: 'admin',
        password: 'district',
        hostUrl: 'https://play.dhis2.org/2.36.4',
        apiVersion: '2.36.4',
      },
      data: [{ a: 1 }],
    };

    const body = nestArray(state.data, 'events');

    expect(body).to.eql({ events: [{ a: 1 }] });
  });

  it("when an object is passed it doesn't get nested", async () => {
    const state = {
      configuration: {
        username: 'admin',
        password: 'district',
        hostUrl: 'https://play.dhis2.org/2.36.4',
      },
      data: { b: 2 },
    };

    const body = nestArray(state.data, 'events');

    expect(body).to.eql({ b: 2 });
  });
});
