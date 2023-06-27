## createFhirResource

createFhirResource(resource, callback) ⇒ <code>Operation</code>
Create some resource in Google Cloud Healthcare

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| resource | <code>object</code> | The data to create the new resource |
| callback | <code>function</code> | An optional callback function |

**Example**  
```js
createFhirResource({
  name: [{ use: "official", family: "Smith", given: ["Darcy"] }],
  gender: "female",
  birthDate: "1970-01-01",
  resourceType: "Patient",
});
```
**Example**  
```js
createFhirResource(state => ({
 resourceType: 'Encounter',
 status: 'finished',
 class: {
   system: 'http://hl7.org/fhir/v3/ActCode',
   code: 'IMP',
   display: 'inpatient encounter',
 },
 reasonCode: [
   {
     text: 'The patient had an abnormal heart rate. She was concerned about this.',
   },
 ],
 subject: {
   reference: `Patient/${state.data.id}`,
 },
}));
```

* * *

