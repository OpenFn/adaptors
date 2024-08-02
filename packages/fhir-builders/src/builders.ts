import { Patient } from 'fhir/r5';

// Manually define this to map strings to types
// Is there a better way?
type ResourceMap = {
  Patient: Patient;
};

export function create<Fns>(type: keyof ResourceMap, mixins: Fns) {
  // Look up the returned resource type from the key
  type Res = ResourceMap[typeof type];

  return (obj: Partial<Res>) => {
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
    };

    // Now apply the mixins to the builder
    // I've made them non-enumerable now, but does that matter?
    // at this point we are overtly non JSON
    for (const key in mixins) {
      Object.defineProperty(builder, key, {
        enumerable: false,
        value: function (...args) {
          mixins[key].apply(data, args);
          return this;
        },
      });
    }

    return builder as typeof builder & Fns;
  };
}
