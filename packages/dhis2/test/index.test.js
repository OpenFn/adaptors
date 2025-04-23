import chai from 'chai';
import { execute, create, update, get, upsert, patch } from '../src/Adaptor';
import { dataValue } from '@openfn/language-common';
import { enableMockClient } from '@openfn/language-common/util';
import {
  prefixVersionToPath,
  ensureArray,
  shouldUseNewTracker,
} from '../src/Utils';

import * as util from '../src/util';
import * as tracker from '../src/tracker';

const { expect } = chai;

const hostUrl = 'https://play.im.dhis2.org';
const testServer = enableMockClient(hostUrl);
const configuration = {
  username: 'admin',
  password: 'district',
  hostUrl: `${hostUrl}/stable-2-40-7`,
  apiVersion: '42',
};

const getPath = path => {
  return `/stable-2-40-7/api/42/${path}`;
};

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
    configuration,
    data: {},
  };

  it('should make an authenticated GET to the right url when params are specified inside options as well as inside query', async () => {
    const query = {
      dataSet: 'pBOMPrpg1QX',
      period: 201401,
      orgUnit: 'DiszpKrYNg8',
      filter: ['this:Eq:that', 'then:gt:2'],
    };
    testServer
      .intercept({
        path: getPath('dataValueSets'),
        method: 'GET',
        query: {
          ...query,
          fields: '*',
        },
      })
      .reply(200, {
        httpStatus: 'OK',
        message: "you've got multiple filters and that's OK!",
      });

    const finalState = await execute(
      get('dataValueSets', {
        query: {
          ...query,
          fields: '*',
        },
      })
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

    testServer
      .intercept({
        path: getPath('dataValueSets'),
        method: 'GET',
        query: {
          ...query,
          fields: '*',
        },
      })
      .reply(200, {
        httpStatus: 'OK',
        message: "you've got multiple filters and that's OK!",
      });

    const finalState = await execute(
      get('dataValueSets', {
        query: {
          ...query,
          fields: '*',
        },
      })
    )(state);

    expect(finalState.data).to.eql({
      httpStatus: 'OK',
      message: "you've got multiple filters and that's OK!",
    });
  });

  it('should make an authenticated GET to the right url no query', async () => {
    testServer
      .intercept({
        path: getPath('dataValueSets'),
        method: 'GET',
      })
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

  it('should support base64 for images', async () => {
    testServer
      .intercept({
        path: getPath('trackedEntityInstances/qHVDKszQmdx/BqaEWTBG3RB/image'),
        method: 'GET',
      })
      .reply(
        200,
        '����\x00\x10JFIF\x00\x01\x02\x00\x00\x01\x00\x01\x00\x00��\x00C\x00\b\x06\x06\x07\x06\x05\b\x07\x07\x07\t\t\b\n'
      );

    const finalState = await execute(
      get('trackedEntityInstances/qHVDKszQmdx/BqaEWTBG3RB/image', {
        headers: {
          Accept: 'image/*',
        },
        parseAs: 'base64',
      })
    )(state);
    expect(finalState.data).to.eql(
      '77+977+977+977+9ABBKRklGAAECAAABAAEAAO+/ve+/vQBDAAgGBgcGBQgHBwcJCQgK'
    );
  });
});

describe('helperfunctions', () => {
  it('should use the new tracker for enrollments', () => {
    const result = shouldUseNewTracker('enrollments');
    expect(result).to.be.true;
  });

  it('should use the new tracker for events', () => {
    const result = shouldUseNewTracker('events');
    expect(result).to.be.true;
  });

  it('should use the new tracker for trackedEntities', () => {
    const result = shouldUseNewTracker('trackedEntities');
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

describe('tracker', () => {
  const state = {
    configuration,
    data: {
      program: 'program1',
      orgUnit: 'org50',
      trackedEntityType: 'nEenWmSyUEp',
      status: 'COMPLETED',
      date: '02-02-20',
    },
  };

  it('should import a trackedEntity', async () => {
    testServer
      .intercept({
        path: getPath('tracker'),
        method: 'POST',
        query: { async: false },
      })
      .reply(200, {
        httpStatus: 'OK',
        message: 'the response',
      });

    const finalState = await execute(
      tracker.import('CREATE', {
        trackedEntities: [
          {
            orgUnit: 'TSyzvBiovKh',
            trackedEntityType: 'nEenWmSyUEp',
            attributes: [
              {
                attribute: 'w75KJ2mc4zz',
                value: 'Gigiwe',
              },
            ],
          },
        ],
      })
    )(state);

    expect(finalState.data).to.eql({
      httpStatus: 'OK',
      message: 'the response',
    });
  });

  it('should export all enrollements', async () => {
    const query = {
      orgUnit: 'TSyzvBiovKh',
    };
    testServer
      .intercept({
        path: getPath('tracker/enrollments'),
        method: 'GET',
        query: {
          ...query,
          async: false,
        },
      })
      .reply(200, {
        httpStatus: 'OK',
        message: 'the response',
      });

    const finalState = await execute(
      tracker.export('enrollments', {
        query: {
          orgUnit: 'TSyzvBiovKh',
        },
      })
    )(state);

    expect(finalState.data).to.eql({
      httpStatus: 'OK',
      message: 'the response',
    });
  });
});

describe('create', () => {
  const state = {
    configuration,
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
      .intercept({
        path: getPath('tracker'),
        method: 'POST',
        query: { async: false },
      })
      .reply(200, {
        httpStatus: 'OK',
        message: 'the response',
      });

    const finalState = await execute(create('events', state => state.data))(
      state
    );

    expect(finalState.data).to.eql({
      httpStatus: 'OK',
      message: 'the response',
    });
  });

  it('should recursively expand references', async () => {
    testServer
      .intercept({
        path: getPath('tracker'),
        method: 'POST',
        query: { async: false },
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
    configuration,
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
      .intercept({
        path: getPath('tracker'),
        method: 'POST',
      })
      .reply(200, {
        httpStatus: 'OK',
        message: 'the response',
      });

    const finalState = await execute(
      create('tracker', { events: [state.data] })
    )(state);

    expect(finalState.data).to.eql({
      httpStatus: 'OK',
      message: 'the response',
    });
  });

  it('should recursively expand references', async () => {
    testServer
      .intercept({
        path: getPath('tracker'),
        method: 'POST',
      })
      .reply(200, {
        httpStatus: 'OK',
        message: 'the response',
      });

    const finalState = await execute(
      create('tracker', {
        relationships: [
          {
            program: 'abc',
            orgUnit: state => state.data.orgUnit,
          },
        ],
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
    configuration,
    data: {
      program: 'program',
      orgUnit: 'orgunit',
      status: 'COMPLETED',
      currentDate: '02-02-20',
    },
  };

  it('should make an authenticated PUT to the right url', async () => {
    testServer
      .intercept({
        path: getPath('dataValueSets/AsQj6cDsUq4'),
        method: 'PUT',
      })
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
      .intercept({
        path: getPath('dataValueSets/AsQj6cDsUq4'),
        method: 'PUT',
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

describe('patch', () => {
  const state = {
    configuration,
    data: {
      program: 'program',
      orgUnit: 'orgunit',
      status: 'COMPLETED',
      currentDate: '02-02-20',
    },
  };

  it('should make an authenticated PUT to the right url', async () => {
    testServer
      .intercept({
        path: getPath('dataValueSets/AsQj6cDsUq4'),
        method: 'PATCH',
      })
      .reply(204, '');

    const finalState = await execute(
      patch('dataValueSets', 'AsQj6cDsUq4', state => ({
        ...state.data,
        date: state.data.currentDate,
      }))
    )(state);

    expect(finalState.data).to.eql('');
  });

  it('should recursively expand refs', async () => {
    testServer
      .intercept({
        path: getPath('dataValueSets/AsQj6cDsUq4'),
        method: 'PATCH',
      })
      .reply(204, '');

    const finalState = await execute(
      patch('dataValueSets', 'AsQj6cDsUq4', {
        program: dataValue('program'),
        orgUnit: 'hardcoded',
        date: resp => resp.data.currentDate,
      })
    )(state);

    expect(finalState.data).to.eql('');
  });
});

describe('upsert', () => {
  const state = {
    configuration,
    data: {
      org: 'orgunit',
      id: 'k68SkK5yDH9',
    },
  };

  it('should make a get and then an update if one item is found', async () => {
    testServer
      .intercept({
        path: getPath('dataValueSets'),
        method: 'GET',
        query: { orgUnit: 'DiszpKrYNg8' },
      })
      .reply(200, {
        httpStatus: 'OK',
        message: 'the response',
        dataValueSets: [{ id: 123 }],
      });
    testServer
      .intercept({
        path: getPath('dataValueSets/123'),
        method: 'PUT',
      })
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
      .intercept({
        path: getPath('dataValueSets'),
        method: 'GET',
        query: { orgUnit: 'DiszpKrYNg8' },
      })
      .reply(200, {
        httpStatus: 'OK',
        message: 'the response',
        dataValueSets: [],
      });

    testServer
      .intercept({
        path: getPath('dataValueSets'),
        method: 'POST',
      })
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
    testServer
      .intercept({
        path: getPath('dataValueSets'),
        method: 'GET',
        query: { orgUnit: 'DiszpKrYNg8' },
      })
      .reply(200, {
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
      '409: Upsert failed: Multiple records found for a non-unique attribute.'
    );
  });

  it('should make a post only when new tracker is called', async () => {
    testServer
      .intercept({
        path: getPath('tracker'),
        method: 'POST',
        query: { async: false },
      })
      .reply(200, {
        httpStatus: 'OK',
        message: 'created tei',
      });

    const finalState = await execute(
      upsert('events', {}, [
        {
          orgUnit: 'DiszpKrYNg8',
          trackedEntityType: 'nEenWmSyUEp',
          attributes: [
            {
              attribute: 'w75KJ2mc4zz',
              value: 'Qassim',
            },
          ],
        },
      ])
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

  describe('generateURL', () => {
    it('should generate basic URL', done => {
      const finalURL = prefixVersionToPath(
        fixture.configuration,
        fixture.options,
        fixture.resourceType
      );
      const expectedURL = 'https://play.dhis2.org/2.36.4/api/dataValueSets';

      expect(`${fixture.configuration.hostUrl}${finalURL}`).to.eq(expectedURL);
      done();
    });

    it('should generate URL with specific api version from configuration', done => {
      const configuration = { ...fixture.configuration, apiVersion: 33 };

      const finalURL = prefixVersionToPath(
        configuration,
        fixture.options,
        fixture.resourceType
      );
      const expectedURL = `https://play.dhis2.org/2.36.4/api/${configuration.apiVersion}/dataValueSets`;

      expect(`${configuration.hostUrl}${finalURL}`).to.eq(expectedURL);
      done();
    });

    it('should generate URL with specific api version from options', done => {
      const options = { ...fixture.options, apiVersion: 33 };

      const finalURL = prefixVersionToPath(
        fixture.configuration,
        options,
        fixture.resourceType
      );
      const expectedURL = 'https://play.dhis2.org/2.36.4/api/33/dataValueSets';

      expect(`${fixture.configuration.hostUrl}${finalURL}`).to.eq(expectedURL);
      done();
    });

    it('should generate URL without caring about other options', done => {
      const options = {
        ...fixture.options,
        apiVersion: 33,
        params: { filter: ['a:eq:b', 'c:ge:d'] },
      };

      const finalURL = prefixVersionToPath(
        fixture.configuration,
        options,
        fixture.resourceType
      );

      const expectedURL = 'https://play.dhis2.org/2.36.4/api/33/dataValueSets';

      expect(`${fixture.configuration.hostUrl}${finalURL}`).to.eq(expectedURL);
      done();
    });
  });
});

describe('ensureArray', () => {
  it('when an array is passed it gets nested inside that "entity" key', async () => {
    const state = {
      configuration,
      data: [{ a: 1 }],
    };

    const body = ensureArray(state.data, 'events');

    expect(body).to.eql({ events: [{ a: 1 }] });
  });

  it("when an object is passed it doesn't get nested", async () => {
    const state = {
      configuration,
      data: { b: 2 },
    };

    const body = ensureArray(state.data, 'events');

    expect(body).to.eql({ events: [{ b: 2 }] });
  });
});

describe('findAttributeValueById', () => {
  it('returns the value of an attribute when provided with a TEI', async () => {
    const tei = {
      attributes: [
        {
          attribute: 'y1w2R6leVmh',
          displayName: 'First Name',
          value: 'Test',
        },
        {
          attribute: 'Rslz2y06aBf',
          displayName: 'Surname',
          value: 'McTesterson',
        },
      ],
    };

    const theValue = util.findAttributeValueById(tei, 'Rslz2y06aBf');
    expect(theValue).to.eql('McTesterson');
  });
});

describe('findAttributeValue', () => {
  it('returns the value of an attribute by display name when provided with a TEI', async () => {
    const tei = {
      attributes: [
        {
          attribute: 'y1w2R6leVmh',
          displayName: 'First Name',
          value: 'Test',
        },
        {
          attribute: 'Rslz2y06aBf',
          displayName: 'Surname',
          value: 'McTesterson',
        },
      ],
    };

    const theValue = util.findAttributeValue(tei, 'Surname');
    expect(theValue).to.eql('McTesterson');
  });
});
