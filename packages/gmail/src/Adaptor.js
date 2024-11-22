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

// Common client functions.
let gmail = undefined;
const isTesting = false;

export function getContentsFromMessages(
  userId,
  query,
  desiredContents,
  callback = s => s
) {
  return async state => {
    collections
      .get('gmail-processed-ids', '*')
      .then(state => console.log('collections', state));

    const messageContents = [];
    const previouslyProcessedIds = state.processedIds || [];
    const currentlyProcessedIds = [];

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
        id => !previouslyProcessedIds.includes(id)
      );

      for (let messageId of unprocessedIds) {
        const messageContent = {
          messageId: messageId,
          contents: [],
        };

        for (let desiredContent of desiredContents) {
          const content = await getContentFromMessage(
            userId,
            messageId,
            desiredContent
          );
          messageContent.contents.push(content);
        }

        messageContents.push(messageContent);

        if (isTesting) {
          break;
        }
      }

      currentlyProcessedIds.push(...incomingIds);

      if (isTesting) {
        break;
      }
    } while (nextPageToken);

    const expiredIds = previouslyProcessedIds.filter(
      id => !currentlyProcessedIds.includes(id)
    );

    const processedIds = currentlyProcessedIds.filter(
      id => !expiredIds.includes(id)
    );

    const nextState = {
      ...composeNextState(state, messageContents),
      processedIds,
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
    const archive = await getAttachment(userId, messageId, attachmentId);
    const file = await getFileFromArchive(archive, desiredContent.file);
    return { name: desiredContent.name, ...file };
  }

  if (desiredContent.type === 'file') {
    const { attachmentId, filename } = getAttachmentInfo(
      messageResponse,
      desiredContent.file
    );
    const attachment = await getAttachment(userId, messageId, attachmentId);
    const file = await getFileFromAttachment(attachment);
    return { name: desiredContent.name, value: file, path: filename };
  }

  if (desiredContent.type === 'body') {
    const body = getBodyFromMessage(messageResponse);
    return { name: desiredContent.name, value: body };
  }

  if (desiredContent.type === 'subject') {
    const headers = messageResponse.data?.payload?.headers;
    const subject = headers?.find(h => h.name === 'Subject')?.value;
    return { name: desiredContent.name, value: subject };
  }

  if (desiredContent.type === 'from') {
    const headers = messageResponse.data?.payload?.headers;
    const from = headers?.find(h => h.name === 'From')?.value;
    return { name: desiredContent.name, value: from };
  }

  if (desiredContent.type === 'date') {
    const headers = messageResponse.data?.payload?.headers;
    const rawDate = headers?.find(h => h.name === 'Date')?.value;
    const date = rawDate ? new Date(rawDate) : null;
    return { name: desiredContent.name, value: date };
  }

  return {
    name: desiredContent.name,
    content: `Unsupported type: ${desiredContent.type}`,
  };
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

  let fileContent = atob(base64String);

  if (isTesting) {
    fileContent = fileContent.substring(0, 100);
  }

  return fileContent;
}

async function getFileFromArchive(archive, filePattern) {
  const base64String = archive?.data?.data;
  if (!base64String) {
    throw new Error('No data found in zip attachmentResponse.');
  }

  const compressedBuffer = Buffer.from(base64String, 'base64');
  const directory = await unzipper.Open.buffer(compressedBuffer);

  const file = directory?.files.find(file => filePattern.test(file.path));

  if (!file) {
    throw new Error('File not found in the archive.');
  }

  const fileBuffer = await file.buffer();
  const fileString = fileBuffer.toString('base64');
  let fileContent = atob(fileString);

  if (isTesting) {
    fileContent = fileContent.substring(0, 100);
  }

  return { value: fileContent, path: file.path };
}

function getAttachmentInfo(messageResponse, regex) {
  const parts = messageResponse?.data?.payload?.parts;
  const part = parts?.find(part => regex.test(part.filename));
  return { attachmentId: part.body.attachmentId, filename: part.filename };
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
    return Buffer.from(textBody, 'base64').toString('utf-8');
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
