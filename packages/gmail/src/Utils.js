import unzipper from 'unzipper';
import { google } from 'googleapis';

let gmail;
let isTesting;

export async function fetchMessages(userId, query, lastPageToken) {
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

export async function getContentFromMessage(userId, messageId, desiredContent) {
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

function isExpressionMatch(text, expression) {
  if (expression.startsWith('/') && expression.endsWith('/')) {
    try {
      return new RegExp(expression.slice(1, -1)).test(text);
    } catch (e) {
      return false;
    }
  }

  return text.includes(expression);
}

export async function getAttachment(userId, messageId, attachmentId) {
  return await gmail.users.messages.attachments.get({
    userId,
    messageId,
    id: attachmentId,
  });
}

export async function getFileFromAttachment(attachment) {
  const base64String = attachment?.data?.data;
  if (!base64String) {
    throw new Error('No data found in file.');
  }

  const fileContent = atob(base64String);

  return isTesting ? fileContent.substring(0, 40) : fileContent;
}

async function getFileFromArchive(archive, expression) {
  const base64String = archive?.data?.data;
  if (!base64String) {
    throw new Error('No data found in zip attachmentResponse.');
  }

  const compressedBuffer = Buffer.from(base64String, 'base64');
  const directory = await unzipper.Open.buffer(compressedBuffer);

  const file = directory?.files.find(f =>
    isExpressionMatch(f.path, expression)
  );

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

function getAttachmentInfo(messageResponse, expression) {
  const parts = messageResponse?.data?.payload?.parts;
  const part = parts?.find(p => isExpressionMatch(p.filename, expression));

  return part
    ? { attachmentId: part.body.attachmentId, filename: part.filename }
    : { attachmentId: null };
}

export function getBodyFromMessage(fullMessage) {
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

export function createConnection(state) {
  const { access_token } = state.configuration;

  const auth = new google.auth.OAuth2();
  auth.credentials = { access_token };

  gmail = google.gmail({ version: 'v1', auth });

  return state;
}

export function removeConnection(state) {
  gmail = undefined;
  return state;
}
