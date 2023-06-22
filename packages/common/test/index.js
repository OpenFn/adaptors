import { assert, expect } from 'chai';
import testData from './testData.json' assert { type: 'json' };
import {
  arrayToString,
  chunk,
  combine,
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
  parseCsv,
  referencePath,
  scrubEmojis,
  source,
  sourceValue,
  splitKeys,
  toArray,
} from '../src/Adaptor';

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
  it('should parse a csv string', function () {});
  it('should parse a csv string and invoke the callback with the parsed data', async function () {
    const csv = 'a,b,c\n1,2,3\n4,5,6\n7,8,9';
    const expected = [
      { a: '1', b: '2', c: '3' },
      { a: '4', b: '5', c: '6' },
      { a: '7', b: '8', c: '9' },
    ];

    const state = { references: [], data: [] };

    const resultingState = await parseCsv(csv, { chunkSize: 2 }, state => {
      console.log(state, 'state');
      // assert.deepEqual(row, expected);

      return state;
    })(state);

    // execute(op1, op2, op3)(state);
    // var state;
    // state = await op1(state);
    // state = await op2(state);
    // state = await op3(state);

    // parseCsv("$.data.path", {chunkSize: 10}, (state, rows) => {

    //   return http.post('https://example.com', rows)(state)

    //   return state;
    // })(state)   // (State) => Promise<State> | State

    console.log(resultingState, 'result state');
  });

  it('should throw an exception when a CSV is invalid', async function () {
    const csv = 'a,b,c\n1,2,3,8\n4,5,6';

    let error;
    try {
      await parseCsv(csv, {}, (state, row) => {
        console.log(row);
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

  it('should return state with modifications from the callback');
  it('should await promises returned from the callback');
  it('should bubble up errors from the callback to the caller');
  it('should throw an error when chunkSize is not a number or < 1');
  // it('should without chunkSize')
  it('should append rows to references when not given a callback', async function () {
    const csv = 'a,b,c\n1,2,3\n4,5,6\n7,8,9';
    // const expected = [
    //   { a: '1', b: '2', c: '3' },
    //   { a: '4', b: '5', c: '6' },
    //   { a: '7', b: '8', c: '9' },
    // ];
    const expectedWithoutChunk = {
      data: [
        { a: '1', b: '2', c: '3' },
        { a: '4', b: '5', c: '6' },
        { a: '7', b: '8', c: '9' },
      ],
      references: [
        [
          { a: '1', b: '2', c: '3' },
          { a: '4', b: '5', c: '6' },
        ],
        [{ a: '7', b: '8', c: '9' }],
      ],
    };
    const expected = {
      data: [{ a: '7', b: '8', c: '9' }],
      references: [
        [
          { a: '1', b: '2', c: '3' },
          { a: '4', b: '5', c: '6' },
        ],
        [{ a: '7', b: '8', c: '9' }],
      ],
    };

    const state = { data: [], references: [] };

    const resultingState = await parseCsv(csv, { chunkSize: 2 })(state);

    // console.log(resultingState, 'result state');
    const resultingStateWithoutChunk = await parseCsv(csv, {})(state);

    assert.deepEqual(resultingState, {
      data: [{ a: '7', b: '8', c: '9' }],
      references: [
        [
          { a: '1', b: '2', c: '3' },
          { a: '4', b: '5', c: '6' },
        ],
        [{ a: '7', b: '8', c: '9' }],
      ],
    });

    assert.deepEqual(resultingStateWithoutChunk, {
      data: [
        { a: '1', b: '2', c: '3' },
        { a: '4', b: '5', c: '6' },
        { a: '7', b: '8', c: '9' },
      ],
      references: [
        [
          { a: '1', b: '2', c: '3' },
          { a: '4', b: '5', c: '6' },
        ],
        [{ a: '7', b: '8', c: '9' }],
      ],
    });
  });
});
