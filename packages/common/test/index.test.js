import fs from 'node:fs';
import path from 'node:path';
import { assert, expect } from 'chai';
import { request, MockAgent, setGlobalDispatcher } from 'undici';
import testData from './fixtures/data.json' assert { type: 'json' };
import {
  arrayToString,
  chunk,
  combine,
  cursor,
  dataPath,
  dataValue,
  each,
  execute,
  expandReferences,
  field,
  fields,
  index,
  join,
  jsonValue,
  lastReferenceValue,
  map,
  merge,
  group,
  parseCsv,
  referencePath,
  scrubEmojis,
  source,
  sourceValue,
  splitKeys,
  toArray,
  validate,
} from '../src/Adaptor';
import { startOfToday } from 'date-fns';

const mockAgent = new MockAgent();
setGlobalDispatcher(mockAgent);
const mockPool = mockAgent.get('https://localhost:1');

describe('execute', () => {
  it('executes each operation in sequence', done => {
    let state = {};
    let operations = [
      state => {
        return { counter: 1 };
      },
      state => {
        return { counter: 2 };
      },
      state => {
        return { counter: 3 };
      },
    ];

    execute(...operations)(state)
      .then(finalState => {
        expect(finalState).to.eql({ counter: 3 });
      })
      .then(done)
      .catch(done);
  });

  it('returns a function that returns state', async function () {
    let state = {};

    let finalState = await execute()(state);

    expect(finalState).to.eql(state);
  });
});

describe('jsonValue', function () {
  it('should return the first value at a JSON path if it exists, or undefined', function () {
    const input = { a: { b: { c: 1, e: '' } } };

    const desired1 = 1;
    const desired2 = undefined;
    const desired3 = '';

    assert.equal(jsonValue(input, 'a.b.c'), desired1);
    assert.equal(jsonValue(input, 'a.d.c'), desired2);
    assert.equal(jsonValue(input, 'a.b.e'), desired3);
  });
});

describe('sourceValue', () => {
  it('references a given path', () => {
    let value = sourceValue('$.store.bicycle.color')(testData);
    expect(value).to.eql('red');
  });
});

describe('source', () => {
  it('references a given path', () => {
    let value = source('$.store.bicycle.color')(testData);
    expect(value).to.eql(['red']);
  });
});

describe('map', () => {
  xit('[DEPRECATED] can produce a one to one from an array', () => {
    let items = [];

    let state = { data: testData, references: [] };
    let results = map(
      '$.data.store.book[*]',
      function (state) {
        return { references: [1, ...state.references], ...state };
      },
      state
    );

    expect(results.references).to.eql([
      { title: 'Sayings of the Century' },
      { title: 'Sword of Honour' },
      { title: 'Moby Dick' },
      { title: 'The Lord of the Rings' },
    ]);
  });
});

describe('combine', () => {
  let state = {};
  let operations = [
    state => {
      return { hello: 1 };
    },
    state => {
      return { hello: state.hello + 5 };
    },
  ];

  it('accepts serveral operations, and reduces them with the state', () => {
    let result = combine.apply(null, operations)(state);
    expect(result).to.eql({ hello: 6 });
  });
});

describe('join', () => {
  it('merges in a previously defined field', () => {
    let result = join(
      '$.store.book[*]',
      '$.store.bicycle.color',
      'color'
    )(testData);

    expect(result[0]).to.eql({
      author: 'Nigel Rees',
      category: 'reference',
      color: 'red',
      price: 8.95,
      title: 'Sayings of the Century',
    });
  });
});

describe('expandReferences', () => {
  it('resolves function values on objects', () => {
    let result = expandReferences({
      a: s => s,
      // function nested inside an object inside and array
      b: [2, { c: s => s + 2 }, 3],
      c: 4,
      // function that returns a function
      d: s => s => s + 4,
    })(1);

    expect(result).to.eql({
      a: 1,
      b: [2, { c: 3 }, 3],
      c: 4,
      d: 5,
    });
  });

  it("doesn't affect empty objects", () => {
    let result = expandReferences({})(1);

    expect(result).to.eql({});
    result = expandReferences([])(1);
    expect(result).to.eql([]);
    result = expandReferences(null)(1);
    expect(result).to.eql(null);
    result = expandReferences(undefined)(1);
    expect(result).to.eql(undefined);
  });

  it('resolves function values on arrays', () => {
    let result = expandReferences([2, { c: s => s + 2 }, 3])(1);

    expect(result).to.eql([2, { c: 3 }, 3]);
  });
});

