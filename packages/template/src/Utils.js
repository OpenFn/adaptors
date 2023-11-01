// TODO: Determine how to authenticate for the target API
export function makeBasicAuth(username, password) {
  const buff = Buffer.from(`${username}:${password}`);
  const credentials = buff.toString('base64');
  return `Basic ${credentials}`;
}

export function checkConfig(configuration) {
  const { username, password, baseUrl } = configuration;

  if (!username || !password || !baseUrl) {
    throw new Error(
      'Username, password, and baseUrl must be provided in state.configuration'
    );
  }
  return { username, password, baseUrl };
}
