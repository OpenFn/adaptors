import { expect } from 'chai';
import { get } from '../src/http.js';
import configuration from '../tmp/creds.json' assert { type: 'json' };

const state = { configuration };

describe('http', () => {
  it('lists libraries', async () => {
    const { data } = await get('libraries')(state);

    expect(data.libraries).to.exist;
    expect(data.libraries.length).to.be.greaterThanOrEqual(1);
  });
  it('throws an error if no token is provided', async () => {
    const state = {
      configuration: {
        token: null,
      },
    };
    await get('libraries')(state).catch(error => {
      expect(error.code).to.eql(401);
      expect(error.reasonPhrase).to.eql(
        'The request requires user authentication'
      );
      expect(error.description).to.eql('Unauthorized');
    });
  });
});
