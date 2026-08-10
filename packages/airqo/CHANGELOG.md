# @openfn/language-airqo

## 1.0.0 - 26 April 2026

### Major Changes

- Initial release of the AirQo adaptor
- Added `getRecentMeasurements` - retrieve recent air quality measurements by site, device, grid, or cohort
- Added `getHistoricalMeasurements` - retrieve historical measurements with optional date range filtering
- Added `getAllHistoricalMeasurements` - retrieve all historical measurements, auto-paginating through every page
- Added `listMetadata` - retrieve metadata for grids, cohorts, devices, or sites
- Added `listSites` - convenience alias for `listMetadata('sites')`
- Added `listDevices` - convenience alias for `listMetadata('devices')`
- Added `listGrids` - convenience alias for `listMetadata('grids')`
- Added `listCohorts` - convenience alias for `listMetadata('cohorts')`
- Added `getGridSummary` - retrieve all site details grouped by grid
- Added `getDailyForecast` - retrieve daily air quality forecasts by device or site ID
- Added `getHourlyForecast` - retrieve hourly air quality forecasts by device or site ID
- Added `toDhis2DataValues` - convert AirQo measurements into DHIS2 `dataValues` shape for batch import
