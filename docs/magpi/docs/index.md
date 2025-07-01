<dl>
<dt>
    <a href="#fetchsurveydata">fetchSurveyData(params)</a></dt>
<dt>
    <a href="#submitrecord">submitRecord(jsonData)</a></dt>
</dl>


This adaptor exports the following from common:
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

## Functions
### fetchSurveyData

<p><code>fetchSurveyData(params) ⇒ Operation</code></p>

Make a POST request to fetch Magpi data and POST it somewhere else


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

### submitRecord

<p><code>submitRecord(jsonData) ⇒ Operation</code></p>

Submit a record for a form/survey which already exists in a Magpi user account


| Param | Type | Description |
| --- | --- | --- |
| jsonData | <code>object</code> | Payload data for the record |


**Example**
```js
submitRecord(jsonData)
```

* * *