describe('field', () => {
  it('returns a pair', () => {
    expect(field('a', 1)).to.eql(['a', 1]);
  });
});

describe('fields', () => {
  it('returns an object', () => {
    expect(fields(['a', 1], ['b', 2])).to.eql({ a: 1, b: 2 });
  });
});

describe('merge', () => {
  it('merges in a set of fields from data, for an array of sources', () => {
    let result = merge(
      '$.store.book[*]',
      fields(
        field('color', sourceValue('$.store.bicycle.color')),
        field('price', sourceValue('$.store.bicycle.price'))
      )
    )(testData);

    expect(result[0].color).to.eql('red');
    expect(result[1].color).to.eql('red');
    expect(result[2].color).to.eql('red');
    expect(result[3].color).to.eql('red');

    expect(result[0].price).to.eql(19.95);
    expect(result[1].price).to.eql(19.95);
    expect(result[2].price).to.eql(19.95);
    expect(result[3].price).to.eql(19.95);
  });
});

describe('Path Helpers', () => {
  describe('dataPath', () => {
    it('prepends source data paths with $.data', () => {
      expect(dataPath('data.hello')).to.eql('$.data.data.hello');
      expect(dataPath('$.data.hello')).to.eql('$.data.data.hello');
      // TODO: should we expect it to handle arrays like this...
      // expect(dataPath("[0].foo")).to.eql("$.data[0].foo")
      // Or like this...
      expect(dataPath('[0].foo')).to.eql('$.data.[0].foo');
    });
  });
  describe('dataValue', () => {
    it('references a given path inside $.data', () => {
      let value = dataValue('store.bicycle.color')({ data: testData });
      expect(value).to.eql('red');
    });
  });
  describe('referencePath', () => {
    it('prepends a paths with $.references', () => {
      expect(referencePath('[0]')).to.eql('$.references[0]');
    });
  });
  describe('lastReferenceValue', () => {
    it('returns the last reference in `state.references`', () => {
      expect(
        lastReferenceValue('foo')({
          references: [{ foo: 'bar' }, { baz: 'foo' }],
        })
      ).to.eql('bar');
    });
  });
});

describe('index', function () {
  it('returns the current index value of an item in `each`', () => {
    let operation = state => {
      return { ...state, references: [...state.references, index()(state)] };
    };

    let results = each(
      '$.data.store.book[*]',
      operation
    )({
      references: [],
      data: testData,
    });

    expect(results.references).to.eql([0, 1, 2, 3]);
  });
});

describe('arrayToString', function () {
  it('returns a comma separated string from an array', function () {
    expect(arrayToString([1, 2, 3], ', ')).to.eql('1, 2, 3');
  });

  it('does not require a separator', function () {
    expect(arrayToString([1, 2, 3])).to.eql('1,2,3');
  });
});

describe('toArray', function () {
  it('leaves arrays untouched', function () {
    expect(toArray([1, 2, 3])).to.eql([1, 2, 3]);
  });

  it('wraps objects in an array', function () {
    expect(toArray({ a: 1 })).to.eql([{ a: 1 }]);
  });

  it('wraps strings in an array', function () {
    expect(toArray('a')).to.eql(['a']);
  });
});

describe('splitKeys', function () {
  it('returns an array of 2 objects, split on keys', function () {
    const initialObject = { a: 1, b: 2, c: 3 };
    const desired = [{ a: 1, c: 3 }, { b: 2 }];
    expect(splitKeys(initialObject, ['b'])).to.eql(desired);
  });

  it('handles empty objects and non-existent keys', function () {
    const initialObject = {};
    const desired = [{}, {}];
    expect(splitKeys(initialObject, ['b'])).to.eql(desired);
  });
});

