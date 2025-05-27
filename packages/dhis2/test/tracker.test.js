import chai from 'chai';
import { execute } from '../src/Adaptor';
import * as tracker from '../src/tracker';

import { enableMockClient } from '@openfn/language-common/util';

const { expect } = chai;

const hostUrl = 'https://tracker.dhis2.org';
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
        orgUnit: 'TSyzvBiovKh',
      })
    )(state);

    expect(finalState.data).to.eql({
      httpStatus: 'OK',
      message: 'the response',
    });
  });
});
