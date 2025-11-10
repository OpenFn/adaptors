import * as actualBudgetApi from '@actual-app/api';
// import mock from 'mock-fs';
import state from '../tmp/state.json' with { type: 'json' };
import { errorHandler } from '../src/util.js';

let api = actualBudgetApi;

// mock({
//   '/tmp/actual-budget-cache': {},
// });
const configuration = state.configuration;

const { serverUrl, password, budgetSyncId, budgetPassword } = configuration || {};
console.log({ serverUrl, password, budgetSyncId, budgetPassword });
(async () => {
    await api.init({
      // Budget data will be cached locally here, in subdirectories for each file.
    //   dataDir: '../tmp/',
      serverURL: serverUrl,
      password,
    });
const user = await api.internal.send('subscribe-get-user');
console.log({ user });
// console.log(`Authenticated as: ${user.displayName}`);
    if (budgetPassword) {
      console.log('Downloading budget with password');
      await api
        .setbudgetPassword(budgetSyncId, budgetPassword)
        .catch(errorHandler);
      return;
    }

    console.log('Downloading budget');

    await api.downloadBudget(budgetSyncId).catch(errorHandler);
    const budget = await api.getBudgetMonth('2023-01');
    console.log({ budget });
    await api.shutdown();
  }
)();
