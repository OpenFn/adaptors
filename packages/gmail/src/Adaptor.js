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
  getContentIndicators,
  getMessageContent,
  createConnection,
  removeConnection,
} from './Utils';

/**
 * Used to isolate the type of content to retrieve from the message.
 * @typedef {Object} MessageContent
 * @public
 * @property {string} [type] - Message content type. Valid types: from, date, subject, body, archive, file.
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
 * @property {Array<string|MessageContent>} [contents=['from', 'date', 'subject', 'body']]
 *   An array of strings or MessageContent objects used to specify which parts of the message to retrieve.
 * @property {Array<string>} [processedIds] - Ignore message ids which have already been processed.
 * @property {string?} [email] - The user account to retrieve messages from. Defaults to the authenticated user.
 * @property {int?} [maxResults] - Maximum number of messages to process per request. Hard limit of 1000. Defaults to 50.
 */

/**
 * Downloads contents from messages of a Gmail account.
 * @public
 * @function
 * @param {Options} options - Customized options including desired contents and query.
 * @state {Array} data - The returned message objects, of the form `{ messageId, contents } `
 * @state {Array<string>} processedIds - An array of string ids processed by this request
 * @returns {Operation}
 * @example <caption>Get a message with a specific subject</caption>
 * getContentsFromMessages(
 *   {
 *     query: 'subject:my+test+message'
 *   }
 * )
 * @example <caption>Get messages after a specific date, with subject and report.txt attachment</caption>
 * getContentsFromMessages(
 *   {
 *     query: 'after:15/01/2025',
 *     contents: [
 *       'subject',
 *       { type: 'file', name: 'metadata', file: 'report.txt'}
 *     ]
 *   }
 * )
 */
export function getContentsFromMessages(options) {
  return async state => {
    const [resolvedOptions] = expandReferences(state, options);

    const defaultOptions = {
      contents: ['from', 'date', 'subject'],
      userId: 'me',
      maxResults: 50,
    };

    const opts = {
      userId: resolvedOptions.email ?? defaultOptions.userId,
      query: resolvedOptions.query,
      processedIds: resolvedOptions.processedIds,
      maxResults: resolvedOptions.maxResults ?? defaultOptions.maxResults,
    };

    if (opts.maxResults > 1000) {
      throw new Error(
        'The maximum number of results is 1000. Please reduce the number of results.'
      );
    }

    const contentIndicators = getContentIndicators(
      defaultOptions.contents,
      resolvedOptions.contents
    );

    const contents = [];
    const newIds = [];
    const previousIds = Array.isArray(opts.processedIds)
      ? opts.processedIds
      : [];

    let nextPageToken = null;

    doNextPageToken: do {
      const messagesResult = await getMessagesResult(
        opts.userId,
        opts.query,
        nextPageToken
      );

      if (!messagesResult.messages?.length) {
        console.log('No messages found.');
        break;
      }

      nextPageToken = messagesResult.nextPageToken;

      for (const message of messagesResult.messages) {
        newIds.push(message.id);

        if (previousIds.includes(message.id)) {
          continue;
        }

        const content = {
          messageId: message.id,
        };

        const messageResult = await getMessageResult(opts.userId, message.id);

        for (const contentIndicator of contentIndicators) {
          const messageContent = await getMessageContent(
            messageResult,
            contentIndicator
          );

          if (messageContent && content[contentIndicator.name]) {
            throw new Error(
              `Duplicate content name detected: ${contentIndicator.name}`
            );
          }

          content[contentIndicator.name] ??= messageContent;
        }

        contents.push(content);

        if (contents.length >= opts.maxResults) {
          break doNextPageToken;
        }
      }
    } while (nextPageToken);

    const nextState = {
      ...composeNextState(state, contents),
      processedIds: newIds,
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
