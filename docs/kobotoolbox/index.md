## Functions

<dl>
<dt>
    <a href="#getDeploymentInfo">getDeploymentInfo(params, callback)</a></dt>
<dt>
    <a href="#getForms">getForms(params, callback)</a></dt>
<dt>
    <a href="#getSubmissions">getSubmissions(params, callback)</a></dt>
</dl>

## getDeploymentInfo

getDeploymentInfo(params, callback) ⇒ <code>Operation</code>
Get deployment information for a specific form

**Kind**: global function  

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

**Kind**: global function  
**Access**: public  

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

**Kind**: global function  

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

