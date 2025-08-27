import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import * as util from './util';

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
 * @example <caption>Get a task</caption>
 * getTask("1206933955023739", {
 *   opt_fields: "name,notes,assignee",
 * });
 * @function
 * @param {string} taskGid - Globally unique identifier for the task
 * @param {object} params - Query params to include.
 * @param {string} params.opt_fields - The fields to return.
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function getTask(taskGid, params, callback) {
  return async state => {
    const [resolvedTaskGid, resolvedParams] = expandReferences(
      state,
      taskGid,
      params
    );
    const response = await util.request(
      state,
      `tasks/${resolvedTaskGid}`,
      { query: resolvedParams },
      callback
    );
    return util.prepareNextState(state, response);
  };
}

/**
 * Get the list of tasks for a given project.
 * @public
 * @example <caption>Get all tasks</caption>
 * getTasks("1206933955023739", {
 *   opt_fields: "name,notes,assignee",
 * });
 * @example <caption>Limit the number of tasks returned</caption>
 * getTasks("1206933955023739", {
 *   opt_fields: "name,notes,assignee",
 *   limit: 100,
 * });
 * @function
 * @param {string} projectGid - Globally unique identifier for the project
 * @param {object} params - Query params to include.
 * @param {number} params.limit - The maximum number of tasks to return.
 * @param {string} params.opt_fields - The fields to return.
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function getTasks(projectGid, params, callback) {
  return async state => {
    const [resolvedProjectGid, resolvedParams] = expandReferences(
      state,
      projectGid,
      params
    );

    const results = await util.requestWithPagination(
      state,
      `projects/${resolvedProjectGid}/tasks`,
      { query: resolvedParams },
      callback
    );
    console.log(`Fetched ${results.length} tasks`);
    return composeNextState(state, results);
  };
}

/**
 * Update a specific task.
 * @public
 * @example <caption>Update a task</caption>
 * updateTask("1206933955023739", {
 *   name: "test",
 *   approval_status: "pending",
 *   assignee: "12345",
 * });
 * @function
 * @param {string} taskGid - Globally unique identifier for the task
 * @param {object} data - Body data to update the task with
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function updateTask(taskGid, data, callback) {
  return async state => {
    const [resolvedTaskGid, resolvedData] = expandReferences(
      state,
      taskGid,
      data
    );

    const response = await util.request(
      state,
      `tasks/${resolvedTaskGid}`,
      { body: { data: resolvedData }, method: 'PUT' },
      callback
    );
    return util.prepareNextState(state, response);
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
  return async state => {
    const [resolvedParams] = expandReferences(state, params);

    const response = await util.request(
      state,
      'tasks',
      { body: { data: resolvedParams }, method: 'POST' },
      callback
    );
    return util.prepareNextState(state, response);
  };
}

/**
 * Update or create a task.
 * @public
 * @example <caption>Upsert a task</caption>
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
 * @param {string} params.externalId - The external id field name
 * @param {object} params.data - The data to upsert.
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function upsertTask(projectGid, params, callback) {
  return state => {
    const [resolvedProjectGid, { externalId, data }] = expandReferences(
      state,
      projectGid,
      params
    );

    return util
      .requestWithPagination(state, `projects/${resolvedProjectGid}/tasks`, {
        query: { opt_fields: `${externalId}` },
      })
      .then(next => {
        const matchingTask = next.find(
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
      });
  };
}

/**
 * Search for tasks in a workspace by task name.
 * @public
 * @example <caption>Search for a task by name</caption>
 * searchTask("Test Search Task", {
 *   sort_by: "modified_at"
 * });
 * @example <caption>Search for a task by custom field only</caption>
 * searchTask("", {
 *   "custom_fields.12345.value": $.data.custom_field_value,
 * });
 * @example <caption>Search for a task by name and custom field</caption>
 * searchTask("Test Search Task", {
 *   "custom_fields.12345.is_set": true,
 * });
 * @example <caption>Search for a milestone by name</caption>
 * searchTask("Test Search Task", {
 *   resource_subtype: "milestone",
 * });
 * @function
 * @param {string} task - The text or name of the task to search for.
 * @param {object} [query] - Query params. See {@link https://developers.asana.com/reference/searchtasksforworkspace Docs} for a list of valid parameters.
 * @param {string} [query.resource_subtype = default_task] - The resource subtype to search for. Must be either `"default_task"` or `"milestone"`. Defaults to `"default_task"`.
 * @param {object} [options] - (Optional) options argument.
 * @param {string} [options.workspaceGid] - The workspace to search in. Defaults to the workspace specified in the configuration.
 * @returns {Operation} An operation that, when executed, returns the search results in state.data.
 */
