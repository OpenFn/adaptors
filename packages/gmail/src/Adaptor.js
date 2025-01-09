import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import {
  normalizeOauthConfig,
  expandReferences,
} from '@openfn/language-common/util';
import {
  createConnection,
  fetchMessages,
  getContentFromMessage,
  getMessageResponse,
  removeConnection,
} from './Utils';

const isTesting = false;

export function getContentsFromMessages(
  userId,
  query,
  desiredContents,
  callback = s => s
) {
  return async state => {
    const [resolvedUserId, resolvedQuery, resolvedDesiredContents] =
      expandReferences(state, userId, query, desiredContents);

    const messageContents = [];
    const currentIds = [];
    const previousIds = Array.isArray(state.processedIds)
      ? state.processedIds
      : [];

    if (isTesting) {
      console.log('previousIds', previousIds);
    }

    let nextPageToken = null;

    do {
      const messagesResult = await fetchMessages(
        resolvedUserId,
        resolvedQuery,
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
        const messageContent = {
          messageId: messageId,
        };

        for (const hint of resolvedDesiredContents) {
          const desiredContent =
            typeof hint === 'object' ? hint : { type: hint };

          if (!desiredContent.type) {
            if (desiredContent.archive) {
              desiredContent.type = 'archive';
            } else if (desiredContent.file) {
              desiredContent.type = 'file';
            }
          }

          if (!desiredContent.type) {
            console.error('Unable to determine desired content type:', hint);
            throw new Error('No desired content type provided.');
          }

          if (!desiredContent.name) {
            desiredContent.name = desiredContent.type;
          }

          const messageResponse = await getMessageResponse(userId, messageId);

          const content = await getContentFromMessage(
            messageResponse,
            userId,
            messageId,
            desiredContent
          );

          if (content && messageContent[desiredContent.name]) {
            throw new Error(
              `Duplicate content name detected: ${desiredContent.name}`
            );
          }

          messageContent[desiredContent.name] ??= content;
        }

        messageContents.push(messageContent);
      }

      currentIds.push(...incomingIds);
    } while (nextPageToken);

    const expiredIds = previousIds.filter(id => !currentIds.includes(id));
    const newIds = currentIds.filter(id => !expiredIds.includes(id));

    const nextState = {
      ...composeNextState(state, messageContents),
      processedIds: newIds,
    };

    return callback(nextState);
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
