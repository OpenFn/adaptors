<dl>
<dt>
    <a href="#createchannel">createChannel(body)</a></dt>
<dt>
    <a href="#createtask">createTask(body)</a></dt>
<dt>
    <a href="#getchannels">getChannels(channelId)</a></dt>
<dt>
    <a href="#getclients">getClients(clientId)</a></dt>
<dt>
    <a href="#gettasks">getTasks(options)</a></dt>
<dt>
    <a href="#gettransactions">getTransactions(options)</a></dt>
<dt>
    <a href="#registerclient">registerClient(body)</a></dt>
<dt>
    <a href="#updateclient">updateClient(body)</a></dt>
</dl>

This adaptor exports the following namespaced functions:

<dl>
<dt>
    <a href="#http_delete">http.delete(path, options)</a>
</dt>

<dt>
    <a href="#http_get">http.get(path, options)</a>
</dt>

<dt>
    <a href="#http_post">http.post(path, body, options)</a>
</dt>

<dt>
    <a href="#http_put">http.put(path, body, options)</a>
</dt>

<dt>
    <a href="#http_request">http.request(method, path, body, options)</a>
</dt>
</dl>


This adaptor exports the following from common:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#as">as()</a>
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
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#map">map()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt></dl>

## Functions
### createChannel

<p><code>createChannel(body) ⇒ Operation</code></p>

