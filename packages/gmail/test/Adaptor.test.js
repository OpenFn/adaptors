import { expect } from 'chai';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { google } from 'googleapis';
import xlsx from 'xlsx';
import { getContentsFromMessages, sendMessage } from '../src/Adaptor.js';
import { createConnection, removeConnection } from '../src/Utils.js';

const state = {
  configuration: {
    access_token: 'mock-access-token',
  },
};
describe('sendMessage', () => {
  let originalGmail;
  let mockGmail;
  let sendStub;

  beforeEach(async () => {
    originalGmail = google.gmail;

    const mockResponse = {
      data: {
        id: 'test-message-id',
        threadId: 'test-thread-id',
        labelIds: ['SENT'],
      },
    };

    sendStub = async () => mockResponse;

    mockGmail = {
      users: {
        messages: {
          send: sendStub,
        },
      },
    };

    google.gmail = () => mockGmail;

    await createConnection({
      configuration: {
        access_token: 'mock-access-token',
      },
    });
  });

  afterEach(() => {
    google.gmail = originalGmail;
    removeConnection();
  });

  it('should send a message successfully', async () => {
    const params = {
      to: 'test@example.com',
      subject: 'Test Subject',
      body: 'Test Body',
    };

    const { data } = await sendMessage(params)(state);

    expect(data).to.deep.equal([
      {
        id: 'test-message-id',
        threadId: 'test-thread-id',
        labelIds: ['SENT'],
      },
    ]);
  });

  it('should throw an error if required params are missing', async () => {
    mockGmail.users.messages.send = async () => {
      throw new Error('Required parameter: recipient');
    };
    const params = {
      subject: 'Test Subject',
      body: 'Test Body',
    };

    try {
      await sendMessage(params)(state);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.include('Required parameter');
    }
  });
});

describe('getContentsFromMessages', () => {
  let originalGmail;
  let mockGmail;

  const bodyText = 'Hello';

  // Load the real xlsx fixture through sheetjs and convert it to the
  // base64-encoded binary that Gmail's attachments.get endpoint returns.
  const workbook = xlsx.read(
    readFileSync(fileURLToPath(new URL('./test.xlsx', import.meta.url))),
    { type: 'buffer' },
  );
  const sheetData = xlsx.write(workbook, {
    type: 'base64',
    bookType: 'xlsx',
  });

  beforeEach(() => {
    originalGmail = google.gmail;

    const listResponse = {
      data: {
        messages: [{ id: 'test-message-id' }],
        nextPageToken: null,
      },
    };

    const getResponse = {
      data: {
        payload: {
          parts: [
            {
              mimeType: 'multipart/alternative',
              parts: [
                {
                  mimeType: 'text/plain',
                  body: { data: Buffer.from(bodyText).toString('base64') },
                },
              ],
            },
            {
              mimeType:
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              filename: 'test.xlsx',
              body: { attachmentId: 'a' },
              headers: [
                {
                  name: 'Content-Type',
                  value:
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; name="test.xlsx"',
                },
              ],
            },
            {
              mimeType: 'text/plain',
              filename: 'greeting.txt',
              body: { attachmentId: 'b' },
              headers: [
                {
                  name: 'Content-Type',
                  value: 'text/plain',
                },
              ],
            },
            {
              mimeType: 'application/json',
              filename: 'data.json',
              body: { attachmentId: 'c' },
              headers: [
                {
                  name: 'Content-Type',
                  value: 'application/json',
                },
              ],
            },
          ],
          headers: [],
        },
      },
    };

    const attachmentA = {
      data: {
        data: sheetData,
      },
    };

    const attachmentB = {
      data: {
        data: Buffer.from('hello').toString('base64'),
      },
    };

    const attachmentC = {
      data: {
        data: Buffer.from('{ "x": 1 }').toString('base64'),
      },
    };

    mockGmail = {
      users: {
        messages: {
          list: async () => listResponse,
          get: async () => getResponse,
          attachments: {
            get: async ({ id }) => {
              if (id === 'a') {
                return attachmentA;
              }
              if (id === 'b') {
                return attachmentB;
              }
              if (id === 'c') {
                return attachmentC;
              }
            },
          },
        },
      },
    };

    google.gmail = () => mockGmail;

    createConnection({
      configuration: {
        access_token: 'mock-access-token',
      },
    });
  });

  afterEach(() => {
    google.gmail = originalGmail;
    removeConnection();
  });

  it('should get the body from a message', async () => {
    const { data } = await getContentsFromMessages({ contents: ['body'] })(
      state,
    );

    expect(data[0].messageId).to.equal('test-message-id');
    expect(data[0].body).to.equal(bodyText);
  });

  it('should get an XLSX attachment', async () => {
    const { data } = await getContentsFromMessages({
      contents: [
        {
          type: 'file',
          name: 'sheet',
          file: /.xlsx$/,
        },
      ],
    })(state);

    const expected = {
      Sheet1: [
        ['name', 'age'],
        ['Alice', 30],
        ['Bob', 25],
      ],
    };
    expect(data[0].sheet.content).to.eql(expected);
  });

  it('should get a plaintext attachment', async () => {
    const { data } = await getContentsFromMessages({
      contents: [
        {
          type: 'file',
          name: 'text',
          file: /.txt$/,
        },
      ],
    })(state);

    expect(data[0].text.content).to.eql('hello');
  });

  it('should get a json attachment', async () => {
    const { data } = await getContentsFromMessages({
      contents: [
        {
          type: 'file',
          name: 'json',
          file: /.json$/,
        },
      ],
    })(state);

    expect(data[0].json.content).to.eql({ x: 1 });
  });

  it('should force an attachment to plaintext', async () => {
    const { data } = await getContentsFromMessages({
      contents: [
        {
          type: 'file',
          name: 'json',
          file: /.json$/,
          parseAs: 'text',
        },
      ],
    })(state);

    expect(data[0].json.content).to.eql('{ "x": 1 }');
  });
});
