// TODO urgh I want all this to be typescript
// and we can generate the d.ts

type Resource = any; // any fhir resource object

type Helper = (data: Resource, ...any) => void;

type Helpers = Record<string, Helper>;

// this will create a new builder for you
// R is a Fhir resource type
export function create<R>(type: string, mixins: Helpers = {}) {
  return (obj: Partial<R>) => {
    // This is the resource under construction
    const data: Partial<R> = {
      ...obj,
      resourceType: type,
    };

    // This is the chainable builder
    const base = {
      toJSON: function () {
        // return a shallow clone of the data
        const obj = Object.assign({}, data);
        return obj as R;
      },

      toString: function () {
        return JSON.stringify(this.toJSON());
      },
    };

    const builder = base;

    // Now apply the mixins to the builder
    // I've made them non-enumerable now, but does that matter?
    // at this point we are overtly non JSON
    for (const key in mixins) {
      Object.defineProperty(builder, key, {
        enumerable: false,
        value: function (...args) {
          mixins[key](data, ...args);
          return this;
        },
      });
    }

    // TODO what if the builder provides an iterator, so you can do
    // for key of resource ?
    // But who cares?

    type Builder = {
      [K in keyof Helpers]: Helpers[K];
      // maybe...
      // [K in keyof typeof Helpers]: Helpers[K];
    } & typeof base;

    return builder as Builder;
  };
}

// export function options(opts = {}) {
//   for (let h in helpers) {
//     Object.defineProperty(opts, h, {
//       enumerable: false,
//       value: helpers[h],
//     });
//   }

//   return opts;
// }
