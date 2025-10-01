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
      pageSize: 10,
    })(state);
    expect(data.entries.length).to.be.greaterThanOrEqual(1);
  }).timeout(10e4);
});
