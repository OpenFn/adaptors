// TODO urgh I want all this to be typescript
// and we can generate the d.ts

// this is the base builder type
const base = (type, init = {}) => {
  const data = {
    ...init,
    resourceType: type,
  };
  console.log('>', data);
  return data;
};

// this will create a new builder for you
export function create(type, mixins = []) {
  return obj => {
    const res = base(type, obj);
    mixins.push({
      toJSON: function () {
        const obj = Object.assign({}, this);
        return obj;
      },
      toString: function () {
        return JSON.stringify(this.toJSON());
      },
    });
    for (const m of mixins) {
      for (const key in m) {
        Object.defineProperty(res, key, {
          enumerable: false,
          value: m[key],
        });
      }
    }
    return res;
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
