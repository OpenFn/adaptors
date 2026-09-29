<dl>
<dt>
    <a href="#addtogroup">addToGroup(groupId, individualId, [role], [options])</a></dt>
<dt>
    <a href="#creategroup">createGroup(data)</a></dt>
<dt>
    <a href="#createindividual">createIndividual(data)</a></dt>
<dt>
    <a href="#enroll">enroll(beneficiary, programId, [options])</a></dt>
<dt>
    <a href="#getenrolledprograms">getEnrolledPrograms(beneficiary)</a></dt>
<dt>
    <a href="#getgroup">getGroup(id, [options])</a></dt>
<dt>
    <a href="#getgroupmembers">getGroupMembers(groupId, [options])</a></dt>
<dt>
    <a href="#getindividual">getIndividual(id, [options])</a></dt>
<dt>
    <a href="#getprogram">getProgram(id)</a></dt>
<dt>
    <a href="#getprograms">getPrograms([options])</a></dt>
<dt>
    <a href="#getservicepoint">getServicePoint(name)</a></dt>
<dt>
    <a href="#removefromgroup">removeFromGroup(groupId, individualId, [options])</a></dt>
<dt>
    <a href="#request">request(method, path, [body], [options])</a></dt>
<dt>
    <a href="#searchgroup">searchGroup([query], [options])</a></dt>
<dt>
    <a href="#searchindividual">searchIndividual([query], [options])</a></dt>
<dt>
    <a href="#searchservicepoint">searchServicePoint([query], [options])</a></dt>
<dt>
    <a href="#unenroll">unenroll(beneficiary, programId, [options])</a></dt>
<dt>
    <a href="#updategroup">updateGroup(id, data, [options])</a></dt>
<dt>
    <a href="#updateindividual">updateIndividual(id, data, [options])</a></dt>
</dl>


This adaptor exports the following from common:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#combine">combine()</a>
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
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#log">log()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt></dl>

## Functions
### addToGroup

<p><code>addToGroup(groupId, individualId, [role], [options]) ⇒ Operation</code></p>

Add an individual to a group. Throws a 409 error if the individual is
already a member. To change an existing member's role, use `request` with
both identifiers URL-encoded, eg
`request("PATCH", "/Group/<group>/member/<individual>", { role: { coding: [{ system: "urn:openspp:vocab:group-membership-type", code: "spouse" }] } })`.


| Param | Type | Description |
| --- | --- | --- |
| groupId | <code>string</code> | Group identifier as `system\|value` |
| individualId | <code>string</code> | Individual identifier as `system\|value` |
| [role] | <code>string</code> \| <code>object</code> | Role code in `urn:openspp:vocab:group-membership-type` (eg "head", "spouse", "child"), or a CodeableConcept |
| [options] | <code>object</code> | `startDate` (YYYY-MM-DD) |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body. For searches, the list of resources. |
| response | the response from the HTTP server, including headers and statusCode. Searches add `page`, with `total` and `next`. |
| references | an array of all previous data objects used in the Job |

**Example:** Add as head of household
```js
addToGroup("urn:openspp:vocab:id-type#household_id|HH-1", "urn:openspp:vocab:id-type#national_id|PH-123", "head");
```
**Example:** Add without a role
```js
addToGroup("urn:openspp:vocab:id-type#household_id|HH-1", "urn:openspp:vocab:id-type#national_id|PH-123");
```

* * *

### createGroup

<p><code>createGroup(data) ⇒ Operation</code></p>

Create a group.


| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | Group resource, with at least one `identifier`. See the [OpenSPP resource docs](https://docs.openspp.org/developer_guide/api_v2/resources) |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body. For searches, the list of resources. |
| response | the response from the HTTP server, including headers and statusCode. Searches add `page`, with `total` and `next`. |
| references | an array of all previous data objects used in the Job |

**Example**
```js
createGroup({
  identifier: [{ system: "urn:openspp:vocab:id-type#household_id", value: "HH-1" }],
  name: "Santos Household",
  groupType: "household",
});
```

* * *

### createIndividual

<p><code>createIndividual(data) ⇒ Operation</code></p>

Create an individual.


| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | Individual resource, with at least one `identifier`. See the [OpenSPP resource docs](https://docs.openspp.org/developer_guide/api_v2/resources) |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body. For searches, the list of resources. |
| response | the response from the HTTP server, including headers and statusCode. Searches add `page`, with `total` and `next`. |
| references | an array of all previous data objects used in the Job |

**Example**
```js
createIndividual({
  identifier: [{ system: "urn:openspp:vocab:id-type#national_id", value: "PH-123456789" }],
  name: { family: "Santos", given: "Maria" },
  birthDate: "1985-03-15",
  gender: { coding: [{ system: "urn:iso:std:iso:5218", code: "2" }] },
});
```

* * *

### enroll

<p><code>enroll(beneficiary, programId, [options]) ⇒ Operation</code></p>

Enroll a registrant in a program. If they are already enrolled, returns their
membership unchanged. If they have a membership in this program that isn't
enrolled (eg exited), it is set back to enrolled. That update throws if the
registrant also has memberships in other programs, because the adaptor can't
be sure OpenSPP would update the membership for this program.


| Param | Type | Description |
| --- | --- | --- |
| beneficiary | <code>string</code> | Typed reference: `Individual/system\|value` or `Group/system\|value` |
| programId | <code>string</code> | Program identifier as `system\|value` |
| [options] | <code>object</code> | `enrollmentDate` (YYYY-MM-DD) for new memberships |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body. For searches, the list of resources. |
| response | the response from the HTTP server, including headers and statusCode. Searches add `page`, with `total` and `next`. |
| references | an array of all previous data objects used in the Job |

**Example**
```js
enroll("Individual/urn:openspp:vocab:id-type#national_id|PH-123", "urn:openspp:program|universal-child-grant");
```

* * *

### getEnrolledPrograms

<p><code>getEnrolledPrograms(beneficiary) ⇒ Operation</code></p>

List the programs a registrant is enrolled in, as ProgramMembership
resources (each has a `program` reference).


| Param | Type | Description |
| --- | --- | --- |
| beneficiary | <code>string</code> | Typed reference: `Individual/system\|value` or `Group/system\|value` |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body. For searches, the list of resources. |
| response | the response from the HTTP server, including headers and statusCode. Searches add `page`, with `total` and `next`. |
| references | an array of all previous data objects used in the Job |

**Example**
```js
getEnrolledPrograms("Group/urn:openspp:vocab:id-type#household_id|HH-1");
```

* * *

### getGroup

<p><code>getGroup(id, [options]) ⇒ Operation</code></p>

Get a group by identifier. To read the members, use `getGroupMembers`.


| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Identifier as `system\|value` |
| [options] | <code>object</code> | `elements` and `extensions` (see SearchOptions) |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body. For searches, the list of resources. |
| response | the response from the HTTP server, including headers and statusCode. Searches add `page`, with `total` and `next`. |
| references | an array of all previous data objects used in the Job |

**Example**
```js
getGroup("urn:openspp:vocab:id-type#household_id|HH-1");
```

* * *

### getGroupMembers

<p><code>getGroupMembers(groupId, [options]) ⇒ Operation</code></p>

List the individuals who are members of a group.


| Param | Type | Description |
| --- | --- | --- |
| groupId | <code>string</code> | Group identifier as `system\|value` |
| [options] | <code>object</code> | `role` (membership role code) plus SearchOptions |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body. For searches, the list of resources. |
| response | the response from the HTTP server, including headers and statusCode. Searches add `page`, with `total` and `next`. |
| references | an array of all previous data objects used in the Job |

**Example**
```js
getGroupMembers("urn:openspp:vocab:id-type#household_id|HH-1");
```
**Example:** Only the head of household
```js
getGroupMembers("urn:openspp:vocab:id-type#household_id|HH-1", { role: "head" });
```

* * *

### getIndividual

<p><code>getIndividual(id, [options]) ⇒ Operation</code></p>

Get an individual by identifier.


| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Identifier as `system\|value` |
| [options] | <code>object</code> | `elements` and `extensions` (see SearchOptions) |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body. For searches, the list of resources. |
| response | the response from the HTTP server, including headers and statusCode. Searches add `page`, with `total` and `next`. |
| references | an array of all previous data objects used in the Job |

**Example**
```js
getIndividual("urn:openspp:vocab:id-type#national_id|PH-123456789");
```
**Example:** Only return some fields
```js
getIndividual("urn:openspp:vocab:id-type#national_id|PH-123456789", { elements: ["identifier", "name"] });
```

* * *

### getProgram

<p><code>getProgram(id) ⇒ Operation</code></p>

Get a program by identifier.


| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Program identifier as `system\|value` |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body. For searches, the list of resources. |
| response | the response from the HTTP server, including headers and statusCode. Searches add `page`, with `total` and `next`. |
| references | an array of all previous data objects used in the Job |

**Example**
```js
getProgram("urn:openspp:program|universal-child-grant");
```

* * *

### getPrograms

<p><code>getPrograms([options]) ⇒ Operation</code></p>

List programs.


| Param | Type | Description |
| --- | --- | --- |
| [options] | [<code>ProgramOptions</code>](#programoptions) | Filters and paging |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body. For searches, the list of resources. |
| response | the response from the HTTP server, including headers and statusCode. Searches add `page`, with `total` and `next`. |
| references | an array of all previous data objects used in the Job |

**Example**
```js
getPrograms();
```
**Example:** Programs for groups, 10 per page
```js
getPrograms({ targetType: "group", count: 10 });
```

* * *

### getServicePoint

<p><code>getServicePoint(name) ⇒ Operation</code></p>

Get a service point by its identifier (the service point name).


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Service point identifier (its name) |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body. For searches, the list of resources. |
| response | the response from the HTTP server, including headers and statusCode. Searches add `page`, with `total` and `next`. |
| references | an array of all previous data objects used in the Job |

**Example**
```js
getServicePoint("Agoncillo Payment Center");
```

* * *

### removeFromGroup

<p><code>removeFromGroup(groupId, individualId, [options]) ⇒ Operation</code></p>

End an individual's membership of a group. OpenSPP sets the end date to
now unless `endedDate` is given.


| Param | Type | Description |
| --- | --- | --- |
| groupId | <code>string</code> | Group identifier as `system\|value` |
| individualId | <code>string</code> | Individual identifier as `system\|value` |
| [options] | <code>object</code> | `reason` (OpenSPP logs it but doesn't save it), `endedDate` (YYYY-MM-DD) |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body. For searches, the list of resources. |
| response | the response from the HTTP server, including headers and statusCode. Searches add `page`, with `total` and `next`. |
| references | an array of all previous data objects used in the Job |

**Example**
```js
removeFromGroup("urn:openspp:vocab:id-type#household_id|HH-1", "urn:openspp:vocab:id-type#national_id|PH-123", { reason: "Moved out" });
```

* * *

### request

<p><code>request(method, path, [body], [options]) ⇒ Operation</code></p>

Make a request to any OpenSPP REST API v2 endpoint.
Paths are relative to `/api/v2/spp`.


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | HTTP method |
| path | <code>string</code> | Path relative to /api/v2/spp, eg `/Individual` |
| [body] | <code>object</code> | Request body, sent as JSON |
| [options] | <code>object</code> | `query` (query parameters), `ifMatch` (ETag for optimistic locking) and `headers` |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body. For searches, the list of resources. |
| response | the response from the HTTP server, including headers and statusCode. Searches add `page`, with `total` and `next`. |
| references | an array of all previous data objects used in the Job |

**Example:** List vocabularies
```js
request("GET", "/Vocabulary", null, { query: { _count: 10 } });
```
**Example:** Read GIS layers
```js
request("GET", "/gis/ogc/collections");
```

* * *

### searchGroup

<p><code>searchGroup([query], [options]) ⇒ Operation</code></p>

Search groups.


| Param | Type | Description |
| --- | --- | --- |
| [query] | <code>object</code> | OpenSPP search parameters, eg `{ name: "Santos" }`. See the [OpenSPP search docs](https://docs.openspp.org/developer_guide/api_v2/search) |
| [options] | [<code>SearchOptions</code>](#searchoptions) | Paging and field options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body. For searches, the list of resources. |
| response | the response from the HTTP server, including headers and statusCode. Searches add `page`, with `total` and `next`. |
| references | an array of all previous data objects used in the Job |

**Example**
```js
searchGroup({ name: "Santos" }, { count: 50 });
```

* * *

### searchIndividual

<p><code>searchIndividual([query], [options]) ⇒ Operation</code></p>

Search individuals. Records the API client may not see (eg without consent)
are left out.


| Param | Type | Description |
| --- | --- | --- |
| [query] | <code>object</code> | OpenSPP search parameters, eg `{ name: "Santos" }`. `identifier` and `group` must be `system\|value`. See the [OpenSPP search docs](https://docs.openspp.org/developer_guide/api_v2/search) |
| [options] | [<code>SearchOptions</code>](#searchoptions) | Paging and field options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body. For searches, the list of resources. |
| response | the response from the HTTP server, including headers and statusCode. Searches add `page`, with `total` and `next`. |
| references | an array of all previous data objects used in the Job |

**Example:** Search by name
```js
searchIndividual({ name: "Santos" });
```
**Example:** Born on or after 2010, 50 per page, second page
```js
searchIndividual({ birthdate: "ge2010-01-01" }, { count: 50, offset: 50 });
```
**Example:** Heads of household in a group
```js
searchIndividual({ group: "urn:openspp:vocab:id-type#household_id|HH-1", "membership-role": "head" });
```

* * *

### searchServicePoint

<p><code>searchServicePoint([query], [options]) ⇒ Operation</code></p>

Search service points.


| Param | Type | Description |
| --- | --- | --- |
| [query] | <code>object</code> | OpenSPP search parameters, eg `{ country: "PH" }`. See the [OpenSPP service point docs](https://docs.openspp.org/developer_guide/api_v2/products_service_points) |
| [options] | <code>object</code> | `count`, `offset` |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body. For searches, the list of resources. |
| response | the response from the HTTP server, including headers and statusCode. Searches add `page`, with `total` and `next`. |
| references | an array of all previous data objects used in the Job |

**Example**
```js
searchServicePoint({ country: "PH", contractActive: true });
```

* * *

### unenroll

<p><code>unenroll(beneficiary, programId, [options]) ⇒ Operation</code></p>

Unenroll a registrant from a program by setting their membership to
`exited`. If the membership isn't enrolled, returns it unchanged. Throws if
the registrant has no membership in this program, or also has memberships in
other programs, because the adaptor can't be sure OpenSPP would update the
membership for this program.


| Param | Type | Description |
| --- | --- | --- |
| beneficiary | <code>string</code> | Typed reference: `Individual/system\|value` or `Group/system\|value` |
| programId | <code>string</code> | Program identifier as `system\|value` |
| [options] | <code>object</code> | `exitDate` (YYYY-MM-DD), `exitReason` (CodeableConcept; OpenSPP doesn't save it) |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body. For searches, the list of resources. |
| response | the response from the HTTP server, including headers and statusCode. Searches add `page`, with `total` and `next`. |
| references | an array of all previous data objects used in the Job |

**Example**
```js
unenroll("Individual/urn:openspp:vocab:id-type#national_id|PH-123", "urn:openspp:program|universal-child-grant");
```
**Example:** With exit details
```js
unenroll("Group/urn:openspp:vocab:id-type#household_id|HH-1", "urn:openspp:program|cash-transfer", { exitDate: "2026-09-30" });
```

* * *

### updateGroup

<p><code>updateGroup(id, data, [options]) ⇒ Operation</code></p>

Update some fields of a group. Fields you leave out are unchanged, and
`null` clears a field.


| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Identifier as `system\|value` |
| data | <code>object</code> | Fields to change |
| [options] | <code>object</code> | `ifMatch`: ETag from a previous read, to fail if the record changed |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body. For searches, the list of resources. |
| response | the response from the HTTP server, including headers and statusCode. Searches add `page`, with `total` and `next`. |
| references | an array of all previous data objects used in the Job |

**Example**
```js
updateGroup("urn:openspp:vocab:id-type#household_id|HH-1", { name: "Santos-Reyes Household" });
```

* * *

### updateIndividual

<p><code>updateIndividual(id, data, [options]) ⇒ Operation</code></p>

Update some fields of an individual. Fields you leave out are unchanged, and
`null` clears a field.


| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Identifier as `system\|value` |
| data | <code>object</code> | Fields to change |
| [options] | <code>object</code> | `ifMatch`: ETag from a previous read, to fail if the record changed |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body. For searches, the list of resources. |
| response | the response from the HTTP server, including headers and statusCode. Searches add `page`, with `total` and `next`. |
| references | an array of all previous data objects used in the Job |

**Example**
```js
updateIndividual("urn:openspp:vocab:id-type#national_id|PH-123456789", { birthDate: "1985-03-16" });
```

* * *


##  Interfaces

### OpenSPPState

State object


**Properties**

| Name | Description |
| --- | --- |
| data | the parsed response body. For searches, the list of resources. |
| response | the response from the HTTP server, including headers and statusCode. Searches add `page`, with `total` and `next`. |
| references | an array of all previous data objects used in the Job |


* * *

### ProgramOptions

Options for getPrograms


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [name] | <code>string</code> | Filter by name |
| [status] | <code>&#x27;active&#x27;</code> \| <code>&#x27;ended&#x27;</code> | Filter by status |
| [targetType] | <code>&#x27;individual&#x27;</code> \| <code>&#x27;group&#x27;</code> | Filter by target type |
| [count] | <code>number</code> | Page size, 1-100 (OpenSPP default 20) |
| [lastId] | <code>number</code> \| <code>string</code> | Cursor for the next page: the `_lastId` value in `state.response.page.next` |


* * *

### SearchOptions

Options for OpenSPP searches


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| count | <code>number</code> | Page size, 1-100 (OpenSPP default 20) |
| offset | <code>number</code> | Number of records to skip |
| sort | <code>string</code> | Individuals only: one of `name`, `birthDate` or `lastUpdated`, with a `-` prefix for descending |
| elements | <code>string</code> \| <code>Array.&lt;string&gt;</code> | Only return these fields (individuals and groups) |
| extensions | <code>string</code> \| <code>Array.&lt;string&gt;</code> | Include these extensions (individuals and groups) |


* * *

