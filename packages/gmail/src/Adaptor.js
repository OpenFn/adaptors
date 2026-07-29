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
  buildAndSendMessage,
  createConnection,
  removeConnection,
} from './Utils.js';

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
 * @property {Array<string|MessageContent>} [contents=['from', 'date', 'subject']]
 *   An array of strings or MessageContent objects used to specify which parts of the message to retrieve.
 * @property {Array<string>} [processedIds] - Ignore message ids which have already been processed.
 * @property {string?} [email] - The user account to retrieve messages from. Defaults to the authenticated user.
 * @property {int?} [maxResults] - Maximum number of messages to process per request. Default is 1000.
 * @property {boolean} [fetchAttachments=true] - Whether to download file and archive attachments.
 *   When false, matched attachments are returned as filename-only objects without content.
 */

// Builds the content indicators and Gmail message `format` (metadata vs
// full) shared by getContentsFromMessages and getMessagesByIds.
function resolveContentPlan(defaultContents, requestedContents, fetchAttachments) {
  const contentIndicators = getContentIndicators(
    defaultContents,
    requestedContents,
  );

  const needsFullFormat = contentIndicators.some(
    ({ type }) => type === 'body' || type === 'file' || type === 'archive',
  );
  const messageFormat = needsFullFormat ? 'full' : 'metadata';

  if (!fetchAttachments) {
    console.log('fetchAttachments is false: skipping attachment downloads');
    const skippedNames = contentIndicators
      .filter(({ type }) => type === 'file' || type === 'archive')
      .map(({ name }) => name);
    if (skippedNames.length) {
      console.log(
        `fetchAttachments is false: skipping attachment downloads for ${skippedNames.join(
          ', ',
        )}; matched filenames will still be included in the output`,
      );
    }
  }

  return { contentIndicators, messageFormat };
}

// Fetches one message and builds its content object from the requested
// contentIndicators. Shared by getContentsFromMessages and getMessagesByIds.
async function buildMessageContent(
  userId,
  messageId,
  contentIndicators,
  messageFormat,
  fetchAttachments,
) {
  const content = { messageId };

  const messageResult = await getMessageResult(
    userId,
    messageId,
    messageFormat,
  );

  for (const contentIndicator of contentIndicators) {
    const messageContent = await getMessageContent(
      messageResult,
      contentIndicator,
      fetchAttachments,
    );

    if (messageContent && content[contentIndicator.name]) {
      throw new Error(
        `Duplicate content name detected: ${contentIndicator.name}`,
      );
    }

    content[contentIndicator.name] ??= messageContent;
  }

  return content;
}

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
 * @example <caption>Get metadata without downloading requested attachments</caption>
 * getContentsFromMessages(
 *   {
 *     query: 'after:2026/07/01',
 *     contents: [
 *       'body',
 *       { type: 'file', name: 'report', file: /\.xlsx$/ }
 *     ],
 *     fetchAttachments: false
 *   }
 * )
 */
export function getContentsFromMessages(options) {
  return async state => {
    const [resolvedOptions] = expandReferences(state, options);

    const defaultOptions = {
      contents: ['from', 'date', 'subject'],
      userId: 'me',
      maxResults: 1000,
    };

    const opts = {
      userId: resolvedOptions.email ?? defaultOptions.userId,
      query: resolvedOptions.query,
      processedIds: resolvedOptions.processedIds,
      maxResults: resolvedOptions.maxResults ?? defaultOptions.maxResults,
      fetchAttachments: resolvedOptions.fetchAttachments !== false,
    };

    const { contentIndicators, messageFormat } = resolveContentPlan(
      defaultOptions.contents,
      resolvedOptions.contents,
      opts.fetchAttachments,
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
        nextPageToken,
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

        contents.push(
          await buildMessageContent(
            opts.userId,
            message.id,
            contentIndicators,
            messageFormat,
            opts.fetchAttachments,
          ),
        );

        if (contents.length >= opts.maxResults) {
          break doNextPageToken;
        }
      }
    } while (nextPageToken);

    return {
      ...composeNextState(state, contents),
      processedIds: newIds,
    };
  };
}

/**
 * Configurable fields for composing an outbound Gmail message.
 * @typedef {Object} SendMessageOptions
 * @property {string} to - Recipient email address.
 * @property {string} subject - Subject line of the email.
 * @property {string} body - Email body content.
 * @property {Array<{ filename: string, content: string|Buffer }>} [attachments] - Optional list of files to attach.
 */

