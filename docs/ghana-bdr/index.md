<dl>
<dt>
    <a href="#createbirthrecord">createBirthRecord(data)</a></dt>
<dt>
    <a href="#get">get(path, query)</a></dt>
<dt>
    <a href="#post">post(path, data)</a></dt>
<dt>
    <a href="#request">request(method, path, [body], [options])</a></dt>
</dl>


This adaptor exports the following from common:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#combine">combine()</a>
</dt>
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
    <a href="/adaptors/packages/common-docs#fnif">fnIf()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#log">log()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt></dl>

## Functions
### createBirthRecord

<p><code>createBirthRecord(data) ⇒ Operation</code></p>

Create a birth record. `child_file_birth_evidence_data` takes an array of
base64-encoded data URIs (truncated in the example below).


| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | body data to append to the request. JSON will be converted to a string. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example:** Create a birth record from data on state
```js
createBirthRecord($.data);
```
**Example:** Create a birth record with a full payload
```js
createBirthRecord({
  status: "COMPLETE",
  region_id: 4348,
  district_id: 338,
  type_of_birth: "SINGLETON",
  informant_type: "MOTHER",
  informant_national_id_type: "GHANA CARD",
  informant_national_id_number: "34454344",
  informant_first_name: "David",
  informant_middle_name: "",
  informant_last_name: "Godson",
  informant_region_id: 4348,
  informant_district_id: 338,
  informant_residential_address: "Dansoman",
  informant_phone_number: "2335648498309",
  child_first_name: "Francis",
  child_middle_name: "",
  child_last_name: "Benzoic",
  child_gender: "MALE",
  child_dob: "2025-06-26",
  child_place_of_birth: "HOSPITAL",
  child_birth_attendant: "MID-WIFE",
  child_birth_institution: "Ludra Hospital",
  child_town: "Ashaiman",
  child_house_no: "H/F286",
  child_street_name: "Ashaiman Newtown",
  mother_national_id_type: "GHANA CARD",
  mother_national_id_number: "32432423433",
  mother_phone_number: "2335456823893",
  mother_first_name: "Adwoa",
  mother_middle_name: "",
  mother_last_name: "Godson",
  mother_age: 30,
  mother_marital_status: "MARRIED",
  mother_previous_birth_no: 50,
  mother_occupation: "teacher",
  mother_educational_level: "DIPLOMA",
  mother_region_id: 4348,
  mother_district_id: 338,
  mother_town: "Accra",
  mother_religion: "CHRISTIAN",
  mother_residence: "Tamale",
  mother_nationality: "GHANA",
  doubtful_maternity: 0,
  father_national_id_type: "GHANA CARD",
  father_national_id_number: "32432423433",
  father_phone_number: "233548791223",
  father_first_name: "David",
  father_middle_name: "",
  father_last_name: "Godson",
  father_age: 33,
  father_marital_status: "MARRIED",
  father_children_no: 5,
  father_occupation: "Doctor",
  father_educational_level: "DIPLOMA",
  father_region_id: 4348,
  father_district_id: 338,
  father_town: "Tema",
  father_residence: "Tema",
  father_nationality: "GHANA",
  father_religion: "CHRISTIAN",
  doubtful_paternity: 0,
  child_file_birth_evidence_name: ["Physics.jpg"],
  child_file_birth_evidence_data: ["data:image/jpeg;base64,/9j/4QAYRXhpZg..."]
})
```

* * *

### get

<p><code>get(path, query) ⇒ Operation</code></p>

Make a GET request


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| query | <code>object</code> | An object of query parameters to be encoded into the URL. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example**
```js
get("patient");
```

* * *

### post

<p><code>post(path, data) ⇒ Operation</code></p>

Make a POST request


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| data | <code>object</code> | body data to append to the request. JSON will be converted to a string (but a content-type header will not be attached to the request). |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example**
```js
post("patient", { "name":"Bukayo" });
```

* * *

### request

<p><code>request(method, path, [body], [options]) ⇒ Operation</code></p>

Make a general HTTP request to the BDR API


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | HTTP method to use |
| path | <code>string</code> | Path to resource |
| [body] | <code>object</code> | Object which will be attached to the request body |
| [options] | <code>object</code> | Optional request options, e.g. query and headers |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |

**Example**
```js
request("POST", "/api/v1/UserManagementService/integrations/utility", {
  type: "regions",
});
```

* * *


