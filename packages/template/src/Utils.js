// TODO: Determine how to authenticate for the target API
export function makeBasicAuth(username, password) {
  const buff = Buffer.from(`${username}:${password}`);
  const credentials = buff.toString('base64');
  return `Basic ${credentials}`;
}
