export const getBuilderName = resourceName =>
  resourceName[0].toLowerCase() + resourceName.slice(1);

export const getTypeName = schema =>
  `${schema.type}_${schema.id}`.replace(/-/g, '_');

// iterate  an object or array in order,
// passing the sort key and item into the callback
// if passed an array, items will be sorted by id
// (this is a little weird but ok)
export const orderedEntries = (item, callback) => {
  if (Array.isArray(item)) {
    const sorted = item.sort((a, b) => {
      if (a.id > b.id) return 1;
      if (a.id < b.id) return -1;
      return 0;
    });
    for (const item of sorted) {
      callback(item.id, item);
    }
  } else {
    const keys = Object.keys(item).sort();
    for (const key of keys) {
      callback(key, item[key]);
    }
  }
};
