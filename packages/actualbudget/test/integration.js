import * as actualBudgetApi from '@actual-app/api';

import state from '../tmp/state.json' with { type: 'json' };
import { errorHandler, createTempDir, deleteTempDir } from '../src/util.js';

let api = actualBudgetApi;

const { serverUrl, password, budgetSyncId, budgetPassword } = state.configuration || {};
console.log({ serverUrl, password, budgetSyncId, budgetPassword });

let dataDir = createTempDir();
(async () => {
  try {
    await api.init({
      dataDir,
      serverURL: serverUrl,
      password,
    });

    const user = await api.internal.send('subscribe-get-user');
    console.log({ user });

    if (budgetPassword) {
      console.log('Downloading budget with password');
      await api.setbudgetPassword(budgetSyncId, budgetPassword);
    } else {
      console.log('Downloading budget');
      await api.downloadBudget(budgetSyncId);
    }

    const budget = await api.getBudgetMonth('2022-01');
    // const budget = await api.getBudgetMonth();
    console.log({ budget });

    await api.shutdown();
  } catch (error) {
  
    errorHandler(error);
  } finally {
    // Clean up the temporary directory
    deleteTempDir();
  }
})();