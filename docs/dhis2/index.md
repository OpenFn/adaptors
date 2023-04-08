## Functions

<dl>
<dt>
    <a href="#attr">attr(attribute, value)</a></dt>
<dt>
    <a href="#configMigrationHelper">configMigrationHelper(state)</a></dt>
<dt>
    <a href="#create">create(resourceType, data, [options], [callback])</a></dt>
<dt>
    <a href="#destroy">destroy(resourceType, path, [data], [options], [callback])</a></dt>
<dt>
    <a href="#discover">discover(httpMethod, endpoint)</a></dt>
<dt>
    <a href="#dv">dv(dataElement, value)</a></dt>
<dt>
    <a href="#findAttributeValue">findAttributeValue(trackedEntityInstance, attributeDisplayName)</a></dt>
<dt>
    <a href="#get">get(resourceType, query, [options], [callback])</a></dt>
<dt>
    <a href="#patch">patch(resourceType, path, data, [options], [callback])</a></dt>
<dt>
    <a href="#request">request(configuration, axiosRequest)</a></dt>
<dt>
    <a href="#selectId">selectId(resourceType)</a></dt>
<dt>
    <a href="#update">update(resourceType, path, data, [options], [callback])</a></dt>
<dt>
    <a href="#upsert">upsert(resourceType, query, data, [options], [callback])</a></dt>
</dl>

## attr

attr(attribute, value) ⇒ <code>object</code>
Converts an attribute ID and value into a DSHI2 attribute object

**Kind**: global function  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>attribute</td><td><code>string</code></td><td><p>A tracked entity instance (TEI) attribute ID.</p>
</td>
    </tr><tr>
    <td>value</td><td><code>string</code></td><td><p>The value for that attribute.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
attr('w75KJ2mc4zz', 'Elias')
```

* * *

## configMigrationHelper

configMigrationHelper(state) ⇒ <code>object</code>
Migrates `apiUrl` to `hostUrl` if `hostUrl` is `blank`.
For `OpenFn.org` users with the `old-style configuration`.

**Kind**: global function  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>state</td><td><code>object</code></td><td><p>the runtime state</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
configMigrationHelper(state)
```

* * *

## create

create(resourceType, data, [options], [callback]) ⇒ <code>Operation</code>
Create a record

**Kind**: global function  
**Access**: public  
**Magic**: resourceType $.children.resourceTypes[*]  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>resourceType</td><td><code>string</code></td><td><p>Type of resource to create. E.g. <code>trackedEntityInstances</code>, <code>programs</code>, <code>events</code>, ...</p>
</td>
    </tr><tr>
    <td>data</td><td><code>Dhis2Data</code></td><td><p>Object which defines data that will be used to create a given instance of resource. To create a single instance of a resource, <code>data</code> must be a javascript object, and to create multiple instances of a resources, <code>data</code> must be an array of javascript objects.</p>
</td>
    </tr><tr>
    <td>[options]</td><td><code>Object</code></td><td><p>Optional <code>options</code> to define URL parameters via params (E.g. <code>filter</code>, <code>dimension</code> and other import parameters), request config (E.g. <code>auth</code>) and the DHIS2 apiVersion.</p>
</td>
    </tr><tr>
    <td>[callback]</td><td><code>function</code></td><td><p>Optional callback to handle the response</p>
</td>
    </tr>  </tbody>
</table>

**Example** *(a program)*  
```js
create('programs', {
  name: 'name 20',
  shortName: 'n20',
  programType: 'WITHOUT_REGISTRATION',
});
```
**Example** *(an event)*  
```js
create('events', {
  program: 'eBAyeGv0exc',
  orgUnit: 'DiszpKrYNg8',
  status: 'COMPLETED',
});
```
**Example** *(a trackedEntityInstance)*  
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
**Example** *(a dataSet)*  
```js
create('dataSets', { name: 'OpenFn Data Set', periodType: 'Monthly' });
```
**Example** *(a dataSetNotification)*  
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
**Example** *(a dataElement)*  
```js
create('dataElements', {
  aggregationType: 'SUM',
  domainType: 'AGGREGATE',
  valueType: 'NUMBER',
  name: 'Paracetamol',
  shortName: 'Para',
});
```
**Example** *(a dataElementGroup)*  
```js
create('dataElementGroups', {
  name: 'Data Element Group 1',
  dataElements: [],
});
```
**Example** *(a dataElementGroupSet)*  
```js
create('dataElementGroupSets', {
  name: 'Data Element Group Set 4',
  dataDimension: true,
  shortName: 'DEGS4',
  dataElementGroups: [],
});
```
**Example** *(a dataValueSet)*  
```js
create('dataValueSets', {
  dataElement: 'f7n9E0hX8qk',
  period: '201401',
  orgUnit: 'DiszpKrYNg8',
  value: '12',
});
```
**Example** *(a dataValueSet with related dataValues)*  
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
**Example** *(an enrollment)*  
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

