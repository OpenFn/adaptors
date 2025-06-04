<dl>
<dt>
    <a href="#create">create(path, data, params)</a></dt>
<dt>
    <a href="#destroy">destroy(resourceType, path, [data], [options])</a></dt>
<dt>
    <a href="#get">get(path, params)</a></dt>
<dt>
    <a href="#update">update(resourceType, path, data, [options])</a></dt>
<dt>
    <a href="#upsert">upsert(resourceType, query, data, [options])</a></dt>
</dl>

This adaptor exports the following namespaced functions:

<dl>
<dt>
    <a href="#util_attr">util.attr(attribute, value)</a>
</dt>

<dt>
    <a href="#util_dv">util.dv(dataElement, value)</a>
</dt>

<dt>
    <a href="#util_findAttributeValue">util.findAttributeValue(trackedEntity, attributeDisplayName)</a>
</dt>

<dt>
    <a href="#util_findAttributeValueById">util.findAttributeValueById(trackedEntity, attributeUid)</a>
</dt>

<dt>
    <a href="#tracker_export">tracker.export(path, query, [options])</a>
</dt>

<dt>
    <a href="#tracker_import">tracker.import(strategy, payload, [options])</a>
</dt>

<dt>
    <a href="#http_get">http.get(path, [options])</a>
</dt>

<dt>
    <a href="#http_patch">http.patch(resourceType, path, data, [options])</a>
</dt>

<dt>
    <a href="#http_post">http.post(path, data, [options])</a>
</dt>

<dt>
    <a href="#http_request">http.request(method, path, [options])</a>
</dt>
</dl>


This adaptor exports the following from common:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#alterstate">alterState()</a>
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
    <a href="/adaptors/packages/common-docs#http">http</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt></dl>

## Functions
### create

<p><code>create(path, data, params) ⇒ Operation</code></p>