export function searchTask(task, query = {}, options = {}) {
  return async state => {
    const [resolvedTask, resolvedQuery, resolvedOptions] = expandReferences(
      state,
      task,
      query,
      options
    );
    const { workspaceGid = state.configuration.workspaceGid } = resolvedOptions;
    const { resource_subtype = 'default_task', ...restQuery } = resolvedQuery;

    if (!workspaceGid) throw new Error('You need to specify Workspace GID');

    const response = await util.request(
      state,
      `workspaces/${workspaceGid}/tasks/search`,
      {
        query: {
          resource_subtype,
          text: resolvedTask,
          ...restQuery,
        },
      }
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Options provided to the createTaskStory request
 * @typedef {Object} StoryOptions
 * @public
 * @property {string} text - The plain text of the comment to add. Cannot be used with html_text.
 * @property {string} html_text - Opt In. HTML formatted text for a comment. This will not include the name of the creator.
 * @property {boolean} is_pinned - Default to `false`. Whether the story should be pinned on the resource.
 * @property {string} sticker_name - The name of the sticker in this story. `null` if there is no sticker.
 * @property {array} opt_fields - Opt In. This endpoint returns a compact resource, which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include.
 * @property {boolean} opt_pretty - Defaults to `false`. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging.
 */

/**
 * Create a story to a specific task.
 * @public
 * @example <caption>Create a plain text comment</caption>
 * createTaskStory("1206933955023739", {
 *   text: "This is a comment",
 * });
 * @example <caption>Create a HTML formatted text comment</caption>
 * createTaskStory("1206933955023739", {
 *   html_text: "<body>This is a comment</body>",
 * });
 * @function
 * @param {string} taskGid - Globally unique identifier for the task
 * @param {StoryOptions} params - Story parameters
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function createTaskStory(taskGid, params, callback) {
  return async state => {
    const [
      resolvedTaskGid,
      {
        text,
        html_text,
        sticker_name,
        is_pinned = false,
        opt_pretty = false,
        opt_fields = [],
      },
    ] = expandReferences(state, taskGid, params);

    const story = { text, html_text, is_pinned, sticker_name };
    const response = await util.request(
      state,
      `tasks/${resolvedTaskGid}/stories`,
      {
        body: { data: story },
        query: { opt_fields, opt_pretty },
        method: 'POST',
      },
      callback
    );
    return util.prepareNextState(state, response);
  };
}

/**
 * Options provided to the Asana API request
 * @typedef {Object} RequestOptions
 * @public
 * @property {object} body - Body data to append to the request.
 * @property {object} query - An object of query parameters to be encoded into the URL.
 * @property {string} method - The HTTP method to use. Defaults to `GET`
 */

/**
 * Make a HTTP request against the Asana API.
 * @public
 * @example Get a task by id
 * request("/tasks/1234");
 * @example Query for tasks in a given project
 * request("/tasks", {
 *   query: { project: "abc" },
 * });
 * @example Create a new task
 * request("/tasks", {
 *   method: "POST",
 *   body: { data: { name: "do the thing", completed: false } },
 * });
 * @function
 * @param {string} path - Path to resource (excluding api/version)
 * @param {RequestOptions} params - (Optional) Query, body and method parameters
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function request(path, params = {}, callback) {
  return async state => {
    const [resolvedPath, resolvedParams] = expandReferences(
      state,
      path,
      params
    );

    const { body, query, method } = resolvedParams;

    const response = await util.request(
      state,
      resolvedPath,
      { method, body, query },
      callback
    );

    return util.prepareNextState(state, response);
  };
}

export {
  alterState,
  cursor,
  dataPath,
  dataValue,
  dateFns,
  each,
  field,
  fields,
  fn,
  fnIf,
  lastReferenceValue,
  merge,
  sourceValue,
  as,
} from '@openfn/language-common';
