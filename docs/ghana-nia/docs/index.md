<dl>
<dt>
    <a href="#get">get(path, query)</a></dt>
<dt>
    <a href="#post">post(path, data)</a></dt>
<dt>
    <a href="#registerchild">registerChild(data)</a></dt>
</dl>


## Functions
### get

<p><code>get(path, query) ⇒ Operation</code></p>

Make a GET request


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| query | <code>object</code> | An object of query parameters to be encoded into the URL. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |
**Example**
```js
get("patient");
```

* * *

### post

<p><code>post(path, data) ⇒ Operation</code></p>

Make a POST request


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| data | <code>object</code> | body data to append to the request. JSON will be converted to a string (but a content-type header will not be attached to the request). |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |
**Example**
```js
post("patient", { "name":"Bukayo" });
```

* * *

### registerChild

<p><code>registerChild(data) ⇒ Operation</code></p>

Generate a national ID


| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | body data to append to the request. JSON will be converted to a string (but a content-type header will not be attached to the request). |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |
**Example**
```js
registerChild({
  babyData: {
    dateOfBirth: "string",
    fatherName: "string",
    forenames: "string",
    gender: "string",
    lightwaveETrackerID: "string",
    motherName: "string",
    noSiblingsInDelivery: "string",
    placeOfBirth: "string",
    surname: "string",
    timeOfbirth: "string",
    weightAtBirth: "string",
    babyPicture: "string"
  },
  personVouching: {
    etrackerLightwaveID: "string",
    ghanaCardPIN: "string",
    relationToBaby: "string",
    relativePhone: "string",
    relativePicture: "string"
  }
})
```

* * *


##  Interfaces

### HttpState

/**
State object

**Properties**

| Name | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |


* * *

