import { expect } from 'chai';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { google } from 'googleapis';
import xlsx from 'xlsx';
import {
  getContentsFromMessages,
  getMessageById,
  sendMessage,
} from '../src/Adaptor.js';
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
  let attachmentGetCalls;
  let getCalls;
  let listCalls;

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
    attachmentGetCalls = 0;
    getCalls = [];
    listCalls = 0;

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
            {
              mimeType: 'application/zip',
              filename: 'data.zip',
              body: { attachmentId: 'd' },
              headers: [
                {
                  name: 'Content-Type',
                  value: 'application/zip',
                },
              ],
            },
          ],
          headers: [
            {
              name: 'From',
              value: 'sender@example.org',
            },
            {
              name: 'Date',
              value: 'Thu, 23 Jul 2026 08:55:46 +0000',
            },
            {
              name: 'Subject',
              value: 'Monthly report',
            },
          ],
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
          list: async () => {
            listCalls += 1;
            return listResponse;
          },
          get: async params => {
            getCalls.push(params);
            return getResponse;
          },
          attachments: {
            get: async ({ id }) => {
              attachmentGetCalls += 1;
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

  it('should skip file and archive attachments when fetching is disabled', async () => {
    const result = await getContentsFromMessages({
      contents: [
        'body',
        {
          type: 'file',
          name: 'text',
          file: /.txt$/,
        },
        {
          type: 'archive',
          name: 'archive',
          archive: /.zip$/,
          file: /.json$/,
        },
      ],
      fetchAttachments: false,
    })(state);

    expect(result.data[0].messageId).to.equal('test-message-id');
    expect(result.data[0].from).to.equal('sender@example.org');
    expect(result.data[0].date).to.eql(
      new Date('Thu, 23 Jul 2026 08:55:46 +0000'),
    );
    expect(result.data[0].subject).to.equal('Monthly report');
    expect(result.data[0].body).to.equal(bodyText);
    expect(result.data[0].text).to.eql({ filename: 'greeting.txt' });
    expect(result.data[0].archive).to.eql({ archiveFilename: 'data.zip' });
    expect(result.processedIds).to.eql(['test-message-id']);
    expect(attachmentGetCalls).to.equal(0);
  });

  it('should fetch attachments when explicitly enabled', async () => {
    const { data } = await getContentsFromMessages({
      contents: [
        {
          type: 'file',
          name: 'text',
          file: /.txt$/,
        },
      ],
      fetchAttachments: true,
    })(state);

    expect(data[0].text.content).to.equal('hello');
    expect(attachmentGetCalls).to.equal(1);
  });

  it('should return null for unmatched attachments when fetching is disabled', async () => {
    const { data } = await getContentsFromMessages({
      contents: [
        {
          type: 'file',
          name: 'missing',
          file: /\.pdf$/,
        },
      ],
      fetchAttachments: false,
    })(state);

    expect(data[0].missing).to.equal(null);
    expect(attachmentGetCalls).to.equal(0);
  });

  it('should request metadata format when only header contents are requested', async () => {
    const { data } = await getContentsFromMessages({
      contents: ['subject'],
    })(state);

    expect(getCalls[0].format).to.equal('metadata');
    expect(getCalls[0].metadataHeaders).to.eql(['From', 'Date', 'Subject']);
    expect(data[0].from).to.equal('sender@example.org');
    expect(data[0].date).to.eql(new Date('Thu, 23 Jul 2026 08:55:46 +0000'));
    expect(data[0].subject).to.equal('Monthly report');
  });

  it('should request full format when body is requested', async () => {
    await getContentsFromMessages({ contents: ['body'] })(state);

    expect(getCalls[0].format).to.equal('full');
  });

  it('should request full format for attachment contents even when fetching is disabled', async () => {
    await getContentsFromMessages({
      contents: [
        {
          type: 'file',
          name: 'text',
          file: /.txt$/,
        },
      ],
      fetchAttachments: false,
    })(state);

    expect(getCalls[0].format).to.equal('full');
    expect(attachmentGetCalls).to.equal(0);
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

describe('getMessageById', () => {
  let originalGmail;
  let mockGmail;
  let attachmentGetCalls;
  let getCalls;
  let listCalls;

  const getResponse = {
    data: {
      payload: {
        parts: [
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
        ],
        headers: [
          {
            name: 'From',
            value: 'sender@example.org',
          },
          {
            name: 'Date',
            value: 'Thu, 23 Jul 2026 08:55:46 +0000',
          },
          {
            name: 'Subject',
            value: 'Monthly report',
          },
        ],
      },
    },
  };

  beforeEach(() => {
    originalGmail = google.gmail;
    attachmentGetCalls = 0;
    getCalls = [];
    listCalls = 0;

    mockGmail = {
      users: {
        messages: {
          list: async () => {
            listCalls += 1;
            return { data: { messages: [] } };
          },
          get: async params => {
            getCalls.push(params);
            return getResponse;
          },
          attachments: {
            get: async () => {
              attachmentGetCalls += 1;
              return { data: { data: Buffer.from('hello').toString('base64') } };
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

  it('should fetch a message by id without calling list', async () => {
    const { data } = await getMessageById('test-message-id', {
      contents: [
        {
          type: 'file',
          name: 'text',
          file: /.txt$/,
        },
      ],
    })(state);

    expect(listCalls).to.equal(0);
    expect(getCalls.length).to.equal(1);
    expect(getCalls[0].id).to.equal('test-message-id');
    expect(data.messageId).to.equal('test-message-id');
    expect(data.text.content).to.equal('hello');
    expect(attachmentGetCalls).to.equal(1);
  });

  it('should return the message as a single object, not an array', async () => {
    const { data } = await getMessageById('test-message-id')(state);

    expect(Array.isArray(data)).to.equal(false);
    expect(data.messageId).to.equal('test-message-id');
  });

  it('should default to from, date and subject with metadata format', async () => {
    const { data } = await getMessageById('test-message-id')(state);

    expect(getCalls[0].format).to.equal('metadata');
    expect(data.from).to.equal('sender@example.org');
    expect(data.date).to.eql(new Date('Thu, 23 Jul 2026 08:55:46 +0000'));
    expect(data.subject).to.equal('Monthly report');
  });

  it('should not set state.processedIds', async () => {
    const result = await getMessageById('test-message-id')(state);

    expect(result.processedIds).to.equal(undefined);
  });

  it('should pass through an existing state.processedIds cursor unchanged', async () => {
    const stateWithCursor = {
      ...state,
      processedIds: ['already-done'],
    };

    const result = await getMessageById('test-message-id')(stateWithCursor);

    expect(result.processedIds).to.eql(['already-done']);
  });

  it('should use options.email as the userId', async () => {
    await getMessageById('test-message-id', {
      email: 'delegate@example.org',
    })(state);

    expect(getCalls[0].userId).to.equal('delegate@example.org');
  });

  it('should return filename-only attachments when fetching is disabled', async () => {
    const { data } = await getMessageById('test-message-id', {
      contents: [
        {
          type: 'file',
          name: 'text',
          file: /.txt$/,
        },
      ],
      fetchAttachments: false,
    })(state);

    expect(data.text).to.eql({ filename: 'greeting.txt' });
    expect(attachmentGetCalls).to.equal(0);
  });

  [undefined, ['array-of-ids'], 42].forEach(badMessageId => {
    it(`should throw when messageId is ${JSON.stringify(badMessageId)}`, async () => {
      try {
        await getMessageById(badMessageId)(state);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.include('must be a non-empty string');
      }
    });
  });

  it('should throw when messageId is not a non-empty string', async () => {
    try {
      await getMessageById('')(state);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.include('must be a non-empty string');
    }
  });

  it('should include the message id when messages.get fails', async () => {
    mockGmail.users.messages.get = async () => {
      throw new Error('Requested entity was not found.');
    };

    try {
      await getMessageById('bad-id')(state);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.include('bad-id');
      expect(error.message).to.include('Requested entity was not found.');
    }
  });
});
