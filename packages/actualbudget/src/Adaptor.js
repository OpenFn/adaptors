import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import { expandReferences, throwError } from '@openfn/language-common/util';
import * as actualBudgetApi from '@actual-app/api';

let api = actualBudgetApi;

const init = async state => {
  const { serverUrl, password, budgetSyncId, budgetPassword } =
    state.configuration;
  if (!serverUrl) {
    throw new Error('serverUrl is required');
  }
  if (!password) {
    throw new Error('password is required');
  }
  if (!budgetSyncId) {
    throw new Error('budgetSyncId is required');
  }

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
    )({ ...initialState, ...state });
  };
}

const errorHandler = err => {
  // console.error('ActualBudget Adaptor Error:', err);
  const { type, message, meta } = err;
  if (
    type == 'PostError' &&
    (message.includes('Not Allowed') || message.includes('network-failure'))
  ) {
    throwError(type, {
      meta,
      message,
      fix: 'Error accessing Actual Server, check Actual Server url',
    });
  } else if (err.message.includes('Could not get remote files')) {
    throwError(type, {
      meta,
      message,
      fix: 'Error accessing Actual Server, check Actual Server password',
    });
  } else if (
    message.includes('not found') ||
    message.includes('No budget') ||
    message.includes('Cannot destructure property')
  ) {
    throwError(type || 404, { message, meta });
  } else if (
    message.includes('Invalid month') ||
    message.includes('required') ||
    message.includes('Bad date format') ||
    message.includes('does not exist on table') ||
    message.includes('convert to integer') ||
    message.includes('must be')
  ) {
    throwError(type || 400, { message, meta });
  } else {
    throwError(type, {
      fix: 'Unknown error while interacting with Actual Api. See server logs for more information',
      message,
      meta,
    });
  }
};
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

    try {
      const budget = await api.getBudgetMonth(resolvedMonth);
      console.log({ budget });
      return composeNextState(state, budget);
    } catch (err) {
      console.log('Error fetching budget month:', err);
      // errorHandler(err);
    }
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
