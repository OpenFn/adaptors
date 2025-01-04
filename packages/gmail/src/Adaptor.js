import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';

import {
  normalizeOauthConfig,
  expandReferences,
} from '@openfn/language-common/util';

import unzipper from 'unzipper';
import { google } from 'googleapis';

let gmail = undefined;
const isTesting = false;

export function getContentsFromMessages(
  userId,
  query,
  desiredContents,
  callback = s => s
) {
  return async state => {
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
      const messagesResult = await fetchMessages(userId, query, nextPageToken);
      if (!messagesResult.messages?.length) {
        console.log('No messages found.');
        break;
      }

      nextPageToken = messagesResult.nextPageToken;

      const incomingIds = messagesResult.messages.map(message => message.id);

      const unprocessedIds = incomingIds.filter(
        id => !previousIds.includes(id)
      );

      for (let messageId of unprocessedIds) {
        const messageContent = {
          messageId: messageId,
        };

        for (let hint of desiredContents) {
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

          const content = await getContentFromMessage(
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

async function fetchMessages(userId, query, lastPageToken) {
  let messagesResponse = null;

  try {
    messagesResponse = await gmail.users.messages.list({
      userId: userId,
      q: query,
      maxResults: 3,
      pageToken: lastPageToken,
    });
  } catch (error) {
    throw new Error('Error fetching messages: ' + error.message);
  }

  const { messages, nextPageToken } = messagesResponse.data;

  return { messages, nextPageToken };
}

async function getContentFromMessage(userId, messageId, desiredContent) {
  const messageResponse = await gmail.users.messages.get({
    userId,
    id: messageId,
    format: 'full',
  });

  if (desiredContent.type === 'archive') {
    const { attachmentId, filename } = getAttachmentInfo(
      messageResponse,
      desiredContent.archive
    );

    if (!attachmentId) {
      return null;
    }

    const archive = await getAttachment(userId, messageId, attachmentId);
    const file = await getFileFromArchive(archive, desiredContent.file);
    return { ...file, archiveFilename: filename };
  }

  if (desiredContent.type === 'file') {
    const { attachmentId, filename } = getAttachmentInfo(
      messageResponse,
      desiredContent.file
    );

    if (!attachmentId) {
      return null;
    }

    const attachment = await getAttachment(userId, messageId, attachmentId);
    const file = await getFileFromAttachment(attachment);
    return { content: file, filename };
  }

  if (desiredContent.type === 'body') {
    const body = getBodyFromMessage(messageResponse);
    return body;
  }

  if (desiredContent.type === 'subject') {
    const headers = messageResponse.data?.payload?.headers;
    const subject = headers?.find(h => h.name === 'Subject')?.value;
    return subject;
  }

  if (desiredContent.type === 'from') {
    const headers = messageResponse.data?.payload?.headers;
    const from = headers?.find(h => h.name === 'From')?.value;
    return from;
  }

  if (desiredContent.type === 'date') {
    const headers = messageResponse.data?.payload?.headers;
    const rawDate = headers?.find(h => h.name === 'Date')?.value;
    const date = rawDate ? new Date(rawDate) : null;
    return date;
  }

  return `Unsupported content type: ${desiredContent.type}`;
}

async function getAttachment(userId, messageId, attachmentId) {
  return await gmail.users.messages.attachments.get({
    userId,
    messageId,
    id: attachmentId,
  });
}

async function getFileFromAttachment(attachment) {
  const base64String = attachment?.data?.data;
  if (!base64String) {
    throw new Error('No data found in file.');
  }

  const fileContent = atob(base64String);

  return isTesting ? fileContent.substring(0, 40) : fileContent;
}

async function getFileFromArchive(archive, filePattern) {
  const base64String = archive?.data?.data;
  if (!base64String) {
    throw new Error('No data found in zip attachmentResponse.');
  }

  const compressedBuffer = Buffer.from(base64String, 'base64');
  const directory = await unzipper.Open.buffer(compressedBuffer);

  const file = directory?.files.find(f => filePattern.test(f.path));

  if (!file) {
    throw new Error('File not found in the archive.');
  }

  const fileBuffer = await file.buffer();
  const fileString = fileBuffer.toString('base64');
  const fileContent = atob(fileString);

  return {
    content: isTesting ? fileContent.substring(0, 40) : fileContent,
    filename: file.path,
  };
}

function getAttachmentInfo(messageResponse, regex) {
  const parts = messageResponse?.data?.payload?.parts;
  const part = parts?.find(p => regex.test(p.filename));

  return part
    ? { attachmentId: part.body.attachmentId, filename: part.filename }
    : { attachmentId: null };
}

function getBodyFromMessage(fullMessage) {
  const parts = fullMessage?.data?.payload?.parts;

  const bodyPart = parts?.find(
    part => part.mimeType === 'multipart/alternative'
  );

  const textBodyPart = bodyPart?.parts.find(
    part => part.mimeType === 'text/plain'
  );

  const textBody = textBodyPart?.body?.data;
  if (textBody) {
    let body = Buffer.from(textBody, 'base64').toString('utf-8');
    return isTesting ? body.substring(0, 40) : body;
  }

  return null;
}

/**
 * Execute a sequence of oper.
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
    // Note: we no longer need `steps` anymore since `commonExecute`
    // takes each operation as an argument.
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

function createConnection(state) {
  const { access_token } = state.configuration;

  const auth = new google.auth.OAuth2();
  auth.credentials = { access_token };

  gmail = google.gmail({ version: 'v1', auth });

  return state;
}

function removeConnection(state) {
  gmail = undefined;
  return state;
}

function logError(error) {
  console.log('RAW ERROR:', error);
  const { code, errors, response } = error;
  if (code && errors && response) {
    console.error('The API returned an error:', errors);

    const { statusText, config } = response;
    const { url, method, body } = config;
    const message = `${method} ${url} - ${code}:${statusText} \nbody: ${body}`;

    console.log(message);
  }
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
