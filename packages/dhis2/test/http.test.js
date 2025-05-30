import chai from 'chai';
import { execute } from '../src/Adaptor';
import * as http from '../src/http';
import { dataValue } from '@openfn/language-common';

import { enableMockClient } from '@openfn/language-common/util';

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
      http.post('tracker', { events: [state.data] })
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
      http.post('tracker', {
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

describe('request', () => {
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

  it('should create a tracker resource', async () => {
    testServer
      .intercept({
        path: getPath('tracker'),
        method: 'POST',
        query: {
          importStrategy: 'CREATE',
        },
      })
      .reply(200, {
        httpStatus: 'OK',
        message: 'the response',
      });

    const finalState = await execute(
      http.request('POST', 'tracker', {
        data: {
          orgUnit: 'TSyzvBiovKh',
          trackedEntityType: 'nEenWmSyUEp',
          attributes: [
            {
              attribute: 'w75KJ2mc4zz',
              value: 'Qassime',
            },
          ],
        },
        query: {
          importStrategy: 'CREATE',
        },
      })
    )(state);

    expect(finalState.data).to.eql({
      httpStatus: 'OK',
      message: 'the response',
    });
  });

  it('should get a trackedEntity', async () => {
    testServer
      .intercept({
        path: getPath('tracker/trackedEntities/F8yKM85NbxW'),
        method: 'GET',
      })
      .reply(200, {
        httpStatus: 'OK',
        message: 'the response',
      });

    const finalState = await execute(
      http.request('GET', 'tracker/trackedEntities/F8yKM85NbxW')
    )(state);

    expect(finalState.data).to.eql({
      httpStatus: 'OK',
      message: 'the response',
    });
  });
});

describe(' http.get', () => {
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
      http.get('dataValueSets', {
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
      http.get('dataValueSets', {
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

    const finalState = await execute(http.get('dataValueSets'))(state);

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
      http.get('trackedEntityInstances/qHVDKszQmdx/BqaEWTBG3RB/image', {
        headers: {
          Accept: 'image/*',
        },
        parseAs: 'base64',
      })
    )(state);
    expect(finalState.response).to.not.eql(undefined);
    expect(finalState.data).to.eql(
      '77+977+977+977+9ABBKRklGAAECAAABAAEAAO+/ve+/vQBDAAgGBgcGBQgHBwcJCQgK'
    );
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

  it('should make an authenticated PATCH to the right url', async () => {
    testServer
      .intercept({
        path: getPath('dataValueSets/AsQj6cDsUq4'),
        method: 'PATCH',
      })
      .reply(204, '');

    const finalState = await execute(
      http.patch('dataValueSets', 'AsQj6cDsUq4', state => ({
        ...state.data,
        date: state.data.currentDate,
      }))
    )(state);

    expect(finalState.data).to.eql(undefined);
  });

  it('should recursively expand refs', async () => {
    testServer
      .intercept({
        path: getPath('dataValueSets/AsQj6cDsUq4'),
        method: 'PATCH',
      })
      .reply(204, '');

    const finalState = await execute(
      http.patch('dataValueSets', 'AsQj6cDsUq4', {
        program: dataValue('program'),
        orgUnit: 'hardcoded',
        date: resp => resp.data.currentDate,
      })
    )(state);

    expect(finalState.data).to.eql(undefined);
  });
});
