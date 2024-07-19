import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import { request as requestHelper } from './Utils';

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
    return requestHelper(
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

    return requestHelper(
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

    return requestHelper(
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

    return requestHelper(
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
    const [resolvedProjectGid, { externalId, data }] = expandReferences(
      state,
      projectGid,
      params
    );

    return requestHelper(
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
  return state => {
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
    return requestHelper(
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

/**
 * Options provided to the Asana API request
 * @typedef {Object} RequestOptions
 * @public
 * @property {object} body - Body data to append to the request.
 * @property {object} query - An object of query parameters to be encoded into the URL.
 * @property {string} method - The HTTP method to use. Defaults to `GET`
 */

/**
 * Make a request in Asana API
 * @public
 * @example
 * request("/asanaEndpoint", {
 *   method: "POST",
 *   query: { foo: "bar", a: 1 },
 * });
 * @function
 * @param {string} path - Path to resource
 * @param {RequestOptions} params - Query, body and method parameters
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function request(path, params = {}, callback) {
  return state => {
    const [resolvedPath, { body = {}, query = {}, method = 'GET' }] =
      expandReferences(state, path, params);

    return requestHelper(
      state,
      resolvedPath,
      { method, body, query },
      callback
    );
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
  http,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';
