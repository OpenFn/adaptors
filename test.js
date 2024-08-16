import { create } from '@openfn/language-fhir';

create('Contract', {
  authority: {
    // No code assist here though?
    //display
  },
});

create('Patient', {
  address: [
    {
      country,
    },
  ],
});

create('', {});

// v4 only
create('Person', {
  birthDate: '01/01/2001',
  
}, { version: 'r4' });
