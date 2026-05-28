import chai from 'chai';
import { execute } from '../src/Adaptor.js';
import * as tracker from '../src/tracker.js';

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
      }),
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
      }),
    )(state);

    expect(finalState.data).to.eql({
      httpStatus: 'OK',
      message: 'the response',
    });
  });

  it('should export events asynchronously', async () => {
    const query = {
      orgUnit: 'TSyzvBiovKh',
      async: true,
    };
    testServer
      .intercept({
        path: getPath('tracker/enrollments'),
        method: 'GET',
        query,
      })
      .reply(200, {
        httpStatus: 'OK',
        message: 'the response',
      });

    const finalState = await execute(
      tracker.export('enrollments', {
        orgUnit: 'TSyzvBiovKh',
        async: true,
      }),
    )(state);
    expect(finalState.response.query.async).to.eql(true);
  });
  it('should default to async false when not specified', async () => {
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
      }),
    )(state);

    expect(finalState.response.query.async).to.eql(false);
  });

  it('should export all events when paging is true', async () => {
    const events = Array.from({ length: 300 }, () => ({ event: 1 }));

    testServer
      .intercept({
        path: getPath('tracker/events'),
        method: 'GET',
        query: { async: false, paging: true },
      })
      .reply(200, { events });

    const finalState = await execute(
      tracker.export('events', { paging: true }),
    )(state);

    expect(finalState.data.events).to.have.lengthOf(300);
    expect(finalState.data.events[0]).to.eql({ event: 1 });
  });
  it('should export only 50 events when paging is not sent', async () => {
    const events = Array.from({ length: 300 }, () => ({ event: 1 }));

    testServer
      .intercept({
        path: getPath('tracker/events'),
        method: 'GET',
        query: { async: false },
      })
      .reply(200, { events: events.slice(0, 50) });

    const finalState = await execute(tracker.export('events'))(state);

    expect(finalState.data.events).to.have.lengthOf(50);
    expect(finalState.data.events[0]).to.eql({ event: 1 });
  });
});
