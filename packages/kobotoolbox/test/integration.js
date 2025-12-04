// For creds.json, See LP: OpenFn KoboToolBox Demo
import { expect } from 'chai';
import configuration from '../tmp/creds.json' with { type: 'json' };
import {
  getDeploymentInfo,
  getSubmissions,
  getForms,
  execute,
  http,
  fn,
} from '../dist/index.js';

const state = { configuration };

describe('Integration tests', () => {
  describe('http', () => {
    describe('post', () => {
      it('should post a request to kobo', async () => {
        const { data, response } = await execute(
          http.post('assets', {
            name: 'Health Survey 2024',
            settings: {
              description:
                'A comprehensive health survey for rural communities',
              sector: 'Health',
              country: 'Tanzania',
              'share-metadata': true,
            },
            asset_type: 'survey',
          })
        )(state).catch(console.error);

        expect(response.statusCode).to.eq(201);
        expect(response.statusMessage).to.eq('Created');
        expect(data).to.have.property('url');
      }).timeout(5000);
    });
    describe('get', () => {
      it('should throw an error if path is absolute', async () => {
        try {
          await execute(http.get('https://www.google.com'))(state);
        } catch (error) {
          expect(error.code).to.eq('ERR_INVALID_URL');
        }
      }).timeout(5000);

      it('fetches submission data with a query', async () => {
        const { data } = await execute(
          http.get('/assets/aDReHdA7UuNBYsiCXQBr43/data/', {
            query: {
              limit: 3,
            },
          })
        )(state);

        expect(data.count).to.greaterThan(data.results.length);
        expect(data.next).to.contain('?format=json&limit=3');
        expect(data.results.length).to.eq(3);
      }).timeout(5000);
    });
  });
  describe('getForms', () => {
    it('should get a list of forms', async () => {
      state.data = {};
      const { data } = await execute(getForms())(state);

      expect(data).to.have.all.keys('count', 'next', 'previous', 'results');
      expect(data).to.have.property('next', null);
      expect(data).to.have.property('previous', null);
    }).timeout(5000);
  });

  describe('getSubmissions', () => {
    it('should return the first submission', async () => {
      const firstSubmissionUid = 'cc1ae15c-0795-4969-b21b-e673b6c0a29a';
      const { data } = await execute(
        getSubmissions('aDReHdA7UuNBYsiCXQBr43', { start: 0, limit: 1 })
      )(state);

      expect(data[0]._uuid).to.eq(firstSubmissionUid);
      expect(data.length).to.eq(1);
    });
    it('should get a list of submissions', async () => {
      const { data } = await execute(
        getSubmissions('aDReHdA7UuNBYsiCXQBr43', { pageSize: 3 })
      )(state);

      expect(data.length).to.greaterThan(3);
    }).timeout(50000);

    it('should get a list of submissions with a query', async () => {
      const { data } = await execute(
        getSubmissions('aDReHdA7UuNBYsiCXQBr43', {
          query: { _submission_time: { $gte: '2022-04-12T21:54:20' } },
        })
      )(state);
      expect(data.length).to.greaterThan(0);
    });
  });

  describe('getDeploymentInfo', () => {
    it('should get a list of deployment', async () => {
      const { data } = await execute(
        getDeploymentInfo('aDReHdA7UuNBYsiCXQBr43')
      )(state);

      expect(data.asset.name).to.eq(
        'COVID 19 case registration'
      );
    }).timeout(5000);
  });
});
