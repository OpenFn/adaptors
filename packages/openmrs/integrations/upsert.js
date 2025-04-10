const person = {
  names: [
    {
      givenName: 'Peter',
      familyName: 'Parker',
    },
  ],
  gender: 'M',
  birthdate: '2009-09-02',
  addresses: [
    {
      address1: '15 Amfan Ave',
      cityVillage: 'New York',
      country: 'USA',
      postalCode: '560037',
    },
  ],
};

// Set up state to use the public openmrs demo sandbox
fn(state => {
  state.configuration = {
    instanceUrl: 'https://o3.openmrs.org/openmrs',
    username: 'admin',
    password: 'Admin123',
  };

  state.uuid = util.uuid();

  return state;
});

fn(state => {
  console.log('Creating new person');
  return state;
});

// Create a new person
upsert(`person/${$.uuid}`, person).then(state => {
  state.uuid = state.data.uuid;
  console.log('Person should have been created new!');
  console.log(state.data);
  console.log('---');

  state.newName = util.uuid();
  return state;
});

fn(state => {
  console.log('Updating person with unique name');
  return state;
});

// Now update the same person with unique display name
upsert(`person/${$.uuid}`, {
  names: [
    {
      givenName: $.newName,
    },
  ],
}).then(state => {
  console.log('Person should have been updated!');
  console.log(state.data);
  console.log('---');
  return state;
});

fn(state => {
  console.log('Updating again with query');
  return state;
});

// Now find and update that same person again
upsert(
  `person`,
  {
    names: [
      {
        givenName: 'Spider',
        familyName: 'Man',
      },
    ],
  },
  { q: $.newName }
).then(state => {
  console.log('Person should now be spiderman!');
  console.log(state.data);
  console.log('---');
  return state;
});
// fn(state => ({
//   data: state.data,
// }));
