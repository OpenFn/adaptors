## Functions

<dl>
<dt>
    <a href="#fetchSurveyData">fetchSurveyData(params)</a></dt>
<dt>
    <a href="#submitRecord">submitRecord(jsonData)</a></dt>
</dl>

## fetchSurveyData

fetchSurveyData(params) ⇒ <code>Operation</code>
Make a POST request to fetch Magpi data and POST it somewhere else

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
    <td>params</td><td><code>object</code></td><td><p>data to make the fetch</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
fetchSurveyData({
 "surveyId": "37479",
 "afterDate": "2017-09-27",
 "postUrl": "https://www.openfn.org/inbox/your-inbox-url"
})
```

* * *

## submitRecord

submitRecord(jsonData) ⇒ <code>Operation</code>
Submit a record for a form/survey which already exists in a Magpi user account

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
    <td>jsonData</td><td><code>object</code></td><td><p>Payload data for the record</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
submitRecord(jsonData)
```

* * *

