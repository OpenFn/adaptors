export const getBuilderName = resourceName =>
  resourceName[0].toLowerCase() + resourceName.slice(1);

export const getTypeName = schema =>
  `${schema.type}_${schema.id}`.replace(/-/g, '_');

// iterate keys of an object in order
export const orderedEntries = (obj, callback) => {
  const keys = Object.keys(obj).sort();
  for (const key of keys) {
    callback(key, obj[key]);
  }
};
