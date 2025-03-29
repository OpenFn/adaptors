import { expect } from 'chai';

import { execute, fn } from '../src';
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

describe('fn function', () => {
  let mockFunc, mockState, mockSheetsClient, mockReturnValue;

  beforeEach(()=> {
    // mock call back function
    mockFunc = (state, sheetsClient) => {
          sheetsClient.values.get({
          spreadsheetId: 'abc',
          range: 'Sheet1!A1:E1'
        });
          return mockReturnValue;
    };

    // mock return value
    mockReturnValue = [
      ['From expression', '$15', '2', '3/15/2016'],
      ['Really now!', '$100', '1', '3/20/2016'],
    ];

    mockState = { key: 'value' };

    // simulate values.get function on Google sheets
    mockSheetsClient = {
      values: {
        get: ({spreadsheetId, range}) => {
          return {
            values: mockReturnValue
          }
        }
      }
    }
  });

  it('should return an operation', () => {
    const operation = fn(mockFunc)
    expect(operation).to.be.a('Function')
  });

  it('should call the passed function with state and sheetsClient', () => {
    const operation = fn(mockFunc);
    const result = operation(mockState, mockSheetsClient);
    expect(result).to.eql(mockReturnValue)
  });
});