describe('scrubEmojis', function () {
  it('should remove the dove and the star', function () {
    const withEmojis = 'This is a dove🕊️⭐_29 Jul 2021';
    const withoutEmojis = 'This is a dove���_29 Jul 2021';
    assert.equal(scrubEmojis(withEmojis), withoutEmojis);
  });

  it('should remove the dove', function () {
    const withEmoji = 'This is a dove🕊️_29 Jul 2021';
    const withoutEmoji = 'This is a dove��_29 Jul 2021';
    assert.equal(scrubEmojis(withEmoji), withoutEmoji);
  });

  it('should remove the star', function () {
    const withEmoji = 'This is a star⭐_29 Jul 2021';
    const withoutEmoji = 'This is a star�_29 Jul 2021';
    assert.equal(scrubEmojis(withEmoji), withoutEmoji);
  });

  it('should remove the emoji and the variant code', function () {
    const withEmoji = 'This is a star⭐ ️ 2021-07-29';
    const withoutEmoji = 'This is a star� � 2021-07-29';
    assert.equal(scrubEmojis(withEmoji), withoutEmoji);
  });

  it("should return input if input doesn't have emojis", function () {
    const withoutEmojis = 'This is a dove_29 Jul 2021';
    assert.equal(scrubEmojis(withoutEmojis), withoutEmojis);
  });

  it('should return input if input is falsy', function () {
    const noText = undefined;
    assert.equal(scrubEmojis(noText), noText);
  });

  it('should replace the dove with empty string', function () {
    const withEmoji = 'This is a dove🕊️_29 Jul 2021';
    const withoutEmoji = 'This is a dove_29 Jul 2021';
    assert.equal(scrubEmojis(withEmoji, ''), withoutEmoji);
  });
});

describe('chunk', function () {
  it('should chunk an array into an array of arrays with the desired size', function () {
    const original = [1, 2, 3, 4, 5];
    const desired = [[1, 2], [3, 4], [5]];

    assert.deepEqual(chunk(original, 2), desired);
  });
});

