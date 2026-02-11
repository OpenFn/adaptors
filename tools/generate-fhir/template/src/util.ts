let defaultValues = {}
let userValues = {}

/**
 * Set the data value index
 */
export const setValues = (url, values, type = 'user') => {
  if (type === 'default') {
    defaultValues[url] ??= {}
    defaultValues[url] = values
  } else {
    userValues[url] ??= {}
    userValues[url] = values
  }
}

/**
 * Add new entries to the  data value index
 */
export const extendValues = (url, values, type = 'user') => {
  if (type === 'default') {
    defaultValues[url] ??= {}
    Object.assign(defaultValues[url], values)
  } else {
    userValues[url] ??= {}
    Object.assign(Values[url], values)
  }
}

/**
 * Look up a code from a value set
 */
export const lookupValue = (url, code) => {
  let value;

  // first check for a user match
  // TODO if this is a string, recycle it, if an object, reuturn it
  value = userValues[url]?.[code] ?? code;


  // then look for a default match (in addition, not instead)
  return defaultValues[url]?.[value] ?? value;

}

// TODO load data mapping from state