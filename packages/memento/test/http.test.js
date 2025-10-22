import { expect } from 'chai';
import { describe, it } from 'mocha';
import { enableMockClient } from '@openfn/language-common/util';

import { request } from '../src/http.js';

const testServer = enableMockClient('https://mementodatabase.com');

describe('http', () => {
  describe('request', () => {
    it('throws an error if the service returns 401', async () => {
      testServer
        .intercept({
          path: '/v1/libraries?token=',
          method: 'GET',
        })
        .reply(401, {
          code: 401,
          contactEmail: 'support@mementodatabase.com',
          description: 'The request requires user authentication',
          homeRef: 'http://mementodatabase.com',
          reasonPhrase: 'Unauthorized',
          uri: 'http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.2',
        });

      await request(
        'GET',
        'libraries'
      )({ configuration: { baseUrl: 'https://mementodatabase.com' } }).catch(
        error => {
          expect(error.body.code).to.eql(401);
          expect(error.statusCode).to.eql(401);
          expect(error.statusMessage).to.eql('Unauthorized');
          expect(error.body.reasonPhrase).to.eql('Unauthorized');
          expect(error.body.description).to.eql(
            'The request requires user authentication'
          );
        }
      );
    });
  });
});
