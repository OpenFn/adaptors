## Functions

<dl>
<dt>
    <a href="#get">get(path, params, headers, [callback])</a></dt>
<dt>
    <a href="#getforms">getForms(projectId, [callback])</a></dt>
<dt>
    <a href="#getsubmissions">getSubmissions(projectId, xmlFormId, [callback])</a></dt>
<dt>
    <a href="#post">post(path, data, params, [callback])</a></dt>
<dt>
    <a href="#request">request(method, path, data, params, [callback])</a></dt>
</dl>

The following functions are exported from the common adaptor:
<dl>
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
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt></dl>

## get

get(path, params, headers, [callback]) ⇒ <code>Operation</code>

Make a GET request


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| params | <code>Object</code> | Optional request params |
| headers | <code>Object</code> | Optional request headers |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example**  
```js
get("v1/projects");
```

* * *

## getForms

getForms(projectId, [callback]) ⇒ <code>Operation</code>

Make a GET request


| Param | Type | Description |
| --- | --- | --- |
| projectId | <code>number</code> | Id of the project you want to get its forms |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example**  
```js
getForms(22);
```

* * *

## getSubmissions

getSubmissions(projectId, xmlFormId, [callback]) ⇒ <code>Operation</code>

Make a GET request


| Param | Type | Description |
| --- | --- | --- |
| projectId | <code>number</code> | Id of the project you want to get its forms submissions |
| xmlFormId | <code>string</code> | Id of the form you want to get its submissions |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example**  
```js
getSubmissions(22, 'test');
```

* * *

## post

post(path, data, params, [callback]) ⇒ <code>Operation</code>

Make a POST request


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| data | <code>object</code> | Object which will be attached to the POST body |
| params | <code>Object</code> | Optional request params |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example**  
```js
post('v1/projects', { name: 'Project Name' });
```

* * *

## request

request(method, path, data, params, [callback]) ⇒ <code>Operation</code>

Make a general HTTP request


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | HTTP method to use |
| path | <code>string</code> | Path to resource |
| data | <code>object</code> | Object which will be attached to the POST body |
| params | <code>Object</code> | Optional request params |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example**  
```js
request("POST", 'v1/projects', { name: 'Project Name' });
```

* * *

