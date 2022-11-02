<img src="https://user-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/195711/_IMS-logos_all_TM-02_vagcfc.png" height="100">

# language-primero [<img src="https://avatars2.githubusercontent.com/u/9555108?s=200&v=4)" alt="alt text" height="20">](https://www.openfn.org)

An OpenFn **_adaptor_** for building integration jobs for use with UNICEF's
Primero API.

**See Update Docs Site: https://openfn.github.io/language-primero/ **

## Primero API Versions

### Adaptor for Primero v2.0

This documentation outlines the functions available for Primero `v2.0` in the
main branch. The API documentation is available at:
https://github.com/primeroIMS/primero/tree/development_v2/app/controllers/api

### Adaptor for Primero v1.0 still available on the `v1` branch.

`v1.0.7` of this adaptor was built for the Primero `v1.1` API:
https://github.com/OpenFn/language-primero/blob/v1/README.md

[Primero API v1.1 Documentation](https://docs.google.com/document/d/1jpaT2_UBBnc3PxPYlLMBEzNUkyfuxRZiksywG5MKM0Q/edit)

#### Primero Authentication Strategies

The Primero team is considering a shift to Microsoft Azure Active Directory B2C
for auth. We can likely accommodate this with a similar pattern as has been used
in our Microsoft Dynamics, Github, or Google Sheets adaptors, but we'll need to
await final doucmentation for Primero's `v2` API before making changes.

[Azure Active Directory B2C](https://docs.microsoft.com/en-us/azure/active-directory-b2c/)

## Technical Documentation

### Sample configuration

```json
{
  "user": "admin",
  "password": "admin",
  "url": "https://some-primero-instance.unicef.org",
  "basicAuth": false
}
```

### Get cases from Primero with query parameters

Use this function to get cases from Primero based on a set of query parameters.
Note that in many implementations, the `remote` attribute should be set to
`true` to ensure that only cases marked for remote access will be retrieved. You
can specify a case_id value to fetch a unique case and a query string to filter
result.

```js
getCases(
  {
    remote: true,
    query: 'sex=male',
  },
  state => {
    console.log('Here is the callback.');
    return state;
  }
);
```

```js
getCases(
  {
    remote: true,
    case_id: '6aeaa66a-5a92-4ff5-bf7a-e59cde07eaaz',
  },
  state => {
    console.log('We are fetching a unique case id');
    return state;
  }
);
```

### Get forms from Primero with query parameters

Use this function to get forms from Primero that are accessible to this user
based on a set of query parameters. The user can filter the form list by record
type and module.

```js
getForms(state => {
  console.log('We are fetching forms from Primero for this user');
  return state;
});
```

```js
getForms(
  {
    module_id: '6aeaa66a-5a92-4ff5-bf7a-e59cde07eaaz',
  },
  state => {
    console.log('We are fetching a unique form using module_id');
    return state;
  }
);
```

### Get lookups from Primero with query parameters

Use this function to get a paginated list of all lookups that are accessible to
this user from Primero.

Note: You can specify a `per` value to fetch records per page(Defaults to 20).
Also you can specify `page` value to fetch pagination (Defaults to 1)

```js
getLookups(
  {
    per: 10000,
    page: 1,
  },
  state => {
    console.log('Here is the callback.');
    return state;
  }
);
```

### Get loocations from Primero with query parameters

Use this function to get a paginated list of all locations that are accessible
to this user from Primero. Note: You can specify a `per` value to fetch records
per page(Defaults to 20). Also you can specify `page` value to fetch pagination
(Defaults to 1). Another parameter is `hierarchy: true` (Defaults to false)

```js
getLocations(
  {
    per: 100000,
  },
  state => {
    console.log('Here is the callback.');
    return state;
  }
);
```

### Create a new case in Primero

Use this function to insert a new case in Primero based on a set of Data.

```js
createCase(
  {
    data: state => ({
      remote: true,
      enabled: true,
      age: 15,
      sex: 'male',
      name: 'Alex',
      status: 'open',
      case_id: '6aeaa66a-5a92-4ff5-bf7a-e59cde07eaaz',
      child: {
        date_of_birth: "2020-01-02",
        ...,
        services_section: [ ... ],
        transitions: [ ... ]
      },
    })
  }
);
```

### Update case with query Parameters

Use this function to update an existing case from Primero. In this
implementation, the function uses an ID to check for the case to update.

```js
updateCase(
    "case_id", {
    data: {
      remote: true,
      oscar_number: c.oscar_number,
      case_id: c.case_id,
      child: {
        date_of_birth: "2020-01-02",
        ...,
        services_section: [ ... ],
        transitions: [ ... ]
      },
    }
  }
);
```

### Update or Insert a case with query Parameters

Use this function to update an existing case from Primero or to insert it
otherwise. In this implementation, we first fetch the list of cases, then we
check if the case exist before choosing the right operation to do.

```js
upsertCase(
  {
    externalIds: ["case_id"],
    data: {
      remote: true,
      oscar_number: c.oscar_number,
      case_id: c.case_id,
      child: {
        date_of_birth: "2020-01-02",
        ...,
        services_section: [ ... ],
        transitions: [ ... ]
      },
    }
  },
  state => {
    console.log(state.data);
    return state;
  }
);
```

### Get referrals for a case in Primero

Use this function to get the list of referrals of one case from Primero. The
search can be done using either `record id` or `case id`.

```js
getReferrals(
  { externalId: 'case_id' },
  'a59e880e-d58f-4b68-ba6e-e0616a49aefd',
  state => {
    console.log(state.data);
    return state;
  }
);
```

### Create referrals for one or multiple cases in Primero

Use this function to bulk refer to one or multiple cases from Primero

```js
createReferrals(
  {
    data: {
      ids: ['case_id'],
      transitioned_to: 'primero_cp',
      notes: 'Creating a referral',
    },
  },
  state => {
    console.log('Here is the callback.');
    return state;
  }
);
```

### Update referrals for a case in Primero

Use this function to update one referral using the referral_id. The update is
made using either the `record id` or `case id`.

```js
updateReferrals(
  {
    externalId: 'case_id',
    id: '2a2cc932-4b6f-43a6-928d-40fc9949eb02',
    referral_id: 'c377bcb2-122d-46ee-a861-869e1b6476cd',
    data: {
      status: 'accepted',
      id: '4c58d02f-3182-4006-b2fe-96aa797f5ee7',
      type: 'Referral',
      record_type: 'case',
    },
  },
  state => {
    console.log(state.data);
    return state;
  }
);
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