## destroy

destroy(resourceType, path, [data], [options], [callback]) ⇒ <code>Operation</code>
Delete a record. A generic helper function to delete an object

**Kind**: global function  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>resourceType</td><td><code>string</code></td><td><p>The type of resource to be deleted. E.g. <code>trackedEntityInstances</code>, <code>organisationUnits</code>, etc.</p>
</td>
    </tr><tr>
    <td>path</td><td><code>string</code></td><td><p>Can be an <code>id</code> of an <code>object</code> or <code>path</code> to the <code>nested object</code> to <code>delete</code>.</p>
</td>
    </tr><tr>
    <td>[data]</td><td><code>Object</code></td><td><p>Optional. This is useful when you want to remove multiple objects from a collection in one request. You can send <code>data</code> as, for example, <code>{&quot;identifiableObjects&quot;: [{&quot;id&quot;: &quot;IDA&quot;}, {&quot;id&quot;: &quot;IDB&quot;}, {&quot;id&quot;: &quot;IDC&quot;}]}</code>. See more <a href="https://docs.dhis2.org/2.34/en/dhis2_developer_manual/web-api.html#deleting-objects">on DHIS2 API docs</a></p>
</td>
    </tr><tr>
    <td>[options]</td><td><code>Object</code></td><td><p>Optional <code>options</code> for <code>del</code> operation including params e.g. <code>{preheatCache: true, strategy: &#39;UPDATE&#39;, mergeMode: &#39;REPLACE&#39;}</code>. Run <code>discover</code> or see <a href="https://docs.dhis2.org/2.34/en/dhis2_developer_manual/web-api.html#create-update-parameters">DHIS2 documentation</a>. Defaults to <code>{operationName: &#39;delete&#39;, apiVersion: state.configuration.apiVersion, responseType: &#39;json&#39;}</code></p>
</td>
    </tr><tr>
    <td>[callback]</td><td><code>function</code></td><td><p>Optional callback to handle the response</p>
</td>
    </tr>  </tbody>
</table>

**Example** *(a tracked entity instance)*  
```js
destroy('trackedEntityInstances', 'LcRd6Nyaq7T');
```

* * *

## discover

discover(httpMethod, endpoint) ⇒ <code>Operation</code>
Discover `DHIS2` `api` `endpoint` `query parameters` and allowed `operators` for a given resource's endpoint.

**Kind**: global function  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>httpMethod</td><td><code>string</code></td><td><p>The HTTP to inspect parameter usage for a given endpoint, e.g., <code>get</code>, <code>post</code>,<code>put</code>,<code>patch</code>,<code>delete</code></p>
</td>
    </tr><tr>
    <td>endpoint</td><td><code>string</code></td><td><p>The path for a given endpoint. E.g. <code>/trackedEntityInstances</code> or <code>/dataValueSets</code></p>
</td>
    </tr>  </tbody>
</table>

**Example** *(a list of parameters allowed on a given endpoint for specific http method)*  
```js
discover('post', '/trackedEntityInstances')
```

* * *

## dv

dv(dataElement, value) ⇒ <code>object</code>
Converts a dataElement and value into a DSHI2 dataValue object

**Kind**: global function  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>dataElement</td><td><code>string</code></td><td><p>A data element ID.</p>
</td>
    </tr><tr>
    <td>value</td><td><code>string</code></td><td><p>The value for that data element.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
dv('f7n9E0hX8qk', 12)
```

* * *

## findAttributeValue

findAttributeValue(trackedEntityInstance, attributeDisplayName) ⇒ <code>string</code>
Gets an attribute value by its case-insensitive display name

**Kind**: global function  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>trackedEntityInstance</td><td><code>Object</code></td><td><p>A tracked entity instance (TEI) object</p>
</td>
    </tr><tr>
    <td>attributeDisplayName</td><td><code>string</code></td><td><p>The &#39;displayName&#39; to search for in the TEI&#39;s attributes</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
findAttributeValue(state.data.trackedEntityInstances[0], 'first name')
```

* * *

## get

get(resourceType, query, [options], [callback]) ⇒ <code>Operation</code>
Get data. Generic helper method for getting data of any kind from DHIS2.
- This can be used to get `DataValueSets`,`events`,`trackedEntityInstances`,`etc.`

**Kind**: global function  
**Returns**: <code>Operation</code> - state  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>resourceType</td><td><code>string</code></td><td><p>The type of resource to get(use its <code>plural</code> name). E.g. <code>dataElements</code>, <code>trackedEntityInstances</code>,<code>organisationUnits</code>, etc.</p>
</td>
    </tr><tr>
    <td>query</td><td><code>Object</code></td><td><p>A query object that will limit what resources are retrieved when converted into request params.</p>
</td>
    </tr><tr>
    <td>[options]</td><td><code>Object</code></td><td><p>Optional <code>options</code> to define URL parameters via params beyond filters, request configuration (e.g. <code>auth</code>) and DHIS2 api version to use.</p>
</td>
    </tr><tr>
    <td>[callback]</td><td><code>function</code></td><td><p>Optional callback to handle the response</p>
</td>
    </tr>  </tbody>
</table>

**Example** *(all data values for the &#x27;pBOMPrpg1QX&#x27; dataset)*  
```js
get('dataValueSets', {
  dataSet: 'pBOMPrpg1QX',
  orgUnit: 'DiszpKrYNg8',
  period: '201401',
  fields: '*',
});
```
**Example** *(all programs for an organization unit)*  
```js
get('programs', { orgUnit: 'TSyzvBiovKh', fields: '*' });
```
**Example** *(a single tracked entity instance by a unique external ID)*  
```js
get('trackedEntityInstances', {
  ou: 'DiszpKrYNg8',
  filter: ['flGbXLXCrEo:Eq:124', 'w75KJ2mc4zz:Eq:John'],
});
```

* * *

## patch

patch(resourceType, path, data, [options], [callback]) ⇒ <code>Operation</code>
Patch a record. A generic helper function to send partial updates on one or more object properties.
- You are not required to send the full body of object properties.
- This is useful for cases where you don't want or need to update all properties on a object.

**Kind**: global function  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>resourceType</td><td><code>string</code></td><td><p>The type of resource to be updated. E.g. <code>dataElements</code>, <code>organisationUnits</code>, etc.</p>
</td>
    </tr><tr>
    <td>path</td><td><code>string</code></td><td><p>The <code>id</code> or <code>path</code> to the <code>object</code> to be updated. E.g. <code>FTRrcoaog83</code> or <code>FTRrcoaog83/{collection-name}/{object-id}</code></p>
</td>
    </tr><tr>
    <td>data</td><td><code>Object</code></td><td><p>Data to update. Include only the fields you want to update. E.g. <code>{name: &quot;New Name&quot;}</code></p>
</td>
    </tr><tr>
    <td>[options]</td><td><code>Object</code></td><td><p>Optional configuration, including params for the update ({preheatCache: true, strategy: &#39;UPDATE&#39;, mergeMode: &#39;REPLACE&#39;}). Defaults to <code>{operationName: &#39;patch&#39;, apiVersion: state.configuration.apiVersion, responseType: &#39;json&#39;}</code></p>
</td>
    </tr><tr>
    <td>[callback]</td><td><code>function</code></td><td><p>Optional callback to handle the response</p>
</td>
    </tr>  </tbody>
</table>

**Example** *(a dataElement)*  
```js
patch('dataElements', 'FTRrcoaog83', { name: 'New Name' });
```

* * *

## request

request(configuration, axiosRequest) ⇒ <code>Promise</code>
The request client takes configuration from state and an axios request object
then (1) logs the method and URL, (2) applies standard headers and auth
before spreading the rest of the axios configuration, and (3) executes an
axios request.

**Kind**: global function  
**Returns**: <code>Promise</code> - a promise that will resolve to either a response object or an error object.  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>configuration</td><td><code>object</code></td><td><p>configuration must have a username and password</p>
</td>
    </tr><tr>
    <td>axiosRequest</td><td><code>object</code></td><td><p>the axiosRequest contains valid axios params: <a href="https://axios-http.com/docs/req_config">https://axios-http.com/docs/req_config</a></p>
</td>
    </tr>  </tbody>
</table>


* * *

## selectId

selectId(resourceType) ⇒ <code>string</code>
Determines the attribute name for a DHIS2 system ID given a resource type.

**Kind**: global function  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>resourceType</td><td><code>string</code></td>
    </tr>  </tbody>
</table>


* * *

## update

update(resourceType, path, data, [options], [callback]) ⇒ <code>Operation</code>
Update data. A generic helper function to update a resource object of any type.
Updating an object requires to send `all required fields` or the `full body`

**Kind**: global function  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>resourceType</td><td><code>string</code></td><td><p>The type of resource to be updated. E.g. <code>dataElements</code>, <code>organisationUnits</code>, etc.</p>
</td>
    </tr><tr>
    <td>path</td><td><code>string</code></td><td><p>The <code>id</code> or <code>path</code> to the <code>object</code> to be updated. E.g. <code>FTRrcoaog83</code> or <code>FTRrcoaog83/{collection-name}/{object-id}</code></p>
</td>
    </tr><tr>
    <td>data</td><td><code>Object</code></td><td><p>Data to update. It requires to send <code>all required fields</code> or the <code>full body</code>. If you want <code>partial updates</code>, use <code>patch</code> operation.</p>
</td>
    </tr><tr>
    <td>[options]</td><td><code>Object</code></td><td><p>Optional <code>options</code> to define URL parameters via params (E.g. <code>filter</code>, <code>dimension</code> and other import parameters), request config (E.g. <code>auth</code>) and the DHIS2 apiVersion.</p>
</td>
    </tr><tr>
    <td>[callback]</td><td><code>function</code></td><td><p>Optional callback to handle the response</p>
</td>
    </tr>  </tbody>
</table>

**Example** *(a program)*  
```js
update('programs', 'qAZJCrNJK8H', {
  name: '14e1aa02c3f0a31618e096f2c6d03bed',
  shortName: '14e1aa02',
  programType: 'WITHOUT_REGISTRATION',
});
```
**Example** *(an event)*  
```js
update('events', 'PVqUD2hvU4E', {
  program: 'eBAyeGv0exc',
  orgUnit: 'Ngelehun CHC',
  status: 'COMPLETED',
  storedBy: 'admin',
  dataValues: [],
});
```
**Example** *(a trackedEntityInstance)*  
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
**Example** *(a dataSet)*  
```js
update('dataSets', 'lyLU2wR22tC', { name: 'OpenFN Data Set', periodType: 'Weekly' });
```
**Example** *(a dataSetNotification)*  
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
**Example** *(a dataElement)*  
```js
update('dataElements', 'FTRrcoaog83', {
  aggregationType: 'SUM',
  domainType: 'AGGREGATE',
  valueType: 'NUMBER',
  name: 'Paracetamol',
  shortName: 'Para',
});
```
**Example** *(a dataElementGroup)*  
```js
update('dataElementGroups', 'QrprHT61XFk', {
  name: 'Data Element Group 1',
  dataElements: [],
});
```
**Example** *(a dataElementGroupSet)*  
```js
update('dataElementGroupSets', 'VxWloRvAze8', {
  name: 'Data Element Group Set 4',
  dataDimension: true,
  shortName: 'DEGS4',
  dataElementGroups: [],
});
```
**Example** *(a dataValueSet)*  
```js
update('dataValueSets', 'AsQj6cDsUq4', {
  dataElement: 'f7n9E0hX8qk',
  period: '201401',
  orgUnit: 'DiszpKrYNg8',
  value: '12',
});
```
**Example** *(a dataValueSet with related dataValues)*  
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
**Example** *(a single enrollment)*  
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

## upsert

upsert(resourceType, query, data, [options], [callback]) ⇒ <code>Operation</code>
Upsert a record. A generic helper function used to atomically either insert a row, or on the basis of the row already existing, UPDATE that existing row instead.

**Kind**: global function  
**Throws**:

- <code>RangeError</code> - Throws range error

**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>resourceType</td><td><code>string</code></td><td><p>The type of a resource to <code>upsert</code>. E.g. <code>trackedEntityInstances</code></p>
</td>
    </tr><tr>
    <td>query</td><td><code>Object</code></td><td><p>A query object that allows to uniquely identify the resource to update. If no matches found, then the resource will be created.</p>
</td>
    </tr><tr>
    <td>data</td><td><code>Object</code></td><td><p>The data to use for update or create depending on the result of the query.</p>
</td>
    </tr><tr>
    <td>[options]</td><td><code>Object</code></td><td><p>Optional configuration that will be applied to both the <code>get</code> and the <code>create</code> or <code>update</code> operations.</p>
</td>
    </tr><tr>
    <td>[callback]</td><td><code>function</code></td><td><p>Optional callback to handle the response</p>
</td>
    </tr>  </tbody>
</table>

**Example** *(Example &#x60;expression.js&#x60; of upsert)*  
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

