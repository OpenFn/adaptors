import { expect } from 'chai';

import {execute, sendSms } from '../src/Adaptor.js';

describe('sendSMS', () => {
  it('Send SMS via Wigal', async () => {
    const state = {
      configuration: {
       /* baseUrl :'https://frogapi.wigal.com.gh',
        apiKey:'sampleapikey',
        username :'Stevkky'*/
    },
      data: {
        senderid : 'Stevkky',
        destinations: [
          {
            destination: "0552825710",
          },
        ],
        message: "This is a sample message for SMS sending via Wigal FROG API.",
        smstype: "text"
      },
    };

    const finalState = await execute(
      sendSms(state => state.data)
    )(state);

   // console.log(finalState.data);
  });
});