import { expect } from 'chai';
import sinon from 'sinon';
import { google } from 'googleapis';

import { execute, appendValues, batchUpdateValues, getValues } from '../src/index.js';

describe('appendValues', () => {
  let sandbox;
  let mockAppend;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    mockAppend = sandbox.stub().callsArgWith(1, null, {
      data: { updates: { updatedCells: 4 } },
    });

    sandbox.stub(google, 'sheets').returns({
      spreadsheets: {
        values: { append: mockAppend },
      },
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('appends rows to the given range', async () => {
    const state = { configuration: { access_token: 'mock-token' }, data: {} };

    const result = await execute(
      appendValues('123-456-789', 'Sheet1!A1:B1', [['a', 'b'], ['c', 'd']])
    )(state);

    expect(mockAppend.calledOnce).to.be.true;
    const callArgs = mockAppend.firstCall.args[0];
    expect(callArgs.spreadsheetId).to.equal('123-456-789');
    expect(callArgs.range).to.equal('Sheet1!A1:B1');
    expect(callArgs.resource.values).to.deep.equal([['a', 'b'], ['c', 'd']]);
    expect(result.data).to.deep.equal({ updates: { updatedCells: 4 } });
  });
});

describe('batchUpdateValues', () => {
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

  it('sends multi-range data to the API', async () => {
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

  it('sends a single range entry to the API', async () => {
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
