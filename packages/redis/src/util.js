import { throwError } from '@openfn/language-common/util';
// throws if a argument does not match the type
const assertArgType = (arg, type, fix) => {
  if (typeof arg !== type) {
    throwError('ARGUMENT_ERROR', {
      message: 'TypeError: Invalid argument type',
      description: `Expected argument to be '${type}', but received: ${typeof arg}`,
      fix,
    });
  }
};

export const asserthGetArgs = (key, field) => {
  assertArgType(
    key,
    'string',
    `Ensure both key and field are strings for hget(): e.g., hget('patient', 'name')`
  );
  assertArgType(
    field,
    'string',
    `Ensure both key and field are strings for hget(): e.g., hget('patient', 'name')`
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

export const assertjSetArgs = (key, value) => {
  assertArgType(
    key,
    'string',
    `Make sure to pass a string for the key: e.g., jSet('patient', {name: "fela"})`
  );

  if (!['string', 'object'].includes(typeof value)) {
    const e = new Error('TypeError: Invalid argument type');
    e.code = 'ARGUMENT_ERROR';
    e.description = `Expected argument to be 'JSON string or JSON object', but received: ${typeof value}`;
    e.fix = `Pass a JSON object or string for the value: e.g., jSet('patient', {name: "fela"}) or jSet('patient', "{name: 'fela'}")`;

    throw e;
  }
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

export const assertjGetArgs = key => {
  assertArgType(
    key,
    'string',
    `Make sure to pass a string for jGet(): e.g., jGet('patient')`
  );
};

export const assertMSetArgs = entries => {
  assertArgType(
    entries,
    'object',
    'mSet requires an array of key/value objects: mSet([{ key: "name", value: "..." }])'
  );

  if (!Array.isArray(entries)) {
    throwArgumentError('array', 'mSet requires an array of key/value pairs');
  }

  entries.forEach((entry, index) => {
    if (typeof entry !== 'object' || entry === null) {
      throwArgumentError(
        'object',
        `Entry ${index} must be an object with { key, value }`
      );
    }

    if (!('key' in entry)) {
      throwArgumentError(
        'key property',
        `Entry ${index} is missing required 'key' property`
      );
    }
    assertArgType(
      entry.key,
      'string',
      `Key in entry ${index} must be a string`
    );

    if (!('value' in entry)) {
      throwArgumentError(
        'value property',
        `Entry ${index} is missing required 'value' property`
      );
    }
  });
};

const throwArgumentError = (expectedType, fixMessage) => {
  throwError('ARGUMENT_ERROR', {
    description: `Expected ${expectedType}`,
    fix: fixMessage,
  });
};
