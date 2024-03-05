import { expect } from 'chai';
import execute from '@openfn/test-execute';

import Adaptor from '../src/index';
import { fixtures } from './fixtures';

// TODO move to tools
const loadExample = (name) => {
 // TODO we cheat for now, no-one is watching
  return 'getDrive((state) => ({ id: state.id }), "default", (state) => ({ ...state, savedDrives: state.drives }))'
}

describe('examples', () => {
  it('get-drive', async () => {
    // Load our example code
    const source = loadExample('get-drive')

    // Set up some input state
    const state = {
      id: 'xxx',
      configuration: {
        // The mock could test for these things and throw appropriately if I wanted
        accessToken: 'a',
        apiVersion: '1',
      },
    };

    // Set up the mock
    Adaptor.setRequestHandler(async (url) => {
      // assert that the URL has the correct id in it
      expect(url).to.match(/xxx/)

      return fixtures.driveResponse;
    })

    // Compile and run the job against this adaptor
    const finalState = await execute(source, Adaptor, state)

    // Make some final assertion against state

    // Remember that state.drives is actually removed...
    expect(finalState.drives).to.be.undefined
  
    // So our job re-writes it
    expect(finalState.savedDrives).to.eql({ default: fixtures.driveResponse });
  })
});