Make a request to OpenHIM to create a new channel. See [OpenHIM Channels docs](https://openhim.org/docs/api/channels/create#create-channel)


| Param | Type | Description |
| --- | --- | --- |
| body | <code>object</code> | The channel data to create. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the OpenHIM server, including headers, statusCode, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Create a channel
```js
createChannel({
  type: 'http',
  authType: 'public',
  status: 'enabled',
  routes: [
    {
      name: 'FHIR Server Testing',
      secured: false,
      host: 'localhost',
      port: '3447',
      primary: true,
    },
  ],
  requestBody: true,
  responseBody: true,
  name: 'FHIR Server Testing',
  urlPattern: '^/fhir/.*$',
  methods: [
    'GET',
    'POST',
  ],
});
```

* * *

### createTask

<p><code>createTask(body) ⇒ Operation</code></p>

Make a request to OpenHIM to create a new task


| Param | Type | Description |
| --- | --- | --- |
| body | <code>object</code> | The task data to create. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the OpenHIM server, including headers, statusCode, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Create a task record
```js
createTask({
  tids: [
    '5bb777777bbb66cc5d4444ee',
    '5ceec0bb3ca344f9a30df633',
    '5af732d1cbf94ba88b8f0bc0',
  ],
  batchSize: 2,
  paused: true,
});
```

* * *

### getChannels

<p><code>getChannels(channelId) ⇒ Operation</code></p>

Make a request to OpenHIM to get all channel records


| Param | Type | Description |
| --- | --- | --- |
| channelId | <code>string</code> | Optional channelId to return a specific channel. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the OpenHIM server, including headers, statusCode, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Get all channels
```js
getChannels()
```
**Example:** Get a specific channel
```js
getChannels('67dac5fd70b851d7a26d1274');
```

* * *

### getClients

<p><code>getClients(clientId) ⇒ Operation</code></p>

Make a request to OpenHIM to get all registered client records


| Param | Type | Description |
| --- | --- | --- |
| clientId | <code>string</code> | Optional clientID to return a specific client. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the OpenHIM server, including headers, statusCode, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Get all clients
```js
getClients()
```
**Example:** Get a specific client
```js
getClients('6823172670b851d7a222075a');
```

* * *

### getTasks

<p><code>getTasks(options) ⇒ Operation</code></p>

Make a request to OpenHIM to get all tasks


| Param | Type | Description |
| --- | --- | --- |
| options | [<code>OpenHIMGetTasksOptions</code>](#openhimgettasksoptions) | Required request options for each request. See [OpenHIM Tasks docs](https://openhim.org/docs/api/tasks/read/#read-all-tasks) |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the OpenHIM server, including headers, statusCode, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Get all tasks
```js
getTasks({
  filterLimit: 10,
  filterPage: 0,
  filters: '{}',
});
```
**Example:** Get a specific task
```js
getTasks({
  taskId: '6870fbf470b851d7a22e9f05',
  filterLimit: 10,
  filterPage: 0,
  filters: '{}',
});
```

* * *

### getTransactions

<p><code>getTransactions(options) ⇒ Operation</code></p>

Make a request to OpenHIM to get transactions


| Param | Type | Description |
| --- | --- | --- |
| options | [<code>OpenHIMGetTransactionsOptions</code>](#openhimgettransactionsoptions) | Optional request options. See [OpenHIM Transactions docs](https://openhim.org/docs/api/transactions/read/#read-all-transactions) |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the OpenHIM server, including headers, statusCode, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Get all transactions
```js
getTransactions()
```
**Example:** Get a specific transaction
```js
getTransactions({transactionId:"686f56e070b851d7a21898f5"})
```
**Example:** Get transactions with filters
```js
getTransactions({
  filterLimit: 5,
  filterPage: 0,
  filterRepresentation: 'full',
  filters: '{"response.status":"200"}',
});
```

* * *

### registerClient

<p><code>registerClient(body) ⇒ Operation</code></p>

Make a request to OpenHIM to create a new client record


| Param | Type | Description |
| --- | --- | --- |
| body | <code>object</code> | The client data to register. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the OpenHIM server, including headers, statusCode, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Create a client record
```js
registerClient({
 roles: ['fhir'],
 clientID: 'fhir-server-7',
 name: 'FHIR Server',
 passwordAlgorithm: 'sha512',
 passwordSalt: '3e74a280c568f27241e48e938edf21bf',
 passwordHash:
   '9a5158dc87a25da9d8822d48ed831a88bb4ba7fa636ddb6d6a725f73688546052cb7f2c355758e4839f9416e6cc0e37e1e3070f597af2836d39768a5ecc050db',
});
```

* * *

### updateClient

<p><code>updateClient(body) ⇒ Operation</code></p>

Make a request to OpenHIM to update a client record


| Param | Type | Description |
| --- | --- | --- |
| body | <code>object</code> | The client data to update. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the OpenHIM server, including headers, statusCode, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Update a client record
```js
updateClient({
 _id:'6870c19870b851d7a22b8d27',
 roles: ['fhir', 'testing'],
 clientID: 'fhir-server-7',
 name: 'FHIR Server Testing',
 passwordAlgorithm: 'sha512',
 passwordSalt: '3e74a280c568f27241e48e938edf21bf',
 passwordHash:
   '9a5158dc87a25da9d8822d48ed831a88bb4ba7fa636ddb6d6a725f73688546052cb7f2c355758e4839f9416e6cc0e37e1e3070f597af2836d39768a5ecc050db',
});
```

* * *


## http

These functions belong to the http namespace.
### http.delete {#http_delete}

<p><code>delete(path, options) ⇒ Operation</code></p>

Make a DELETE request to OpenHIM


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource with the id of the resource to delete |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the OpenHIM server, including headers, statusCode, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Delete an existing client
```js
http.delete('/clients/686fb65870b851d7a21d9ca0', {
  parseAs: 'text',
});
```

* * *


### http.get {#http_get}

<p><code>get(path, options) ⇒ Operation</code></p>

Make a GET request to OpenHIM


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the OpenHIM server, including headers, statusCode, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Get all transactions
```js
http.get('/transactions')
```

* * *


### http.post {#http_post}

<p><code>post(path, body, options) ⇒ Operation</code></p>

Make a POST request to OpenHIM


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| body | <code>object</code> | Object which will be attached to the POST body |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the OpenHIM server, including headers, statusCode, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Create a client 
```js
http.post(
  '/clients',
  {
    roles: ['fhir'],
    clientID: 'fhir-server-5',
    name: 'FHIR Server',
    passwordAlgorithm: 'sha512',
    passwordSalt: '3e74a280c568f27241e48e938edf21bf',
    passwordHash:
      '9a5158dc87a25da9d8822d48ed831a88bb4ba7fa636ddb6d6a725f73688546052cb7f2c355758e4839f9416e6cc0e37e1e3070f597af2836d39768a5ecc050db',
  },
  {
    parseAs: 'text',
  }
);
```

* * *


### http.put {#http_put}

<p><code>put(path, body, options) ⇒ Operation</code></p>

Make a PUT request to OpenHIM


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource with the id of the resource to update |
| body | <code>object</code> | Object which will be attached to the PUT body |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the OpenHIM server, including headers, statusCode, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Update an existing client
```js
http.put(
  '/clients/686fb79470b851d7a21dad76',
  {
    _id: '686fb79470b851d7a21dad76',
    roles: ['fhir', 'testing'],
    clientID: 'fhir-server-5',
    name: 'FHIR Server',
    passwordAlgorithm: 'sha512',
    passwordSalt: '3e74a280c568f27241e48e938edf21bf',
    passwordHash:
      '9a5158dc87a25da9d8822d48ed831a88bb4ba7fa636ddb6d6a725f73688546052cb7f2c355758e4839f9416e6cc0e37e1e3070f597af2836d39768a5ecc050db',
  },
  {
    parseAs: 'text',
  }
);
```

* * *


### http.request {#http_request}

<p><code>request(method, path, body, options) ⇒ Operation</code></p>

Make a general HTTP request to OpenHIM


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | HTTP method to use |
| path | <code>string</code> | Path to resource |
| body | <code>object</code> | Object which will be attached to the POST body |
| options | [<code>RequestOptions</code>](#requestoptions) | Optional request options |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the OpenHIM server, including headers, statusCode, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Create a client
```js
http.request(
  'POST',
  '/clients',
  {
    roles: ['fhir'],
    clientID: 'fhir-server-2',
    name: 'FHIR Server',
    passwordAlgorithm: 'sha512',
    passwordSalt: '3e74a280c568f27241e48e938edf21bf',
    passwordHash:
      '9a5158dc87a25da9d8822d48ed831a88bb4ba7fa636ddb6d6a725f73688546052cb7f2c355758e4839f9416e6cc0e37e1e3070f597af2836d39768a5ecc050db',
  },
  {
    parseAs: 'text',
  }
);
```
**Example:** Get all transactions
```js
http.request('GET','/transactions')
```

* * *


##  Interfaces

### OpenHIMGetTasksOptions

Get tasks query options


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| taskId | <code>string</code> | The ID of the task to retrieve. If provided, only this task will be returned. |
| filterLimit | <code>number</code> | The maximum number of tasks to return. Defaults to 100. |
| filterPage | <code>number</code> | The page to return (used in conjunction with filterLimit). |
| filters | <code>object</code> | Advanced filters to apply to the tasks. This is a JSON object that can include properties like `response.status` or `properties.prop`. |


* * *

### OpenHIMGetTransactionsOptions

Get transactions query options


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| transactionId | <code>string</code> | The ID of the transaction to retrieve. If provided, only this transaction will be returned. |
| filterLimit | <code>number</code> | The maximum number of transactions to return. Defaults to 100. |
| filterPage | <code>number</code> | The page to return (used in conjunction with filterLimit). |
| filterRepresentation | <code>object</code> | Determines how much information for a transaction to return. |
| filters | <code>object</code> | Advanced filters to apply to the transactions. This is a JSON object that can include properties like `response.status` or `properties.prop`. |


* * *

### RequestOptions

Options provided to the OpenHIM request


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| body | <code>object</code> \| <code>string</code> | body data to append to the request. JSON will be converted to a string. |
| errors | <code>object</code> | Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code. |
| query | <code>object</code> | An object of query parameters to be encoded into the URL. |
| headers | <code>object</code> | An object of headers to append to the request. |
| parseAs | <code>string</code> | The format to parse the response body as. Defaults to `json`. Accepted values: `json`, `stream`, and `text`. |


* * *

