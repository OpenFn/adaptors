import { expect } from 'chai';
import sinon from 'sinon';
import fs from 'fs';
import { PassThrough } from 'stream';
import { google } from 'googleapis';
import { execute, create, get, update } from '../src';

describe('Google Drive Adaptor', () => {
  let sandbox;
  let mockDrive;
  let mockFiles;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    // Mock OAuth2 authentication
    const mockAuth = {
      credentials: { access_token: 'mockToken' },
    };
    sandbox.stub(google.auth, 'OAuth2').returns(mockAuth);

    // Mock Google Drive API
    mockFiles = {
      create: sandbox.stub(),
      get: sandbox.stub(),
      update: sandbox.stub(),
    };
    mockDrive = { files: mockFiles };
    sandbox.stub(google, 'drive').returns(mockDrive);

    // Mock fs methods
    sandbox.stub(fs, 'createReadStream').returns(new PassThrough());
    sandbox.stub(fs, 'createWriteStream').returns(new PassThrough());
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('Connection', () => {
    it('should initialize client with access token', async () => {
      const state = { configuration: { accessToken: 'mockToken' } };
      await execute()(state);
      expect(google.auth.OAuth2.calledOnce).to.be.true;
      expect(google.drive.calledOnceWithExactly({
        version: 'v3',
        auth: { credentials: { access_token: 'mockToken' } }
      })).to.be.true;
    });
  });

  describe('create()', () => {
    const state = { configuration: { accessToken: 'mockToken' } };

    it('should upload file with resumable upload', async () => {
      const mockResponse = {
        data: {
          id: 'file123',
          name: 'test.txt',
          webViewLink: 'https://drive.google.com/file/d/file123/view',
          size: '1024',
          mimeType: 'text/plain',
          createdTime: '2023-01-01T00:00:00.000Z'
        }
      };
      mockFiles.create.callsArgWith(1, null, mockResponse);

      const result = await execute(create({ filePath: 'test.txt' }))(state);
      
      expect(mockFiles.create.calledOnce).to.be.true;
      const callArgs = mockFiles.create.firstCall.args[0];
      expect(callArgs.uploadType).to.equal('resumable');
      expect(callArgs.supportsAllDrives).to.be.true;
      expect(callArgs.fields).to.include('size,mimeType,createdTime');
      
      expect(result.data).to.deep.equal(mockResponse.data);
    });

    it('should handle folder specification', async () => {
      const mockResponse = { data: {} };
      mockFiles.create.callsArgWith(1, null, mockResponse);

      const params = { 
        filePath: 'test.txt', 
        folderId: 'folder123',
        fileName: 'custom-name.txt'
      };
      await execute(create(params))(state);
      
      const callArgs = mockFiles.create.firstCall.args[0];
      expect(callArgs.requestBody.parents).to.deep.equal(['folder123']);
      expect(callArgs.requestBody.name).to.equal('custom-name.txt');
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      error.code = 403;
      mockFiles.create.callsArgWith(1, error);

      try {
        await execute(create({ filePath: 'test.txt' }))(state);
        expect.fail('Should have thrown error');
      } catch (e) {
        expect(e.message).to.equal('Permission denied for file creation');
      }
    });

    it('should handle missing parent folder error', async () => {
      const error = new Error('Not Found');
      error.code = 404;
      mockFiles.create.callsArgWith(1, error);

      try {
        await execute(create({ filePath: 'test.txt', folderId: 'missing' }))(state);
        expect.fail('Should have thrown error');
      } catch (e) {
        expect(e.message).to.equal('Parent folder not found (ID: missing)');
      }
    });
  });

  describe('get()', () => {
    const state = { configuration: { accessToken: 'mockToken' } };

    it('should download file successfully', async () => {
      const mockResponse = {
        data: new PassThrough()
      };
      mockResponse.data.end('file content');
      mockFiles.get.callsArgWith(2, null, mockResponse);

      const result = await execute(get({ 
        fileId: 'file123', 
        outputPath: 'download.txt' 
      }))(state);

      expect(mockFiles.get.calledOnce).to.be.true;
      expect(mockFiles.get.firstCall.args[0]).to.deep.equal({
        fileId: 'file123',
        alt: 'media'
      });
      expect(result.data).to.deep.equal({
        fileId: 'file123',
        outputPath: 'download.txt'
      });
    });

    it('should handle download errors', async () => {
      const error = new Error('Download failed');
      mockFiles.get.callsArgWith(2, error);

      try {
        await execute(get({ fileId: 'file123', outputPath: 'download.txt' }))(state);
        expect.fail('Should have thrown error');
      } catch (e) {
        expect(e.message).to.equal('Download failed');
      }
    });
  });

  describe('update()', () => {
    const state = { configuration: { accessToken: 'mockToken' } };

    it('should update file with resumable upload', async () => {
      const mockResponse = {
        data: {
          id: 'file123',
          name: 'updated.txt',
          webViewLink: 'https://drive.google.com/file/d/file123/view',
          size: '2048'
        }
      };
      mockFiles.update.callsArgWith(1, null, mockResponse);

      const result = await execute(update({ 
        fileId: 'file123', 
        filePath: 'updated.txt',
        fileName: 'renamed.txt'
      }))(state);
      
      expect(mockFiles.update.calledOnce).to.be.true;
      const callArgs = mockFiles.update.firstCall.args[0];
      expect(callArgs.uploadType).to.equal('resumable');
      expect(callArgs.supportsAllDrives).to.be.true;
      expect(callArgs.requestBody.name).to.equal('renamed.txt');
      
      expect(result.data).to.deep.equal(mockResponse.data);
    });

    it('should handle file not found error', async () => {
      const error = new Error('Not Found');
      error.code = 404;
      mockFiles.update.callsArgWith(1, error);

      try {
        await execute(update({ fileId: 'missing', filePath: 'test.txt' }))(state);
        expect.fail('Should have thrown error');
      } catch (e) {
        expect(e.message).to.equal('File not found (ID: missing)');
      }
    });

    it('should handle permission errors', async () => {
      const error = new Error('Forbidden');
      error.code = 403;
      mockFiles.update.callsArgWith(1, error);

      try {
        await execute(update({ fileId: 'restricted', filePath: 'test.txt' }))(state);
        expect.fail('Should have thrown error');
      } catch (e) {
        expect(e.message).to.equal('Permission denied for file update');
      }
    });
  });
});