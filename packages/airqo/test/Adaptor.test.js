/**
 * AirQo Adaptor Unit Tests
 * Uses Undici MockAgent via @openfn/language-common/util enableMockClient.
 * No live network calls are made.
 */
import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import {
  getRecentMeasurements,
  getHistoricalMeasurements,
  getAllHistoricalMeasurements,
  toDhis2DataValues,
  listMetadata,
  getGridSummary,
  getDailyForecast,
  getHourlyForecast,
  listSites,
  listDevices,
  listGrids,
  listCohorts,
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

const gridsFixture = {
  success: true,
  message: 'Successfull Operation',
  grids: [
    {
      _id: 'grid_id_001',
      visibility: true,
      name: 'kampala',
      admin_level: 'city',
      createdAt: '2024-01-09T08:27:16.102Z',
    },
    {
      _id: 'grid_id_002',
      visibility: true,
      name: 'ethiopia',
      admin_level: 'country',
      createdAt: '2024-03-07T09:51:13.703Z',
    },
  ],
};

const sitesFixture = {
  success: true,
  message: 'Successfull Operation',
  sites: [
    {
      _id: 'site_id_001',
      name: 'Nakasero II, Kampala',
      city: 'Kampala',
      country: 'Uganda',
      approximate_latitude: 0.32,
      approximate_longitude: 32.57,
      data_provider: 'AirQo',
    },
  ],
};

const gridSummaryFixture = {
  success: true,
  message: 'Successfull Operation',
  grids: [
    {
      _id: 'grid_id_001',
      visibility: true,
      name: 'kampala',
      admin_level: 'city',
      network: 'airqo',
      long_name: 'Kampala',
      numberOfSites: 2,
      sites: [
        {
          _id: 'site_id_001',
          name: 'Nakasero II, Kampala',
          city: 'Kampala',
          country: 'Uganda',
          approximate_latitude: 0.32,
          approximate_longitude: 32.57,
        },
        {
          _id: 'site_id_002',
          name: 'Kololo, Kampala',
          city: 'Kampala',
          country: 'Uganda',
          approximate_latitude: 0.33,
          approximate_longitude: 32.58,
        },
      ],
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
});

describe('getAllHistoricalMeasurements', () => {
  it('returns all measurements when the result fits in one page', async () => {
    testServer
      .intercept({
        path: '/api/v2/devices/measurements/sites/site_id_001/historical',
        method: 'GET',
        query: { token: 'test_token_abc123', page: '1', limit: '1000' },
      })
      .reply(200, measurementFixture); // meta.pages = 1

    const state = { configuration };
    const finalState = await getAllHistoricalMeasurements(
      'sites',
      'site_id_001'
    )(state);

    expect(finalState.data.measurements).to.have.length(2);
    expect(finalState.data.meta.total).to.equal(2);
  });

  it('fetches all pages and combines measurements', async () => {
    const page1 = {
      ...measurementFixture,
      meta: { total: 4, skip: 0, limit: 1000, page: 1, pages: 2 },
      measurements: [measurementFixture.measurements[0]],
    };
    const page2 = {
      ...measurementFixture,
      meta: { total: 4, skip: 1000, limit: 1000, page: 2, pages: 2 },
      measurements: [measurementFixture.measurements[1]],
    };

    testServer
      .intercept({
        path: '/api/v2/devices/measurements/sites/site_id_001/historical',
        method: 'GET',
        query: { token: 'test_token_abc123', page: '1', limit: '1000' },
      })
      .reply(200, page1);

    testServer
      .intercept({
        path: '/api/v2/devices/measurements/sites/site_id_001/historical',
        method: 'GET',
        query: { token: 'test_token_abc123', page: '2', limit: '1000' },
      })
      .reply(200, page2);

    const state = { configuration };
    const finalState = await getAllHistoricalMeasurements(
      'sites',
      'site_id_001'
    )(state);

    expect(finalState.data.measurements).to.have.length(2);
    expect(finalState.data.measurements[0].device).to.equal('aq_001');
    expect(finalState.data.measurements[1].device).to.equal('aq_002');
    expect(finalState.data.meta.total).to.equal(2);
    expect(finalState.data.meta.pages).to.equal(2);
  });

  it('passes date range options on every page request', async () => {
    testServer
      .intercept({
        path: '/api/v2/devices/measurements/grids/grid_id_001/historical',
        method: 'GET',
        query: {
          token: 'test_token_abc123',
          page: '1',
          limit: '1000',
          startTime: '2024-01-01T00:00:00Z',
          endTime: '2024-01-31T23:59:59Z',
        },
      })
      .reply(200, measurementFixture);

    const state = { configuration };
    const finalState = await getAllHistoricalMeasurements(
      'grids',
      'grid_id_001',
      {
        startTime: '2024-01-01T00:00:00Z',
        endTime: '2024-01-31T23:59:59Z',
      }
    )(state);

    expect(finalState.data.measurements).to.be.an('array');
  });

  it('throws a clear error for an invalid entity type', async () => {
    try {
      await getAllHistoricalMeasurements('buildings', 'site_id_001')({ configuration });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.include('Invalid entityType');
    }
  });

  it('throws when the first page has no measurements array', async () => {
    testServer
      .intercept({
        path: '/api/v2/devices/measurements/sites/site_id_001/historical',
        method: 'GET',
        query: { token: 'test_token_abc123', page: '1', limit: '1000' },
      })
      .reply(200, {
        success: true,
        meta: { total: 0, skip: 0, limit: 1000, page: 1, pages: 1 },
      });

    try {
      await getAllHistoricalMeasurements('sites', 'site_id_001')({ configuration });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.equal(
        'Invalid AirQo response: expected body.measurements to be an array on page 1.'
      );
    }
  });

  it('throws when pagination metadata is invalid', async () => {
    testServer
      .intercept({
        path: '/api/v2/devices/measurements/sites/site_id_001/historical',
        method: 'GET',
        query: { token: 'test_token_abc123', page: '1', limit: '1000' },
      })
      .reply(200, {
        success: true,
        measurements: [],
        meta: { total: 0, skip: 0, limit: 1000, page: 1, pages: 0 },
      });

    try {
      await getAllHistoricalMeasurements('sites', 'site_id_001')({ configuration });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.equal(
        'Invalid AirQo response: expected body.meta.pages to be an integer >= 1, got 0.'
      );
    }
  });
});

describe('listSites', () => {
  it('fetches metadata for all sites via the convenience alias', async () => {
    testServer
      .intercept({
        path: '/api/v2/devices/metadata/sites',
        method: 'GET',
        query: { token: 'test_token_abc123' },
      })
      .reply(200, sitesFixture);

    const state = { configuration };
    const finalState = await listSites()(state);

    expect(finalState.data.sites).to.be.an('array');
    expect(finalState.data.sites[0].country).to.equal('Uganda');
  });
});

describe('listDevices', () => {
  it('fetches metadata for all devices via the convenience alias', async () => {
    testServer
      .intercept({
        path: '/api/v2/devices/metadata/devices',
        method: 'GET',
        query: { token: 'test_token_abc123' },
      })
      .reply(200, { success: true, message: 'ok', devices: [] });

    const state = { configuration };
    const finalState = await listDevices()(state);

    expect(finalState.data.devices).to.be.an('array');
  });
});

describe('listGrids', () => {
  it('fetches metadata for all grids via the convenience alias', async () => {
    testServer
      .intercept({
        path: '/api/v2/devices/metadata/grids',
        method: 'GET',
        query: { token: 'test_token_abc123' },
      })
      .reply(200, gridsFixture);

    const state = { configuration };
    const finalState = await listGrids()(state);

    expect(finalState.data.grids).to.be.an('array');
    expect(finalState.data.grids[0].name).to.equal('kampala');
  });
});

describe('listCohorts', () => {
  it('fetches metadata for all cohorts via the convenience alias', async () => {
    testServer
      .intercept({
        path: '/api/v2/devices/metadata/cohorts',
        method: 'GET',
        query: { token: 'test_token_abc123' },
      })
      .reply(200, { success: true, message: 'ok', cohorts: [] });

    const state = { configuration };
    const finalState = await listCohorts()(state);

    expect(finalState.data.cohorts).to.be.an('array');
  });
});

describe('listMetadata', () => {
  it('fetches metadata for all grids', async () => {
    testServer
      .intercept({
        path: '/api/v2/devices/metadata/grids',
        method: 'GET',
        query: { token: 'test_token_abc123' },
      })
      .reply(200, gridsFixture);

    const state = { configuration };
    const finalState = await listMetadata('grids')(state);

    expect(finalState.data.success).to.equal(true);
    expect(finalState.data.grids).to.have.length(2);
    expect(finalState.data.grids[0].name).to.equal('kampala');
  });

  it('fetches metadata for all sites', async () => {
    testServer
      .intercept({
        path: '/api/v2/devices/metadata/sites',
        method: 'GET',
        query: { token: 'test_token_abc123' },
      })
      .reply(200, sitesFixture);

    const state = { configuration };
    const finalState = await listMetadata('sites')(state);

    expect(finalState.data.sites).to.be.an('array');
    expect(finalState.data.sites[0].country).to.equal('Uganda');
  });

  it('fetches metadata for all devices', async () => {
    testServer
      .intercept({
        path: '/api/v2/devices/metadata/devices',
        method: 'GET',
        query: { token: 'test_token_abc123' },
      })
      .reply(200, { success: true, message: 'ok', devices: [] });

    const state = { configuration };
    const finalState = await listMetadata('devices')(state);

    expect(finalState.data.devices).to.be.an('array');
  });

  it('fetches metadata for all cohorts', async () => {
    testServer
      .intercept({
        path: '/api/v2/devices/metadata/cohorts',
        method: 'GET',
        query: { token: 'test_token_abc123' },
      })
      .reply(200, { success: true, message: 'ok', cohorts: [] });

    const state = { configuration };
    const finalState = await listMetadata('cohorts')(state);

    expect(finalState.data.cohorts).to.be.an('array');
  });

  it('throws a clear error for an invalid metadata resource', async () => {
    try {
      await listMetadata('towns')({ configuration });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.equal(
        'Invalid resource: towns. Expected one of: grids, cohorts, devices, sites.'
      );
    }
  });
});

const forecastFixture = {
  forecasts: [
    { health_tips: [], pm2_5: 38.008, time: '2023-12-01 00:00:00+00:00' },
    { health_tips: [], pm2_5: 42.15, time: '2023-12-02 00:00:00+00:00' },
    { health_tips: [], pm2_5: 29.77, time: '2023-12-03 00:00:00+00:00' },
  ],
};

describe('getGridSummary', () => {
  it('fetches a summary of all grids with their sites', async () => {
    testServer
      .intercept({
        path: '/api/v2/devices/grids/summary',
        method: 'GET',
        query: { token: 'test_token_abc123' },
      })
      .reply(200, gridSummaryFixture);

    const state = { configuration };
    const finalState = await getGridSummary()(state);

    expect(finalState.data.success).to.equal(true);
    expect(finalState.data.grids).to.have.length(1);
    expect(finalState.data.grids[0].name).to.equal('kampala');
    expect(finalState.data.grids[0].sites).to.have.length(2);
    expect(finalState.data.grids[0].numberOfSites).to.equal(2);
  });

  it('returns site coordinates within the grid summary', async () => {
    testServer
      .intercept({
        path: '/api/v2/devices/grids/summary',
        method: 'GET',
        query: { token: 'test_token_abc123' },
      })
      .reply(200, gridSummaryFixture);

    const state = { configuration };
    const finalState = await getGridSummary()(state);

    const firstSite = finalState.data.grids[0].sites[0];
    expect(firstSite.approximate_latitude).to.equal(0.32);
    expect(firstSite.approximate_longitude).to.equal(32.57);
    expect(firstSite.country).to.equal('Uganda');
  });
});

describe('getDailyForecast', () => {
  it('fetches daily forecast by device ID', async () => {
    testServer
      .intercept({
        path: '/api/v2/predict/daily-forecast',
        method: 'GET',
        query: { token: 'test_token_abc123', device_id: 'device_id_001' },
      })
      .reply(200, forecastFixture);

    const state = { configuration };
    const finalState = await getDailyForecast({ device_id: 'device_id_001' })(
      state
    );

    expect(finalState.data.forecasts).to.be.an('array');
    expect(finalState.data.forecasts).to.have.length(3);
    expect(finalState.data.forecasts[0].pm2_5).to.equal(38.008);
  });

  it('fetches daily forecast by site ID', async () => {
    testServer
      .intercept({
        path: '/api/v2/predict/daily-forecast',
        method: 'GET',
        query: { token: 'test_token_abc123', site_id: 'site_id_001' },
      })
      .reply(200, forecastFixture);

    const state = { configuration };
    const finalState = await getDailyForecast({ site_id: 'site_id_001' })(
      state
    );

    expect(finalState.data.forecasts).to.be.an('array');
    expect(finalState.data.forecasts[1].time).to.equal(
      '2023-12-02 00:00:00+00:00'
    );
  });

  it('throws a clear error when forecast target is missing', async () => {
    try {
      await getDailyForecast({})({ configuration });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.equal(
        'Forecast params must include either device_id or site_id.'
      );
    }
  });

  it('throws a clear error when both forecast targets are provided', async () => {
    try {
      await getDailyForecast({
        device_id: 'device_id_001',
        site_id: 'site_id_001',
      })({ configuration });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.equal(
        'Forecast params must include only one of device_id or site_id.'
      );
    }
  });
});

describe('getHourlyForecast', () => {
  it('fetches hourly forecast by device ID', async () => {
    testServer
      .intercept({
        path: '/api/v2/predict/hourly-forecast',
        method: 'GET',
        query: { token: 'test_token_abc123', device_id: 'device_id_001' },
      })
      .reply(200, forecastFixture);

    const state = { configuration };
    const finalState = await getHourlyForecast({ device_id: 'device_id_001' })(
      state
    );

    expect(finalState.data.forecasts).to.be.an('array');
    expect(finalState.data.forecasts).to.have.length(3);
    expect(finalState.data.forecasts[2].pm2_5).to.equal(29.77);
  });

  it('fetches hourly forecast by site ID', async () => {
    testServer
      .intercept({
        path: '/api/v2/predict/hourly-forecast',
        method: 'GET',
        query: { token: 'test_token_abc123', site_id: 'site_id_001' },
      })
      .reply(200, forecastFixture);

    const state = { configuration };
    const finalState = await getHourlyForecast({ site_id: 'site_id_001' })(
      state
    );

    expect(finalState.data.forecasts).to.be.an('array');
    expect(finalState.data.forecasts[0].health_tips).to.deep.equal([]);
  });

  it('throws a clear error when forecast target is missing', async () => {
    try {
      await getHourlyForecast({})({ configuration });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.equal(
        'Forecast params must include either device_id or site_id.'
      );
    }
  });

  it('throws a clear error when both forecast targets are provided', async () => {
    try {
      await getHourlyForecast({
        device_id: 'device_id_001',
        site_id: 'site_id_001',
      })({ configuration });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.equal(
        'Forecast params must include only one of device_id or site_id.'
      );
    }
  });
});

describe('toDhis2DataValues', () => {
  it('maps AirQo measurements into DHIS2 dataValue entries', async () => {
    const state = { configuration };

    const finalState = await toDhis2DataValues(
      measurementFixture.measurements,
      {
        orgUnits: {
          site_id_001: 'DHIS2_ORG_UNIT_UID_1',
          site_id_002: 'DHIS2_ORG_UNIT_UID_2',
        },
        dataElements: {
          pm2_5: 'DHIS2_PM25_ELEMENT_UID',
        },
      },
      {
        fields: ['pm2_5'],
        periodType: 'daily',
      }
    )(state);

    expect(finalState.data.dataValues).to.have.length(2);
    expect(finalState.data.dataValues[0]).to.deep.equal({
      dataElement: 'DHIS2_PM25_ELEMENT_UID',
      period: '20240530',
      orgUnit: 'DHIS2_ORG_UNIT_UID_1',
      value: '20.99',
    });
    expect(finalState.data.summary).to.deep.equal({
      totalMeasurements: 2,
      mappedMeasurements: 2,
      skippedMeasurements: 0,
      skippedDetails: [],
      fields: ['pm2_5'],
      periodType: 'daily',
    });
  });

  it('surfaces skip reason when site_id is not in orgUnits mapping', async () => {
    const state = { configuration };

    const finalState = await toDhis2DataValues(
      measurementFixture.measurements,
      {
        orgUnits: { site_id_001: 'DHIS2_ORG_UNIT_UID_1' }, // site_id_002 intentionally missing
        dataElements: { pm2_5: 'DHIS2_PM25_ELEMENT_UID' },
      },
      { fields: ['pm2_5'], periodType: 'daily' }
    )(state);

    expect(finalState.data.summary.skippedMeasurements).to.equal(1);
    expect(finalState.data.summary.skippedDetails).to.have.length(1);
    expect(finalState.data.summary.skippedDetails[0]).to.deep.include({
      index: 1,
    });
    expect(finalState.data.summary.skippedDetails[0].reason).to.include(
      'site_id_002'
    );
  });

  it('throws when options.fields is explicitly an empty array', async () => {
    const state = { configuration };

    try {
      await toDhis2DataValues(
        measurementFixture.measurements,
        {
          orgUnits: { site_id_001: 'DHIS2_ORG_UNIT_UID_1' },
          dataElements: { pm2_5: 'DHIS2_PM25_ELEMENT_UID' },
        },
        { fields: [] }
      )(state);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.equal(
        'options.fields must not be empty. Provide at least one field (e.g. ["pm2_5"]).'
      );
    }
  });
});

describe('listMetadata (error paths)', () => {
  it('maps 401 responses to a clear authentication error', async () => {
    testServer
      .intercept({
        path: '/api/v2/devices/metadata/sites',
        method: 'GET',
        query: { token: 'test_token_abc123' },
      })
      .reply(401, { message: 'Unauthorized' });

    try {
      await listMetadata('sites')({ configuration });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.include(
        'Unauthorized - Invalid or missing AirQo token'
      );
    }
  });

  it('maps 429 responses to a rate-limit error', async () => {
    testServer
      .intercept({
        path: '/api/v2/devices/metadata/grids',
        method: 'GET',
        query: { token: 'test_token_abc123' },
      })
      .reply(429, { message: 'Too Many Requests' });

    try {
      await listMetadata('grids')({ configuration });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.include(
        'Too Many Requests - AirQo rate limit exceeded'
      );
    }
  });
});

describe('getDailyForecast (error paths)', () => {
  it('maps 401 responses to a clear authentication error', async () => {
    testServer
      .intercept({
        path: '/api/v2/predict/daily-forecast',
        method: 'GET',
        query: { token: 'test_token_abc123', site_id: 'site_id_001' },
      })
      .reply(401, { message: 'Unauthorized' });

    try {
      await getDailyForecast({ site_id: 'site_id_001' })({ configuration });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.include(
        'Unauthorized - Invalid or missing AirQo token'
      );
    }
  });

  it('maps 429 responses to a rate-limit error', async () => {
    testServer
      .intercept({
        path: '/api/v2/predict/daily-forecast',
        method: 'GET',
        query: { token: 'test_token_abc123', device_id: 'device_id_001' },
      })
      .reply(429, { message: 'Too Many Requests' });

    try {
      await getDailyForecast({ device_id: 'device_id_001' })({ configuration });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.include(
        'Too Many Requests - AirQo rate limit exceeded'
      );
    }
  });
});

describe('getRecentMeasurements (date range validation)', () => {
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
});

describe('getAllHistoricalMeasurements (option validation)', () => {
  it('throws when startTime is an invalid ISO string', async () => {
    try {
      await getAllHistoricalMeasurements('sites', 'site_id_001', {
        startTime: 'not-a-date',
      })({ configuration });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.include(
        'params.startTime must be a valid ISO 8601 date string'
      );
    }
  });

  it('throws when startTime is later than endTime', async () => {
    try {
      await getAllHistoricalMeasurements('sites', 'site_id_001', {
        startTime: '2024-06-01T00:00:00Z',
        endTime: '2024-01-01T00:00:00Z',
      })({ configuration });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.equal(
        'params.startTime must not be later than params.endTime.'
      );
    }
  });
});
