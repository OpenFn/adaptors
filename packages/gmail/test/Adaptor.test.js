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
    // Store original google.gmail function
    originalGmail = google.gmail;

    // Create mock Gmail API response
    const mockResponse = {
      data: {
        id: 'test-message-id',
        threadId: 'test-thread-id',
        labelIds: ['SENT'],
      },
    };

    // Create mock send function
    sendStub = async () => mockResponse;

    // Create mock Gmail object
    mockGmail = {
      users: {
        messages: {
          send: sendStub,
        },
      },
    };

    // Replace google.gmail with mock
    google.gmail = () => mockGmail;

    // Initialize the connection with mock data
    createConnection({
      configuration: {
        access_token: 'mock-access-token',
      },
    });
  });

  afterEach(() => {
    // Restore original google.gmail function
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
    // Mock Gmail API to simulate an error
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
