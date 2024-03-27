import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';

import { request as commonRequest } from './Utils';

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for http.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
 * )(state)
 * @private
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 */
export function execute(...operations) {
  const initialState = {
    references: [],
    data: null,
  };

  return state => {
    return commonExecute(...operations)({
      ...initialState,
      ...state,
    });
  };
}

/**
 * Get a single task of a given project.
 * @public
 * @example
 * getTask("1206933955023739", {
 *   opt_fields: "name,notes,assignee",
 * });
 * @function
 * @param {string} taskGid - Globally unique identifier for the task
 * @param {object} params - Query params to include.
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function getTask(taskGid, params, callback) {
  return state => {
    const [resolvedTaskGid, resolvedParams] = expandReferences(
      state,
      taskGid,
      params
    );
    return commonRequest(
      state,
      `tasks/${resolvedTaskGid}`,
      { query: resolvedParams },
      callback
    );
  };
}

/**
 * Get the list of tasks for a given project.
 * @public
 * @example
 * getTasks("1206933955023739", {
 *   opt_fields: "name,notes,assignee",
 * });
 * @function
 * @param {string} projectGid - Globally unique identifier for the project
 * @param {object} params - Query params to include.
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function getTasks(projectGid, params, callback) {
  return state => {
    const [resolvedProjectGid, resolvedParams] = expandReferences(
      state,
      projectGid,
      params
    );

    return commonRequest(
      state,
      `projects/${resolvedProjectGid}/tasks`,
      { query: resolvedParams },
      callback
    );
  };
}

/**
 * Update a specific task.
 * @public
 * @example
 * updateTask("1206933955023739", {
 *   name: "test",
 *   approval_status: "pending",
 *   assignee: "12345",
 * });
 * @function
 * @param {string} taskGid - Globally unique identifier for the task
 * @param {object} params - Body parameters
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function updateTask(taskGid, params, callback) {
  return state => {
    const [resolvedTaskGid, resolvedParams] = expandReferences(
      state,
      taskGid,
      params
    );

    return commonRequest(
      state,
      `tasks/${resolvedTaskGid}`,
      { body: { data: resolvedParams }, method: 'PUT' },
      callback
    );
  };
}

/**
 * Create a task.
 * @public
 * @example
 * createTask({
 *   name: "test",
 *   approval_status: "pending",
 *   assignee: "12345",
 *   projects: ["1206933955023739"],
 * });
 * @function
 * @param {object} params - Body parameters
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function createTask(params, callback) {
  return state => {
    const [resolvedParams] = expandReferences(state, params);

    return commonRequest(
      state,
      'tasks',
      { body: { data: resolvedParams }, method: 'POST' },
      callback
    );
  };
}

/**
 * Update or create a task.
 * @public
 * @example
 * upsertTask("1201382240880", {
 *   externalId: "name",
 *   data: {
 *     name: "test",
 *     approval_status: "pending",
 *     projects: ["1201382240880"],
 *     assignee: "12345",
 *   },
 * });
 * @function
 * @param {string} projectGid - Globally unique identifier for the project
 * @param {object} params - an object with an externalId and some task data.
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function upsertTask(projectGid, params, callback) {
  return state => {
    const [resolvedProjectGid, resolvedParams] = expandReferences(
      state,
      projectGid,
      params
    );
    const { externalId, data } = resolvedParams;
    return commonRequest(
      state,
      `projects/${resolvedProjectGid}/tasks`,
      { query: { opt_fields: `${externalId}` } },
      next => {
        const matchingTask = next.data.find(
          task => task[externalId] === data[externalId]
        );
        if (matchingTask) {
          console.log('Matching task found. Performing update.');
          console.log('Data to update', data);
          // projects and workspace ids should not be included to update
          const { projects, workspace, ...remainingData } = data;
          return updateTask(matchingTask.gid, remainingData, callback)(state);
        } else {
          console.log('No matching task found. Performing create.');
          return createTask(data, callback)(state);
        }
      }
    );
  };
}

export function createStoryForTask(taskGid, params, callback) {
  return state => {
    const [resolvedTaskGid, resolvedParams] = expandReferences(
      state,
      taskGid,
      params
    );

    const { story, opt_pretty = false, opt_fields = [] } = resolvedParams;
    return commonRequest(
      state,
      `tasks/${resolvedTaskGid}/stories`,
      {
        body: { data: story },
        query: { opt_fields, opt_pretty },
        method: 'POST',
      },
      callback
    );
  };
}

export function sendRequest(path, params, callback) {
  return state => {
    const [resolvedPath, resolvedParams] = expandReferences(
      state,
      path,
      params
    );
    return commonRequest(state, resolvedPath, resolvedParams, callback);
  };
}

export {
  alterState,
  dataPath,
  dataValue,
  dateFns,
  each,
  field,
  fields,
  fn,
  http,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';
