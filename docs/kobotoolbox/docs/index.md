## Functions

<dl>
<dt>
    <a href="#getdeploymentinfo">getDeploymentInfo(params, callback)</a></dt>
<dt>
    <a href="#getforms">getForms(params, callback)</a></dt>
<dt>
    <a href="#getsubmissions">getSubmissions(params, callback)</a></dt>
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

## getDeploymentInfo

getDeploymentInfo(params, callback) ⇒ <code>Operation</code>

Get deployment information for a specific form


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Form Id and data to make the fetch or filter |
| callback | <code>function</code> | (Optional) Callback function to execute after fetching form deployment information |

**Example**  
```js
getDeploymentInfo({formId: 'aXecHjmbATuF6iGFmvBLBX'}, state => {
  console.log(state.data);
  return state;
});
```

* * *

## getForms

getForms(params, callback) ⇒ <code>Operation</code>

Make a request to get the list of forms


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Query, Headers and Authentication parameters |
| callback | <code>function</code> | (Optional) Callback function to execute after fetching form list |

**Example**  
```js
getForms({}, state => {
   console.log(state.data);
   return state;
});
```

* * *

## getSubmissions

getSubmissions(params, callback) ⇒ <code>Operation</code>

Get submissions for a specific form


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Form Id and data to make the fetch or filter |
| callback | <code>function</code> | (Optional) Callback function to execute after fetching form submissions |

**Example**  
```js
getSubmissions({formId: 'aXecHjmbATuF6iGFmvBLBX'}, state => {
  console.log(state.data);
  return state;
});
```

* * *

