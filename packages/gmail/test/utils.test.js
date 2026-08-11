import { expect } from 'chai';
import sinon from 'sinon';
import { google } from 'googleapis';
import {
  buildAndSendMessage,
  createConnection,
  removeConnection,
} from '../src/Utils.js';
import { encode } from '@openfn/language-common/util';

describe('buildAndSendMessage', () => {
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

  describe('basic message without attachments', () => {
    it('should send a simple text message correctly', async () => {
      const message = {
        to: 'test@example.com',
        subject: 'Test Subject',
        body: 'Test message body',
      };

      const result = await buildAndSendMessage(message);

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

      const result = await buildAndSendMessage(message);

      expect(result).to.have.property('id');
      expect(result).to.have.property('threadId');
      expect(result).to.have.property('labelIds');
    });
  });

  describe('message with file attachments', () => {
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

      const result = await buildAndSendMessage(message);

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

      const result = await buildAndSendMessage(message);

      expect(result).to.have.property('id');
      expect(result).to.have.property('threadId');
      expect(result).to.have.property('labelIds');
    });
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

      const result = await buildAndSendMessage(message);

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

      const result = await buildAndSendMessage(message);

      expect(result).to.have.property('id');
      expect(result).to.have.property('threadId');
      expect(result).to.have.property('labelIds');
    });
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

      const result = await buildAndSendMessage(message);

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

      const result = await buildAndSendMessage(message);

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

      const result = await buildAndSendMessage(message);

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

      const result = await buildAndSendMessage(message);

      expect(result).to.have.property('id');
      expect(result).to.have.property('threadId');
      expect(result).to.have.property('labelIds');
    });
  });
});

describe('createConnection', () => {
  let sandbox;
  let originalGmail;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    originalGmail = google.gmail;
    google.gmail = () => ({});
  });

  afterEach(() => {
    google.gmail = originalGmail;
    sandbox.restore();
    removeConnection();
  });

  it('uses OAuth2 when access_token is provided', async () => {
    const oauth2Spy = sandbox.spy(google.auth, 'OAuth2');

    await createConnection({ configuration: { access_token: 'mock-token' } });

    expect(oauth2Spy.calledOnce).to.be.true;
  });

  it('uses JWT auth when private_key and client_email are provided', async () => {
    const mockJwt = { authorize: sandbox.stub().resolves() };
    const jwtStub = sandbox.stub(google.auth, 'JWT').returns(mockJwt);

    await createConnection({
      configuration: {
        private_key:
          '-----BEGIN RSA PRIVATE KEY-----\nMOCK\n-----END RSA PRIVATE KEY-----',
        client_email: 'service@project-id.iam.gserviceaccount.com',
      },
    });

    expect(jwtStub.calledOnce).to.be.true;
    const jwtArgs = jwtStub.getCall(0).args[0];
    expect(jwtArgs.email).to.equal(
      'service@project-id.iam.gserviceaccount.com',
    );
    expect(jwtArgs.scopes).to.deep.equal([
      'https://mail.google.com/',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
      'openid',
    ]);
  });

  it('calls authorize() to fetch an initial access token for JWT auth', async () => {
    const mockJwt = { authorize: sandbox.stub().resolves() };
    sandbox.stub(google.auth, 'JWT').returns(mockJwt);

    await createConnection({
      configuration: {
        private_key:
          '-----BEGIN RSA PRIVATE KEY-----\nMOCK\n-----END RSA PRIVATE KEY-----',
        client_email: 'service@project-id.iam.gserviceaccount.com',
      },
    });

    expect(mockJwt.authorize.calledOnce).to.be.true;
  });

  it('passes subject to JWT when provided for domain-wide delegation', async () => {
    const mockJwt = { authorize: sandbox.stub().resolves() };
    const jwtStub = sandbox.stub(google.auth, 'JWT').returns(mockJwt);

    await createConnection({
      configuration: {
        private_key:
          '-----BEGIN RSA PRIVATE KEY-----\nMOCK\n-----END RSA PRIVATE KEY-----',
        client_email: 'service@project-id.iam.gserviceaccount.com',
        subject: 'user@yourdomain.com',
      },
    });

    const jwtArgs = jwtStub.getCall(0).args[0];
    expect(jwtArgs.subject).to.equal('user@yourdomain.com');
  });

  it('does not call OAuth2 when service account credentials are used', async () => {
    const mockJwt = { authorize: sandbox.stub().resolves() };
    sandbox.stub(google.auth, 'JWT').returns(mockJwt);
    const oauth2Spy = sandbox.spy(google.auth, 'OAuth2');

    await createConnection({
      configuration: {
        private_key:
          '-----BEGIN RSA PRIVATE KEY-----\nMOCK\n-----END RSA PRIVATE KEY-----',
        client_email: 'service@project-id.iam.gserviceaccount.com',
      },
    });

    expect(oauth2Spy.called).to.be.false;
  });
});
