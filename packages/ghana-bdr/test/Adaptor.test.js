import { expect } from 'chai';

import { sendBirthNotification, execute } from '../src/Adaptor.js';

describe('sendBirthNotification', () => {
  it('upload birth notification', async () => {
    const state = {
      configuration: {},
      data: {
        child: {},
        mother: {},
      },
    };

    const finalState = await execute(
      sendBirthNotification(state => state.data)
    )(state);

    // TODO add assertions
    expect(Object.keys(finalState.data).length).to.eql(6);
  });
});
