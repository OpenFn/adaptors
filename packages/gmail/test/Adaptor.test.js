import { expect } from 'chai';
import { google } from 'googleapis';
import { sendMessage } from '../src/Adaptor';
import { createConnection, removeConnection } from '../src/Utils';

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
