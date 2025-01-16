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
 * @typedef {Object} MessageContent
 * @public
 * @property {string} type - Message content type. Valid types: from, date, subject, body, archive, file.
 * @property {string} [name] - A custom description for the content type.
 * @property {RegExp|string} [archive] - Identifier to isolate the desired attachment when type is 'archive'.
 *   Use a regular expression for pattern matching or a string for a literal match. Required if type is 'archive'.
 * @property {RegExp|string} [file] - Identifier to isolate the desired attachment when type is 'file' or 'archive'.
 *   Use a regular expression for pattern matching or a string for a literal match. Required if type is 'file' or 'archive'.
 * @property {number?} [maxLength] - Maximum number of characters to retrieve from the content.
 */

/**
 * Configurable options provided to the Gmail adaptor.
 * @typedef {Object} Options
 * @public
 * @property {string?} [query] - Gmail search query string.
 * @property {Array<string|MessageContent>} [desiredContents=['from', 'date', 'subject', 'body']]
 *   An array of strings or MessageContent objects used to specify which parts of the message to retrieve.
 * @property {Array<string>} [processedIds] - Ignore message ids which have already been processed.
 */

/**
 * Downloads contents from messages of a Gmail account.
 * @public
 * @function
 * @param {string} accountId - The email address of the account to retrieve messages from.
 * @param {Options} options - Customized options including desired contents and query.
 * @state {Array} data - The returned message objects, of the form `{ id, contents } `
 * @state {Array<string>} processedIds - An array of string ids processed by this request
 * @returns {Operation}
 * @example <caption>Get a message with a specific subject</caption>
 * getContentsFromMessages(
 *   'user123@gmail.com',
 *   {
 *     query: 'subject:my+test+message'
 *   }
 * )
 * @example <caption>Get messages after a specific date, with subject and report.txt attachment</caption>
 * getContentsFromMessages(
 *   'user123@gmail.com',
 *   {
 *     query: 'after:15/01/2025',
 *     desiredContents: [
 *       'subject',
 *       { type: 'file', name: 'metadata', file: 'report.txt'}
 *     ]
 *   }
 * )
 */
export function getContentsFromMessages(accountId, options) {
  return async state => {
    const [resolvedAccountId, resolvedOptions] = expandReferences(
      state,
      accountId,
      options
    );

    const defaultOptions = {
      desiredContents: ['from', 'date', 'subject', 'body'],
    };

    const opts = { ...defaultOptions, ...(resolvedOptions || {}) };

    const contents = [];
    const currentIds = [];
    const previousIds = Array.isArray(opts.processedIds)
      ? opts.processedIds
      : [];

    let nextPageToken = null;

    do {
      const messagesResult = await getMessagesResult(
        resolvedAccountId,
        opts.query,
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

        const messageResult = await getMessageResult(accountId, messageId);

        for (const desiredContentHint of opts.desiredContents) {
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
