<dl>
<dt>
    <a href="#attr">attr(attribute, value)</a></dt>
<dt>
    <a href="#configmigrationhelper">configMigrationHelper(state)</a></dt>
<dt>
    <a href="#create">create(resourceType, data, [options], [callback])</a></dt>
<dt>
    <a href="#destroy">destroy(resourceType, path, [data], [options], [callback])</a></dt>
<dt>
    <a href="#discover">discover(httpMethod, endpoint)</a></dt>
<dt>
    <a href="#dv">dv(dataElement, value)</a></dt>
<dt>
    <a href="#findattributevalue">findAttributeValue(trackedEntityInstance, attributeDisplayName)</a></dt>
<dt>
    <a href="#get">get(resourceType, query, [options], [callback])</a></dt>
<dt>
    <a href="#patch">patch(resourceType, path, data, [options], [callback])</a></dt>
<dt>
    <a href="#request">request(configuration, axiosRequest)</a></dt>
<dt>
    <a href="#selectid">selectId(resourceType)</a></dt>
<dt>
    <a href="#update">update(resourceType, path, data, [options], [callback])</a></dt>
<dt>
    <a href="#upsert">upsert(resourceType, query, data, [options], [callback])</a></dt>
</dl>

The following functions are exported from the common adaptor:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#alterstate">alterState()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datapath">dataPath()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datavalue">dataValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datefns">dateFns()</a>
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
    <a href="/adaptors/packages/common-docs#http">http()</a>
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
### attr

<p><code>attr(attribute, value) ⇒ object</code></p>

Converts an attribute ID and value into a DSHI2 attribute object


| Param | Type | Description |
| --- | --- | --- |
| attribute | <code>string</code> | A tracked entity instance (TEI) attribute ID. |
| value | <code>string</code> | The value for that attribute. |

**Example**
```js
attr('w75KJ2mc4zz', 'Elias')
```

* * *

### configMigrationHelper

<p><code>configMigrationHelper(state) ⇒ object</code></p>

Migrates `apiUrl` to `hostUrl` if `hostUrl` is `blank`.
For `OpenFn.org` users with the `old-style configuration`.


| Param | Type | Description |
| --- | --- | --- |
| state | <code>object</code> | the runtime state |

**Example**
```js
configMigrationHelper(state)
```

* * *

### create

<p><code>create(resourceType, data, [options], [callback]) ⇒ Operation</code></p>

Create a record