Create a record


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to the resource to be created |
| data | <code>DHIS2Data</code> | An object, or array of objects, to create. |
| params | <code>object</code> | Optional object of query parameters to include in the request |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The created resource as returned by DHIS2 |
**Example:** Create a program
```js
create('programs', {
  name: 'name 20',
  shortName: 'n20',
  programType: 'WITHOUT_REGISTRATION',
});
```
**Example:** Create a single event
```js
create('events', {
  program: 'eBAyeGv0exc',
  orgUnit: 'DiszpKrYNg8',
  status: 'COMPLETED',
});
```
**Example:** Create a single tracker entity. See [Create tracker docs](https://docs.dhis2.org/en/develop/using-the-api/dhis-core-version-241/tracker.html#webapi_nti_import)
```js
create('trackedEntities', {
  orgUnit: 'TSyzvBiovKh',
  trackedEntityType: 'nEenWmSyUEp',
  attributes: [
    {
      attribute: 'w75KJ2mc4zz',
      value: 'Gigiwe',
    },
  ]
});
```
**Example:** Create a dataSet
```js
create('dataSets', { name: 'OpenFn Data Set', periodType: 'Monthly' });
```
**Example:** a dataSetNotification
```js
create('dataSetNotificationTemplates', {
  dataSetNotificationTrigger: 'DATA_SET_COMPLETION',
  notificationRecipient: 'ORGANISATION_UNIT_CONTACT',
  name: 'Notification',
  messageTemplate: 'Hello',
  deliveryChannels: ['SMS'],
  dataSets: [],
});
```
**Example:** Create a dataElement
```js
create('dataElements', {
  aggregationType: 'SUM',
  domainType: 'AGGREGATE',
  valueType: 'NUMBER',
  name: 'Paracetamol',
  shortName: 'Para',
});
```
**Example:** Create a dataElementGroup
```js
create('dataElementGroups', {
  name: 'Data Element Group 1',
  dataElements: [],
});
```
**Example:** Create a dataElementGroupSet
```js
create('dataElementGroupSets', {
  name: 'Data Element Group Set 4',
  dataDimension: true,
  shortName: 'DEGS4',
  dataElementGroups: [],
});
```
**Example:** Create a dataValueSet
```js
create('dataValueSets', {
  dataElement: 'f7n9E0hX8qk',
  period: '201401',
  orgUnit: 'DiszpKrYNg8',
  value: '12',
});
```
**Example:** Create a dataValueSet with related dataValues
```js
create('dataValueSets', {
  dataSet: 'pBOMPrpg1QX',
  completeDate: '2014-02-03',
  period: '201401',
  orgUnit: 'DiszpKrYNg8',
  dataValues: [
    {
      dataElement: 'f7n9E0hX8qk',
      value: '1',
    },
    {
      dataElement: 'Ix2HsbDMLea',
      value: '2',
    },
    {
      dataElement: 'eY5ehpbEsB7',
      value: '3',
    },
  ],
});
```
**Example:** Create an enrollment
```js
create('enrollments', {
  trackedEntity: 'bmshzEacgxa',
  orgUnit: 'TSyzvBiovKh',
  program: 'gZBxv9Ujxg0',
  enrollmentDate: '2013-09-17',
  incidentDate: '2013-09-17',
});
```

* * *

### destroy

<p><code>destroy(resourceType, path, [data], [options]) ⇒ Operation</code></p>

Delete record.


| Param | Type | Description |
| --- | --- | --- |
| resourceType | <code>string</code> | The type of resource to be deleted. E.g. `trackedEntities`, `organisationUnits`, etc. |
| path | <code>string</code> | Can be an `id` of an `object` or `path` to the `nested object` to `delete`. |
| [data] | <code>Object</code> | Optional. This is useful when you want to remove multiple objects from a collection in one request. You can send `data` as, for example, `{"identifiableObjects": [{"id": "IDA"}, {"id": "IDB"}, {"id": "IDC"}]}`. See more [on DHIS2 API docs](https://docs.dhis2.org/2.34/en/dhis2_developer_manual/web-api.html#deleting-objects) |
| [options] | [<code>RequestOptions</code>](#requestoptions) | An optional object containing query, parseAs,and headers for the request. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| references | An array of all previous data objects used in the Job |
**Example:** a tracked entity instance. See [Delete tracker docs](https://docs.dhis2.org/en/develop/using-the-api/dhis-core-version-241/tracker.html#webapi_nti_import)
```js
destroy('trackedEntities', 'LcRd6Nyaq7T');
```

* * *

### get

<p><code>get(path, params) ⇒ Operation</code></p>

Get any resource, as JSON, from DHIS2. Pass in any valid DHIS2 REST path, excluding /api and the version.
For the new tracker API, see `tracker.export()`


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to the resource |
| params | <code>object</code> | Object of query parameters to include in the request |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the resource returned by DHIS2 |
**Example:** Get all data values for the 'pBOMPrpg1QX' dataset
```js
get('dataValueSets', {
  dataSet: 'pBOMPrpg1QX',
  orgUnit: 'DiszpKrYNg8',
  period: '201401',
  fields: '*',
});
```
**Example:** Get all programs for an organization unit
```js
get('programs', { orgUnit: 'TSyzvBiovKh', fields: '*' });
```
**Example:** Get a single tracked entity given the provided ID. See [TrackedEntities docs](https://docs.dhis2.org/en/develop/using-the-api/dhis-core-version-241/tracker.html#tracked-entities-get-apitrackertrackedentities)
```js
get('tracker/trackedEntities/F8yKM85NbxW');
```

* * *

### update

<p><code>update(resourceType, path, data, [options]) ⇒ Operation</code></p>

Update a resource object of any type. Updating an object requires all fields of the object you are updating, even if they have not been modified


| Param | Type | Description |
| --- | --- | --- |
| resourceType | <code>string</code> | The type of resource to be updated. E.g. `dataElements`, `organisationUnits`, etc. |
| path | <code>string</code> | The `id` or `path` to the `object` to be updated. E.g. `FTRrcoaog83` or `FTRrcoaog83/{collection-name}/{object-id}` |
| data | <code>Object</code> | Data to update. It requires to send the full body. If you want partial updates, use patch operation. |
| [options] | [<code>RequestOptions</code>](#requestoptions) | An optional object containing query, parseAs,and headers for the request. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the resource returned by DHIS2 |
**Example:** a program
```js
update('programs', 'qAZJCrNJK8H', {
  name: '14e1aa02c3f0a31618e096f2c6d03bed',
  shortName: '14e1aa02',
  programType: 'WITHOUT_REGISTRATION',
});
```
**Example:** an event
```js
update('events', 'PVqUD2hvU4E', {
  program: 'eBAyeGv0exc',
  orgUnit: 'Ngelehun CHC',
  status: 'COMPLETED',
  storedBy: 'admin',
  dataValues: [],
});
```
**Example:** Update a tracker entity. See [Update tracker docs](https://docs.dhis2.org/en/develop/using-the-api/dhis-core-version-241/tracker.html#webapi_nti_import)
```js
update('trackedEntities', '', {
  createdAt: '2015-08-06T21:12:37.256',
  orgUnit: 'TSyzvBiovKh',
  createdAtClient: '2015-08-06T21:12:37.256',
  trackedEntity: 'IeQfgUtGPq2',
  trackedEntityType: 'nEenWmSyUEp',
  inactive: false,
  deleted: false,
  featureType: 'NONE',
  programOwners: [
    {
      ownerOrgUnit: 'TSyzvBiovKh',
      program: 'IpHINAT79UW',
      trackedEntity: 'IeQfgUtGPq2',
    },
  ],
  attributes: [
    {
      lastUpdated: '2016-01-12T00:00:00.000',
      displayName: 'Last name',
      created: '2016-01-12T00:00:00.000',
      valueType: 'TEXT',
      attribute: 'zDhUuAYrxNC',
      value: 'Russell',
    },
    {
      lastUpdated: '2016-01-12T00:00:00.000',
      code: 'MMD_PER_NAM',
      displayName: 'First name',
      created: '2016-01-12T00:00:00.000',
      valueType: 'TEXT',
      attribute: 'w75KJ2mc4zz',
      value: 'Catherine',
    },
  ],
});
```
**Example:** Update a dataSet
```js
update('dataSets', 'lyLU2wR22tC', { name: 'OpenFN Data Set', periodType: 'Weekly' });
```
**Example:** a dataSetNotification
```js
update('dataSetNotificationTemplates', 'VbQBwdm1wVP', {
  dataSetNotificationTrigger: 'DATA_SET_COMPLETION',
  notificationRecipient: 'ORGANISATION_UNIT_CONTACT',
  name: 'Notification',
  messageTemplate: 'Hello Updated',
  deliveryChannels: ['SMS'],
  dataSets: [],
});
```
**Example:** Update a dataElement
```js
update('dataElements', 'FTRrcoaog83', {
  aggregationType: 'SUM',
  domainType: 'AGGREGATE',
  valueType: 'NUMBER',
  name: 'Paracetamol',
  shortName: 'Para',
});
```
**Example:** Update a dataElementGroup
```js
update('dataElementGroups', 'QrprHT61XFk', {
  name: 'Data Element Group 1',
  dataElements: [],
});
```
**Example:** Update a dataElementGroupSet
```js
update('dataElementGroupSets', 'VxWloRvAze8', {
  name: 'Data Element Group Set 4',
  dataDimension: true,
  shortName: 'DEGS4',
  dataElementGroups: [],
});
```
**Example:** Update a dataValueSet
```js
update('dataValueSets', 'AsQj6cDsUq4', {
  dataElement: 'f7n9E0hX8qk',
  period: '201401',
  orgUnit: 'DiszpKrYNg8',
  value: '12',
});
```
**Example:** Update a dataValueSet with related dataValues
```js
update('dataValueSets', 'Ix2HsbDMLea', {
  dataSet: 'pBOMPrpg1QX',
  completeDate: '2014-02-03',
  period: '201401',
  orgUnit: 'DiszpKrYNg8',
  dataValues: [
    {
      dataElement: 'f7n9E0hX8qk',
      value: '1',
    },
    {
      dataElement: 'Ix2HsbDMLea',
      value: '2',
    },
    {
      dataElement: 'eY5ehpbEsB7',
      value: '3',
    },
  ],
});
```
**Example:** Update an enrollment given the provided ID
```js
update('enrollments', 'CmsHzercTBa' {
  trackedEntity: 'bmshzEacgxa',
  orgUnit: 'TSyzvBiovKh',
  program: 'gZBxv9Ujxg0',
  enrollmentDate: '2013-10-17',
  incidentDate: '2013-10-17',
});
```

* * *

### upsert

<p><code>upsert(resourceType, query, data, [options]) ⇒ Operation</code></p>

Upsert a record. This will atomically update a record if it already exists, or otherwise create it.
This function does not work with the absolute tracker path `api/tracker` but rather the new tracker paths and deprecated tracker endpoints.

**Throws**:

- <code>RangeError</code> - Throws range error


| Param | Type | Description |
| --- | --- | --- |
| resourceType | <code>string</code> | The type of a resource to `upsert`. E.g. `trackedEntities`. |
| query | <code>Object</code> | A query object that allows to uniquely identify the resource to update. If no matches found, then the resource will be created. |
| data | <code>Object</code> | The data to use for update or create depending on the result of the query. |
| [options] | [<code>RequestOptions</code>](#requestoptions) | An optional object containing query, parseAs,and headers for the request |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| references | An array of all previous data objects used in the Job |
**Example:** Upsert a trackedEntity
```js
upsert('trackedEntities', {}, {
 orgUnit: 'TSyzvBiovKh',
 trackedEntityType: 'nEenWmSyUEp',
 attributes: [
   {
     attribute: 'w75KJ2mc4zz',
     value: 'Qassim',
   },
 ],
});
```
**Example:**  Upsert a dataElement 
```js
upsert(
  'dataElements',
  { filter: 'id:eq:P3jJH5Tu5VC' },
  {
    op: 'add',
    path: '/domainType',
    name: 'Acute',
    shortName: 'AFP follow-up',
    dimensionItemType: 'DATA_ELEMENT',
    legendSets: [],
    aggregationType: 'SUM',
    valueType: 'NUMBER',
    domainType: 'AGGREGATE',
    code: 'DE_359049',
    name: 'Acute Flaccid Paralysis (AFP) follow-up',
   }
 );
```

* * *


## util

These functions belong to the util namespace.
### util.attr {#util_attr}

<p><code>attr(attribute, value) ⇒ object</code></p>

Converts an attribute ID and value into a DHIS2 attribute object


| Param | Type | Description |
| --- | --- | --- |
| attribute | <code>string</code> | A tracked entity instance (TEI) attribute ID. |
| value | <code>string</code> | The value for that attribute. |

**Example**
```js
fn(state => {
   const s = util.attr('w75KJ2mc4zz', 'Elias');
   console.log(s);
   return state;
})
```

* * *


### util.dv {#util_dv}

<p><code>dv(dataElement, value) ⇒ object</code></p>

Converts a dataElement and value into a DHIS2 dataValue object


| Param | Type | Description |
| --- | --- | --- |
| dataElement | <code>string</code> | A data element ID. |
| value | <code>string</code> | The value for that data element. |

**Example**
```js
fn(state => {
  const s = util.dv('f7n9E0hX8qk', 12);
  console.log(s);
  return state
})
```

* * *


### util.findAttributeValue {#util_findAttributeValue}

<p><code>findAttributeValue(trackedEntity, attributeDisplayName) ⇒ string</code></p>

Gets an attribute value by its case-insensitive display name


| Param | Type | Description |
| --- | --- | --- |
| trackedEntity | <code>Object</code> | A tracked entity instance (TEI) object |
| attributeDisplayName | <code>string</code> | The 'displayName' to search for in the TEI's attributes |

**Example**
```js
fn(state => {
   const s = util.findAttributeValue(state.data.trackedEntities[0], 'first name');
   console.log(s);
   return state
})
```

* * *


### util.findAttributeValueById {#util_findAttributeValueById}

<p><code>findAttributeValueById(trackedEntity, attributeUid) ⇒ string</code></p>

Gets an attribute value by its uid


| Param | Type | Description |
| --- | --- | --- |
| trackedEntity | <code>Object</code> | A tracked entity instance (TEI) object |
| attributeUid | <code>string</code> | The uid to search for in the TEI's attributes |

**Example**
```js
fn(state =>{
  const s = util.findAttributeValueById(state.tei, 'y1w2R6leVmh');
  console.log(s);
  return state
})
```

* * *


## tracker

These functions belong to the tracker namespace.
### tracker.export {#tracker_export}

<p><code>export(path, query, [options]) ⇒ Operation</code></p>

Export data from DHIS2.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to the resource, relative to the /tracker endpoint |
| query | <code>object</code> | An object of query parameters to be encoded into the URL |
| [options] | [<code>TrackerOptions</code>](#trackeroptions) | An optional object containing parseAs, and apiVersion for the request |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| references | An array of all previous data objects used in the Job |
**Example:** Export a trackedEntity resource using the id
```js
tracker.export('trackedEntities/Gu5UKnIFnJf')
```
**Example:** Export all enrollment resources
```js
tracker.export('enrollments', {orgUnit: 'TSyzvBiovKh'});
```
**Example:** Export all events
```js
tracker.export('events')
```

* * *


### tracker.import {#tracker_import}

<p><code>import(strategy, payload, [options]) ⇒ Operation</code></p>

Import data into DHIS2 using the tracker endpoint.


| Param | Type | Description |
| --- | --- | --- |
| strategy | <code>string</code> | The effect the import should have. Can either be CREATE, UPDATE, CREATE_AND_UPDATE and DELETE. |
| payload | <code>object</code> | The data to be imported. |
| [options] | [<code>TrackerOptions</code>](#trackeroptions) | An optional object containing parseAs, and apiVersion, and queries for the request |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| references | An array of all previous data objects used in the Job |
**Example:** Import some data and pass the `atomicMode` parameter
```js
tracker.import('CREATE', $.trackerData, { atomicMode: 'ALL' })
```
**Example:** Import a trackedEntity resource
```js
tracker.import(
  'CREATE',
  {
    trackedEntities: [
      {
        orgUnit: 'TSyzvBiovKh',
        trackedEntityType: 'nEenWmSyUEp',
        attributes: [
          {
            attribute: 'w75KJ2mc4zz',
            value: 'Gigiwe',
          },
        ],
      },
    ],
  },
  {
    atomicMode: 'ALL',
  }
);
```

* * *


## http

These functions belong to the http namespace.
### http.get {#http_get}

<p><code>get(path, [options]) ⇒ Operation</code></p>

Make a GET request to any DHIS2 endpoint.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource. |
| [options] | [<code>RequestOptions</code>](#requestoptions) | An optional object containing query, parseAs,and headers for the request |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the DHIS2 server (excluding the body) |
| references | An array of all previous data objects used in the Job |
**Example:** Get with query parameters
```js
http.get('dataValueSets', {
 query:{
  dataSet: 'pBOMPrpg1QX',
  orgUnit: 'DiszpKrYNg8',
  period: '201401',
  fields: '*',
}
});
```
**Example:** Get an image from a trackedEntityInstance.
```js
http.get('trackedEntityInstances/qHVDKszQmdx/BqaEWTBG3RB/image', {
  headers:{
      Accept: 'image/*'
  },
  parseAs: 'base64',
});
```

* * *


### http.patch {#http_patch}

<p><code>patch(resourceType, path, data, [options]) ⇒ Operation</code></p>

Make a PATCH request to any DHIS2 endpoint.


| Param | Type | Description |
| --- | --- | --- |
| resourceType | <code>string</code> | The type of resource to be updated. |
| path | <code>string</code> | The `id` or `path` to the `object` to be updated. E.g. `FTRrcoaog83` or `FTRrcoaog83/{collection-name}/{object-id}` |
| data | <code>Object</code> | Data to update. Include only the fields you want to update. E.g. `{name: "New Name"}` |
| [options] | [<code>RequestOptions</code>](#requestoptions) | An optional object containing query, parseAs,and headers for the request. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the DHIS2 server (excluding the body) |
| references | An array of all previous data objects used in the Job |
**Example:** Update a resource
```js
patch('dataElements', 'FTRrcoaog83', { name: 'New Name' });
```

* * *


### http.post {#http_post}

<p><code>post(path, data, [options]) ⇒ Operation</code></p>

Make a POST request to any DHIS2 endpoint.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource. |
| data | <code>DHIS2Data</code> | Object which defines data that will be used to create a given instance of resource. To create a single instance of a resource, `data` must be a javascript object, and to create multiple instances of a resources, `data` must be an array of javascript objects. |
| [options] | [<code>RequestOptions</code>](#requestoptions) | An optional object containing query, parseAs,and headers for the request. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the DHIS2 server (excluding the body) |
| references | An array of all previous data objects used in the Job |
**Example:** Call the tracker endpoint with a JSON payload
```js
http.post("tracker", {
  events: [
    {
      program: "eBAyeGv0exc",
      orgUnit: "DiszpKrYNg8",
      status: "COMPLETED",
    },
  ],
});
```

* * *


### http.request {#http_request}

<p><code>request(method, path, [options]) ⇒ Operation</code></p>

Make a HTTP request to any DHIS2 endpoint


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | HTTP method to use |
| path | <code>string</code> | Path to resource |
| [options] | [<code>RequestOptions</code>](#requestoptions) | An optional object containing query, requestConfig, and data for the request |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the DHIS2 server (excluding the body) |
| references | An array of all previous data objects used in the Job |
**Example:** GET request with a URL params
```js
http.request("GET",
  "tracker/relationships", {
   query:{
       trackedEntity: ['F8yKM85NbxW']
   },
});
```
**Example:** Upsert a tracker resource 
```js
http.request('POST', 'tracker', {
  data: {
  orgUnit: 'TSyzvBiovKh',
  trackedEntityType: 'nEenWmSyUEp',
  attributes: [
    {
      attribute: 'w75KJ2mc4zz',
      value: 'Qassime',
    },
  ],
 },
  query:{
     importStrategy: 'CREATE_AND_UPDATE'
   }
 });
```

* * *


##  Interfaces

### RequestOptions

Options object

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| query | <code>object</code> |  | An object of query parameters to be encoded into the URL |
| headers | <code>object</code> |  | An object of all request headers |
| [parseAs] | <code>string</code> | <code>&quot;&#x27;json&#x27;&quot;</code> | The response format to parse (e.g., 'json', 'text', 'stream', or 'base64'. Defaults to `json` |
| [apiVersion] | <code>string</code> | <code>42</code> | The apiVersion of the request. Defaults to 42. |


* * *

### RequestOptions

Options object

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| query | <code>object</code> |  | An object of query parameters to be encoded into the URL |
| headers | <code>object</code> |  | An object of all request headers |
| [parseAs] | <code>string</code> | <code>&quot;&#x27;json&#x27;&quot;</code> | The response format to parse (e.g., 'json', 'text', 'stream', or 'base64'. Defaults to `json` |
| [apiVersion] | <code>string</code> | <code>42</code> | The apiVersion of the request. Defaults to 42. |


* * *

### TrackerOptions

All options, apart from those listed here, will be appended as query parameters to the URL

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [parseAs] | <code>string</code> | <code>&quot;&#x27;json&#x27;&quot;</code> | The response format to parse (e.g., 'json', 'text', 'stream', or 'base64'. Defaults to `json` |


* * *

