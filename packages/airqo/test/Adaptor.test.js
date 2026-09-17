// AirQo measurement operations, mocked with Undici MockAgent (no live network calls).
import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import {
  getRecentMeasurements,
  getHistoricalMeasurements,
} from '../src/Adaptor.js';

const TEST_ORIGIN = 'https://airqo.test.net';
const TEST_BASE_URL = `${TEST_ORIGIN}/api/v2`;

const testServer = enableMockClient(TEST_ORIGIN);

const configuration = {
  baseUrl: TEST_BASE_URL,
  token: 'test_token_abc123',
};

const measurementFixture = {
  success: true,
  isCache: false,
  message: 'successfully returned the measurements',
  meta: { total: 2, skip: 0, limit: 1000, page: 1, pages: 1 },
  measurements: [
    {
      device: 'aq_001',
      device_id: 'device_id_001',
      site_id: 'site_id_001',
      time: '2024-05-30T13:00:00.000Z',
      pm2_5: { value: 20.99 },
      pm10: { value: 24.60 },
      no2: {},
      frequency: 'hourly',
      aqi_category: 'Moderate',
      aqi_color: 'ffff00',
      aqi_color_name: 'Yellow',
      siteDetails: {
        _id: 'site_id_001',
        name: 'Nakasero II, Kampala',
        city: 'Kampala',
        country: 'Uganda',
        approximate_latitude: 0.32,
        approximate_longitude: 32.57,
      },
    },
    {
      device: 'aq_002',
      device_id: 'device_id_002',
      site_id: 'site_id_002',
      time: '2024-05-30T13:00:00.000Z',
      pm2_5: { value: 35.4 },
      pm10: { value: 40.1 },
      no2: {},
      frequency: 'hourly',
      aqi_category: 'Unhealthy for Sensitive Groups',
      aqi_color: 'ff7e00',
      aqi_color_name: 'Orange',
    },
  ],
};

describe('getRecentMeasurements', () => {
  it('fetches recent measurements by site ID', async () => {
    testServer
      .intercept({
        path: '/api/v2/devices/measurements/sites/site_id_001/recent',
        method: 'GET',
        query: { token: 'test_token_abc123' },
      })
      .reply(200, measurementFixture);

    const state = { configuration };
    const finalState = await getRecentMeasurements('sites', 'site_id_001')(
      state
    );

    expect(finalState.data.success).to.equal(true);
    expect(finalState.data.measurements).to.have.length(2);
    expect(finalState.data.measurements[0].device).to.equal('aq_001');
    expect(finalState.data.measurements[0].pm2_5.value).to.equal(20.99);
  });

  it('fetches recent measurements by device ID', async () => {
    testServer
      .intercept({
        path: '/api/v2/devices/measurements/devices/device_id_001/recent',
        method: 'GET',
        query: { token: 'test_token_abc123' },
      })
      .reply(200, measurementFixture);

    const state = { configuration };
    const finalState = await getRecentMeasurements(
      'devices',
      'device_id_001'
    )(state);

    expect(finalState.data.measurements).to.be.an('array');
    expect(finalState.data.measurements[0].device_id).to.equal('device_id_001');
  });

  it('fetches recent measurements by grid ID', async () => {
    testServer
      .intercept({
        path: '/api/v2/devices/measurements/grids/grid_id_001/recent',
        method: 'GET',
        query: { token: 'test_token_abc123' },
      })
      .reply(200, measurementFixture);

    const state = { configuration };
    const finalState = await getRecentMeasurements('grids', 'grid_id_001')(
      state
    );

    expect(finalState.data.measurements).to.be.an('array');
    expect(finalState.data.meta.total).to.equal(2);
  });

  it('fetches recent measurements by cohort ID', async () => {
    testServer
      .intercept({
        path: '/api/v2/devices/measurements/cohorts/cohort_id_001/recent',
        method: 'GET',
        query: { token: 'test_token_abc123' },
      })
      .reply(200, measurementFixture);

    const state = { configuration };
    const finalState = await getRecentMeasurements(
      'cohorts',
      'cohort_id_001'
    )(state);

    expect(finalState.data.measurements).to.be.an('array');
    expect(finalState.data.isCache).to.equal(false);
  });

  it('passes optional query parameters to the request', async () => {
    testServer
      .intercept({
        path: '/api/v2/devices/measurements/sites/site_id_001/recent',
        method: 'GET',
        query: { token: 'test_token_abc123', limit: '10' },
      })
      .reply(200, { ...measurementFixture, meta: { total: 1, limit: 10 } });

    const state = { configuration };
    const finalState = await getRecentMeasurements('sites', 'site_id_001', {
      limit: 10,
    })(state);

    expect(finalState.data.meta.limit).to.equal(10);
  });

  it('stores previous data in references', async () => {
    testServer
      .intercept({
        path: '/api/v2/devices/measurements/sites/site_id_001/recent',
        method: 'GET',
        query: { token: 'test_token_abc123' },
      })
      .reply(200, measurementFixture);

    const state = {
      configuration,
      data: { previous: 'data' },
      references: [],
    };

    const finalState = await getRecentMeasurements('sites', 'site_id_001')(
      state
    );

    expect(finalState.references).to.deep.include({ previous: 'data' });
  });

  it('throws when limit is not a positive integer', async () => {
    try {
      await getRecentMeasurements('sites', 'site_id_001', { limit: 'all' })({ configuration });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.equal('params.limit must be a positive integer.');
    }
  });

  it('throws when limit exceeds 1000', async () => {
    try {
      await getRecentMeasurements('sites', 'site_id_001', { limit: 5000 })({ configuration });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.include('params.limit cannot exceed 1000');
    }
  });

  it('throws when startTime is not a valid ISO string', async () => {
    try {
      await getRecentMeasurements('sites', 'site_id_001', { startTime: 'not-a-date' })({ configuration });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.include('params.startTime must be a valid ISO 8601 date string');
    }
  });

  it('throws when startTime is later than endTime', async () => {
    try {
      await getRecentMeasurements('sites', 'site_id_001', {
        startTime: '2024-02-01T00:00:00Z',
        endTime: '2024-01-01T00:00:00Z',
      })({ configuration });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.equal(
        'params.startTime must not be later than params.endTime.'
      );
    }
  });

  it('throws a clear error for an invalid entity type', async () => {
    try {
      await getRecentMeasurements('villages', 'site_id_001')({ configuration });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.equal(
        'Invalid entityType: villages. Expected one of: sites, devices, grids, cohorts.'
      );
    }
  });

  it('throws a clear error when entityId is missing', async () => {
    try {
      await getRecentMeasurements('sites', '')({ configuration });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.equal('entityId must be a non-empty string.');
    }
  });

  it('throws a clear error when token is missing from configuration', async () => {
    try {
      await getRecentMeasurements('sites', 'site_id_001')({
        configuration: { baseUrl: TEST_BASE_URL },
      });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.equal('token missing from configuration.');
    }
  });

  it('maps 401 responses to a clear authentication error', async () => {
    testServer
      .intercept({
        path: '/api/v2/devices/measurements/sites/site_id_001/recent',
        method: 'GET',
        query: { token: 'test_token_abc123' },
      })
      .reply(401, { message: 'Unauthorized' });

    try {
      await getRecentMeasurements('sites', 'site_id_001')({ configuration });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.include(
        'Unauthorized - Invalid or missing AirQo token'
      );
    }
  });
});

