import type {
  CodeableReference,
  ContractTerm,
  ContractTermAction,
  HumanName,
} from 'fhir/r5';
import type {} from 'fhir';
import { humanName } from './datatypes';
import { createContext } from '../../builders';

// util - TODO factor out
const push = (obj, key: string, value: any) => {
  if (!obj[key]) {
    obj[key] = [];
  }
  obj[key].push(value);
};

// use of scope and this is pretty weird now
// but these functions have to be able to control scope
const name = function (name: Omit<HumanName, 'family' | 'given'>) {
  // TOOD the resource and scope chains are super ugly now
  push(this.resource, 'name', humanName(name));
  return this.scope;
};

export const termMixins = {
  issued: function (date: string) {
    this.resource.issued = date;
    return this.scope;
  },
  action,
};

// need to get to term.action.reason
// Ah, chaining breaks down here a bit if I wan to to term.action
// becuase we're chaining a different thing
// So maybe some builders are scoped.
// but the current setup I have makes scoping hard (maybe impossible)
const term = function (obj: Partial<ContractTerm> = {}) {
  this.resource.term = obj;
  
  return createContext(this.scope, obj, termMixins);
};

export const actionMixins = {
  doNotPerform: function (bool: boolean) {
    this.resource.doNotPerform = bool;
    return this.scope;
  },
  reason: function (obj: Partial<CodeableReference>) {
    this.resource.reason = obj;
    return this.scope;
  },
};

function action(obj: Partial<ContractTermAction> = {}) {
  this.resource.action = obj;


  return createContext(this.scope, obj, actionMixins);
}

export default {
  name,
  term,
};
