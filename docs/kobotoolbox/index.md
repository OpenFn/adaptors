## Functions

<dl>
<dt><a href="#getDeploymentInfo">getDeploymentInfo(params, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Get deployment information for a specific form</p>
</dd>
<dt><a href="#getForms">getForms(params, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Make a request to get the list of forms</p>
</dd>
<dt><a href="#getSubmissions">getSubmissions(params, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Get submissions for a specific form</p>
</dd>
</dl>

<a name="getDeploymentInfo"></a>

## getDeploymentInfo(params, callback) ⇒ <code>Operation</code>
Get deployment information for a specific form

**Kind**: global function  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>params</td><td><code>object</code></td><td><p>Form Id and data to make the fetch or filter</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>(Optional) Callback function to execute after fetching form deployment information</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
getDeploymentInfo({formId: 'aXecHjmbATuF6iGFmvBLBX'}, state => {
  console.log(state.data);
  return state;
});
```

* * *

<a name="getForms"></a>

## getForms(params, callback) ⇒ <code>Operation</code>
Make a request to get the list of forms

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
    <td>params</td><td><code>object</code></td><td><p>Query, Headers and Authentication parameters</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>(Optional) Callback function to execute after fetching form list</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
getForms({}, state => {
   console.log(state.data);
   return state;
});
```

* * *

<a name="getSubmissions"></a>

## getSubmissions(params, callback) ⇒ <code>Operation</code>
Get submissions for a specific form

**Kind**: global function  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>params</td><td><code>object</code></td><td><p>Form Id and data to make the fetch or filter</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>(Optional) Callback function to execute after fetching form submissions</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
getSubmissions({formId: 'aXecHjmbATuF6iGFmvBLBX'}, state => {
  console.log(state.data);
  return state;
});
```

* * *

