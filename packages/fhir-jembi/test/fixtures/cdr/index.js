import patient from './patient.js';
import encounter from './encounter-target-facility.js';
import encounterExternal from './encounter-outside-facility.js';
import medicationDispense from './medication-dispense.js';
import medication from './medication.js';
import medicationRequest from './medication-request.js';
import careplan from './careplan.js';

export default {
  patient,
  encounter,
  encounterInternal: encounter,
  encounterExternal, // TODO
  medicationDispense,
  medication,
  medicationRequest,
  careplan
};