| Param | Type | Description |
| --- | --- | --- |
| resourceType | <code>string</code> | Type of resource to create. E.g. `trackedEntityInstances`, `programs`, `events`, ... |
| data | <code>Dhis2Data</code> | Object which defines data that will be used to create a given instance of resource. To create a single instance of a resource, `data` must be a javascript object, and to create multiple instances of a resources, `data` must be an array of javascript objects. |
| [options] | <code>Object</code> | Optional `options` to define URL parameters via params (E.g. `filter`, `dimension` and other import parameters), request config (E.g. `auth`) and the DHIS2 apiVersion. |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example:** a program
```js
create('programs', {
  name: 'name 20',
  shortName: 'n20',
  programType: 'WITHOUT_REGISTRATION',
});
```
**Example:** an event
```js
create('events', {
  program: 'eBAyeGv0exc',
  orgUnit: 'DiszpKrYNg8',
  status: 'COMPLETED',
});
```
**Example:** a trackedEntityInstance
```js
create('trackedEntityInstances', {
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
**Example:** a dataSet
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
**Example:** a dataElement
```js
create('dataElements', {
  aggregationType: 'SUM',
  domainType: 'AGGREGATE',
  valueType: 'NUMBER',
  name: 'Paracetamol',
  shortName: 'Para',
});
```
**Example:** a dataElementGroup
```js
create('dataElementGroups', {
  name: 'Data Element Group 1',
  dataElements: [],
});
```
**Example:** a dataElementGroupSet
```js
create('dataElementGroupSets', {
  name: 'Data Element Group Set 4',
  dataDimension: true,
  shortName: 'DEGS4',
  dataElementGroups: [],
});
```
**Example:** a dataValueSet
```js
create('dataValueSets', {
  dataElement: 'f7n9E0hX8qk',
  period: '201401',
  orgUnit: 'DiszpKrYNg8',
  value: '12',
});
```
**Example:** a dataValueSet with related dataValues
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
**Example:** an enrollment
```js
create('enrollments', {
  trackedEntityInstance: 'bmshzEacgxa',
  orgUnit: 'TSyzvBiovKh',
  program: 'gZBxv9Ujxg0',
  enrollmentDate: '2013-09-17',
  incidentDate: '2013-09-17',
});
```

* * *

### destroy

<p><code>destroy(resourceType, path, [data], [options], [callback]) ⇒ Operation</code></p>

Delete a record. A generic helper function to delete an object


| Param | Type | Description |
| --- | --- | --- |
| resourceType | <code>string</code> | The type of resource to be deleted. E.g. `trackedEntityInstances`, `organisationUnits`, etc. |
| path | <code>string</code> | Can be an `id` of an `object` or `path` to the `nested object` to `delete`. |
| [data] | <code>Object</code> | Optional. This is useful when you want to remove multiple objects from a collection in one request. You can send `data` as, for example, `{"identifiableObjects": [{"id": "IDA"}, {"id": "IDB"}, {"id": "IDC"}]}`. See more [on DHIS2 API docs](https://docs.dhis2.org/2.34/en/dhis2_developer_manual/web-api.html#deleting-objects) |
| [options] | <code>Object</code> | Optional `options` for `del` operation including params e.g. `{preheatCache: true, strategy: 'UPDATE', mergeMode: 'REPLACE'}`. Run `discover` or see [DHIS2 documentation](https://docs.dhis2.org/2.34/en/dhis2_developer_manual/web-api.html#create-update-parameters). Defaults to `{operationName: 'delete', apiVersion: state.configuration.apiVersion, responseType: 'json'}` |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example:** a tracked entity instance
```js
destroy('trackedEntityInstances', 'LcRd6Nyaq7T');
```

* * *

### discover

<p><code>discover(httpMethod, endpoint) ⇒ Operation</code></p>

Discover `DHIS2` `api` `endpoint` `query parameters` and allowed `operators` for a given resource's endpoint.


| Param | Type | Description |
| --- | --- | --- |
| httpMethod | <code>string</code> | The HTTP to inspect parameter usage for a given endpoint, e.g., `get`, `post`,`put`,`patch`,`delete` |
| endpoint | <code>string</code> | The path for a given endpoint. E.g. `/trackedEntityInstances` or `/dataValueSets` |

**Example:** a list of parameters allowed on a given endpoint for specific http method
```js
discover('post', '/trackedEntityInstances')
```

* * *

### dv

<p><code>dv(dataElement, value) ⇒ object</code></p>

Converts a dataElement and value into a DSHI2 dataValue object


| Param | Type | Description |
| --- | --- | --- |
| dataElement | <code>string</code> | A data element ID. |
| value | <code>string</code> | The value for that data element. |

**Example**
```js
dv('f7n9E0hX8qk', 12)
```

* * *

### findAttributeValue

<p><code>findAttributeValue(trackedEntityInstance, attributeDisplayName) ⇒ string</code></p>

Gets an attribute value by its case-insensitive display name


| Param | Type | Description |
| --- | --- | --- |
| trackedEntityInstance | <code>Object</code> | A tracked entity instance (TEI) object |
| attributeDisplayName | <code>string</code> | The 'displayName' to search for in the TEI's attributes |

**Example**
```js
findAttributeValue(state.data.trackedEntityInstances[0], 'first name')
```

* * *

### get

<p><code>get(resourceType, query, [options], [callback]) ⇒ Operation</code></p>

Get data. Generic helper method for getting data of any kind from DHIS2.
- This can be used to get `DataValueSets`,`events`,`trackedEntityInstances`,`etc.`

**Returns**: <code>Operation</code> - state  

| Param | Type | Description |
| --- | --- | --- |
| resourceType | <code>string</code> | The type of resource to get(use its `plural` name). E.g. `dataElements`, `trackedEntityInstances`,`organisationUnits`, etc. |
| query | <code>Object</code> | A query object that will limit what resources are retrieved when converted into request params. |
| [options] | <code>Object</code> | Optional `options` to define URL parameters via params beyond filters, request configuration (e.g. `auth`) and DHIS2 api version to use. |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example:** all data values for the &#x27;pBOMPrpg1QX&#x27; dataset
```js
get('dataValueSets', {
  dataSet: 'pBOMPrpg1QX',
  orgUnit: 'DiszpKrYNg8',
  period: '201401',
  fields: '*',
});
```
**Example:** all programs for an organization unit
```js
get('programs', { orgUnit: 'TSyzvBiovKh', fields: '*' });
```
**Example:** a single tracked entity instance by a unique external ID
```js
get('trackedEntityInstances', {
  ou: 'DiszpKrYNg8',
  filter: ['flGbXLXCrEo:Eq:124', 'w75KJ2mc4zz:Eq:John'],
});
```

* * *

### patch

<p><code>patch(resourceType, path, data, [options], [callback]) ⇒ Operation</code></p>

Patch a record. A generic helper function to send partial updates on one or more object properties.
- You are not required to send the full body of object properties.
- This is useful for cases where you don't want or need to update all properties on a object.


| Param | Type | Description |
| --- | --- | --- |
| resourceType | <code>string</code> | The type of resource to be updated. E.g. `dataElements`, `organisationUnits`, etc. |
| path | <code>string</code> | The `id` or `path` to the `object` to be updated. E.g. `FTRrcoaog83` or `FTRrcoaog83/{collection-name}/{object-id}` |
| data | <code>Object</code> | Data to update. Include only the fields you want to update. E.g. `{name: "New Name"}` |
| [options] | <code>Object</code> | Optional configuration, including params for the update ({preheatCache: true, strategy: 'UPDATE', mergeMode: 'REPLACE'}). Defaults to `{operationName: 'patch', apiVersion: state.configuration.apiVersion, responseType: 'json'}` |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example:** a dataElement
```js
patch('dataElements', 'FTRrcoaog83', { name: 'New Name' });
```

* * *

### request

<p><code>request(configuration, axiosRequest) ⇒ Promise</code></p>

The request client takes configuration from state and an axios request object
then (1) logs the method and URL, (2) applies standard headers and auth
before spreading the rest of the axios configuration, and (3) executes an
axios request.

**Returns**: <code>Promise</code> - a promise that will resolve to either a response object or an error object.  

| Param | Type | Description |
| --- | --- | --- |
| configuration | <code>object</code> | configuration must have a username and password |
| axiosRequest | <code>object</code> | the axiosRequest contains valid axios params: https://axios-http.com/docs/req_config |


* * *

### selectId

<p><code>selectId(resourceType) ⇒ string</code></p>

Determines the attribute name for a DHIS2 system ID given a resource type.


| Param | Type |
| --- | --- |
| resourceType | <code>string</code> | 


* * *

### update

<p><code>update(resourceType, path, data, [options], [callback]) ⇒ Operation</code></p>

Update data. A generic helper function to update a resource object of any type.
Updating an object requires to send `all required fields` or the `full body`


| Param | Type | Description |
| --- | --- | --- |
| resourceType | <code>string</code> | The type of resource to be updated. E.g. `dataElements`, `organisationUnits`, etc. |
| path | <code>string</code> | The `id` or `path` to the `object` to be updated. E.g. `FTRrcoaog83` or `FTRrcoaog83/{collection-name}/{object-id}` |
| data | <code>Object</code> | Data to update. It requires to send `all required fields` or the `full body`. If you want `partial updates`, use `patch` operation. |
| [options] | <code>Object</code> | Optional `options` to define URL parameters via params (E.g. `filter`, `dimension` and other import parameters), request config (E.g. `auth`) and the DHIS2 apiVersion. |
| [callback] | <code>function</code> | Optional callback to handle the response |

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
**Example:** a trackedEntityInstance
```js
update('trackedEntityInstances', 'IeQfgUtGPq2', {
  created: '2015-08-06T21:12:37.256',
  orgUnit: 'TSyzvBiovKh',
  createdAtClient: '2015-08-06T21:12:37.256',
  trackedEntityInstance: 'IeQfgUtGPq2',
  lastUpdated: '2015-08-06T21:12:37.257',
  trackedEntityType: 'nEenWmSyUEp',
  inactive: false,
  deleted: false,
  featureType: 'NONE',
  programOwners: [
    {
      ownerOrgUnit: 'TSyzvBiovKh',
      program: 'IpHINAT79UW',
      trackedEntityInstance: 'IeQfgUtGPq2',
    },
  ],
  enrollments: [],
  relationships: [],
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
**Example:** a dataSet
```js
update('dataSets', 'lyLU2wR22tC', { name: 'OpenFN Data Set', periodType: 'Weekly' });
```
**Example:** a dataSetNotification
```js
update('dataSetNotificationTemplates', 'VbQBwdm1wVP', {
  dataSetNotificationTrigger: 'DATA_SET_COMPLETION',
  notificationRecipient: 'ORGANISATION_UNIT_CONTACT',
  name: 'Notification',
  messageTemplate: 'Hello Updated,
  deliveryChannels: ['SMS'],
  dataSets: [],
});
```
**Example:** a dataElement
```js
update('dataElements', 'FTRrcoaog83', {
  aggregationType: 'SUM',
  domainType: 'AGGREGATE',
  valueType: 'NUMBER',
  name: 'Paracetamol',
  shortName: 'Para',
});
```
**Example:** a dataElementGroup
```js
update('dataElementGroups', 'QrprHT61XFk', {
  name: 'Data Element Group 1',
  dataElements: [],
});
```
**Example:** a dataElementGroupSet
```js
update('dataElementGroupSets', 'VxWloRvAze8', {
  name: 'Data Element Group Set 4',
  dataDimension: true,
  shortName: 'DEGS4',
  dataElementGroups: [],
});
```
**Example:** a dataValueSet
```js
update('dataValueSets', 'AsQj6cDsUq4', {
  dataElement: 'f7n9E0hX8qk',
  period: '201401',
  orgUnit: 'DiszpKrYNg8',
  value: '12',
});
```
**Example:** a dataValueSet with related dataValues
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
**Example:** a single enrollment
```js
update('enrollments', 'CmsHzercTBa' {
  trackedEntityInstance: 'bmshzEacgxa',
  orgUnit: 'TSyzvBiovKh',
  program: 'gZBxv9Ujxg0',
  enrollmentDate: '2013-10-17',
  incidentDate: '2013-10-17',
});
```

* * *

### upsert

<p><code>upsert(resourceType, query, data, [options], [callback]) ⇒ Operation</code></p>

Upsert a record. A generic helper function used to atomically either insert a row, or on the basis of the row already existing, UPDATE that existing row instead.

**Throws**:

- <code>RangeError</code> - Throws range error


| Param | Type | Description |
| --- | --- | --- |
| resourceType | <code>string</code> | The type of a resource to `upsert`. E.g. `trackedEntityInstances` |
| query | <code>Object</code> | A query object that allows to uniquely identify the resource to update. If no matches found, then the resource will be created. |
| data | <code>Object</code> | The data to use for update or create depending on the result of the query. |
| [options] | <code>Object</code> | Optional configuration that will be applied to both the `get` and the `create` or `update` operations. |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example:** Example &#x60;expression.js&#x60; of upsert
```js
upsert('trackedEntityInstances', {
 ou: 'TSyzvBiovKh',
 filter: ['w75KJ2mc4zz:Eq:Qassim'],
}, {
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

* * *

