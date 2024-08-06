// throws if a argument does not match the type
const assertArgType = (arg, type, fix) => {
  if (typeof arg !== type) {
    const e = new Error('TypeError: Invalid argument type');
    e.code = 'ARGUMENT_ERROR';
    e.description = `Expected a argument to be '${type}', but was given: ${typeof arg}`;
    e.fix = fix;
    throw e;
  }
};

export const asserthGetArgs = (key, field) => {
  assertArgType(
    key,
    'string',
    `Ensure both key and field are strings for hget(): e.g., hget('patient', 'name').`
  );
  assertArgType(
    field,
    'string',
    `Ensure both key and field are strings for hget(): e.g., hget('patient', 'name').`
  );
};

export const asserthSetArgs = (key, value) => {
  assertArgType(
    key,
    'string',
    `Make sure to pass a string for the key: e.g., hset('patient', {name: "fela"})`
  );
  assertArgType(
    value,
    'object',
    `Make sure to pass an object for the value: e.g., hset('patient', {name: "fela"})`
  );
};

export const assertSetArgs = (key, value) => {
  assertArgType(
    key,
    'string',
    `Make sure both key and value are strings for set(): e.g., set('name', 'fela')`
  );
  assertArgType(
    value,
    'string',
    `Make sure both key and value are strings for set(): e.g., set('name', 'fela')`
  );
};
