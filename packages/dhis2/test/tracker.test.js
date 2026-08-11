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

const getPath = path => `/stable-2-40-7/api/42/${path}`;

const trackedEntityPayload = {
  trackedEntities: [
    {
      orgUnit: 'TSyzvBiovKh',
      trackedEntityType: 'nEenWmSyUEp',
      attributes: [{ attribute: 'w75KJ2mc4zz', value: 'Gigiwe' }],
    },
  ],
};

describe('tracker', () => {
  const state = { configuration, data: {} };

  describe('import', () => {
    it('should default to async: false', async () => {
      testServer
        .intercept({
          path: getPath('tracker'),
          method: 'POST',
          query: { async: false },
        })
        .reply(200, { httpStatus: 'OK', status: 'OK' });

      const finalState = await execute(
        tracker.import('CREATE', trackedEntityPayload),
      )(state);

      expect(finalState.response.query.async).to.eql(false);
      expect(finalState.data.httpStatus).to.eql('OK');
    });

    it('should send async: true when specified in options', async () => {
      testServer
        .intercept({
          path: getPath('tracker'),
          method: 'POST',
          query: { async: true },
        })
        .reply(200, {
          httpStatus: 'OK',
          response: { id: 'abc123', jobType: 'TRACKER_IMPORT_JOB' },
        });

      const finalState = await execute(
        tracker.import('CREATE', trackedEntityPayload, { async: true }),
      )(state);

      expect(finalState.response.query.async).to.eql(true);
      expect(finalState.data.response.id).to.eql('abc123');
    });

    it('should forward extra options as query params alongside async', async () => {
      testServer
        .intercept({
          path: getPath('tracker'),
          method: 'POST',
          query: { async: false, atomicMode: 'ALL' },
        })
        .reply(200, { httpStatus: 'OK' });

      const finalState = await execute(
        tracker.import('CREATE', trackedEntityPayload, { atomicMode: 'ALL' }),
      )(state);

      expect(finalState.response.query.atomicMode).to.eql('ALL');
      expect(finalState.response.query.async).to.eql(false);
    });
  });

  describe('export', () => {
    it('should export a resource by path with filter query params', async () => {
      testServer
        .intercept({
          path: getPath('tracker/enrollments'),
          method: 'GET',
          query: { orgUnit: 'TSyzvBiovKh' },
        })
        .reply(200, {
          instances: [{ enrollment: 'abc123', orgUnit: 'TSyzvBiovKh' }],
          pager: { page: 1, pageSize: 50 },
        });

      const finalState = await execute(
        tracker.export('enrollments', { orgUnit: 'TSyzvBiovKh' }),
      )(state);

      expect(finalState.data.instances).to.have.lengthOf(1);
      expect(finalState.data.instances[0].enrollment).to.eql('abc123');
    });

    it('should send paging: false to fetch all results without paging', async () => {
      const allEvents = Array.from({ length: 300 }, (_, i) => ({
        event: `ev${i}`,
      }));

      testServer
        .intercept({
          path: getPath('tracker/events'),
          method: 'GET',
          query: { paging: false },
        })
        .reply(200, { instances: allEvents });

      const finalState = await execute(
        tracker.export('events', { paging: false }),
      )(state);

      expect(finalState.response.query.paging).to.eql(false);
      expect(finalState.data.instances).to.have.lengthOf(300);
    });

    it('should send page and pageSize for paginated requests', async () => {
      testServer
        .intercept({
          path: getPath('tracker/events'),
          method: 'GET',
          query: { page: 2, pageSize: 10 },
        })
        .reply(200, {
          instances: Array.from({ length: 10 }, (_, i) => ({
            event: `ev${i}`,
          })),
          pager: { page: 2, pageSize: 10 },
        });

      const finalState = await execute(
        tracker.export('events', { page: 2, pageSize: 10 }),
      )(state);

      expect(finalState.response.query.page).to.eql(2);
      expect(finalState.response.query.pageSize).to.eql(10);
      expect(finalState.data.instances).to.have.lengthOf(10);
      expect(finalState.data.pager.page).to.eql(2);
    });

    it('should send totalPages: true to include total count in pager', async () => {
      testServer
        .intercept({
          path: getPath('tracker/events'),
          method: 'GET',
          query: { totalPages: true, pageSize: 10000 },
        })
        .reply(200, {
          instances: [],
          pager: { page: 1, pageSize: 10000, pageCount: 3, total: 25000 },
        });

      const finalState = await execute(
        tracker.export('events', { totalPages: true, pageSize: 10000 }),
      )(state);

      expect(finalState.response.query.totalPages).to.eql(true);
      expect(finalState.data.pager).to.include({ pageCount: 3, total: 25000 });
    });

    it('should send order param for sorted results', async () => {
      testServer
        .intercept({
          path: getPath('tracker/events'),
          method: 'GET',
          query: { order: 'createdAt:desc' },
        })
        .reply(200, { instances: [{ event: 'ev1' }] });

      const finalState = await execute(
        tracker.export('events', { order: 'createdAt:desc' }),
      )(state);

      expect(finalState.response.query.order).to.eql('createdAt:desc');
      expect(finalState.data.instances).to.have.lengthOf(1);
    });
  });
});
