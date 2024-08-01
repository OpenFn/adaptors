// builds patient types https://hl7.org/fhir/patient.html
import type { HumanName, Patient } from 'fhir/r5';
import { humanName } from './datatypes';
import { create } from '../builders';

// builder function for name
// all builders have this form

// and it is passed data, which is the resource under construction

// how would we scope  name to re-use it?
// like contacts[0].name
// I suppose contacts does that?
// or re-uses human name?
const name = (data: any, name: HumanName) => {
  if (!data.name) {
    data.name = [];
  }
  data.name.push(humanName(name));
};

// TODO how will I handle typings?
const builder = create<Patient>('Patient', {
  name,
});

export default builder;
