import { expect } from 'chai';
import { google } from 'googleapis';
import {
  sendMessageWithAttachments,
  createConnection,
  removeConnection,
  setGmailMock,
} from '../src/Utils';
import { encode, decode } from '@openfn/language-common/util';

describe('sendMessageWithAttachments', () => {
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

  describe('basic message without attachments', () => {
    it('should send a simple text message correctly', async () => {
      const message = {
        to: 'test@example.com',
        subject: 'Test Subject',
        body: 'Test message body',
      };

      const result = await sendMessageWithAttachments(message);

      expect(result).to.deep.equal({
        id: 'test-message-id',
        threadId: 'test-thread-id',
        labelIds: ['SENT'],
      });
    });

    it('should handle empty body', async () => {
      const message = {
        to: 'test@example.com',
        subject: 'Test Subject',
        body: '',
      };

      const result = await sendMessageWithAttachments(message);

      expect(result).to.have.property('id');
      expect(result).to.have.property('threadId');
      expect(result).to.have.property('labelIds');
    });
  });

  describe('message with file attachments', () => {
    it('should send a message with file attachments correctly', async () => {
      const message = {
        to: 'test@example.com',
        subject: 'Test with Attachments',
        body: 'Test message with attachments',
        attachments: [
          {
            filename: 'test.txt',
            content: 'This is test file content',
          },
          {
            filename: 'data.json',
            content: '{"key": "value"}',
          },
        ],
      };

      const result = await sendMessageWithAttachments(message);

      expect(result).to.have.property('id');
      expect(result).to.have.property('threadId');
      expect(result).to.have.property('labelIds');
    });

    it('should handle attachments with base64 content', async () => {
      const message = {
        to: 'test@example.com',
        subject: 'Test with Base64 Attachment',
        body: 'Test message',
        attachments: [
          {
            filename: 'test.txt',
            content: encode('This is test file content'),
          },
        ],
      };

      const result = await sendMessageWithAttachments(message);

      expect(result).to.have.property('id');
      expect(result).to.have.property('threadId');
      expect(result).to.have.property('labelIds');
    });
  });

  describe('message with archive attachments', () => {
    it('should send a message with archive attachments correctly', async () => {
      const message = {
        to: 'test@example.com',
        subject: 'Test with Archive',
        body: 'Test message with archive',
        attachments: [
          {
            filename: 'data.zip',
            archive: [
              {
                filename: 'file1.txt',
                content: 'Content of file 1',
              },
              {
                filename: 'file2.json',
                content: '{"data": "value"}',
              },
            ],
          },
        ],
      };

      const result = await sendMessageWithAttachments(message);

      expect(result).to.have.property('id');
      expect(result).to.have.property('threadId');
      expect(result).to.have.property('labelIds');
    });

    it('should handle multiple archive attachments', async () => {
      const message = {
        to: 'test@example.com',
        subject: 'Test with Multiple Archives',
        body: 'Test message',
        attachments: [
          {
            filename: 'archive1.zip',
            archive: [{ filename: 'doc1.txt', content: 'Document 1' }],
          },
          {
            filename: 'archive2.zip',
            archive: [{ filename: 'doc2.txt', content: 'Document 2' }],
          },
        ],
      };

      const result = await sendMessageWithAttachments(message);

      expect(result).to.have.property('id');
      expect(result).to.have.property('threadId');
      expect(result).to.have.property('labelIds');
    });
  });

  describe('mixed attachments', () => {
    it('should handle both file and archive attachments', async () => {
      const message = {
        to: 'test@example.com',
        subject: 'Test with Mixed Attachments',
        body: 'Test message',
        attachments: [
          {
            filename: 'simple.txt',
            content: 'Simple file content',
          },
          {
            filename: 'archive.zip',
            archive: [{ filename: 'inside.txt', content: 'Inside archive' }],
          },
        ],
      };

      const result = await sendMessageWithAttachments(message);

      expect(result).to.have.property('id');
      expect(result).to.have.property('threadId');
      expect(result).to.have.property('labelIds');
    });
  });

  describe('edge cases', () => {
    it('should handle null attachments', async () => {
      const message = {
        to: 'test@example.com',
        subject: 'Test Subject',
        body: 'Test message',
        attachments: null,
      };

      const result = await sendMessageWithAttachments(message);

      expect(result).to.have.property('id');
      expect(result).to.have.property('threadId');
      expect(result).to.have.property('labelIds');
    });

    it('should handle empty attachments array', async () => {
      const message = {
        to: 'test@example.com',
        subject: 'Test Subject',
        body: 'Test message',
        attachments: [],
      };

      const result = await sendMessageWithAttachments(message);

      expect(result).to.have.property('id');
      expect(result).to.have.property('threadId');
      expect(result).to.have.property('labelIds');
    });

    it('should handle undefined attachments', async () => {
      const message = {
        to: 'test@example.com',
        subject: 'Test Subject',
        body: 'Test message',
        attachments: undefined,
      };

      const result = await sendMessageWithAttachments(message);

      expect(result).to.have.property('id');
      expect(result).to.have.property('threadId');
      expect(result).to.have.property('labelIds');
    });
  });

  describe('error handling', () => {
    it('should throw error when Gmail API fails', async () => {
      // Create mock that throws error
      const mockErrorGmail = {
        users: {
          messages: {
            send: async () => {
              throw new Error('Gmail API error');
            },
          },
        },
      };

      // Set the gmail mock directly
      setGmailMock(mockErrorGmail);

      const message = {
        to: 'test@example.com',
        subject: 'Test Subject',
        body: 'Test message',
      };

      try {
        await sendMessageWithAttachments(message);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.equal(
          'Error sending message: Gmail API error'
        );
      }
    });

    it('should handle Gmail API errors with attachments', async () => {
      // Create mock that throws error
      const mockErrorGmail = {
        users: {
          messages: {
            send: async () => {
              throw new Error('Gmail API error');
            },
          },
        },
      };

      // Set the gmail mock directly
      setGmailMock(mockErrorGmail);

      const message = {
        to: 'test@example.com',
        subject: 'Test Subject',
        body: 'Test message',
        attachments: [
          {
            filename: 'test.txt',
            content: 'Test content',
          },
        ],
      };

      try {
        await sendMessageWithAttachments(message);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.equal(
          'Error sending message: Gmail API error'
        );
      }
    });
  });

  describe('function behavior validation', () => {
    it('should properly encode message in base64', async () => {
      let capturedRaw = null;

      // Create mock that captures the raw message
      const mockCapturingGmail = {
        users: {
          messages: {
            send: async args => {
              capturedRaw = args.requestBody.raw;
              return {
                data: {
                  id: 'test-message-id',
                  threadId: 'test-thread-id',
                  labelIds: ['SENT'],
                },
              };
            },
          },
        },
      };

      // Set the gmail mock directly
      setGmailMock(mockCapturingGmail);

      const message = {
        to: 'test@example.com',
        subject: 'Test Subject',
        body: 'Test message',
      };

      await sendMessageWithAttachments(message);

      // Verify it's valid base64
      expect(capturedRaw).to.match(/^[A-Za-z0-9+/=]+$/);

      // Verify it can be decoded back to the original message
      const decodedMessage = decode(capturedRaw);
      expect(decodedMessage).to.include('To: test@example.com');
      expect(decodedMessage).to.include('Subject: Test Subject');
      expect(decodedMessage).to.include('Test message');
    });

    it('should use correct line endings (\\r\\n)', async () => {
      let capturedRaw = null;

      // Create mock that captures the raw message
      const mockCapturingGmail = {
        users: {
          messages: {
            send: async args => {
              capturedRaw = args.requestBody.raw;
              return {
                data: {
                  id: 'test-message-id',
                  threadId: 'test-thread-id',
                  labelIds: ['SENT'],
                },
              };
            },
          },
        },
      };

      // Set the gmail mock directly
      setGmailMock(mockCapturingGmail);

      const message = {
        to: 'test@example.com',
        subject: 'Test Subject',
        body: 'Test message',
      };

      await sendMessageWithAttachments(message);

      const decodedMessage = decode(capturedRaw);

      // Check that line endings are \r\n
      expect(decodedMessage).to.include('\r\n');
      expect(decodedMessage).to.not.include('\n\n'); // Should not have double \n
    });
  });
});
