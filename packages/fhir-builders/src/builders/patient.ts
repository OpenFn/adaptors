// builds patient types https://hl7.org/fhir/patient.html
import type { HumanName } from '@types/fhir';
import { humanName } from './datatypes';
import { create } from '../builders';

// builder function for name
// all builders have this form
const name = function (name: HumanName) {
  console.log(' >>', this);

  // yes, I have this indirection problem now. damn,.
  if (!this._name) {
    this._name = [];
  }
  this._name.push(humanName(name));
  return this;
};

// TODO how will I handle typings?
const builder = create('Patient', [
  {
    name,
  },
]);

// this just isn't right yet
export default props => builder(props);