describe('getHistoricalMeasurements', () => {
  it('fetches historical measurements by site ID', async () => {
    testServer
      .intercept({
        path: '/api/v2/devices/measurements/sites/site_id_001/historical',
        method: 'GET',
        query: { token: 'test_token_abc123' },
      })
      .reply(200, measurementFixture);

    const state = { configuration };
    const finalState = await getHistoricalMeasurements(
      'sites',
      'site_id_001'
    )(state);

    expect(finalState.data.success).to.equal(true);
    expect(finalState.data.measurements).to.have.length(2);
    expect(finalState.data.measurements[0].time).to.equal(
      '2024-05-30T13:00:00.000Z'
    );
  });

  it('fetches historical measurements by device ID', async () => {
    testServer
      .intercept({
        path: '/api/v2/devices/measurements/devices/device_id_001/historical',
        method: 'GET',
        query: { token: 'test_token_abc123' },
      })
      .reply(200, measurementFixture);

    const state = { configuration };
    const finalState = await getHistoricalMeasurements(
      'devices',
      'device_id_001'
    )(state);

    expect(finalState.data.measurements).to.be.an('array');
    expect(finalState.data.measurements[0].frequency).to.equal('hourly');
  });

  it('fetches historical measurements by grid ID', async () => {
    testServer
      .intercept({
        path: '/api/v2/devices/measurements/grids/grid_id_001/historical',
        method: 'GET',
        query: { token: 'test_token_abc123' },
      })
      .reply(200, measurementFixture);

    const state = { configuration };
    const finalState = await getHistoricalMeasurements(
      'grids',
      'grid_id_001'
    )(state);

    expect(finalState.data.measurements).to.be.an('array');
  });

  it('fetches historical measurements by cohort ID', async () => {
    testServer
      .intercept({
        path: '/api/v2/devices/measurements/cohorts/cohort_id_001/historical',
        method: 'GET',
        query: { token: 'test_token_abc123' },
      })
      .reply(200, measurementFixture);

    const state = { configuration };
    const finalState = await getHistoricalMeasurements(
      'cohorts',
      'cohort_id_001'
    )(state);

    expect(finalState.data.measurements).to.be.an('array');
  });

  it('passes date range options as query parameters', async () => {
    testServer
      .intercept({
        path: '/api/v2/devices/measurements/sites/site_id_001/historical',
        method: 'GET',
        query: {
          token: 'test_token_abc123',
          startTime: '2024-01-01T00:00:00Z',
          endTime: '2024-01-31T23:59:59Z',
        },
      })
      .reply(200, measurementFixture);

    const state = { configuration };
    const finalState = await getHistoricalMeasurements(
      'sites',
      'site_id_001',
      {
        startTime: '2024-01-01T00:00:00Z',
        endTime: '2024-01-31T23:59:59Z',
      }
    )(state);

    expect(finalState.data.measurements).to.have.length(2);
  });

  it('throws when limit exceeds 1000', async () => {
    try {
      await getHistoricalMeasurements('sites', 'site_id_001', { limit: 9999 })({ configuration });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.include('params.limit cannot exceed 1000');
    }
  });

  it('throws when endTime is not a valid ISO string', async () => {
    try {
      await getHistoricalMeasurements('sites', 'site_id_001', { endTime: '31-Jan-2024' })({ configuration });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.include('params.endTime must be a valid ISO 8601 date string');
    }
  });

  it('throws when startTime is date-only without timezone', async () => {
    try {
      await getHistoricalMeasurements('sites', 'site_id_001', {
        startTime: '2024-01-01',
      })({ configuration });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.include(
        'params.startTime must be a valid ISO 8601 date string'
      );
    }
  });

  it('throws a clear error for an invalid entity type', async () => {
    try {
      await getHistoricalMeasurements('buildings', 'site_id_001')({ configuration });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.include('Invalid entityType');
    }
  });
});

