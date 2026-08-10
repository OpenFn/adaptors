# language-airqo ![AirQo logo](./assets/square.png)

An OpenFn **_adaptor_** for building integration jobs for use with the
[AirQo](https://www.airqo.net) air quality monitoring API.

## Documentation

View the
[docs site](https://docs.openfn.org/adaptors/packages/airqo-docs) for
full technical documentation.

### Configuration

View the
[configuration-schema](https://docs.openfn.org/adaptors/packages/airqo-configuration-schema/)
for required and optional `configuration` properties.

## Scheduled Sync Example (AirQo -> DHIS2)

For periodic reporting workflows, use a Cron trigger and chain these operations:

1. `getAllHistoricalMeasurements('grids', GRID_ID, { startTime, endTime })`
2. `toDhis2DataValues(measurements, mappingConfig, options)`
3. `create('dataValueSets', payload)` using the DHIS2 adaptor

The transformation step should produce a payload in this shape:

```json
{
  "dataSet": "DHIS2_DATASET_UID",
  "dataValues": [
    {
      "dataElement": "DHIS2_PM25_ELEMENT_UID",
      "period": "20240530",
      "orgUnit": "DHIS2_ORG_UNIT_UID_1",
      "value": "20.99"
    }
  ]
}
```

### Reference workflow: Step 1 — AirQo (fetch + transform)

```js
// Adaptor: @openfn/language-airqo
// Trigger: Cron — recommended schedule: daily at 01:00 UTC → 0 1 * * *
//
// Uses cursor() to remember the last successful sync time so each run only
// fetches new data. On the very first run it defaults to the previous 24 hours.
//
// HOW TO USE:
//   1. Set GRID_ID to the AirQo grid you want to sync.
//      Run listGrids() in a one-off AirQo job to list available grid IDs.
//   2. Replace all DHIS2 placeholder IDs in the configuration section below.
//      - Data Elements: DHIS2 → Maintenance → Data Elements
//      - Organisation Units: DHIS2 → Maintenance → Organisation Units
//      - Dataset: DHIS2 → Maintenance → Data Sets
//   3. Add one entry to SITE_TO_ORG_UNIT for every AirQo site you monitor.

// AirQo grid to sync — e.g. 'kampala' or a specific grid UID.
// Grids group multiple monitoring sites. To sync a single site, change the
// entity type to 'sites' in getAllHistoricalMeasurements() below.
const GRID_ID = 'YOUR_AIRQO_GRID_ID';

// Maps each AirQo site_id → DHIS2 organisation unit UID.
const SITE_TO_ORG_UNIT = {
  site_id_001: 'DHIS2_ORG_UNIT_UID_1',
  site_id_002: 'DHIS2_ORG_UNIT_UID_2',
  // Add more site_id -> orgUnit entries if this grid grows
};

// DHIS2 data element UIDs — one for each air quality metric you want to sync.
const DATA_ELEMENTS = {
  pm2_5: 'DHIS2_PM25_ELEMENT_UID',
  pm10: 'DHIS2_PM10_ELEMENT_UID',
  no2: 'DHIS2_NO2_ELEMENT_UID',
};

// UID of the DHIS2 dataset that contains the data elements above.
const DATASET_UID = 'DHIS2_DATASET_UID';

// Cursor — remembers the last successful sync timestamp.
// On first run, defaults to 24 hours ago. After each run the fn() below
// advances it to the current time, so the next run only fetches new data.
cursor('$.cursor', {
  defaultValue: dateFns.subHours(new Date(), 24).toISOString(),
});

// getAllHistoricalMeasurements automatically pages through results, so this
// works correctly even when a large number of measurements have accumulated.
getAllHistoricalMeasurements('grids', GRID_ID, {
  startTime: state => state.cursor,
  endTime: state => new Date().toISOString(),
});

// Map AirQo measurements → flat DHIS2 dataValues.
toDhis2DataValues(
  state => state.data.measurements,
  {
    orgUnits: SITE_TO_ORG_UNIT,
    dataElements: DATA_ELEMENTS,
  },
  {
    fields: ['pm2_5', 'pm10', 'no2'],
    periodType: 'daily',
  }
);

fn(state => {
  const dataValues = state.data.dataValues ?? [];

  console.log(
    `Processed ${state.data.summary.totalMeasurements} measurements → ${dataValues.length} DHIS2 data values.`
  );

  if (dataValues.length === 0) {
    console.log('No new measurements to sync. Workflow will stop here.');
    return { ...state, data: null };
  }

  return {
    ...state,
    cursor: new Date().toISOString(),
    data: {
      dataSet: DATASET_UID,
      dataValues,
    },
  };
});
```

### Reference workflow: Step 2 — DHIS2 (payload contract validation + post)

```js
// Adaptor: @openfn/language-dhis2
//
// Skips the POST if Step 1 found no new measurements (state.data === null),
// so no empty dataValueSets are sent to DHIS2.

fn(state => {
  if (state.data === null) {
    return state;
  }

  if (!state.data || typeof state.data !== 'object' || Array.isArray(state.data)) {
    throw new Error('DHIS2 payload must be an object with dataSet and dataValues properties.');
  }

  const { dataSet, dataValues } = state.data;

  if (typeof dataSet !== 'string' || !dataSet.trim()) {
    throw new Error('DHIS2 payload validation failed: dataSet must be a non-empty string.');
  }

  if (!Array.isArray(dataValues)) {
    throw new Error('DHIS2 payload validation failed: dataValues must be an array.');
  }

  for (let i = 0; i < dataValues.length; i++) {
    const value = dataValues[i];

    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      throw new Error(`DHIS2 payload validation failed at dataValues[${i}]: entry must be an object.`);
    }

    if (typeof value.dataElement !== 'string' || !value.dataElement.trim()) {
      throw new Error(
        `DHIS2 payload validation failed at dataValues[${i}]: dataElement must be a non-empty string.`
      );
    }

    if (typeof value.period !== 'string' || !value.period.trim()) {
      throw new Error(
        `DHIS2 payload validation failed at dataValues[${i}]: period must be a non-empty string.`
      );
    }

    if (typeof value.orgUnit !== 'string' || !value.orgUnit.trim()) {
      throw new Error(
        `DHIS2 payload validation failed at dataValues[${i}]: orgUnit must be a non-empty string.`
      );
    }

    if (value.value === undefined || value.value === null || value.value === '') {
      throw new Error(
        `DHIS2 payload validation failed at dataValues[${i}]: value must be present.`
      );
    }
  }

  return state;
});

fnIf(
  state => state.data !== null,
  create('dataValueSets', state => state.data)
);
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
"Getting Started" guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To build _only_ the docs run `pnpm build docs`.
