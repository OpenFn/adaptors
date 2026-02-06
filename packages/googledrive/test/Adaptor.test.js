import { expect } from 'chai';
import sinon from 'sinon';
import { google } from 'googleapis';
import { execute, create, get, update, list } from '../src/index.js';

describe('Google Drive Adaptor', () => {
  let sandbox;
  let mockDrive;
  let mockFiles;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    // Mock OAuth2 authentication
    const mockAuth = new google.auth.OAuth2();
    sandbox.stub(mockAuth, 'credentials').value({ access_token: 'mockToken' });

    // Mock Google Drive API
    mockFiles = {
      create: sandbox
        .stub()
        .resolves({ data: { id: 'file123', name: 'test.txt' } }),
      get: sandbox.stub().resolves({ data: Buffer.from('file content') }),
      update: sandbox
        .stub()
        .resolves({ data: { id: 'file123', name: 'updated.txt' } }),
      list: sandbox.stub().resolves({
        data: {
          files: [
            {
              id: 'file123',
              name: 'test.txt',
              mimeType: 'text/plain',
              createdTime: '2024-01-01T00:00:00.000Z',
              modifiedTime: '2024-01-01T00:00:00.000Z',
            },
            {
              id: 'file456',
              name: 'test2.txt',
              mimeType: 'text/plain',
              createdTime: '2024-01-02T00:00:00.000Z',
              modifiedTime: '2024-01-02T00:00:00.000Z',
            },
          ],
        },
      }),
    };
    mockDrive = { files: mockFiles };
    sandbox.stub(google, 'drive').returns(mockDrive);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('create()', () => {
    it('should upload a file successfully', async () => {
      const state = { configuration: { access_token: 'mockToken' } };

      const content = Buffer.from('file content').toString('base64');
      const fileName = 'test.txt';

      const result = await execute(create(content, fileName))(state);
      expect(mockFiles.create.calledOnce).to.be.true;
      expect(result.data).to.have.property('id', 'file123');
    });
  });

  describe('get()', () => {
    it('should download a file successfully', async () => {
      const state = { configuration: { access_token: 'mockToken' } };
      const fileId = 'file123';

      const result = await execute(get(fileId))(state);

      //Expected 2 calls: one for metadata and one for content
      expect(mockFiles.get.calledTwice).to.be.true;
      expect(result.data.content).to.equal(
        Buffer.from('file content').toString('base64'),
      );
    });
  });

  describe('update()', () => {
    it('should update a file successfully', async () => {
      const state = { configuration: { access_token: 'mockToken' } };
      const fileId = 'file123';
      const content = Buffer.from('new content').toString('base64');
      const fileName = 'updated.txt';

      const result = await execute(update(fileId, content, fileName))(state);
      expect(mockFiles.update.calledOnce).to.be.true;
      expect(result.data).to.have.property('name', 'updated.txt');
    });
  });

  describe('list()', () => {
    it('should list files successfully with folderId', async () => {
      const state = { configuration: { access_token: 'mockToken' } };

      const result = await execute(list('folder123'))(state);

      expect(mockFiles.list.calledOnce).to.be.true;
      expect(result.data).to.be.an('array').with.lengthOf(2);
      expect(result.data[0]).to.have.property('id', 'file123');
      expect(result.data[0]).to.have.property('name', 'test.txt');
    });

    it('should list files with folderId option', async () => {
      const state = { configuration: { access_token: 'mockToken' } };

      const result = await execute(list('folder123'))(state);
      expect(mockFiles.list.calledOnce).to.be.true;

      const callArgs = mockFiles.list.getCall(0).args[0];
      expect(callArgs.q).to.include("'folder123' in parents");
      expect(result.data).to.be.an('array');
    });

    it('should throw an error when folderId is missing', async () => {
      const state = { configuration: { access_token: 'mockToken' } };

      try {
        await execute(list())(state);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.include('folderId is required');
      }
    });

    it('should throw an error when folderId is not a string', async () => {
      const state = { configuration: { access_token: 'mockToken' } };

      try {
        await execute(list({ folderId: 123 }))(state);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.include('folderId is required');
      }
    });

    it('should throw an error when folderId is null', async () => {
      const state = { configuration: { access_token: 'mockToken' } };

      try {
        await execute(list(null))(state);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.include('folderId is required');
      }
    });
  });
});
