import { mkdirSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

import { throwError } from '@openfn/language-common/util';

export const tmpDir = join(tmpdir(), `actual-budget-${Date.now()}`);
export const createTempDir = tempDir => {
  mkdirSync(tempDir, { recursive: true });
  return tempDir;
};
export const deleteTempDir = tempDir => {
  rmSync(tempDir, { recursive: true, force: true });
};

export const errorHandler = err => {
  // Suppress unhandled rejections
  process.on('unhandledRejection', async (reason, promise) => {
    console.log('Error:', reason);
  });
  const { type = 'UnknownError', message } = err;
  if (
    type == 'PostError' &&
    (message.includes('Not Allowed') || message.includes('network-failure'))
  ) {
    throwError(message, {
      message,
      type,
      fix: 'Error accessing Actual Server, check Actual Server url',
    });
  }
  if (message.includes('Could not get remote files')) {
    throwError(message, {
      message,
      type,
      fix: 'Error accessing Actual Server, check Actual Server password',
    });
  }
  if (
    message.includes('not found') ||
    message.includes('No budget') ||
    message.includes('Cannot destructure property')
  ) {
    throwError(message, { type, message });
  }
  if (
    message.includes('Invalid month') ||
    message.includes('required') ||
    message.includes('Bad date format') ||
    message.includes('does not exist on table') ||
    message.includes('convert to integer') ||
    message.includes('must be')
  ) {
    throwError(message, { type, message });
  }

  throwError(message, {
    type,
    message,
    fix: 'Unknown error while interacting with Actual Api. See server logs for more information',
  });
};

export const validateConfig = config => {
  if (!config.serverUrl) {
    throw new Error('serverUrl is required');
  }
  if (!config.password) {
    throw new Error('password is required');
  }
  if (!config.budgetSyncId) {
    throw new Error('budgetSyncId is required');
  }
};
