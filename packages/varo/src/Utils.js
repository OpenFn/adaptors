export function parseMetadata(message) {
  if (!message.metadata?.content) {
    console.error('No metadata supplied.');
    return null;
  }

  try {
    return JSON.parse(message.metadata.content);
  } catch (error) {
    console.error('Invalid metadata JSON.', error);
    return null;
  }
}
export { field } from '@openfn/language-common/util';