/**
 * Sends a Gmail message using the provided configuration.
 * Supports attachments and standard email fields like subject, body, and recipients.
 *
 * @public
 * @function
 * @param {SendMessageOptions|SendMessageOptions[]} message - The message configuration object or array of objects.
 * @state {Object} data - The Gmail API response from sending the message.
 * @returns {Operation}
 * @example
 * sendMessage({
 *   to: 'recipient@example.org',
 *   subject: 'Test Message',
 *   body: 'Hello from OpenFn!',
 *   attachments: [
 *     { filename: 'test.txt', content: 'Some text content' }
 *   ]
 * })
 */
export function sendMessage(message) {
  return async state => {
    const [resolvedMessage] = expandReferences(state, message);
    const messages = Array.isArray(resolvedMessage)
      ? resolvedMessage
      : [resolvedMessage];

    const results = [];
    for (const msg of messages) {
      const result = await buildAndSendMessage(msg);
      results.push(result);
    }

    return {
      ...composeNextState(state, results),
    };
  };
}

/**
 * Configurable options provided to getMessagesByIds.
 * @typedef {Object} MessageIdsOptions
 * @public
 * @property {Array<string|MessageContent>} [contents=['from', 'date', 'subject']]
 *   An array of strings or MessageContent objects used to specify which parts of the message to retrieve.
 * @property {Array<string>} [processedIds] - Ignore message ids which have already been processed.
 * @property {string?} [email] - The user account to retrieve messages from. Defaults to the authenticated user.
 * @property {int?} [maxResults] - Maximum number of messages to process per request. Default is 1000.
 * @property {boolean} [fetchAttachments=true] - Whether to download file and archive attachments.
 *   When false, matched attachments are returned as filename-only objects without content.
 */

/**
 * Downloads contents from specific messages of a Gmail account, identified by
 * their Gmail API message ids, instead of searching with a query. Note that
 * these are the ids returned in `state.processedIds` / `messageId`, not RFC
 * 822 Message-ID headers.
 * @public
 * @function
 * @param {Array<string>} messageIds - Gmail API message ids to fetch.
 * @param {MessageIdsOptions} [options] - Customized options including desired contents.
 * @state {Array} data - The returned message objects, of the form `{ messageId, contents } `
 * @state {Array<string>} processedIds - An array of string ids processed by this request
 * @returns {Operation}
 * @example <caption>Download attachments for specific messages identified by an earlier step</caption>
 * getMessagesByIds(
 *   $.data.filter(m => m.report).map(m => m.messageId),
 *   {
 *     contents: [
 *       { type: 'file', name: 'report', file: /\.xlsx$/ }
 *     ]
 *   }
 * )
 */
export function getMessagesByIds(messageIds, options = {}) {
  return async state => {
    const [resolvedMessageIds, resolvedOptions] = expandReferences(
      state,
      messageIds,
      options,
    );

    if (!Array.isArray(resolvedMessageIds)) {
      throw new Error('getMessagesByIds: messageIds must be an array of Gmail message ids');
    }

    const defaultOptions = {
      contents: ['from', 'date', 'subject'],
      userId: 'me',
      maxResults: 1000,
    };

    const opts = {
      userId: resolvedOptions.email ?? defaultOptions.userId,
      processedIds: resolvedOptions.processedIds,
      maxResults: resolvedOptions.maxResults ?? defaultOptions.maxResults,
      fetchAttachments: resolvedOptions.fetchAttachments !== false,
    };

    const { contentIndicators, messageFormat } = resolveContentPlan(
      defaultOptions.contents,
      resolvedOptions.contents,
      opts.fetchAttachments,
    );

    const contents = [];
    const newIds = [];
    const previousIds = Array.isArray(opts.processedIds)
      ? opts.processedIds
      : [];

    const uniqueMessageIds = [...new Set(resolvedMessageIds)];

    if (!uniqueMessageIds.length) {
      console.log('No messages found.');
    }

    for (const messageId of uniqueMessageIds) {
      newIds.push(messageId);

      if (previousIds.includes(messageId)) {
        continue;
      }

      contents.push(
        await buildMessageContent(
          opts.userId,
          messageId,
          contentIndicators,
          messageFormat,
          opts.fetchAttachments,
        ),
      );

      if (contents.length >= opts.maxResults) {
        break;
      }
    }

    return {
      ...composeNextState(state, contents),
      processedIds: newIds,
    };
  };
}

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for http.
 * @private
 * @param {...Function} operations - Operations to be performed.
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
      removeConnection,
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
  lastReferenceValue,
  log,
  merge,
  sourceValue,
} from '@openfn/language-common';
