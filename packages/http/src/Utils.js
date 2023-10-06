// TODO add support for tls on config
export function addBasicAuth(configuration, headers) {
  const username = configuration?.username;
  const password = configuration?.password;
  if (username && password) {
    const base64Encode = btoa(`${username}:${password}`);
    headers['Authorization'] = `Basic ${base64Encode}`;

    return headers;
  }
  return null;
}
