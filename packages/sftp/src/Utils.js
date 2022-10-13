export function setUrl(configuration, path) {
  if ( configuration && configuration.baseUrl ) return configuration.baseUrl + path
  else return path
}

export function setAuth(configuration, manualAuth) {
  if ( manualAuth ) return manualAuth
  else if ( configuration && configuration.username ) return {
    'username': configuration.username,
    'password': configuration.password,
    'sendImmediately': ( configuration.authType != 'digest' )
  }
  else return null
}

export function assembleError({ response, error }) {
  if (response) {
    if ([200,201,202].indexOf(response.statusCode) > -1) return false;
  }
  if (error) return error;
  return new Error(`Server responded with:  \n${JSON.stringify(response, null, 2)}`)
}

export function tryJson(data) {
  try {
    return JSON.parse(data)
  } catch(e) {
    return {body: data}
  }
}
