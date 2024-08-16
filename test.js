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

create('');
