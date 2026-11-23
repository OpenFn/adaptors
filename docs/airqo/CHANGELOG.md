# @openfn/language-airqo

## 1.0.1 - 23 November 2026

### Patch Changes

- Updated dependencies \[df9ca6c]
  - @openfn/language-common@3.3.6

## 1.0.0 - 11 August 2026

### Major Changes

- Initial release of the AirQo adaptor
- Added `getRecentMeasurements` - retrieve recent air quality measurements by
  site, device, grid, or cohort
- Added `getHistoricalMeasurements` - retrieve historical measurements with
  optional date range filtering
- Added `http.get`, `http.post`, and `http.request` - generic authenticated
  operations for calling any AirQo endpoint
