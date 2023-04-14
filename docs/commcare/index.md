## Functions

<dl>
<dt><a href="#clientPost">clientPost(formData)</a> ⇒ <code>State</code></dt>
<dd><p>Performs a post request</p>
</dd>
<dt><a href="#fetchReportData">fetchReportData(reportId, params, postUrl)</a> ⇒ <code>Operation</code></dt>
<dd><p>Make a GET request to CommCare&#39;s Reports API
and POST the response to somewhere else.</p>
</dd>
<dt><a href="#submit">submit(formData)</a> ⇒ <code>Operation</code></dt>
<dd><p>Submit form data</p>
</dd>
<dt><a href="#submitXls">submitXls(formData, params)</a> ⇒ <code>Operation</code></dt>
<dd><p>Convert form data to xls then submit.</p>
</dd>
</dl>

<a name="clientPost"></a>

## clientPost(formData) ⇒ <code>State</code>
Performs a post request

**Kind**: global function  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>formData</td><td><code>Object</code></td><td><p>Form Data with auth params and body</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
clientPost(formData)
```

* * *

<a name="fetchReportData"></a>

## fetchReportData(reportId, params, postUrl) ⇒ <code>Operation</code>
Make a GET request to CommCare's Reports API
and POST the response to somewhere else.

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
    <td>reportId</td><td><code>String</code></td><td><p>API name of the report.</p>
</td>
    </tr><tr>
    <td>params</td><td><code>Object</code></td><td><p>Query params, incl: limit, offset, and custom report filters.</p>
</td>
    </tr><tr>
    <td>postUrl</td><td><code>String</code></td><td><p>Url to which the response object will be posted.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
fetchReportData(reportId, params, postUrl)
```

* * *

<a name="submit"></a>

## submit(formData) ⇒ <code>Operation</code>
Submit form data

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
    <td>formData</td><td><code>Object</code></td><td><p>Object including form data.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
submit(
   fields(
     field("@", function(state) {
       return {
         "xmlns": "http://openrosa.org/formdesigner/form-id-here"
       };
     }),
     field("question1", dataValue("answer1")),
     field("question2", "Some answer here.")
   )
 )
```

* * *

<a name="submitXls"></a>

## submitXls(formData, params) ⇒ <code>Operation</code>
Convert form data to xls then submit.

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
    <td>formData</td><td><code>Object</code></td><td><p>Object including form data.</p>
</td>
    </tr><tr>
    <td>params</td><td><code>Object</code></td><td><p>Request params including case type and external id.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
submitXls(
   [
     {name: 'Mamadou', phone: '000000'},
   ],
   {
     case_type: 'student',
     search_field: 'external_id',
     create_new_cases: 'on',
   }
)
```

* * *

