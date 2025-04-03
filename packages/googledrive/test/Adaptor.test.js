import { expect } from 'chai';
import sinon from 'sinon';
import { Readable } from 'stream';
import { google } from 'googleapis';
import { execute, create, get, update } from '../src';

describe('Google Drive Adapter', () => {
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
      create: sandbox.stub().resolves({ data: { id: 'file123', name: 'test.txt' } }),
      get: sandbox.stub().resolves({ data: Buffer.from('file content') }),
      update: sandbox.stub().resolves({ data: { id: 'file123', name: 'updated.txt' } }),
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
      const params = {
        fileString: Buffer.from('file content').toString('base64'),
        fileName: 'test.txt',
      };
      
      const result = await execute(create(params))(state);
      expect(mockFiles.create.calledOnce).to.be.true;
      expect(result.data).to.have.property('id', 'file123');
    });
  });

  describe('get()', () => {
    it('should download a file successfully', async () => {
      const state = { configuration: { access_token: 'mockToken' } };
      const params = { fileId: 'file123' };
      
      const result = await execute(get(params))(state);
      expect(mockFiles.get.calledOnce).to.be.true;
      expect(result.data.fileString).to.equal(Buffer.from('file content').toString('base64'));
    });
  });

  describe('update()', () => {
    it('should update a file successfully', async () => {
      const state = { configuration: { access_token: 'mockToken' } };
      const params = {
        fileId: 'file123',
        fileString: Buffer.from('new content').toString('base64'),
        fileName: 'updated.txt',
      };
      
      const result = await execute(update(params))(state);
      expect(mockFiles.update.calledOnce).to.be.true;
      expect(result.data).to.have.property('name', 'updated.txt');
    });
  });
});
