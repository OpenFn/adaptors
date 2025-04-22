<dl>
<dt>
    <a href="#createcase">createCase(params, callback)</a></dt>
<dt>
    <a href="#createreferrals">createReferrals(params, callback)</a></dt>
<dt>
    <a href="#getcases">getCases(query, options, callback)</a></dt>
<dt>
    <a href="#getforms">getForms(query, callback)</a></dt>
<dt>
    <a href="#getlocations">getLocations(query, callback)</a></dt>
<dt>
    <a href="#getlookups">getLookups(query, callback)</a></dt>
<dt>
    <a href="#getreferrals">getReferrals(params, callback)</a></dt>
<dt>
    <a href="#updatecase">updateCase(id, params, callback)</a></dt>
<dt>
    <a href="#updatereferral">updateReferral(params, callback)</a></dt>
<dt>
    <a href="#upsertcase">upsertCase(params, callback)</a></dt>
</dl>

This adaptor exports the following namespaced functions:

<dl>
<dt>
    <a href="#http_get">http.get(path, [options])</a>
</dt>

<dt>
    <a href="#http_patch">http.patch(path, data, [options])</a>
</dt>

<dt>
    <a href="#http_post">http.post(path, data, [options])</a>
</dt>
</dl>


## Functions
### createCase

<p><code>createCase(params, callback) ⇒ Operation</code></p>

Create a new case in Primero

Use this function to create a new case in Primero based on a set of Data.


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | an object with some case data. |
| callback | <code>function</code> | (Optional) Callback function |

**Example:** Create a new case in Primero based on a set of Data
```js
createCase({
  data: {
    age: 16,
    sex: "female",
    name: "Edwine Edgemont",
  },
});
```

* * *

### createReferrals

<p><code>createReferrals(params, callback) ⇒ Operation</code></p>

Create referrals in Primero

Use this function to bulk refer to one or multiple cases from Primero to a single user


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | an object with referral data. |
| callback | <code>function</code> | (Optional) Callback function |

**Example:** Create referrals for multiple cases in Primero
```js
createReferrals({
  data: {
    ids: [
      "749e9c6e-60db-45ec-8f5a-69da7c223a79",
      "dcea6052-07d9-4cfa-9abf-9a36987cdd25",
    ],
    transitioned_to: "primero_cp",
    notes: "This is a bulk referral",
  },
});
```

* * *

### getCases

<p><code>getCases(query, options, callback) ⇒ Operation</code></p>

Use this function to get cases from Primero based on a set of query parameters.
Note that in many implementations, the `remote` attribute should be set to `true` to ensure that only cases marked for remote access will be retrieved.
Set `case_id` on the query object to fetch a specific case.


