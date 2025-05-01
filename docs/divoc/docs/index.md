<dl>
<dt>
    <a href="#certifyvaccination">certifyVaccination(data)</a></dt>
</dl>


This adaptor exports the following from common:
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
    <a href="/adaptors/packages/common-docs#datefns">dateFns</a>
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
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt></dl>

## Functions
### certifyVaccination

<p><code>certifyVaccination(data) ⇒ Operation</code></p>

Certify a vaccination


| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | Vaccinationobject |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The response body (as JSON) |
| response | The HTTP response from the DIVOC server (excluding the body) |
| references | An array of the previous data object used in the job |
**Example:** Certify a vaccination object
```js
certifyVaccination({
        "preEnrollmentCode": "string",
        "recipient": {
            "name": "string",
            "dob": "2025-03-20",
            "age": "string",
            "gender": "string",
            "nationality": "string",
            "identity": "string",
            "contact": [
                "string"
            ],
            "address": {
                "addressLine1": "string",
                "addressLine2": "string",
                "district": "string",
                "state": "string",
                "pincode": 0
            }
        },
        "vaccination": {
            "name": "string",
            "batch": "string",
            "manufacturer": "string",
            "date": "2025-03-20T06:08:22.394Z",
            "effectiveStart": "2025-03-20",
            "effectiveUntil": "2025-03-20",
            "dose": 1,
            "totalDoses": 2
        },
        "vaccinator": {
            "name": "string"
        },
        "facility": {
            "name": "string",
            "address": {
                "addressLine1": "string",
                "addressLine2": "string",
                "district": "string",
                "state": "string",
                "pincode": 0
            }
        },
        "meta": {}
    });
  
```

* * *


