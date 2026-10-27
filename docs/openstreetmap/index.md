<dl>
<dt>
    <a href="#listfeatures">listFeatures(filter, [options])</a></dt>
<dt>
    <a href="#query">query(overpassQL, [options])</a></dt>
<dt>
    <a href="#request">request(method, path, body, [options])</a></dt>
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
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#util">util</a>
</dt></dl>

## Functions
### listFeatures

<p><code>listFeatures(filter, [options]) ⇒ Operation</code></p>


List OpenStreetMap features which match some tags inside an area or bounding box,
as a GeoJSON FeatureCollection.
Every feature is a Point: ways and relations use the center of their bounding box.
Feature properties are the OpenStreetMap tags plus `@id`, `@version` and `@timestamp`.
The collection's `timestamp` is the time of the OpenStreetMap data Overpass searched,
which can be used as the next `changedSince`.


| Param | Type | Description |
| --- | --- | --- |
| filter | [<code>FeatureFilter</code>](#featurefilter) | Which features to fetch |
| [options] | [<code>QueryOptions</code>](#queryoptions) | Optional query options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | a GeoJSON FeatureCollection |

**Example:** List the schools in a region
```js
listFeatures({
  tags: { amenity: 'school' },
  area: { 'ISO3166-2': $.data.regionCode },
});
```
**Example:** List libraries, community centres and parks in a bounding box
```js
listFeatures({
  tags: [{ amenity: ['library', 'community_centre'] }, { leisure: 'park' }],
  bbox: $.data.bbox,
});
```
**Example:** List shops changed since the last run
```js
listFeatures({
  tags: { shop: '*' },
  area: { name: 'Example District', admin_level: '6' },
  changedSince: $.lastRunTimestamp,
});
```

* * *

### query

<p><code>query(overpassQL, [options]) ⇒ Operation</code></p>


Run an Overpass QL query and write the matching OpenStreetMap elements to
`state.data`. The adaptor adds the `[out:json][timeout:N]` settings, so don't
include them in the query. See the
[Overpass QL docs](https://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_QL).


| Param | Type | Description |
| --- | --- | --- |
| overpassQL | <code>string</code> | The Overpass QL query to run |
| [options] | [<code>QueryOptions</code>](#queryoptions) | Optional query options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | an array of OpenStreetMap elements |

**Example:** Fetch the schools inside a bounding box
```js
query('nwr["amenity"="school"](51.47,-0.15,51.52,-0.05); out center;');
```
**Example:** Allow a slow query to run for up to 10 minutes
```js
query($.data.overpassQuery, { queryTimeoutSeconds: 600 });
```

* * *

### request

<p><code>request(method, path, body, [options]) ⇒ Operation</code></p>


Make a general HTTP request to an Overpass API instance


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | HTTP method to use |
| path | <code>string</code> | Path to resource, relative to the configured `baseUrl` |
| body | <code>object</code> | Object which will be attached to the request body |
| [options] | [<code>RequestOptions</code>](#requestoptions) | Optional request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Check the rate limit status of the Overpass instance
```js
request('GET', 'status');
```

* * *


##  Interfaces

### FeatureFilter

Which features to fetch. `area` or `bbox` is required.


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| tags | <code>object</code> \| <code>Array.&lt;object&gt;</code> | Tags to match. In an object, every tag must match. In an array of objects, any object may match. Values are a string, an array of strings (any of them), or `'*'` (any value). |
| area | <code>object</code> | Tags identifying the area to search inside, ie `{ 'ISO3166-2': 'XX-YY' }` or `{ name: 'Example', admin_level: '4' }` |
| bbox | <code>object</code> | Bounding box to search inside, as `{ south, west, north, east }` in decimal degrees |
| changedSince | <code>string</code> | Only return features created or modified after this date. Deleted features are not reported. |


* * *

### HttpState

State object


**Properties**

| Name | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |


* * *

### QueryOptions

Options for running an Overpass query


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| queryTimeoutSeconds | <code>number</code> | The longest Overpass may run the query, in seconds, sent as `[timeout:N]`. Default: 180. |


* * *

### RequestOptions

Options provided to the HTTP request


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| errors | <code>object</code> | Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code. |
| query | <code>object</code> | An object of query parameters to be encoded into the URL. |
| headers | <code>object</code> | An object of headers to append to the request. |
| parseAs | <code>string</code> | Parse the response body as json, text or stream. By default will use the response headers. |
| timeoutMs | <code>number</code> | How long to wait for a response, in milliseconds. Default: 300000 (5 minutes). |


* * *

