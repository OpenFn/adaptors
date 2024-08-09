import { expect } from 'chai';

import { get, hget, hset, set, scan, setMockClient, hGetAll } from '../src';

describe('get', () => {
  it('should get the string value of a key', async () => {
    setMockClient({
      get: async () => 'john doe',
    });

    const state = {};
    const result = await get('patient')(state);
    expect(result.data).to.eql('john doe');
  });

  it('should expand references', async () => {
    setMockClient({
      get: async () => 'mtuchi',
    });
    const state = { key: 'name' };
    const result = await get(s => s.key)(state);
    expect(result.data).to.eql('mtuchi');
  });

  it('should return null if key does not exist', async () => {
    setMockClient({
      get: async () => null,
    });

    const state = {};
    const result = await get('not-found')(state);
    expect(result.data).to.eql(null);
  });
});

describe('hget', () => {
  it('should return the value of a key and field', async () => {
    setMockClient({
      hGet: async () => 'cat',
    });
    const state = {};
    const result = await hget('animals:1', 'species')(state);
    expect(result.data).to.eql('cat');
  });

  it('should return null if field value is not found', async () => {
    setMockClient({
      hGet: async () => null,
    });
    const state = {};
    const result = await hget('animals:1', 'cat')(state);
    expect(result.data).to.eql(null);
  });

  it('should throw if field value is not specified', async () => {
    setMockClient({
      hGet: async () => {
        throw new Error();
      },
    });
    const state = {};
    try {
      await hget('animals:1')(state);
    } catch (error) {
      expect(error.message).to.eql('TypeError: Invalid argument type');
      expect(error.description).to.eql(
        `Expected argument to be 'string', but received: undefined`
      );
      expect(error.code).to.eql('ARGUMENT_ERROR');
    }
  });

  it('should expand references', async () => {
    setMockClient({
      hGet: async () => 'cat',
    });
    const state = { key: 'animals:1', value: 'species' };
    const result = await hget(
      s => s.key,
      s => s.value
    )(state);
    expect(result.data).to.eql('cat');
  });

  it('should throw if wrong operation', async () => {
    setMockClient({
      hGet: async () => {
        throw new Error(
          'WRONGTYPE Operation against a key holding the wrong kind of value'
        );
      },
    });
    const state = {};
    try {
      await hget('patient', 'name')(state);
    } catch (error) {
      expect(error.message).to.eql(
        'WRONGTYPE Operation against a key holding the wrong kind of value'
      );
    }
  });
});

describe('set', () => {
  it('should set a value for a key', async () => {
    setMockClient({
      set: async (key, value) => {
        expect(key).to.eql('name');
        expect(value).to.eql('kwaku');
        return 'OK';
      },
    });

    const state = {};
    const result = await set('name', 'kwaku')(state);
    expect(result).to.eql(state);
  });

  it('should expand references', async () => {
    setMockClient({
      set: async (key, value) => {
        expect(key).to.eql('name');
        expect(value).to.eql('fela');
        return 'OK';
      },
    });
    const state = { key: 'name', value: 'fela' };
    const result = await set(
      s => s.key,
      s => s.value
    )(state);
    expect(result).to.eql(state);
  });

  it('should throw an error if key and value is not specified', async () => {
    setMockClient({
      set: async () => {
        throw new Error();
      },
    });

    const state = {};
    try {
      await set()(state);
    } catch (error) {
      expect(error.message).to.eql('TypeError: Invalid argument type');
      expect(error.code).to.eql('ARGUMENT_ERROR');
    }
  });

  it('should throw an error if value is not specified', async () => {
    setMockClient({
      set: async () => {
        throw new Error();
      },
    });

    const state = {};
    try {
      await set('patient')(state);
    } catch (error) {
      expect(error.message).to.eql('TypeError: Invalid argument type');
    }
  });

  it('should throw an error if value is an object', async () => {
    setMockClient({
      set: async () => {
        throw new Error();
      },
    });

    const state = {};
    try {
      await set('patient', { name: 'kutai' })(state);
    } catch (error) {
      expect(error.message).to.eql('TypeError: Invalid argument type');
      expect(error.code).to.eql('ARGUMENT_ERROR');
      expect(error.fix).to.eql(
        `Make sure both key and value are strings for set(): e.g., set('name', 'fela')`
      );
    }
  });
});

describe('hset', () => {
  it('should set fields value for a specified key', async () => {
    setMockClient({
      hSet: async (key, value) => {
        expect(key).to.eql('patient');
        expect(value).to.eql({ name: 'kwaku' });

        return 1;
      },
    });

    const state = {};
    const result = await hset('patient', { name: 'kwaku' })(state);

    expect(result).to.eql(state);
  });

  it('should expand references', async () => {
    setMockClient({
      hSet: async (key, value) => {
        expect(key).to.eql('patient');
        expect(value).to.eql({ name: 'fela' });

        return 1;
      },
    });
    const state = { key: 'patient', value: { name: 'fela' } };
    const result = await hset(
      s => s.key,
      s => s.value
    )(state);
    expect(result).to.eql(state);
  });

  it('should throw an error if key and value is not specified', async () => {
    setMockClient({
      hSet: async () => {
        throw new Error();
      },
    });

    const state = {};
    try {
      await hset()(state);
    } catch (error) {
      expect(error.message).to.eql('TypeError: Invalid argument type');
      expect(error.code).to.eql('ARGUMENT_ERROR');
    }
  });

  it('should throw an error if value is not specified', async () => {
    setMockClient({
      hSet: async () => {
        throw new Error();
      },
    });

    const state = {};
    try {
      await hset('patient')(state);
    } catch (error) {
      expect(error.message).to.eql('TypeError: Invalid argument type');
      expect(error.code).to.eql('ARGUMENT_ERROR');
      expect(error.fix).to.eql(
        `Make sure to pass an object for the value: e.g., hset('patient', {name: "fela"})`
      );
    }
  });
});