describe('parseCsv', function () {
  it('should parse a csv string and invoke the callback with the parsed data', async function () {
    const csv = 'a,b,c\n1,2,3\n4,5,6\n7,8,9';

    const state = { references: [], data: [] };

    // Create a mock function to track the callback invocation
    let callBackInvocations = 0;

    // Mock function that sets a flag when called
    const callback = (state, rows) => {
      callBackInvocations++;
      return { ...state, data: rows };
    };

    await parseCsv(csv, { chunkSize: 2 }, callback)(state);

    // Assertion to check if the callback was called
    expect(callBackInvocations).to.eq(2);
  });

  it('should throw an exception when a CSV is invalid', async function () {
    const csv = 'a,b,c\n1,2,3,8\n4,5,6';

    let error;
    try {
      await parseCsv(csv, {}, (state, row) => {
        return state;
      })({});
    } catch (e) {
      error = e;
    }

    assert.equal(
      error.message,
      'Invalid Record Length: columns length is 3, got 4 on line 2'
    );
  });

  it('should return state with modifications from the callback', async function () {
    const csv = 'a,b,c\n1,2,3\n4,5,6\n7,8,9\n10,11,12\n13,14,15';
    const state = { references: [], data: [], items: [] };

    const resultingState = await parseCsv(
      csv,
      { chunkSize: 2 },
      (state, rows) => {
        const { items } = state;
        return { ...state, data: rows, items: [...items, ...rows] };
      }
    )(state);

    // Notice how the user has decided to discard all but the final chunk
    assert.deepEqual(resultingState, {
      references: [],
      data: [{ a: '13', b: '14', c: '15' }],
      items: [
        { a: '1', b: '2', c: '3' },
        { a: '4', b: '5', c: '6' },
        { a: '7', b: '8', c: '9' },
        { a: '10', b: '11', c: '12' },
        { a: '13', b: '14', c: '15' },
      ],
    });
  });

  it('should await promises returned from the callback', async function () {
    const csv = 'a,b,c\n1,2,3\n4,5,6\n7,8,9\n10,11,12\n13,14,15';
    const state = { data: 0 };

    const resultingState = await parseCsv(
      csv,
      { chunkSize: 2 },
      (state, rows) => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({
              ...state,
              data: rows.reduce((sum, row) => sum + Number(row.b), state.data),
            });
          }, 1);
        });
      }
    )(state);

    assert.deepEqual(resultingState, {
      data: 40,
    });
  });

  it('should set state to the result of a non-promise callback', async function () {
    const csv = 'a,b,c\n1,2,3\n4,5,6\n7,8,9\n10,11,12\n13,14,15';
    const state = { data: 0 };

    const resultingState = await parseCsv(
      csv,
      { chunkSize: 1 },
      (state, rows) => {
        return {
          ...state,
          data: rows.reduce((sum, row) => sum + Number(row.b), state.data),
        };
      }
    )(state);

    assert.deepEqual(resultingState, {
      data: 40,
    });
  });

  it('should bubble up errors from the callback to the caller', async function () {
    const csv = 'a,b,c\n1,2,3\n4,5,6\n7,8,9\n10,11,12\n13,14,15';
    const state = { references: [], data: [] };

    let error;
    try {
      await parseCsv(csv, { chunkSize: 2 }, (state, rows) => {
        throw new Error(`bubble up errors from the callback`);
      })(state);
    } catch (e) {
      error = e;
    }

    assert.equal(error.message, 'bubble up errors from the callback');
  });

  it('should throw an error when chunkSize is not a number or < 1', async function () {
    const csv = 'a,b,c\n1,2,3\n4,5,6\n7,8,9';

    let error;
    try {
      await parseCsv(csv, { chunkSize: 0 })({});
    } catch (e) {
      error = e;
    }

    assert.equal(error.message, 'chunkSize must be at least 1');
  });

  it('should put the whole array of rows into `data` and shift previous `data` to references when not given a callback or chunkSize', async function () {
    const csv = 'a,b,c\n1,2,3\n4,5,6\n7,8,9';

    const state = { data: { something: 'came before' }, references: [] };

    const resultingState = await parseCsv(csv, {})(state);

    assert.deepEqual(resultingState, {
      data: [
        { a: '1', b: '2', c: '3' },
        { a: '4', b: '5', c: '6' },
        { a: '7', b: '8', c: '9' },
      ],
      references: [{ something: 'came before' }],
    });
  });

  it('should put each chunk into data, then into references, sequentially when not given a callback but given chunkSize', async function () {
    const csv = 'a,b,c\n1,2,3\n4,5,6\n7,8,9';

    const state = { data: { something: 'came before' }, references: [] };

    const resultingStateWithChunk = await parseCsv(csv, { chunkSize: 2 })(
      state
    );

    assert.deepEqual(resultingStateWithChunk, {
      data: [{ a: '7', b: '8', c: '9' }],
      references: [
        { something: 'came before' },
        [
          { a: '1', b: '2', c: '3' },
          { a: '4', b: '5', c: '6' },
        ],
      ],
    });
  });

  it('should chunk a stream from the filesystem', async () => {
    const state = { data: {}, references: [] };
    const buffer = [];
    let callCount = 0;

    const stream = fs.createReadStream(
      path.resolve('./test/fixtures/data.csv')
    );

    await parseCsv(stream, { chunkSize: 1 }, (state, chunk) => {
      callCount++;
      assert.lengthOf(chunk, 1);
      buffer.push(...chunk);
      return state;
    })(state);

    assert.deepEqual(buffer, [
      { a: '1', b: '2', c: '3' },
      { a: '4', b: '5', c: '6' },
      { a: '7', b: '8', c: '9' },
    ]);
    assert.equal(callCount, 3);
  });

  it('should chunk a stream from unidici request', async () => {
    const state = { data: {}, references: [] };
    const buffer = [];
    let callCount = 0;

    mockPool
      .intercept({
        method: 'GET',
        path: '/csv',
      })
      .reply(200, 'a,b,c\n1,2,3\n4,5,6\n7,8,9');

    const response = await request('https://localhost:1/csv');

    await parseCsv(response.body, { chunkSize: 1 }, (state, chunk) => {
      callCount++;
      assert.lengthOf(chunk, 1);
      buffer.push(...chunk);
      return state;
    })(state);

    assert.deepEqual(buffer, [
      { a: '1', b: '2', c: '3' },
      { a: '4', b: '5', c: '6' },
      { a: '7', b: '8', c: '9' },
    ]);
    assert.equal(callCount, 3);
  });
});

