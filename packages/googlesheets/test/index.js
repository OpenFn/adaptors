import { expect } from 'chai';

import { execute } from '../src';
import { appendValues, batchUpdateValues } from '../src';

describe('execute', () => {
  it('executes each operation in sequence', done => {
    const state = { configuration: {}, data: {} };
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

  it('assigns references, data to the initialState', () => {
    const state = { configuration: {}, data: {} };

    execute()(state).then(finalState => {
      expect(finalState).to.eql({
        references: [],
        data: null,
      });
    });
  });
});


describe('append', () =>{
  it('should  return early if the values array is undefined or nullish', async() => {
    const state = {
      data: [],
    }

    const result = await appendValues({
      spreadsheetId: '123-456-789',
      range: 'Sheet!A1:E1',
      values: state.values,
    })(state);
    expect(result).to.eql(state);
  });
});

describe('batchUpdateValues', () =>{
  it('should  return early if the values array is undefined or nullish', async() => {
    const state = {
      data: [],
    }

    const result = await batchUpdateValues({
      spreadsheetId: '123-456-789',
      range: 'Sheet!A1:E1',
      values: state.values,
    })(state);
    expect(result).to.eql(state);
  });
});
