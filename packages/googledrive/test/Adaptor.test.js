import { expect } from 'chai';
import sinon from 'sinon';
import fs from 'fs';
import { PassThrough } from 'stream';
import { google } from 'googleapis';
import { execute } from '../src';
import { post, get, put, transfer } from '../src';

describe('Google Drive Adaptor', () => {
  let sandbox;
  let mockDrive;
  let mockFiles;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    // Mock OAuth2 authentication
    sandbox.stub(google.auth, 'OAuth2').returns(function () {
      this.credentials = { access_token: 'mockToken' };
    });

    // Mock Google Drive API and `.files` property
    mockFiles = {
      create: sandbox.stub(),
      get: sandbox.stub(),
      update: sandbox.stub(),
    };
    mockDrive = { files: mockFiles };

    // Stub google.drive() to return our mockDrive
    sandbox.stub(google, 'drive').returns(mockDrive);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('post (upload)', () => {
    it('should upload a file successfully', async () => {
      const state = { configuration: { accessToken: 'mockToken' } };
      const filePath = 'test.txt';

      sandbox.stub(fs, 'createReadStream').returns('mockStream');
      mockFiles.create.resolves({ data: { id: '123', name: 'test.txt' } });

      const result = await execute(post(filePath))(state);
      expect(result.data.id).to.equal('123');
      expect(result.data.name).to.equal('test.txt');
    });
  });

  describe('get (download)', () => {
    it('should download a file successfully', async () => {
      const state = { configuration: { accessToken: 'mockToken' } };
      const fileId = '123';
      const outputPath = 'test.txt';

      // Use real PassThrough streams for proper event handling
      const mockWriteStream = new PassThrough();
      sandbox.stub(fs, 'createWriteStream').returns(mockWriteStream);

      // Mock readable stream with sample data
      const mockStream = new PassThrough();
      mockStream.end('test data'); // End with sample data

      mockFiles.get.resolves({ data: mockStream });

      const result = await execute(get(fileId, outputPath))(state);
      expect(result.data.fileId).to.equal('123');
    });
  });

  describe('put (update)', () => {
    it('should update a file successfully', async () => {
      const state = { configuration: { accessToken: 'mockToken' } };
      const fileId = '123';
      const filePath = 'test.txt';

      sandbox.stub(fs, 'createReadStream').returns('mockStream');
      mockFiles.update.resolves({ data: { id: '123', name: 'updated.txt' } });

      const result = await execute(put(fileId, filePath))(state);
      expect(result.data.id).to.equal('123');
      expect(result.data.name).to.equal('updated.txt');
    });
  });

  describe('transfer', () => {
    it('should transfer a file successfully', async () => {
      const state = { configuration: { accessToken: 'mockToken' } };
      const fileId = '123';
      const targetUrl = 'https://example.com/upload';

      mockFiles.get.resolves({ data: { pipe: sinon.spy() } });

      const result = await execute(transfer(fileId, targetUrl))(state);
      expect(result).to.exist;
    });
  });
});