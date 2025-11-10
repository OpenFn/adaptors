import {
  execute as commonExecute,
  composeNextState,
  validate,
} from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import * as actualBudgetApi from '@actual-app/api';
import { errorHandler, validateConfig } from './util.js';

let api = actualBudgetApi;

const init = async state => {
  validateConfig(state.configuration);
  const { serverUrl, password, budgetSyncId, budgetPassword } =
    state.configuration;

  await api.init({
    // Budget data will be cached locally here, in subdirectories for each file.
    dataDir: '/tmp',
    serverURL: serverUrl,
    password,
  });

  if (budgetPassword) {
    await api.setbudgetPassword(budgetSyncId, budgetPassword);
  } else {
    await api.downloadBudget(budgetSyncId);
  }
  return state;
};

const shutdown = async state => {
  await api.shutdown();
  return state;
};

export function setMockApi(mockApi) {
  api = mockApi;
}
/**
 * Execute a sequence of operations
 * Wraps `language-common/execute`, and prepends initial state for http.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
 * )(state)
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 */
export function execute(...operations) {
  const initialState = {
    references: [],
    data: null,
  };

  return state => {
    return commonExecute(
      init,
      ...operations,
      shutdown
    )({ ...initialState, ...state }).catch(errorHandler);
  };
}

/**
 * Get the monthly budget for a given month
 * @public
 * @example <caption>Get the monthly budget for January 2023</caption>
 * getBudgetMonth('2023-01');
 * @function
 * @param {string} month - The month to get the budget for, in YYYY-MM format.
 * @state {ActualBudgetState}
 * @returns {Operation}
 */
export function getBudgetMonth(month) {
  return async state => {
    const [resolvedMonth] = expandReferences(state, month);
    console.log(`Fetching budget for month ${resolvedMonth}`);

    const budget = await api.getBudgetMonth(resolvedMonth);
    console.log({ budget });
    return composeNextState(state, budget);
  };
}

export {
  as,
  combine,
  cursor,
  dataPath,
  dataValue,
  dateFns,
  each,
  field,
  fields,
  fn,
  fnIf,
  group,
  lastReferenceValue,
  map,
  merge,
  scrubEmojis,
  sourceValue,
  util,
} from '@openfn/language-common';
