# @openfn/language-airqo

## 1.0.0 - 11 August 2026

### Major Changes

- Initial release of the AirQo adaptor
- Added `get`, `post`, and `request` - generic authenticated operations for calling any AirQo endpoint (also grouped under `http.get`/`http.post`/`http.request`)
- Added `getRecentMeasurements` - retrieve recent air quality measurements by site, device, grid, or cohort
- Added `getHistoricalMeasurements` - retrieve historical measurements with optional date range filtering

