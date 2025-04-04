// For creds.json, See LP: OpenFn KoboToolBox Demo
import { expect } from 'chai';
import configuration from '../tmp/creds.json' assert { type: 'json' };
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
      it('should post a request to OpenMRS', async () => {
        const { data } = await execute(
          http.post('/ws/rest/v1/patient', {
            person: {
              gender: 'M',
              age: 47,
              birthdate: '1970-01-01T00:00:00.000+0100',
              names: [
                {
                  givenName: 'Jon',
                  familyName: 'Snow',
                },
              ],
            },
          })
        )(state);

        expect(data.person.gender).to.eq('M');
      }).timeout(5000);
    });
    describe('get', () => {
      it('should throw an error if path is absolute', async () => {
        try {
          await execute(http.get('https://www.google.com'))(state);
        } catch (error) {
          expect(error.code).to.eq('UNEXPECTED_ABSOLUTE_URL');
          expect(error.description).to.eq(
            'An absolute URL was provided (https://...) but only a path (/a/b/c) is supported'
          );
        }
      }).timeout(5000);

      it('fetches submission data with a query', async () => {
        const { data } = await execute(
          http.get('/assets/aUe2eV8pHK9DUEUxT9rCcs/data/', {
            query: {
              limit: 3,
            },
          })
        )(state);

        console.log({ data });
        // expect(data.results[0].person.names[0].givenName).to.eq('Sarah');
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
    it.only('should get a list of submissions', async () => {
      const { data } = await execute(
        getSubmissions('aUe2eV8pHK9DUEUxT9rCcs', { pageSize: 3 })
      )(state);

      console.log({ data });
      // expect(data.length).to.eq(2);
    }).timeout(50000);
  });

  describe('getDeploymentInfo', () => {
    it('should get a list of deployment', async () => {
      const { data } = await execute(
        getDeploymentInfo('aXecHjmbATuF6iGFmvBLBX')
      )(state);
      expect(data.asset.name).to.eq('Feedback Survey Test');
    }).timeout(5000);
  });
});
