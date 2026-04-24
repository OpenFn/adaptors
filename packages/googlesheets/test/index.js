import { expect } from 'chai';
import sinon from 'sinon';
import { google } from 'googleapis';

import { execute, appendValues, batchUpdateValues } from '../src/index.js';


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
  it('should return early if the values array is undefined or nullish', async() => {
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

  it('should return early if the data array is empty', async() => {
    const state = {
      data: [],
    };

    const result = await batchUpdateValues({
      spreadsheetId: '123-456-789',
      data: [],
    })(state);
    expect(result).to.eql(state);
  });

  describe('with mocked Google Sheets client', () => {
    let sandbox;
    let mockBatchUpdate;

    beforeEach(() => {
      sandbox = sinon.createSandbox();

      mockBatchUpdate = sandbox.stub().resolves({
        data: { totalUpdatedCells: 3 },
      });

      sandbox.stub(google, 'sheets').returns({
        spreadsheets: {
          values: { batchUpdate: mockBatchUpdate },
        },
      });
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should send multi-range data directly to the API', async () => {
      const state = { configuration: { access_token: 'mock-token' }, data: {} };
      const multiRangeData = [
        { range: 'Sheet1!A1', values: [['value1']] },
        { range: 'Sheet1!B5', values: [['value2']] },
        { range: 'Sheet1!D10:E11', values: [['a', 'b'], ['c', 'd']] },
      ];

      await execute(
        batchUpdateValues({
          spreadsheetId: '123-456-789',
          data: multiRangeData,
          valueInputOption: 'RAW',
        })
      )(state);

      expect(mockBatchUpdate.calledOnce).to.be.true;
      const { resource } = mockBatchUpdate.firstCall.args[0];
      expect(resource.data).to.deep.equal(multiRangeData);
      expect(resource.valueInputOption).to.equal('RAW');
    });

    it('should wrap single range/values into a data array (fallback)', async () => {
      const state = { configuration: { access_token: 'mock-token' }, data: {} };

      await execute(
        batchUpdateValues({
          spreadsheetId: '123-456-789',
          range: 'Sheet1!A1:B2',
          values: [['a', 'b'], ['c', 'd']],
          valueInputOption: 'USER_ENTERED',
        })
      )(state);

      expect(mockBatchUpdate.calledOnce).to.be.true;
      const { resource } = mockBatchUpdate.firstCall.args[0];
      expect(resource.data).to.deep.equal([
        { range: 'Sheet1!A1:B2', values: [['a', 'b'], ['c', 'd']] },
      ]);
      expect(resource.valueInputOption).to.equal('USER_ENTERED');
    });
  });
});
