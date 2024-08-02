import { Patient, Contract } from 'fhir/r5';

// Manually define this to map strings to types
// Is there a better way?
type ResourceMap = {
  Patient: Patient;
  Contract: Contract;
};

type versions = '4' | '5';

export const createContext = (root, data, mixins) => {
  const builder = {
    root: () => root,
    toJSON: () => root.toJSON(),
    toString: () => root.toString(),
  };

  for (const key in mixins) {
    Object.defineProperty(builder, key, {
      enumerable: false,
      value: function (...args) {
        const context = {
          _resource: data,
          _scope: builder,
        };
        return mixins[key].call(context, ...args);
      },
    });
  }

  return builder as typeof builder & typeof mixins;
};

export function create<T extends keyof ResourceMap, Fns>(
  type: T,
  mixins: Record<versions, Fns>
) {
  // Look up the returned resource type from the key
  type Res = ResourceMap[typeof type];

  return (obj: Partial<Res>, version: versions = '5') => {
    // This is the resource under construction
    const data: Partial<Res> = {
      ...obj,
      resourceType: type,
    };

    // This is the chainable builder
    const builder = {
      toJSON: function () {
        // return a shallow clone of the data
        const obj = Object.assign({}, data);
        return obj as Res;
      },

      toString: function () {
        return JSON.stringify(this.toJSON());
      },

      // add upgrade and downgrade functions
    };

    // Now apply the mixins to the builder
    // I've made them non-enumerable now, but does that matter?
    // at this point we are overtly non JSON
    for (const key in mixins[version]) {
      Object.defineProperty(builder, key, {
        enumerable: false,
        value: function (...args) {
          const context = {
            _resource: data,
            _scope: builder,
          };
          return mixins[version][key].call(context, ...args);
        },
      });
    }

    return builder as typeof builder & typeof mixins[typeof version];
  };
}
