import { expect } from 'chai';
import sinon from 'sinon';
import { google } from 'googleapis';

import { execute, appendValues, batchUpdateValues, getValues } from '../src/index.js';


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
  it('should return early if the values array is undefined or nullish', async() => {
    const state = { data: [] };

    const result = await appendValues(
      '123-456-789',
      [{ range: 'Sheet!A1:E1', values: state.values }],
    )(state);
    expect(result).to.eql(state);
  });
});

describe('batchUpdateValues', () =>{
  it('should return early if data is empty', async() => {
    const state = { data: [] };

    const result = await batchUpdateValues('123-456-789', [])(state);
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

    it('should send multi-range data to the API', async () => {
      const state = { configuration: { access_token: 'mock-token' }, data: {} };
      const multiRangeData = [
        { range: 'Sheet1!A1', values: [['value1']] },
        { range: 'Sheet1!B5', values: [['value2']] },
        { range: 'Sheet1!D10:E11', values: [['a', 'b'], ['c', 'd']] },
      ];

      await execute(
        batchUpdateValues('123-456-789', multiRangeData, { valueInputOption: 'RAW' })
      )(state);

      expect(mockBatchUpdate.calledOnce).to.be.true;
      const { resource } = mockBatchUpdate.firstCall.args[0];
      expect(resource.data).to.deep.equal(multiRangeData);
      expect(resource.valueInputOption).to.equal('RAW');
    });

    it('should send a single range entry to the API', async () => {
      const state = { configuration: { access_token: 'mock-token' }, data: {} };

      await execute(
        batchUpdateValues(
          '123-456-789',
          [{ range: 'Sheet1!A1:B2', values: [['a', 'b'], ['c', 'd']] }],
          { valueInputOption: 'USER_ENTERED' }
        )
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

describe('getValues', () => {
  let sandbox;
  let mockGet;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    mockGet = sandbox.stub().resolves({
      data: { values: [['a', 'b'], ['c', 'd']] },
    });

    sandbox.stub(google, 'sheets').returns({
      spreadsheets: {
        values: { get: mockGet },
      },
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('returns state with the values from the API', async () => {
    const state = { configuration: { access_token: 'mock-token' }, data: {} };

    const result = await execute(
      getValues('123-456-789', 'Sheet1!A1:B2')
    )(state);

    expect(mockGet.calledOnce).to.be.true;
    const callArgs = mockGet.firstCall.args[0];
    expect(callArgs.spreadsheetId).to.equal('123-456-789');
    expect(callArgs.range).to.equal('Sheet1!A1:B2');
    expect(result.data).to.deep.equal({ values: [['a', 'b'], ['c', 'd']] });
  });
});
