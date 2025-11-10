import { throwError } from '@openfn/language-common/util';

export const errorHandler = err => {
  const { type = 'UnknownError', message, meta } = err;

  if (
    type == 'PostError' &&
    (message.includes('Not Allowed') || message.includes('network-failure'))
  ) {
    console.error({
      type,
      meta,
      message,
      fix: 'Error accessing Actual Server, check Actual Server url',
    });
    throwError(err);
  }
  if (err.message.includes('Could not get remote files')) {
    console.error({
      type,
      meta,
      message,
      fix: 'Error accessing Actual Server, check Actual Server password',
    });
    throwError(err);
  }
  if (
    message.includes('not found') ||
    message.includes('No budget') ||
    message.includes('Cannot destructure property')
  ) {
    console.error(type || 404, { message, meta });
    throwError(err);
  }
  if (
    message.includes('Invalid month') ||
    message.includes('required') ||
    message.includes('Bad date format') ||
    message.includes('does not exist on table') ||
    message.includes('convert to integer') ||
    message.includes('must be')
  ) {
    console.error({ type, message, meta });
    throwError(err);
  }

  console.error({
    type,
    meta,
    message,
    fix: 'Unknown error while interacting with Actual Api. See server logs for more information',
  });
  throwError(err);
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
