import { expect } from 'chai';
import nock from 'nock';

import {
  uploadAudioFile,
  getFileStatus,
  get,
  post,
} from '../src/Adaptor.js';

describe('Sahara Adaptor', () => {
  const baseState = {
    configuration: {
      baseUrl: 'https://infer.voice.intron.io',
      apiKey: 'test-api-key-12345',
    },
    data: {},
  };

  afterEach(() => {
    nock.cleanAll();
  });

  describe('uploadAudioFile', () => {
    it('uploads an audio file and returns file_id', async () => {
      nock('https://infer.voice.intron.io')
        .post('/file/v1/upload')
        .matchHeader('Authorization', 'Bearer test-api-key-12345')
        .reply(200, {
          status: 'Ok',
          message: 'file queued for processing',
          data: {
            file_id: '12a9760f-b165-4404-91d0-a65d4cdt78fs',
          },
        });

      const state = {
        ...baseState,
        data: {
          audioFile: Buffer.from('mock audio data'),
        },
      };

      const finalState = await uploadAudioFile({
        audio_file_name: 'test_audio',
        audio_file_blob: state.data.audioFile,
      })(state);

      expect(finalState.data.data).to.have.property('file_id');
      expect(finalState.data.data.file_id).to.equal(
        '12a9760f-b165-4404-91d0-a65d4cdt78fs'
      );
    });

    it('uploads with telehealth category and post-processing options', async () => {
      nock('https://infer.voice.intron.io')
        .post('/file/v1/upload')
        .matchHeader('Authorization', 'Bearer test-api-key-12345')
        .reply(200, {
          status: 'Ok',
          message: 'file queued for processing',
          data: {
            file_id: 'telehealth-file-uuid',
          },
        });

      const state = {
        ...baseState,
        data: {
          audioFile: Buffer.from('mock telehealth audio data'),
        },
      };

      const finalState = await uploadAudioFile({
        audio_file_name: 'patient_consultation',
        audio_file_blob: state.data.audioFile,
        use_category: 'file_category_telehealth',
        get_soap_note: 'TRUE',
        get_summary: 'TRUE',
        get_icd_codes: 'TRUE',
      })(state);

      expect(finalState.data.data.file_id).to.equal('telehealth-file-uuid');
    });

    it('throws error when audio_file_name is missing', async () => {
      const state = {
        ...baseState,
        data: {
          audioFile: Buffer.from('test audio'),
        },
      };

      try {
        await uploadAudioFile({
          audio_file_blob: state.data.audioFile,
        })(state);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.include('audio_file_name is required');
      }
    });

    it('throws error when audio_file_blob is missing', async () => {
      const state = {
        ...baseState,
      };

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
      nock('https://infer.voice.intron.io')
        .post('/file/v1/upload')
        .reply(429, {
          message: 'Rate limit exceeded',
        });

      const state = {
        ...baseState,
        data: {
          audioFile: Buffer.from('test audio'),
        },
      };

      try {
        await uploadAudioFile(
          {
            audio_file_name: 'test',
            audio_file_blob: state.data.audioFile,
          },
          { maxRetries: 0 }
        )(state);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.include('Rate limit');
      }
    });

    it('handles 400 bad request error', async () => {
      nock('https://infer.voice.intron.io')
        .post('/file/v1/upload')
        .reply(400, {
          message: 'Invalid file format',
        });

      const state = {
        ...baseState,
        data: {
          audioFile: Buffer.from('invalid data'),
        },
      };

      try {
        await uploadAudioFile(
          {
            audio_file_name: 'test',
            audio_file_blob: state.data.audioFile,
          },
          { maxRetries: 0 }
        )(state);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.include('Invalid file format');
      }
    });

    it('handles 413 file too large error', async () => {
      nock('https://infer.voice.intron.io')
        .post('/file/v1/upload')
        .reply(413, {
          message: 'File exceeds 100MB limit',
        });

      const state = {
        ...baseState,
        data: {
          audioFile: Buffer.from('large file'),
        },
      };

      try {
        await uploadAudioFile(
          {
            audio_file_name: 'large_file',
            audio_file_blob: state.data.audioFile,
          },
          { maxRetries: 0 }
        )(state);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.include('File exceeds 100MB limit');
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