describe('scan', () => {
  it('should return all pages results', async () => {
    const results = [
      { keys: ['a'], cursor: 22 },
      { keys: ['b', 'c'], cursor: 33 },
      { keys: ['d'], cursor: 0 },
    ];
    setMockClient({
      scan: async (cursor, options) => {
        expect(options.TYPE).to.eql('string');
        return results.shift();
      },
    });

    const state = {};
    const result = await scan('*', { type: 'string' })(state);

    expect(result.data).to.eql(['a', 'b', 'c', 'd']);
  });
  it('should return json keys', async () => {
    setMockClient({
      scan: async (cursor, options) => {
        expect(cursor).to.eql(0);
        expect(options.MATCH).to.eql('*:abc*');
        expect(options.TYPE).to.eql('ReJSON-RL');
        return { keys: ['node:abc'], cursor: 0 };
      },
    });
    const state = {};
    const result = await scan('*:abc*', { type: 'json' })(state);
    expect(result.data).to.eql(['node:abc']);
  });
  it('should return empty array if key not found', async () => {
    setMockClient({
      scan: async (cursor, options) => {
        expect(cursor).to.eql(0);
        expect(options.MATCH).to.eql('*:abc*');
        return { keys: [], cursor: 0 };
      },
    });
    const state = {};
    const result = await scan('*:abc*')(state);
    expect(result.data).to.eql([]);
  });

  it('should return collection of keys', async () => {
    setMockClient({
      scan: async (cursor, options) => {
        expect(cursor).to.eql(0);
        expect(options.MATCH).to.eql('*:animals*');
        return { keys: ['noderedis:animals:1'], cursor: 0 };
      },
    });

    const state = {};
    const result = await scan('*:animals*')(state);
    expect(result.data).to.eql(['noderedis:animals:1']);
  });

  it('should return all keys if no query is specified', async () => {
    setMockClient({
      scan: async (cursor, options) => {
        expect(cursor).to.eql(0);
        expect(options.MATCH).to.eql(undefined);

        return {
          keys: ['animals:1', 'family:name'],
          cursor: 0,
        };
      },
    });

    const state = {};
    const result = await scan()(state);
    expect(result.data).to.eql(['animals:1', 'family:name']);
  });

  it('should return all string keys', async () => {
    setMockClient({
      scan: async (cursor, options) => {
        expect(cursor).to.eql(0);
        expect(options.MATCH).to.eql('');
        expect(options.TYPE).to.eql('string');
        return {
          keys: ['animal', 'family'],
          cursor: 0,
        };
      },
    });

    const state = {};
    const result = await scan('', { type: 'string' })(state);
    expect(result.data).to.eql(['animal', 'family']);
  });

  it('should return a string key', async () => {
    setMockClient({
      scan: async (cursor, options) => {
        expect(cursor).to.eql(0);
        expect(options.MATCH).to.eql('animal');
        expect(options.TYPE).to.eql('string');
        return {
          keys: ['animal'],
          cursor: 0,
        };
      },
    });

    const state = {};
    const result = await scan('animal', { type: 'string' })(state);
    expect(result.data).to.eql(['animal']);
  });

  it('should expand referecence', async () => {
    setMockClient({
      scan: async (cursor, options) => {
        expect(cursor).to.eql(0);
        expect(options.MATCH).to.eql('*:animals*');
        return { keys: ['animals:1'], cursor: 0 };
      },
    });

    const state = { pattern: '*:animals*' };
    const result = await scan(s => s.pattern)(state);
    expect(result.data).to.eql(['animals:1']);
  });
});

describe('hGetAll', () => {
  it('should throw if key is not specified', async () => {
    setMockClient({
      hGetAll: async () => {
        throw new Error('TypeError: Invalid argument type');
      },
    });

    const state = {};
    try {
      await hGetAll()(state);
    } catch (error) {
      expect(error.message).to.eql('TypeError: Invalid argument type');
    }
  });

  it('should return a value of a hash key', async () => {
    setMockClient({
      hGetAll: async () => ({
        name: 'Fluffy',
        species: 'cat',
        age: '3',
      }),
    });

    const state = {};
    const result = await hGetAll('animals:1')(state);
    expect(result.data).to.eql({
      name: 'Fluffy',
      species: 'cat',
      age: '3',
    });
  });

  it('should expand reference', async () => {
    setMockClient({
      hGetAll: async () => ({
        name: 'Fluffy',
        species: 'cat',
        age: '3',
      }),
    });

    const state = { key: 'animals:1' };
    const result = await hGetAll(s => s.key)(state);
    expect(result.data).to.eql({
      name: 'Fluffy',
      species: 'cat',
      age: '3',
    });
  });
});