| Param | Type | Description |
| --- | --- | --- |
| query | <code>object</code> | Query parameters to send to primero, which will be built into URL parameters. See [Primero Docs](https://github.com/primeroIMS/primero/blob/master/doc/api/cases/get.md) for a list of valid parameters. |
| options | <code>object</code> | (Optional) Additional options |
| options.withReferrals | <code>boolean</code> | Set to true to include referrals with each case. This will generate an extra request for each case and may take some time to process. |
| callback | <code>function</code> | (Optional) Callback function |

**Example:** Fetch all cases
```js
getCases();
```
**Example:** Fetch all cases which match query criteria
```js
getCases({
  remote: true,
  sex: "male",
  age: "10..15",
  protection_concerns :"unaccompanied,separated",
});
```
**Example:** Fetch a specific case by id
```js
getCases({
  case_id: "6aeaa66a-5a92-4ff5-bf7a-e59cde07eaaz",
});
```
**Example:** Get all remote cases and their referrals
```js
getCases(
 { remote: true },
 { withReferrals: true }
);
```

* * *

### getForms

<p><code>getForms(query, callback) ⇒ Operation</code></p>

Get forms from Primero

Use this function to get forms from Primero that are accessible to this user based on a set of query parameters.
The user can filter the form list by record type and module.


| Param | Type | Description |
| --- | --- | --- |
| query | <code>object</code> | an object with a query param at minimum |
| callback | <code>function</code> | (Optional) Callback function |

**Example:** Get the list of all forms
```js
getForms();
```
**Example:** Get the list of all forms for a specific module
```js
getForms({
  module_id: "6aeaa66a-5a92-4ff5-bf7a-e59cde07eaaz",
});
```

* * *

### getLocations

<p><code>getLocations(query, callback) ⇒ Operation</code></p>

Get locations from Primero

Use this function to get a paginated list of all locations that are accessible to this user from Primero.
Note: You can specify a `per` value to fetch records per page(Defaults to 20).
Also you can specify `page` value to fetch pagination (Defaults to 1).
Another parameter is `hierarchy: true` (Defaults to false)


| Param | Type | Description |
| --- | --- | --- |
| query | <code>object</code> | an object with a query param at minimum |
| callback | <code>function</code> | (Optional) Callback function |

**Example:** Get loocations from Primero with query parameters
```js
getLocations({
  page: 1,
  per: 20
})
```

* * *

### getLookups

<p><code>getLookups(query, callback) ⇒ Operation</code></p>

Get lookups from Primero

Use this function to get a paginated list of all lookups that are accessible to this user from Primero.
Note: You can specify a `per` value to fetch records per page(Defaults to 20).
Also you can specify `page` value to fetch pagination (Defaults to 1)


| Param | Type | Description |
| --- | --- | --- |
| query | <code>object</code> | an object with a query param at minimum |
| callback | <code>function</code> | (Optional) Callback function |

**Example:** Get lookups from Primero with query parameters
```js
getLookups({
  per: 10000,
  page: 5
});
```

* * *

### getReferrals

<p><code>getReferrals(params, callback) ⇒ Operation</code></p>

Get referrals for a specific case in Primero

Use this function to get the list of referrals of one case from Primero.
The search can be done using either `record id` or `case id`.


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | an object with an externalId field to select the attribute to use for matching on case and an externalId value for that case. |
| callback | <code>function</code> | (Optional) Callback function |

**Example:** Get referrals for a case in Primero by record id
```js
getReferrals({
  externalId: "record_id",
  id: "6aeaa66a-5a92-4ff5-bf7a-e59cde07eaaz",
});
```
**Example:** Get referrals for a case in Primero by case id
```js
 getReferrals({
  id: "6aeaa66a-5a92-4ff5-bf7a-e59cde07eaaz",
});
```

* * *

### updateCase

<p><code>updateCase(id, params, callback) ⇒ Operation</code></p>

Update an existing case in Primero

Use this function to update an existing case from Primero.
In this implementation, the function uses a case ID to check for the case to update,
Then merge the values submitted in this call into an existing case.
Fields not specified in this request will not be modified.
For nested subform fields, the subform arrays will be recursively merged,
keeping both the existing values and appending the new


| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | A case ID to use for the update. |
| params | <code>object</code> | an object with some case data. |
| callback | <code>function</code> | (Optional) Callback function |

**Example:** Update case for a specific case id
```js
updateCase("6aeaa66a-5a92-4ff5-bf7a-e59cde07eaaz", {
  data: {
    age: 16,
    sex: "female",
    name: "Fiona Edgemont",
  },
});
```

* * *

### updateReferral

<p><code>updateReferral(params, callback) ⇒ Operation</code></p>

Update a single referral for a specific case in Primero


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | an object with an caseExternalId value to use, the id and the referral id to update. |
| callback | <code>function</code> | (Optional) Callback function |

**Example:** Update referral by record id
```js
updateReferral({
  caseExternalId: "record_id",
  id: "749e9c6e-60db-45ec-8f5a-69da7c223a79",
  caseId: "dcea6052-07d9-4cfa-9abf-9a36987cdd25",
  data: (state) => state.data,
});
```

* * *

### upsertCase

<p><code>upsertCase(params, callback) ⇒ Operation</code></p>

Upsert case to Primero

Use this function to update an existing case from Primero or to create it otherwise.
In this implementation, we first fetch the list of cases,
then we check if the case exist before choosing the right operation to do.


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | an object with an externalIds and some case data. |
| callback | <code>function</code> | (Optional) Callback function |

**Example:** Upsert case for a specific case id
```js
upsertCase({
  externalIds: ["case_id"],
  data: state => ({
    age: 20,
    sex: "male",
    name: "Alex",
    status: "open",
    case_id: "6aeaa66a-5a92-4ff5-bf7a-e59cde07eaaz",
  }),
});
```

* * *


## http

These functions belong to the http namespace.
### http.get {#http_get}

<p><code>get(path, [options]) ⇒ Operation</code></p>

Make a GET request to any Primero endpoint.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>string</code> |  | Path to the resource. |
| [options] | [<code>RequestOptions</code>](#requestoptions) | <code>{}</code> | An object containing query params and headers for the request |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the Primero server (excluding the body). Responses will be returned in JSON format |
| references | An array of all previous data objects used in the Job |
**Example:** GET all cases
```js
http.get('/cases');
```

* * *


### http.patch {#http_patch}

<p><code>patch(path, data, [options]) ⇒ Operation</code></p>

Make a PATCH request to Primero


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>string</code> |  | Path to the resource. |
| data | <code>object</code> |  | the body data in JSON format. |
| [options] | [<code>RequestOptions</code>](#requestoptions) | <code>{}</code> | An object containing query params and headers for the request |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the Primero server (excluding the body). Responses will be returned in JSON format |
| references | An array of all previous data objects used in the Job |
**Example:** Update a single case resource 
```js
http.patch('cases/344f3c08-affc-4d8a-b4d3-925b9f4d2867', {
  age: 17,
  sex: "female",
  name: "Edwine Edgemont",
 });
```

* * *


### http.post {#http_post}

<p><code>post(path, data, [options]) ⇒ Operation</code></p>

Make a POST request to any Primero endpoint.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>string</code> |  | Path to the resource. |
| data | <code>object</code> |  | the body data in JSON format. |
| [options] | [<code>RequestOptions</code>](#requestoptions) | <code>{}</code> | An object containing query params and headers for the request |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the Primero server (excluding the body). Responses will be returned in JSON format |
| references | An array of all previous data objects used in the Job |
**Example:** POST a case to Primero
```js
http.post('cases',{
    age: 16,
    sex: "female",
    name: "Edwine Edgemont",
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
| [parseAs] | <code>string</code> | <code>&quot;&#x27;json&#x27;&quot;</code> | The response format to parse (e.g., 'json', 'text', or 'stream') |


* * *

