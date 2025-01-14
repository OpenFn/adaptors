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
 * @property {string} [name=null] - A custom description the content type. Optional.
 * @property {RegExp|string} [archive] - When type is 'archive', an identifier to isolate the desired attachment.
 *   Use a regular expression for pattern matching or a string for a literal match. Required when type is 'archive'.
 * @property {RegExp|string} [file] - When type is 'file', an identifier to isolate the desired attachment.
 *   Use a regular expression for pattern matching or a string for a literal match. Required when type is 'file' or 'archive'.
 * @property {number} [maxLength] - The maximum number of characters to retrieve from the content. Optional.
 */

/**
 * Configurable options provided to the Gmail adaptor.
 * @typedef {Object} Options
 * @public
 * @property {string} userId - The email address of the Gmail account.
 * @property {string} [query=null] - Custom query to limit the messages result. Adheres to the Gmail search syntax. Optional.
 * @property {Array<string|DesiredContent>} [desiredContents=['from', 'date', 'subject', 'body']]
 *   An array of strings or DesiredContent objects used to specify which parts of the message to retrieve.
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
      query: '',
    };

    const options = { ...defaultOptions, ...(resolvedUserOptions || {}) };

    const contents = [];
    const currentIds = [];
    const previousIds = Array.isArray(state.processedIds)
      ? state.processedIds
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

      const incomingIds = messagesResult.messages.map(message => message.id);

      const unprocessedIds = incomingIds.filter(
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

      currentIds.push(...incomingIds);
    } while (nextPageToken);

    const expiredIds = previousIds.filter(id => !currentIds.includes(id));
    const newIds = currentIds.filter(id => !expiredIds.includes(id));

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
