<dl>
<dt>
    <a href="#gethistoricalmeasurements">getHistoricalMeasurements(entityType, entityId, [params])</a></dt>
<dt>
    <a href="#getrecentmeasurements">getRecentMeasurements(entityType, entityId)</a></dt>
</dl>

This adaptor exports the following namespaced functions:

<dl>
<dt>
    <a href="#http_get">http.get(path, [options])</a>
</dt>

<dt>
    <a href="#http_post">http.post(path, [body], [options])</a>
</dt>

<dt>
    <a href="#http_request">http.request(method, path, [options])</a>
</dt>
</dl>


This adaptor exports the following from common:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#as">as()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#combine">combine()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#cursor">cursor()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datapath">dataPath()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datavalue">dataValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datefns">dateFns</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#each">each()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#field">field()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#fields">fields()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#fn">fn()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#fnif">fnIf()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#group">group()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#map">map()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#scrubemojis">scrubEmojis()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt></dl>

## Functions
### getHistoricalMeasurements

<p><code>getHistoricalMeasurements(entityType, entityId, [params]) ⇒ Operation</code></p>

Retrieve historical (past) air quality measurements for a monitoring entity.

The `entityType` determines which kind of entity is queried. Valid values are:
- `'sites'`   — a single monitoring site
- `'devices'` — a specific sensor device
- `'grids'`   — a named geographic grid (e.g. a city or country)
- `'cohorts'` — a user-defined group of devices


| Param | Type | Description |
| --- | --- | --- |
| entityType | <code>string</code> | Type of entity: `sites`, `devices`, `grids`, or `cohorts`. |
| entityId | <code>string</code> | ID of the entity to retrieve measurements for. |
| [params] | <code>object</code> | Request parameters documented in [Request parameters](https://platform.airqo.net/docs/api/for-partners/historical-data/#request-parameters). |


**Example:** Get historical measurements for a site
```js
getHistoricalMeasurements('sites', 'site123', { limit: 100 });
```
**Example:** Get historical measurements for a grid with date range
```js
getHistoricalMeasurements('grids', 'grid123', {
  startTime: '2024-01-01T00:00:00Z',
  endTime: '2024-01-31T23:59:59Z',
});
```

* * *

### getRecentMeasurements

<p><code>getRecentMeasurements(entityType, entityId) ⇒ Operation</code></p>

Retrieve the most recent air quality measurements for a monitoring entity.

The `entityType` determines which kind of entity is queried. Valid values are:
- `'sites'`   — a single monitoring site
- `'devices'` — a specific sensor device
- `'grids'`   — a named geographic grid (e.g. a city or country)
- `'cohorts'` — a user-defined group of devices


| Param | Type | Description |
| --- | --- | --- |
| entityType | <code>string</code> | Type of entity: `sites`, `devices`, `grids`, or `cohorts`. |
| entityId | <code>string</code> | ID of the entity to retrieve measurements for. |


**Example:** Get recent measurements for a site
```js
getRecentMeasurements('sites', 'site123');
```
**Example:** Get recent measurements for a grid
```js
getRecentMeasurements('grids', 'grid123');
```
**Example:** Get recent measurements for a device
```js
getRecentMeasurements('devices', 'device123');
```

* * *


## http

These functions belong to the http namespace.
### http.get {#http_get}

<p><code>get(path, [options]) ⇒ Operation</code></p>

Make a generic authenticated GET request to any AirQo endpoint.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> |  |
| [options] | <code>object</code> | Additional options such as query parameters or headers. |


**Example:** Get raw data from any AirQo path
```js
http.get('devices/measurements/sites/site123/recent');
```

* * *


### http.post {#http_post}

<p><code>post(path, [body], [options]) ⇒ Operation</code></p>

Make a generic authenticated POST request to any AirQo endpoint.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | API path relative to the configured base URL. |
| [body] | <code>object</code> | JSON request body. |
| [options] | <code>object</code> | Additional request options. |


**Example:** Post a body to any AirQo path
```js
http.post('devices/metadata/sites', { name: 'Kampala' });
```

* * *


### http.request {#http_request}

<p><code>request(method, path, [options]) ⇒ Operation</code></p>

Make a generic authenticated request of any HTTP method to any AirQo endpoint.


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | HTTP method. |
| path | <code>string</code> | API path relative to the configured base URL. |
| [options] | <code>object</code> | Additional request options. |


**Example:** Make an arbitrary request
```js
http.request('GET', 'devices/measurements/sites/site123/recent');
```

* * *


