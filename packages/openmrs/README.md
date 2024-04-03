# Language OpenMRS

Language Pack for building expressions and operations for working with the
[OpenMRS Rest API](https://rest.openmrs.org/?javascript#openmrs-rest-api)

[OpenMRS Data Model Explorer](http://burkeware.com/openmrs-data-model/openmrs-data-model-1.11.html#)

## Documentation

### Configuration

View all the required and optional properties for `state.configuration` in the
official
[configuration-schema](https://docs.openfn.org/adaptors/packages/openmrs-configuration-schema/)
definition.

### Get a patient by some criteria

```js
// getPatient({ uuid: '516af9aa-0402-4e11-ad79-e394fdec0c91' });
// getPatient({ uuid: dataValue('patientId')(state) });
getPatient({
  uuid: state => state.data[0].uuid,
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
get('/ws/rest/v1/patient', { q: 'mohammed' }, state => {
  console.log(JSON.stringify(state, null, 2));
  return state;
});
```

## Create new patient

```js
createPatient(
  fields(
    field('gender', 'M'),
    field('names', function (state) {
      return [
        {
          patient_id: dataValue('form.patientId')(state),
          creator: dataValue('form.user')(state),
        },
      ];
    })
  )
);
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
