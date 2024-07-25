<dl>
<dt>
    <a href="#createfhirresource">createFhirResource([fhirStore], resource, callback)</a></dt>
</dl>


This adaptor exports the following from common:
<dl>
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
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt></dl>

## Functions
### createFhirResource

<p><code>createFhirResource([fhirStore], resource, callback) ⇒ Operation</code></p>

Create some resource in Google Cloud Healthcare


| Param | Type | Description |
| --- | --- | --- |
| [fhirStore] | <code>Object</code> | The FHIR store information.    - `cloudRegion` (string): The cloud region where the FHIR store is located.    - `projectId` (string): The ID of the project that contains the FHIR store.    - `datasetId` (string): The ID of the dataset that contains the FHIR store.    - `fhirStoreId` (string): The ID of the FHIR store. |
| resource | <code>object</code> | The FHIR resource data to be created |
| callback | <code>function</code> | An optional callback function |

**Example**
```js
createFhirResource(
  {
    cloudRegion: "us-central1",
    projectId: "adjective-noun-123",
    datasetId: "my-dataset",
    fhirStoreId: "my-fhir-store",
  },
  {
    resourceType: "Patient",
    name: [{ use: "official", family: "Smith", given: ["Darcy"] }],
    gender: "female",
    birthDate: "1970-01-01",
  }
);
```
**Example**
```js
createFhirResource(
  {
    cloudRegion: "us-central1",
    projectId: "adjective-noun-123",
    datasetId: "my-dataset",
    fhirStoreId: "my-fhir-store",
  },
  (state) => ({
    resourceType: "Encounter",
    status: "finished",
    class: {
      system: "http://hl7.org/fhir/v3/ActCode",
      code: "IMP",
      display: "inpatient encounter",
    },
    reasonCode: [
      {
        text: "The patient had an abnormal heart rate. She was concerned about this.",
      },
    ],
    subject: {
      reference: `Patient/${state.data.id}`,
    },
  })
);
```

* * *


