// idk what this file should be called
import { createMock } from '@openfn/metadata';

import createHelper from './helper.js';

export default async state => {
  const helper = createHelper(state.configuration);
  const mock = createMock(helper, { force: true });
  await mock.getResourceTypes();
  await mock.getOrgUnits();
};
