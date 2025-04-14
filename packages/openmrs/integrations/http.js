// Set up state to use the public openmrs demo sandbox
fn(state => {
  state.configuration = {
    instanceUrl: 'https://o3.openmrs.org/openmrs',
    username: 'admin',
    password: 'Admin123',
  };
  return state;
});

// create a new person
http
  .post('/ws/rest/v1/person', {
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
  })
  .then(state => {
    const { data } = state;
    console.log(`Created ${data.display} aged ${data.age} (${data.uuid})`);
    return {
      ...state,
      person: data,
    };
  });

// Update that person's name
http
  .post(`/ws/rest/v1/person/${$.person.uuid}`, {
    names: [
      {
        givenName: 'Spider',
        familyName: 'Man',
      },
    ],
  })
  .then(state => {
    const { data } = state;
    console.log(`Updated name to ${data.display}`);
    return state;
  });

// Search for the person
http.get('/ws/rest/v1/person', { query: { q: 'Spider Man' } }).then(state => {
  const { data } = state;
  console.log(`Found ${data.length} people called "Spider Man"`);
  return state;
});

http
  .delete(`/ws/rest/v1/person/${$.person.uuid}`, {
    purge: true,
  })
  .then(state => {
    const { person } = state;
    console.log(`Removed Spider Man ${person.uuid}`);
    return state;
  });

// should now fail to get that person
http.get(`/ws/rest/v1/person/${$.person.uuid}`).catch((error, state) => {
  if (error.statusCode === 404) {
    // TODO ideally we could validate a 404 here
    console.log(
      `Failed to get Spider Man ${state.person.uuid} (this is good!)`
    );
  } else {
    console.error(error);
  }
  return state;
});
