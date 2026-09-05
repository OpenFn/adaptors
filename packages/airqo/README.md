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

## Usage

The adaptor currently exposes:

- Generic `get()`, `post()`, and `request()` operations for calling any
  AirQo endpoint directly (also available grouped under `http.get()`,
  `http.post()`, and `http.request()` if you prefer that style).
- `getRecentMeasurements(entityType, entityId, params)` and
  `getHistoricalMeasurements(entityType, entityId, params)` for the most
  common use case: fetching air quality readings for a site, device, grid,
  or cohort.

```js
// Adaptor: @openfn/language-airqo

// Fetch recent PM2.5/PM10 readings for a site
getRecentMeasurements('sites', 'YOUR_AIRQO_SITE_ID');

// Fetch historical readings for a grid over a date range
getHistoricalMeasurements('grids', 'YOUR_AIRQO_GRID_ID', {
  startTime: '2024-01-01T00:00:00Z',
  endTime: '2024-01-31T23:59:59Z',
});

// Call any other AirQo endpoint directly while you find out which
// resource-specific helpers are worth promoting
get('devices/metadata/grids');
// ...or equivalently: http.get('devices/metadata/grids');
```


## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
"Getting Started" guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To build _only_ the docs run `pnpm build docs`.
