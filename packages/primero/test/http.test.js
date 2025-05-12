import { http } from '../src';
import { enableMockClient } from '@openfn/language-common/util';
import pkg from 'chai';
const { expect } = pkg;

const testServer = enableMockClient('https://demo-unicare-bih.primero.org');
const jsonHeaders = {
  headers: {
    'Content-Type': 'application/json',
  },
};
const configuration = {
  username: 'test',
  password: 'strongpassword',
  url: 'https://demo-unicare-bih.primero.org',
};


describe('http.get', () => {
    it('should GET with a query', async () => {
      testServer
        .intercept({
          path: '/api/v2/cases',
          query: { remote: true },
          method: 'GET',
        })
        .reply(
          200,
          {
            data: [{ name: 'Edwine Edgemont', sex: 'female' }],
          },
          { ...jsonHeaders }
        );
      const state = { configuration };
  
      const response = await http.get('cases', {
        query: { remote: true },
      })(state);
  
      expect(response.response.headers['content-type']).to.eql(
        'application/json'
      );
    });
  
    it('should make a GET request', async () => {
      testServer
        .intercept({
          path: '/api/v2/cases',
          method: 'GET',
        })
        .reply(
          200,
          {
            data: [{ name: 'Edwine Edgemont', sex: 'female' }],
          },
          { ...jsonHeaders }
        );
      const state = { configuration };
  
      const { data } = await http.get('cases')(state);
      expect(data.data[0].name).to.eql('Edwine Edgemont');
    });
  });
  
  describe('http.post', () => {
    it('should make a POST request', async () => {
      testServer
        .intercept({
          path: '/api/v2/cases',
          method: 'POST',
          data: {
            data: {
              name: 'Edwine Edgemont',
              sex: 'female',
            },
          },
        })
        .reply(200, { data: { enabled: true, id: '123' } }, { ...jsonHeaders });
      const state = { configuration };
  
      const { data } = await http.post('cases', {
        name: 'Edwine Edgemont',
        sex: 'female',
      })(state);
      expect(data.data.enabled).to.eql(true);
    });
  });
  
  describe('http.patch', () => {
    it('should make a PATCH request', async () => {
      testServer
        .intercept({
          path: '/api/v2/cases/123',
          method: 'PATCH',
          data: {
            data: {
              name: 'Edwine Edgemont',
              sex: 'female',
            },
          },
        })
        .reply(200, { data: { enabled: true, id: '123' } }, { ...jsonHeaders });
      const state = { configuration };
  
      const { data } = await http.patch('cases/123', {
        name: 'Edwine Edgemont',
        sex: 'female',
      })(state);
      expect(data.data.enabled).to.eql(true);
    });
  });