describe('validate', () => {
  const schema = {
    $id: 'https://example.com/person.schema.json',
    $schema: 'http://json-schema.org/draft-07/schema',
    title: 'Person',
    type: 'object',
    properties: {
      firstName: {
        type: 'string',
        description: "The person's first name.",
      },
      lastName: {
        type: 'string',
        description: "The person's last name.",
      },
      age: {
        description:
          'Age in years which must be equal to or greater than zero.',
        type: 'integer',
        minimum: 0,
      },
    },
  };

  it('should report no errors with default schema, data on state', async () => {
    const data = {
      firstName: 'Scott',
      lastName: 'Lang',
      age: 30,
    };

    const state = {
      schema,
      data,
    };

    const result = await validate()(state);

    expect(result.validationErrors).to.eql([]);
  });

  it('should report one error with default schema, data on state', async () => {
    const data = {
      firstName: 'Scott',
      lastName: 'Lang',
      age: 'unknown',
    };

    const state = {
      schema,
      data,
    };

    const result = await validate()(state);

    expect(result.validationErrors).to.have.lengthOf(1);

    const err = result.validationErrors[0];
    expect(err.data).to.eql(data);
    expect(err.errors).to.have.lengthOf(1);
    expect(err.errors[0].message).to.eql('must be integer');
  });

  it('should report one error with json path arguments for schema, data', async () => {
    const data = {
      firstName: 'Scott',
      lastName: 'Lang',
      age: 'unknown',
    };

    const state = {
      s: schema,
      d: data,
    };

    const result = await validate('s', 'd')(state);
    expect(result.validationErrors).to.have.lengthOf(1);
  });

  it('should report one error with object arguments for schema, data', async () => {
    const data = {
      firstName: 'Scott',
      lastName: 'Lang',
      age: 'unknown',
    };

    const state = {};

    const result = await validate(schema, data)(state);
    expect(result.validationErrors).to.have.lengthOf(1);
  });

  it('should report one error with function arguments for schema, data', async () => {
    const data = {
      firstName: 'Scott',
      lastName: 'Lang',
      age: 'unknown',
    };

    const state = {};

    const result = await validate(
      () => schema,
      () => data
    )(state);
    expect(result.validationErrors).to.have.lengthOf(1);
  });

  it('should fetch a schema from a url', async () => {
    mockPool
      .intercept({
        method: 'GET',
        path: '/schema',
      })
      .reply(201, schema, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

    const data = {
      firstName: 'Scott',
      lastName: 'Lang',
      age: 'unknown',
    };

    const state = {
      data,
    };

    const result = await validate('https://localhost:1/schema')(state);
    expect(result.validationErrors).to.have.lengthOf(1);
  });

  it('should compose with each to validate each item in an array', async () => {
    const data = [
      {
        firstName: 'Scott',
        lastName: 'Lang',
        age: 'unknown',
      },
      {
        firstName: 'Hope',
        lastName: ['Van', 'Dyne'],
        age: 30,
      },
    ];

    const state = {
      schema,
      data,
    };

    const doValidation = async s => validate()(s);
    const result = await each('data[*]', doValidation)(state);

    expect(result.validationErrors).to.have.lengthOf(2);
    expect(result.validationErrors[0].data).to.eql(data[0]);
    expect(result.validationErrors[1].data).to.eql(data[1]);
  });

  it('should compose with each to validate each item in an array with custom schema', async () => {
    const data = [
      {
        firstName: 'Scott',
        lastName: 'Lang',
        age: 'unknown',
      },
      {
        firstName: 'Hope',
        lastName: ['Van', 'Dyne'],
        age: 30,
      },
    ];

    const state = {
      'my-schema': schema,
      data,
    };

    const doValidation = async s => validate('my-schema')(s);
    const result = await each('data[*]', doValidation)(state);

    expect(result.validationErrors).to.have.lengthOf(2);
    expect(result.validationErrors[0].data).to.eql(data[0]);
    expect(result.validationErrors[1].data).to.eql(data[1]);
  });

  it('should validate 2019 schema', async () => {
    const schema = {
      $id: 'https://example.com/person.schema.json',
      $schema: 'http://json-schema.org/draft/2019-09/schema',
      title: 'Person',
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
          description: "The person's first name.",
        },
        lastName: {
          type: 'string',
          description: "The person's last name.",
        },
        age: {
          description:
            'Age in years which must be equal to or greater than zero.',
          type: 'integer',
          minimum: 0,
        },
      },
    };
    const data = {
      firstName: 'Scott',
      lastName: 'Lang',
      age: 30,
    };

    const state = {
      schema,
      data,
    };

    const result = await validate()(state);

    expect(result.validationErrors).to.eql([]);
  });

  it('should validate 2020 schema', async () => {
    const schema = {
      $id: 'https://example.com/person.schema.json',
      $schema: 'http://json-schema.org/draft/2020-12/schema',
      title: 'Person',
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
          description: "The person's first name.",
        },
        lastName: {
          type: 'string',
          description: "The person's last name.",
        },
        age: {
          description:
            'Age in years which must be equal to or greater than zero.',
          type: 'integer',
          minimum: 0,
        },
      },
    };

    const data = {
      firstName: 'Scott',
      lastName: 'Lang',
      age: 30,
    };

    const state = {
      schema,
      data,
    };

    const result = await validate()(state);

    expect(result.validationErrors).to.eql([]);
  });
});

