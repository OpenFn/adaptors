## Functions

<dl>
<dt><a href="#execute">execute(operations)</a> ⇒ <code>Operation</code></dt>
<dd><p>Execute a sequence of operations.
Wraps <code>@openfn/language-common/execute</code>, and prepends initial state for magpi.</p>
</dd>
<dt><a href="#fetchSurveyData">fetchSurveyData(params)</a> ⇒ <code>Operation</code></dt>
<dd><p>Make a POST request to fetch Magpi data and POST it somewhere else</p>
</dd>
<dt><a href="#submitRecord">submitRecord(jsonData)</a> ⇒ <code>Operation</code></dt>
<dd><p>Submit a record for a form/survey which already exists in a Magpi user account</p>
</dd>
</dl>

<a name="execute"></a>

## execute(operations) ⇒ <code>Operation</code>
Execute a sequence of operations.
Wraps `@openfn/language-common/execute`, and prepends initial state for magpi.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| operations | <code>Operations</code> | Operations to be performed. |

**Example**  
```js
execute(
  create('foo'),
  delete('bar')
)(state)
```
<a name="fetchSurveyData"></a>

## fetchSurveyData(params) ⇒ <code>Operation</code>
Make a POST request to fetch Magpi data and POST it somewhere else

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | data to make the fetch |

**Example**  
```js
fetchSurveyData({
 "surveyId": "37479",
 "afterDate": "2017-09-27",
 "postUrl": "https://www.openfn.org/inbox/your-inbox-url"
})
```
<a name="submitRecord"></a>

## submitRecord(jsonData) ⇒ <code>Operation</code>
Submit a record for a form/survey which already exists in a Magpi user account

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| jsonData | <code>object</code> | Payload data for the record |

**Example**  
```js
submitRecord(jsonData)
```
