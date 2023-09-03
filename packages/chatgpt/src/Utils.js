// TODO: Determine how to authenticate for the target API
function makeAuthHeader(auth) {
  const { username, password } = auth;
  const buff = Buffer.from(`${username}:${password}`);
  const credentials = buff.toString('base64');
  return { Authorization: `Basic ${credentials}` };
}

export async function request(url, options) {
  const { auth } = options;
  delete options.auth;

  const response = await fetch(url, {
    ...options,
    headers: {
      'content-type': 'application/json',
      ...makeAuthHeader(auth),
    },
  });

  // TODO: Handle errors based on the behavior of the target API
  if (response.status === 404) {
    throw new Error('Page not found');
  } else if (response.status === 500) {
    throw new Error('Server error');
  } else if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // TODO: Extract data from response based on the target API
  const data = await response.json();
  return data;
}
