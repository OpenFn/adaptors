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

* * *

## submitRecord

submitRecord(jsonData) ⇒ <code>Operation</code>
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

* * *

