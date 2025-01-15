import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';

import {
  normalizeOauthConfig,
  expandReferences,
} from '@openfn/language-common/util';

import {
  getMessagesResult,
  getMessageResult,
  getDesiredContent,
  getMessageContent,
  createConnection,
  removeConnection,
} from './Utils';

/**
 * Used to isolate the type of content to retrieve from the message.
 * @typedef {Object} DesiredContent
 * @public
 * @property {string} type - Message content type. Valid types: from, date, subject, body, archive, file.
 * @property {string?} [name=null] - A custom description for the content type. Optional.
 * @property {RegExp|string} [archive] - Identifier to isolate the desired attachment when type is 'archive'.
 *   Use a regular expression for pattern matching or a string for a literal match. Required if type is 'archive'.
 * @property {RegExp|string} [file] - Identifier to isolate the desired attachment when type is 'file' or 'archive'.
 *   Use a regular expression for pattern matching or a string for a literal match. Required if type is 'file' or 'archive'.
 * @property {number?} [maxLength=null] - Maximum number of characters to retrieve from the content. Optional.
 */

/**
 * Configurable options provided to the Gmail adaptor.
 * @typedef {Object} Options
 * @public
 * @property {string} userId - The email address of the Gmail account.
 * @property {string?} [query=null] - Custom query to limit the messages result. Adheres to the Gmail search syntax. Optional.
 * @property {Array<string|DesiredContent>?} [desiredContents=['from', 'date', 'subject', 'body']]
 *   An array of strings or DesiredContent objects used to specify which parts of the message to retrieve. Optional, default is `['from', 'date', 'subject', 'body']`.
 * @property {Array<string>?} [processedIds=null] - Ignore message ids which have already been processed. Optional.
 */

/**
 * Requests contents from messages of a Gmail account.
 * @public
 * @function
 * @param {string} userId - The email address of the account to retrieve messages from.
 * @param {Options} userOptions - Customized options including desired contents and query.
 * @returns {Function} A function that processes the state.
 * @example
 * getContentsFromMessages(
 *   'test@tester.com',
 *   {
 *     query: 'in:inbox subject:my+test+message',
 *     desiredContents: ['date', 'from', 'subject', { type: 'body', maxLength: 50 }]
 *   }
 * )
 */
export function getContentsFromMessages(userId, userOptions) {
  return async state => {
    const [resolvedUserId, resolvedUserOptions] = expandReferences(
      state,
      userId,
      userOptions
    );

    const defaultOptions = {
      desiredContents: ['from', 'date', 'subject', 'body'],
    };

    const options = { ...defaultOptions, ...(resolvedUserOptions || {}) };

    const contents = [];
    const currentIds = [];
    const previousIds = Array.isArray(options.processedIds)
      ? options.processedIds
      : [];

    let nextPageToken = null;

    do {
      const messagesResult = await getMessagesResult(
        resolvedUserId,
        options.query,
        nextPageToken
      );

      if (!messagesResult.messages?.length) {
        console.log('No messages found.');
        break;
      }

      nextPageToken = messagesResult.nextPageToken;

      const currentPageIds = messagesResult.messages.map(message => message.id);

      const unprocessedIds = currentPageIds.filter(
        id => !previousIds.includes(id)
      );

      for (const messageId of unprocessedIds) {
        const content = {
          messageId: messageId,
        };

        const messageResult = await getMessageResult(userId, messageId);

        for (const desiredContentHint of options.desiredContents) {
          const desiredContent = getDesiredContent(desiredContentHint);

          const messageContent = await getMessageContent(
            messageResult,
            desiredContent
          );

          if (messageContent && content[desiredContent.name]) {
            throw new Error(
              `Duplicate content name detected: ${desiredContent.name}`
            );
          }

          content[desiredContent.name] ??= messageContent;
        }

        contents.push(content);
      }

      currentIds.push(...currentPageIds);
    } while (nextPageToken);

    const nextState = {
      ...composeNextState(state, contents),
      processedIds: currentIds,
    };

    return nextState;
  };
}

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for http.
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
    return commonExecute(
      createConnection,
      ...operations,
      removeConnection
    )({
      ...initialState,
      ...state,
      configuration: normalizeOauthConfig(state.configuration),
    });
  };
}

export {
  alterState,
  combine,
  cursor,
  dataPath,
  dataValue,
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
