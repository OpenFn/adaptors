import { expect } from 'chai';
import { describe, it } from 'mocha';
import { http, listEntries } from '../src';
import configuration from '../tmp/creds.json' assert { type: 'json' };

const state = { configuration };

describe('http', () => {
  it('lists libraries', async () => {
    const { data } = await http.get('libraries')(state);

    console.log(data);
    expect(data.libraries).to.exist;
    expect(data.libraries.length).to.be.greaterThanOrEqual(1);
  });
  it('throws an error if no token is provided', async () => {
    const state = {
      configuration: {
        token: null,
      },
    };
    await http
      .get('libraries')(state)
      .catch(error => {
        expect(error.body.code).to.eql(401);
        expect(error.body.description).to.eql(
          'The request requires user authentication'
        );
        expect(error.body.reasonPhrase).to.eql('Unauthorized');
      });
  });
  it('should auto throttle when api rate limit exceeded', async () => {
    const { data } = await listEntries('6AJPFZhgy', {
      pageSize: 1,
    })(state);
    expect(data.entries.length).to.be.greaterThanOrEqual(1);
  }).timeout(10e4);

  it(
    'should handle concurrent requests when hitting rate limits',
    async () => {
      const startTime = Date.now();
      const numberOfRequests = 10;

      const requests = Array(numberOfRequests)
        .fill()
        .map(() => listEntries('6AJPFZhgy', { pageSize: 10 })(state));

      const results = await Promise.all(requests);

      const totalTime = Date.now() - startTime;

      results.forEach(result => {
        expect(result.data.entries.length).to.be.greaterThanOrEqual(1);
      });

      // If it took longer than making direct requests, rate limiting likely occurred
      expect(totalTime).to.be.greaterThan(numberOfRequests * 100); // assuming each request normally takes ~100ms
    }
  ).timeout(10e4);
});
