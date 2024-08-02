import type { ContractTerm, HumanName } from 'fhir/r5';
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
const name = function (name: Omit<HumanName, '_family' | '_given'>) {
  // TOOD the resource and scope chains are super ugly now
  push(this._resource, 'name', humanName(name));
  return this._scope;
};

// need to get to term.action.reason
// Ah, chaining breaks down here a bit if I wan to to term.action
// becuase we're chaining a different thing
// So maybe some builders are scoped.
// but the current setup I have makes scoping hard (maybe impossible)
const term = function (obj: Partial<ContractTerm>) {
  this._resource.term = {};

  const mixins = {
    issued: function (date: string) {
      this._resource.issued = date;
      return this._scope;
    },
  };

  return createContext(this._scope, this._resource.term, mixins);
};

// i could cheat and put action elsewhere?
const action = function () {};

export default {
  name,
  term,
};