describe('cursor', () => {
  it('should set a cursor on state', () => {
    const state = {};
    const result = cursor(1234)(state);
    expect(result.cursor).to.eql(1234);
  });

  it('should set a cursorStart on state', () => {
    const state = {};
    const date = new Date();
    const result = cursor('start')(state);
    const resultDate = new Date(result.cursor);
    expect(resultDate.toDateString()).to.eql(date.toDateString());
  });

  it('should set a cursor on state with a natural language timestamp', () => {
    const state = {};

    const date = startOfToday().toISOString();
    const result = cursor('today')(state);
    expect(result.cursor).to.eql(date);
  });

  it('should not blow up if an arbitrary string is passed', () => {
    const state = {};

    const str = 'rock the cashbah';
    const result = cursor(str)(state);
    expect(result.cursor).to.eql(str);
  });

  it('should clear the cursor', () => {
    const state = {
      cursor: new Date(),
    };
    const result = cursor()(state);
    expect(result.cursor).to.eql(undefined);
  });

  it('should use a default value', () => {
    const state = {};
    const result = cursor(state.cursor, { defaultValue: 33 })(state);
    expect(result.cursor).to.eql(33);
  });

  it('should use a custom key', () => {
    const state = {};
    const result = cursor(44, { key: 'page' })(state);
    expect(result.page).to.eql(44);
  });

  it('should re-use a custom key', () => {
    const state = {};
    const result1 = cursor(44, { key: 'page' })(state);
    expect(result1.page).to.eql(44);

    const result2 = cursor(55)(state);
    expect(result2.page).to.eql(55);
  });

  // testing the log output is hard here, I've only verified it manally
  it('should use an object', () => {
    const state = {};
    const c = { page: 22, next: 23 };
    const result = cursor(c, { key: 'cursor' })(state);
    expect(result.cursor).to.eql(c);
  });

  it('should apply a custom formatter', () => {
    const state = {};
    const result = cursor('abc', {
      format: c => c.toUpperCase(),
    })(state);
    expect(result.cursor).to.eql('ABC');
  });

  it('should format "today"', () => {
    const state = {};
    const date = new Date().toDateString();
    const result = cursor('today', {
      format: c => c.toDateString(),
    })(state);
    expect(result.cursor).to.eql(date);
  });

  it('should format a number to an arbitrary object', () => {
    const state = {};
    const result = cursor(3, {
      format: c => ({ page: c }),
    })(state);
    expect(result.cursor).to.eql({ page: 3 });
  });
});

describe('group', () => {
  it('should group an array of objects by a specified key path', function () {
    const state = {};
    const data = [{ x: 'a' }, { x: 'b' }, { x: 'b' }];

    const result = group(data, 'x')(state);

    expect(result.data).eql({ a: [{ x: 'a' }], b: [{ x: 'b' }, { x: 'b' }] });
  });

  it('should group an array of objects by a specified path', function () {
    const data = [
      { x: 'a', y: { z: 'a' } },
      { x: 'b', y: { z: 'a' } },
    ];
    const state = {};
    const result = group(data, 'y.z')(state);
    expect(result.data).eql({
      a: [
        { x: 'a', y: { z: 'a' } },
        { x: 'b', y: { z: 'a' } },
      ],
    });
  });
  it("should return an empty object if the key isn't present on any items", function () {
    const data = [
      { x: 'a', y: { z: 'a' } },
      { x: 'b', y: { w: 'a' } },
    ];
    const state = {};
    const result = group(data, 'y.q')(state);
    expect(result.data).eql({});
  });

  it('should remove undefined keys', function () {
    const data = [
      { x: 'a', y: { z: 'a' } },
      { x: 'b', y: { z: undefined } },
    ];
    const state = {};
    const result = group(data, 'y.z')(state);
    expect(result.data).eql({ a: [{ x: 'a', y: { z: 'a' } }] });
  });
  it('should expand arrayOfObjects', function () {
    const input = {
      data: [
        { x: 'a', y: { z: 'a' } },
        { x: 'b', y: { z: undefined } },
      ],
    };

    const result = group(state => state.data, 'y.z')(input);

    expect(result.data).eql({ a: [{ x: 'a', y: { z: 'a' } }] });
  });

  it('should expand key path', function () {
    const input = {
      path: 'y.z',
      data: [
        { x: 'a', y: { z: 'a' } },
        { x: 'b', y: { z: undefined } },
      ],
    };

    const result = group(input.data, state => state.path)(input);

    expect(result.data).eql({ a: [{ x: 'a', y: { z: 'a' } }] });
  });
});
