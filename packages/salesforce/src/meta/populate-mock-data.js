// idk what this file should be called
import { createMock } from '@openfn/metadata';

import createHelper from './helper';

const state = {
  configuration: {
    loginUrl: 'https://login.salesforce.com/',
    username: process.env.OPENFN_SF_USER,
    password: process.env.OPENFN_SF_PW,
    securityToken: process.env.OPENFN_SF_TOKEN,
  },
};

export default async () => {
  const helper = await createHelper(state.configuration);
  const mock = createMock(helper);
  await mock.getGlobals();
  await mock.getFields('vera__Attendance__c');
  await mock.getFields('Asset');
};
