import chai from 'chai';
import { execute, create, update, get, upsert } from '../src/Adaptor';
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
      status: 'COMPLETED',
      date: '02-02-20',
    },
  };

  it('should make an authenticated POST to the right url', async () => {
    testServer
      .post('/api/events', {
        program: 'program1',
        orgUnit: 'org50',
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
      .post('/api/events', {
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
      .put('/api/events/qAZJCrNJK8H')
      .matchHeader('authorization', 'Basic YWRtaW46ZGlzdHJpY3Q=')
      .reply(200, {
        httpStatus: 'OK',
        message: 'the response',
      });

    const finalState = await execute(
      update('events', 'qAZJCrNJK8H', state => ({
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
      .put('/api/events/qAZJCrNJK8H', {
        program: 'program',
        orgUnit: 'hardcoded',
        date: '02-02-20',
      })
      .reply(200, {
        httpStatus: 'OK',
        message: 'the response',
      });

    const finalState = await execute(
      update('events', 'qAZJCrNJK8H', {
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
      .get(
        '/api/trackedEntityInstances?ou=DiszpKrYNg8&filter=w75KJ2mc4zz:Eq:Johns&filter=zDhUuAYrxNC:Eq:Doe'
      )
      .reply(200, {
        httpStatus: 'OK',
        message: 'the response',
        trackedEntityInstances: [{ trackedEntityInstance: 123 }],
      })
      .put('/api/trackedEntityInstances/123')
      .reply(200, { httpStatus: 'OK', message: 'updated tei' });

    const finalState = await execute(
      upsert(
        'trackedEntityInstances',
        {
          ou: 'DiszpKrYNg8',
          filter: ['w75KJ2mc4zz:Eq:Johns', 'zDhUuAYrxNC:Eq:Doe'],
        },
        {
          orgUnit: 'DiszpKrYNg8',
          trackedEntityType: 'nEenWmSyUEp',
          attributes: [
            {
              lastUpdated: '2016-01-12T00:00:00.000',
              code: 'MMD_PER_NAM',
              displayName: 'First name',
              created: '2016-01-12T00:00:00.000',
              valueType: 'TEXT',
              attribute: 'w75KJ2mc4zz',
              value: 'Elias',
            },
          ],
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
      .get(
        '/api/trackedEntityInstances?ou=DiszpKrYNg8&filter=w75KJ2mc4zz:Eq:No&filter=zDhUuAYrxNC:Eq:One'
      )
      .reply(200, {
        httpStatus: 'OK',
        message: 'the response',
        trackedEntityInstances: [],
      })
      .post('/api/trackedEntityInstances')
      .reply(201, { httpStatus: 'OK', message: 'created tei' });

    const finalState = await execute(
      upsert(
        'trackedEntityInstances',
        {
          ou: 'DiszpKrYNg8',
          filter: ['w75KJ2mc4zz:Eq:No', 'zDhUuAYrxNC:Eq:One'],
        },
        {
          orgUnit: 'DiszpKrYNg8',
          trackedEntityType: 'nEenWmSyUEp',
          attributes: [
            {
              lastUpdated: '2016-01-12T00:00:00.000',
              code: 'MMD_PER_NAM',
              displayName: 'First name',
              created: '2016-01-12T00:00:00.000',
              valueType: 'TEXT',
              attribute: 'w75KJ2mc4zz',
              value: 'Elias',
            },
          ],
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
    testServer
      .get(
        '/api/trackedEntityInstances?ou=DiszpKrYNg8&filter=w75KJ2mc4zz:Eq:John&filter=zDhUuAYrxNC:Eq:Doe'
      )
      .reply(200, {
        httpStatus: 'OK',
        message: 'the response',
        trackedEntityInstances: [
          { trackedEntityInstance: 1 },
          { trackedEntityInstance: 2 },
          { trackedEntityInstance: 3 },
        ],
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
            'trackedEntityInstances',
            {
              ou: 'DiszpKrYNg8',
              filter: ['w75KJ2mc4zz:Eq:John', 'zDhUuAYrxNC:Eq:Doe'],
            },
            {
              orgUnit: 'TSyzvBiovKh',
              trackedEntityType: 'nEenWmSyUEp',
              attributes: [
                {
                  attribute: 'w75KJ2mc4zz',
                  value: 'Qassim',
                },
              ],
            }
          )
        )(state),
      'Cannot upsert on Non-unique attribute. The operation found more than one records for your request.'
    );
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
