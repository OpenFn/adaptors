import { expect } from 'chai';
import sinon from 'sinon';
import fs from 'fs';
import { google } from 'googleapis';
import { post, get, put, transfer } from '../src';

describe('Google Drive Adaptor', () => {
  let sandbox;
  let mockDrive;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    mockDrive = sandbox.stub(google.drive('v3').files);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('post (upload)', () => {
    it('should upload a file successfully', async () => {
      const state = { configuration: { accessToken: 'mockToken' } };
      const filePath = 'test.txt';
      sandbox.stub(fs, 'createReadStream').returns('mockStream');
      mockDrive.create.resolves({ data: { id: '123', name: 'test.txt' } });

      const result = await post(filePath)(state);
      expect(result.data.id).to.equal('123');
      expect(result.data.name).to.equal('test.txt');
    });
  });

  describe('get (download)', () => {
    it('should download a file successfully', async () => {
      const state = { configuration: { accessToken: 'mockToken' } };
      const fileId = '123';
      const outputPath = 'test.txt';
      const stream = sandbox.stub(fs, 'createWriteStream');
      mockDrive.get.resolves({ data: { pipe: sinon.spy() } });

      const result = await get(fileId, outputPath)(state);
      expect(result.data.fileId).to.equal('123');
    });
  });

  describe('put (update)', () => {
    it('should update a file successfully', async () => {
      const state = { configuration: { accessToken: 'mockToken' } };
      const fileId = '123';
      const filePath = 'test.txt';
      sandbox.stub(fs, 'createReadStream').returns('mockStream');
      mockDrive.update.resolves({ data: { id: '123', name: 'updated.txt' } });

      const result = await put(fileId, filePath)(state);
      expect(result.data.id).to.equal('123');
      expect(result.data.name).to.equal('updated.txt');
    });
  });

  describe('transfer', () => {
    it('should transfer a file successfully', async () => {
      const state = { configuration: { accessToken: 'mockToken' } };
      const fileId = '123';
      const targetUrl = 'https://example.com/upload';
      mockDrive.get.resolves({ data: { pipe: sinon.spy() } });

      const result = await transfer(fileId, targetUrl)(state);
      expect(result).to.exist;
    });
  });
});
