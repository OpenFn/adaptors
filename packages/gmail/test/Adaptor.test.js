import { expect } from 'chai';
import { google } from 'googleapis';
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

  beforeEach(() => {
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
          ],
          headers: [],
        },
      },
    };

    mockGmail = {
      users: {
        messages: {
          list: async () => listResponse,
          get: async () => getResponse,
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
});
