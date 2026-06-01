import { expect } from 'chai';
import sinon from 'sinon';
import { google } from 'googleapis';
import {
  execute,
  appendValues,
  batchUpdateValues,
  getValues,
} from '../src/index.js';

describe('Google Sheets Adaptor', () => {
  let sandbox;
  let mockSheets;
  let mockValues;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    mockValues = {
      append: sandbox.stub().callsFake((params, callback) => {
        callback(null, { data: { updates: { updatedCells: 5 } } });
      }),
      batchUpdate: sandbox.stub().resolves({ data: { totalUpdatedCells: 5 } }),
      get: sandbox.stub().resolves({
        data: { values: [['Name', 'Score'], ['Alice', '42']] },
      }),
    };
    mockSheets = { spreadsheets: { values: mockValues } };
    sandbox.stub(google, 'sheets').returns(mockSheets);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('execute()', () => {
    it('executes each operation in sequence', async () => {
      const state = { configuration: { access_token: 'mockToken' }, data: {} };
      const operations = [
        state => ({ ...state, counter: 1 }),
        state => ({ ...state, counter: 2 }),
        state => ({ ...state, counter: 3 }),
      ];

      const result = await execute(...operations)(state);
      expect(result.counter).to.equal(3);
    });

    it('seeds references and data defaults when not present in state', async () => {
      const state = { configuration: { access_token: 'mockToken' } };

      const result = await execute()(state);
      expect(result.references).to.eql([]);
      expect(result.data).to.be.null;
    });
  });

  describe('appendValues()', () => {
    it('appends rows to a spreadsheet', async () => {
      const state = { configuration: { access_token: 'mockToken' } };

      await execute(
        appendValues({
          spreadsheetId: 'sheet123',
          range: 'Sheet1!A1:B1',
          values: [['Alice', '42']],
        })
      )(state);

      expect(mockValues.append.calledOnce).to.be.true;
      const args = mockValues.append.getCall(0).args[0];
      expect(args.spreadsheetId).to.equal('sheet123');
      expect(args.range).to.equal('Sheet1!A1:B1');
    });

    it('returns early without calling the API when values is empty', async () => {
      const state = { configuration: { access_token: 'mockToken' } };

      await execute(
        appendValues({
          spreadsheetId: 'sheet123',
          range: 'Sheet1!A1:B1',
          values: [],
        })
      )(state);

      expect(mockValues.append.called).to.be.false;
    });

    it('returns early without calling the API when values is undefined', async () => {
      const state = { configuration: { access_token: 'mockToken' }, data: [] };

      const result = await appendValues({
        spreadsheetId: 'sheet123',
        range: 'Sheet1!A1:B1',
        values: state.values,
      })(state);

      expect(result).to.eql(state);
      expect(mockValues.append.called).to.be.false;
    });
  });

  describe('batchUpdateValues()', () => {
    it('batch updates cells in a spreadsheet', async () => {
      const state = { configuration: { access_token: 'mockToken' } };

      const result = await execute(
        batchUpdateValues({
          spreadsheetId: 'sheet123',
          range: 'Sheet1!A1:B1',
          values: [['Alice', '42']],
        })
      )(state);

      expect(mockValues.batchUpdate.calledOnce).to.be.true;
      const args = mockValues.batchUpdate.getCall(0).args[0];
      expect(args.spreadsheetId).to.equal('sheet123');
      expect(result.data.totalUpdatedCells).to.equal(5);
    });

    it('defaults valueInputOption to USER_ENTERED', async () => {
      const state = { configuration: { access_token: 'mockToken' } };

      await execute(
        batchUpdateValues({
          spreadsheetId: 'sheet123',
          range: 'Sheet1!A1:B1',
          values: [['Alice', '42']],
        })
      )(state);

      const args = mockValues.batchUpdate.getCall(0).args[0];
      expect(args.resource.valueInputOption).to.equal('USER_ENTERED');
    });

    it('returns early without calling the API when values is empty', async () => {
      const state = { configuration: { access_token: 'mockToken' } };

      await execute(
        batchUpdateValues({
          spreadsheetId: 'sheet123',
          range: 'Sheet1!A1:B1',
          values: [],
        })
      )(state);

      expect(mockValues.batchUpdate.called).to.be.false;
    });
  });

  describe('getValues()', () => {
    it('retrieves cell values from a spreadsheet', async () => {
      const state = { configuration: { access_token: 'mockToken' } };

      const result = await execute(getValues('sheet123', 'Sheet1!A1:B2'))(state);

      expect(mockValues.get.calledOnce).to.be.true;
      const args = mockValues.get.getCall(0).args[0];
      expect(args.spreadsheetId).to.equal('sheet123');
      expect(args.range).to.equal('Sheet1!A1:B2');
      expect(result.data.values).to.deep.equal([
        ['Name', 'Score'],
        ['Alice', '42'],
      ]);
    });
  });

  describe('service account auth', () => {
    const serviceAccountState = {
      configuration: {
        private_key:
          '-----BEGIN RSA PRIVATE KEY-----\nMOCK_KEY\n-----END RSA PRIVATE KEY-----',
        client_email: 'service@project-id.iam.gserviceaccount.com',
      },
    };

    it('uses JWT auth when private_key and client_email are provided', async () => {
      const mockJwt = { authorize: sandbox.stub().resolves() };
      const jwtStub = sandbox.stub(google.auth, 'JWT').returns(mockJwt);

      await execute(
        appendValues({
          spreadsheetId: 'sheet123',
          range: 'Sheet1!A1:B1',
          values: [['Alice', '42']],
        })
      )(serviceAccountState);

      expect(jwtStub.calledOnce).to.be.true;
      const jwtArgs = jwtStub.getCall(0).args[0];
      expect(jwtArgs.email).to.equal('service@project-id.iam.gserviceaccount.com');
      expect(jwtArgs.scopes).to.deep.equal([
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
        'openid',
      ]);
    });

    it('does not call OAuth2 when service account credentials are used', async () => {
      const mockJwt = { authorize: sandbox.stub().resolves() };
      const jwtStub = sandbox.stub(google.auth, 'JWT').returns(mockJwt);
      const oauth2Spy = sandbox.spy(google.auth, 'OAuth2');

      await execute(
        appendValues({
          spreadsheetId: 'sheet123',
          range: 'Sheet1!A1:B1',
          values: [['Alice', '42']],
        })
      )(serviceAccountState);

      expect(jwtStub.calledOnce).to.be.true;
      expect(oauth2Spy.called).to.be.false;
    });
  });
});
