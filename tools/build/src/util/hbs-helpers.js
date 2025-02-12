const handlebars = require('handlebars');

exports.toLowerCase = function (str) {
  return str ? str.toLowerCase() : str;
};

exports.namespacedHeader = function (namespace, name) {
  return `### ${namespace}.${name} \{\#${namespace}_${name}\}`;
};

exports.commonFns = function (options) {
  options.hash.scope = 'global';
  const common = () =>
    handlebars.helpers._identifiers(options).filter(o => {
      return o.common;
    }, options);

  return handlebars.helpers.each(common, options);
};

exports.externalName = function (def) {
  if (def.kind === 'external-function') {
    return `${def.name}()`;
  }
  return def.name;
};

// get a list of all namespaces
exports.namespaces = function (options) {
  const fn = () => {
    const ns = {};
    handlebars.helpers._identifiers(options).forEach(o => {
      if (!ns[o.scope]) {
        ns[o.scope] = [];
        o.newscope = true;
      }

      ns[o.scope].push(o);
    }, options);

    delete ns.global;

    const items = [];
    for (const n in ns) {
      items.push(...ns[n]);
    }
    return items;
  };

  return handlebars.helpers.each(fn, options);
};

/**
 * This guy takes a State array
 * where each item is either a typedef
 * or a single state property
 * It must be flattened into a simple array
 */
exports.flattenState = function (state, options) {
  // a list of all state keys
  const keys = {};

  state.forEach(s => {
    if (s.type && !s.name) {
      // If this is a type reference, lookup the type and add all its keys to the list
      const def = options.data.root.find(o => {
        return o.id === s.type;
      });
      def?.properties?.forEach(p => {
        keys[p.name] = p;
      });
    } else {
      // Otherwise, if this is a simple state key definition, just add it
      keys[s.name] = s;
    }
  });

  // return the final keys as an array
  return options.fn(Object.values(keys));
};
