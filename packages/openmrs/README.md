# Language OpenMRS [![Build Status](https://travis-ci.org/OpenFn/language-openmrs.svg?branch=master)](https://travis-ci.org/OpenFn/language-openmrs)

Language Pack for building expressions and operations for working with
the [OpenMRS API](https://wiki.openmrs.org/display/docs/API).

[OpenMRS Data Model Explorer](http://burkeware.com/openmrs-data-model/openmrs-data-model-1.11.html#)

## Documentation

### Sample configuration

```json
{
  "instanceUrl": "http://openmrs.com/instance/url",
  "username": "admin@openmrs",
  "password": "supersecretopenmrspassword"
}
```

### Get a patient by some criteria

```js
// getPatient({ uuid: '516af9aa-0402-4e11-ad79-e394fdec0c91' });
// getPatient({ uuid: dataValue('patientId')(state) });
getPatient({
  uuid: (state) => state.data[0].uuid,
});
```
#### Example of searching for patients based on their `EMR Id`
```js
getPatients(
  {
    identifier: state => state.data.emrId,
    v: 'full',
  },
  {
    exactlyOne: true,
  }
);
```
### Create an Encounter
```js
createEncounter({
  encounterDatetime: dataValue('visit_date'), //dynamically fill with source app data
  patient: dataValue('uuid'), 
  encounterType: dataValue('visit_type'),
  location: dataValue('location.uuid'),
  encounterProviders: [
    {
      provider: dataValue('provider_name'),
      encounterRole: '240b26f9-dd88-4172-823d-4a8bfeb7841f', //hardcoded value
    },
  ],
});
```

### Make a request to any OpenMRS endpoint

```js
req({ method: 'GET', url: '/ws/rest/v1/concept' }, (state) => {
  console.log(JSON.stringify(state, null, 2));
  return state;
});
```

<!-- ## Create new person

```js
person(
  fields(
    field("gender", "M"),
    field("names", function(state) {
      return [{
        "givenName": dataValue("form.first_name")(state),
        "familyName": dataValue("form.last_name")(state)
      }]
    })
  )
)
```-->

## Create new patient

```js
patient(
  fields(
    field("gender", "M"),
    field("names", function(state) {
      return [{
        "patient_id": dataValue("form.patientId")(state),
        "creator": dataValue("form.user")(state)
      }]
    })
  )
)
``` 


## Development

Clone the repo, run `npm install`.

Run tests using `npm run test` or `npm run test:watch`

Build the project using `make`.
