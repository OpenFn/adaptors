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
  it('should throw field value is not specified', async () => {
    setMockClient({
      hGet: async () => {
        throw new Error('TypeError: Invalid argument type');
      },
    });
    const state = {};
    try {
      await hget('animals:1')(state);
    } catch (error) {
      expect(error.message).to.eql('TypeError: Invalid argument type');
    }
  });
  it('should expand references', async () => {
    setMockClient({
      hGet: async () => 'cat',
    });
    const state = { key: 'animals:1', value: 'species' };
    const result = await hget(
      s => s.key,
      s => s.species
    )(state);
    expect(result.data).to.eql('cat');
  });
});

describe('set', () => {
  it('should set a value for a key', async () => {
    setMockClient({
      set: async () => 'OK',
    });

    const state = {};
    const result = await set('name', 'kwaku')(state);
    expect(result.data).to.eql('OK');
  });
  it('should expand references', async () => {
    setMockClient({
      set: async () => 'OK',
    });
    const state = { key: 'name', value: 'mtuchi' };
    const result = await set(
      s => s.key,
      s => s.value
    )(state);
    expect(result.data).to.eql('OK');
  });
  it('should throw an error if key and value is not specified', async () => {
    setMockClient({
      set: async () => {
        throw new Error('TypeError: Invalid argument type');
      },
    });

    const state = {};
    try {
      await set()(state);
    } catch (error) {
      expect(error.message).to.eql('TypeError: Invalid argument type');
    }
  });
  it('should throw an error if value is not specified', async () => {
    setMockClient({
      set: async () => {
        throw new Error('TypeError: Invalid argument type');
      },
    });

    const state = {};
    try {
      await set('patient')(state);
    } catch (error) {
      expect(error.message).to.eql('TypeError: Invalid argument type');
    }
  });
  it('should throw an error if key is not specified', async () => {
    setMockClient({
      set: async () => {
        throw new Error('TypeError: Invalid argument type');
      },
    });

    const state = {};
    try {
      await set('', 'kwaku')(state);
    } catch (error) {
      expect(error.message).to.eql('TypeError: Invalid argument type');
    }
  });
});

describe('hset', () => {
  it('should set fields value for a specified key', async () => {
    setMockClient({
      hSet: async () => 1,
    });

    const state = {};
    const result = await hset('patient', { name: 'kwaku' })(state);
    expect(result.data).to.eql(1);
  });
  it('should expand references', async () => {
    setMockClient({
      hSet: async () => 1,
    });
    const state = { key: 'patient', value: { name: 'mtuchi' } };
    const result = await hset(
      s => s.key,
      s => s.value
    )(state);
    expect(result.data).to.eql(1);
  });
  it('should throw an error if key and value is not specified', async () => {
    setMockClient({
      hSet: async () => {
        throw new Error(
          'TypeError: Cannot convert undefined or null to object'
        );
      },
    });

    const state = {};
    try {
      await hset()(state);
    } catch (error) {
      expect(error.message).to.eql(
        'TypeError: Cannot convert undefined or null to object'
      );
    }
  });
  it('should throw an error if value is not specified', async () => {
    setMockClient({
      hSet: async () => {
        throw new Error(
          'TypeError: Cannot convert undefined or null to object'
        );
      },
    });

    const state = {};
    try {
      await hset('patient')(state);
    } catch (error) {
      expect(error.message).to.eql(
        'TypeError: Cannot convert undefined or null to object'
      );
    }
  });
  it('should set an empt key if key is not specified', async () => {
    setMockClient({
      hSet: async () => 1,
    });

    const state = {};
    const result = await hset('', { name: 'kwaku' })(state);
    expect(result.data).to.eql(1);
  });
});
describe('scan', () => {
  it('should return empty array if key not found', async () => {
    setMockClient({
      scan: async () => ({ keys: [], cursor: 0 }),
    });
    const state = {};
    const result = await scan('*:abc*')(state);
    expect(result.data).to.eql([]);
    expect(result.cursor).to.eql(0);
  });
  it('should return collection of keys', async () => {
    setMockClient({
      scan: async () => ({ keys: ['noderedis:animals:1'], cursor: 0 }),
    });

    const state = {};
    const result = await scan('*:animals*')(state);
    expect(result.data).to.eql(['noderedis:animals:1']);
    expect(result.cursor).to.eql(0);
  });
  it('should return all hash keys', async () => {
    setMockClient({
      scan: async () => ({
        keys: ['animals:1', 'family:name'],
        cursor: 0,
      }),
    });

    const state = {};
    const result = await scan()(state);
    expect(result.data).to.eql(['animals:1', 'family:name']);
    expect(result.cursor).to.eql(0);
  });

  it('should return all string keys', async () => {
    setMockClient({
      scan: async () => ({
        keys: ['animal', 'family'],
        cursor: 0,
      }),
    });

    const state = {};
    const result = await scan('', { type: 'string' })(state);
    expect(result.data).to.eql(['animal', 'family']);
    expect(result.cursor).to.eql(0);
  });

  it('should return a string key', async () => {
    setMockClient({
      scan: async () => ({
        keys: ['animal'],
        cursor: 0,
      }),
    });

    const state = {};
    const result = await scan('animal', { type: 'string' })(state);
    expect(result.data).to.eql(['animal']);
    expect(result.cursor).to.eql(0);
  });

  it('should expand referecence', async () => {
    setMockClient({
      scan: async () => ({ keys: ['animals:1'], cursor: 0 }),
    });

    const state = { pattern: '*:animals*' };
    const result = await scan(s => s.pattern)(state);
    expect(result.data).to.eql(['animals:1']);
    expect(result.cursor).to.eql(0);
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
