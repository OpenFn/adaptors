import { CodeableConcept, Reference, ContractTermAction } from 'fhir/r4';
import v5, { termMixins, actionMixins } from '../v5/contract';
import { createContext } from '../../builders';

const v4TermMixins = {
  ...termMixins,
  action,
};

function action(obj: Partial<ContractTermAction> = {}) {
  this.resource.action = obj;

  // Take the reason builder out of the v5 actions mixin
  // because v4 sets { reason, reasonCode and reasonReference } on action
  const { reason, ...rest } = actionMixins;

  const mixins = {
    ...rest,
  };

  return createContext(this.scope, obj, mixins);
}

const v4 = {
  // have to be careful about nested and common types here
  // eg if eg human name or Codeable concept differ, we have to replace
  ...v5,

  // override term so that we can modify term.action.reason
  v4TermMixins,
};

export default v4;
