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
  request as apiRequest,
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
 * @property {Array<string>} [messageIds] - Fetch specific messages by their Gmail API message ids
 *   instead of searching with `query`. Cannot be combined with `query`. Note that these are the
 *   ids returned in `state.processedIds` / `messageId`, not RFC 822 Message-ID headers.
 * @property {Array<string|MessageContent>} [contents=['from', 'date', 'subject']]
 *   An array of strings or MessageContent objects used to specify which parts of the message to retrieve.
 * @property {Array<string>} [processedIds] - Ignore message ids which have already been processed.
 * @property {string?} [email] - The user account to retrieve messages from. Defaults to the authenticated user.
 * @property {int?} [maxResults] - Maximum number of messages to process per request. Default is 1000.
 * @property {boolean} [fetchAttachments=true] - Whether to download file and archive attachments.
 *   When false, matched attachments are returned as filename-only objects without content.
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
 * @example <caption>Download attachments for specific messages identified by an earlier step</caption>
 * getContentsFromMessages(
 *   {
 *     messageIds: $.data.filter(m => m.report).map(m => m.messageId),
 *     contents: [
 *       { type: 'file', name: 'report', file: /\.xlsx$/ }
 *     ]
 *   }
 * )
 */
export function getContentsFromMessages(options) {
  return async state => {
    const [resolvedOptions] = expandReferences(state, options);

    if (resolvedOptions.query && resolvedOptions.messageIds) {
      throw new Error(
        'getContentsFromMessages: provide either query or messageIds, not both',
      );
    }

    if (
      resolvedOptions.messageIds !== undefined &&
      !Array.isArray(resolvedOptions.messageIds)
    ) {
      throw new Error(
        'getContentsFromMessages: messageIds must be an array of Gmail message ids',
      );
    }

    const defaultOptions = {
      contents: ['from', 'date', 'subject'],
      userId: 'me',
      maxResults: 1000,
    };

    const opts = {
      userId: resolvedOptions.email ?? defaultOptions.userId,
      query: resolvedOptions.query,
      messageIds: resolvedOptions.messageIds,
      processedIds: resolvedOptions.processedIds,
      maxResults: resolvedOptions.maxResults ?? defaultOptions.maxResults,
      fetchAttachments: resolvedOptions.fetchAttachments !== false,
    };

    const contentIndicators = getContentIndicators(
      defaultOptions.contents,
      resolvedOptions.contents,
    );

    const needsFullFormat = contentIndicators.some(
      ({ type }) => type === 'body' || type === 'file' || type === 'archive',
    );
    const messageFormat = needsFullFormat ? 'full' : 'metadata';

    if (!opts.fetchAttachments) {
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

    const contents = [];
    const newIds = [];
    const previousIds = Array.isArray(opts.processedIds)
      ? opts.processedIds
      : [];

    // Fetches one message and appends its contents.
    // Returns true when maxResults has been reached.
    const processMessage = async messageId => {
      newIds.push(messageId);

      if (previousIds.includes(messageId)) {
        return false;
      }

      const content = {
        messageId,
      };

      const messageResult = await getMessageResult(
        opts.userId,
        messageId,
        messageFormat,
      );

      for (const contentIndicator of contentIndicators) {
        const messageContent = await getMessageContent(
          messageResult,
          contentIndicator,
          opts.fetchAttachments,
        );

        if (messageContent && content[contentIndicator.name]) {
          throw new Error(
            `Duplicate content name detected: ${contentIndicator.name}`,
          );
        }

        content[contentIndicator.name] ??= messageContent;
      }

      contents.push(content);

      return contents.length >= opts.maxResults;
    };

    if (opts.messageIds) {
      const uniqueMessageIds = [...new Set(opts.messageIds)];

      if (!uniqueMessageIds.length) {
        console.log('No messages found.');
      }

      for (const messageId of uniqueMessageIds) {
        if (await processMessage(messageId)) {
          break;
        }
      }
    } else {
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
          if (await processMessage(message.id)) {
            break doNextPageToken;
          }
        }
      } while (nextPageToken);
    }

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
 * Options provided to a raw Gmail API request.
 * @typedef {Object} RequestOptions
 * @public
 * @property {string} [method=GET] - The HTTP method to use.
 * @property {Object} [query] - An object of query parameters to append to the URL.
 * @property {Object} [body] - A JSON object to send as the request body.
 * @property {Object} [headers] - An object of headers to append to the request.
 */

/**
 * Make a raw request against the Gmail API. Use this to access any Gmail
 * endpoint not covered by other functions, such as labels, threads or drafts.
 * Paths are relative to `https://www.googleapis.com/gmail/v1` and are
 * authenticated with the configured credentials. The parsed response body is
 * written to `state.data`.
 *
 * INVARIANT: operational function named `request` - do not rename.
 * @public
 * @function
 * @param {string} path - Path to the resource, relative to the Gmail v1 API, or a full URL.
 * @param {RequestOptions} [options] - Optional request options.
 * @state {Object} data - The parsed response body from the Gmail API.
 * @returns {Operation}
 * @example <caption>Get a single message by its Gmail API id</caption>
 * request('/users/me/messages/18c93f2a4b1d5e07')
 * @example <caption>List labels</caption>
 * request('/users/me/labels')
 * @example <caption>Modify the labels of a message</caption>
 * request(`/users/me/messages/${$.data[0].messageId}/modify`, {
 *   method: 'POST',
 *   body: { addLabelIds: ['STARRED'] },
 * })
 */
export function request(path, options = {}) {
  return async state => {
    const [resolvedPath, resolvedOptions] = expandReferences(
      state,
      path,
      options,
    );

    const response = await apiRequest(resolvedPath, resolvedOptions);

    return composeNextState(state, response);
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
