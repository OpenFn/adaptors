import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import {
  uploadAudioFile,
  getFileStatus,
  get,
  post,
} from '../src/Adaptor.js';

const testServer = enableMockClient('https://infer.voice.intron.io');

describe('Sahara Adaptor', () => {
  const baseState = {
    configuration: {
      baseUrl: 'https://infer.voice.intron.io',
      apiKey: 'test-api-key-12345',
    },
    data: {},
  };

  const validAudioUrl = 'https://example.com/audio.wav';

  describe('uploadAudioFile', () => {
    it('uploads from URL string and returns file_id', async () => {
      testServer
        .intercept({ path: '/file/v1/upload', method: 'POST' })
        .reply(200, {
          status: 'Ok',
          message: 'file queued for processing',
          data: {
            file_id: '12a9760f-b165-4404-91d0-a65d4cdt78fs',
          },
        }, { headers: { 'content-type': 'application/json' } });

      const state = { ...baseState };

      const finalState = await uploadAudioFile({
        audio_file_name: 'test_audio',
        audio_file_blob: validAudioUrl,
      })(state);

      expect(finalState.data.data).to.have.property('file_id');
      expect(finalState.data.data.file_id).to.equal(
        '12a9760f-b165-4404-91d0-a65d4cdt78fs'
      );
    });

    it('uploads from object with url property', async () => {
      testServer
        .intercept({ path: '/file/v1/upload', method: 'POST' })
        .reply(200, {
          status: 'Ok',
          message: 'file queued for processing',
          data: { file_id: 'from-url-obj-uuid' },
        }, { headers: { 'content-type': 'application/json' } });

      const state = {
        ...baseState,
        data: { signedUrl: 'https://bucket.s3.amazonaws.com/path/file.wav' },
      };

      const finalState = await uploadAudioFile({
        audio_file_name: 'from_url_obj',
        audio_file_blob: { url: state.data.signedUrl },
      })(state);

      expect(finalState.data.data.file_id).to.equal('from-url-obj-uuid');
    });

    it('uploads with telehealth category and post-processing options', async () => {
      testServer
        .intercept({ path: '/file/v1/upload', method: 'POST' })
        .reply(200, {
          status: 'Ok',
          message: 'file queued for processing',
          data: {
            file_id: 'telehealth-file-uuid',
          },
        }, { headers: { 'content-type': 'application/json' } });

      const state = { ...baseState };

      const finalState = await uploadAudioFile({
        audio_file_name: 'patient_consultation',
        audio_file_blob: validAudioUrl,
        use_category: 'file_category_telehealth',
        get_soap_note: 'TRUE',
        get_summary: 'TRUE',
        get_icd_codes: 'TRUE',
      })(state);

      expect(finalState.data.data.file_id).to.equal('telehealth-file-uuid');
    });

    it('throws when audio_file_blob is Buffer (URL-only)', async () => {
      const state = {
        ...baseState,
        data: { audioFile: Buffer.from('mock audio') },
      };
      try {
        await uploadAudioFile({
          audio_file_name: 'test',
          audio_file_blob: state.data.audioFile,
        })(state);
        expect.fail('Should have thrown');
      } catch (error) {
        expect(error.message).to.include('must be a URL string');
        expect(error.message).to.include('not supported');
      }
    });

    it('throws when audio_file_blob is file path string', async () => {
      const state = { ...baseState };
      try {
        await uploadAudioFile({
          audio_file_name: 'test',
          audio_file_blob: '/tmp/audio.wav',
        })(state);
        expect.fail('Should have thrown');
      } catch (error) {
        expect(error.message).to.include('must be a URL string');
      }
    });

    it('when validateUploadUrl is true and URL is HTTP, throws before request', async () => {
      const state = {
        ...baseState,
        configuration: {
          ...baseState.configuration,
          validateUploadUrl: true,
        },
      };
      try {
        await uploadAudioFile({
          audio_file_name: 'test',
          audio_file_blob: 'http://example.com/audio.wav',
        })(state);
        expect.fail('Should have thrown');
      } catch (error) {
        expect(error.message).to.include('must use HTTPS');
      }
    });

    it('when validateUploadUrl is true and URL is valid HTTPS, proceeds to upload', async () => {
      testServer
        .intercept({ path: '/file/v1/upload', method: 'POST' })
        .reply(200, {
          status: 'Ok',
          message: 'file queued for processing',
          data: { file_id: 'validated-url-uuid' },
        }, { headers: { 'content-type': 'application/json' } });

      const state = {
        ...baseState,
        configuration: {
          ...baseState.configuration,
          validateUploadUrl: true,
        },
      };

      const finalState = await uploadAudioFile({
        audio_file_name: 'validated',
        audio_file_blob: 'https://example.com/audio.wav',
      })(state);

      expect(finalState.data.data.file_id).to.equal('validated-url-uuid');
    });

    it('throws error when audio_file_name is missing', async () => {
      const state = { ...baseState };
      try {
        await uploadAudioFile({
          audio_file_blob: validAudioUrl,
        })(state);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.include('audio_file_name is required');
      }
    });

    it('throws error when audio_file_blob is missing', async () => {
      const state = { ...baseState };
      try {
        await uploadAudioFile({
          audio_file_name: 'test',
        })(state);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.include('audio_file_blob is required');
      }
    });

    it('handles 429 rate limit error', async () => {
      testServer
        .intercept({ path: '/file/v1/upload', method: 'POST' })
        .reply(429, { message: 'Rate limit exceeded' }, { headers: { 'content-type': 'application/json' } });

      const state = { ...baseState };
      try {
        await uploadAudioFile(
          {
            audio_file_name: 'test',
            audio_file_blob: validAudioUrl,
          },
          { maxRetries: 0 }
        )(state);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.include('Rate limit');
      }
    });

    it('handles 400 bad request error', async () => {
      testServer
        .intercept({ path: '/file/v1/upload', method: 'POST' })
        .reply(400, { message: 'Invalid file format' }, { headers: { 'content-type': 'application/json' } });

      const state = { ...baseState };
      try {
        await uploadAudioFile(
          {
            audio_file_name: 'test',
            audio_file_blob: validAudioUrl,
          },
          { maxRetries: 0 }
        )(state);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.include('Bad Request');
      }
    });

    it('handles 413 file too large error', async () => {
      testServer
        .intercept({ path: '/file/v1/upload', method: 'POST' })
        .reply(413, { message: 'File exceeds 100MB limit' }, { headers: { 'content-type': 'application/json' } });

      const state = { ...baseState };
      try {
        await uploadAudioFile(
          {
            audio_file_name: 'large_file',
            audio_file_blob: validAudioUrl,
          },
          { maxRetries: 0 }
        )(state);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.include('File too large');
      }
    });
  });

  describe('getFileStatus', () => {
    it('throws error when fileId is missing', async () => {
      const state = { ...baseState };

      try {
        await getFileStatus()(state);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.include('fileId is required');
      }
    });
  });

  describe('authentication', () => {
    it('throws error when apiKey is missing', async () => {
      const state = {
        configuration: {
          baseUrl: 'https://infer.voice.intron.io',
        },
        data: {},
      };

      try {
        await get('/file/v1/status/test')(state);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.include('apiKey is required');
      }
    });
  });
});

