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
// const name = (data: any, name: HumanName) => {
//   if (!data.name) {
//     data.name = [];
//   }
//   data.name.push(humanName(name));
// };

// back to the this approach

// types/fhir exports all these underscore keys which just get in the way of code assist
// we could forcibly remove them like this
// but would it be better to use our own definitions at this point?

/**
 * The patient name(s)
 */
const name = function (name: Omit<HumanName, '_family' | '_given'>) {
  if (!this.name) {
    this.name = [];
  }
  this.name.push(humanName(name));
};

const builder = create('Patient', {
  name,
});

export default builder;
