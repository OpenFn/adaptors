import request from 'superagent';

export function post({ url, body, authToken, apiVersion, action }) {
  return new Promise((resolve, reject) => {
    request
      .post(url)
      .type('form')
      .query({
        ZOHO_ACTION: action,
        ZOHO_OUTPUT_FORMAT: 'JSON',
        ZOHO_ERROR_FORMAT: 'JSON',
        authtoken: authToken,
        ZOHO_API_VERSION: apiVersion,
      })
      .send(body)
      .end((error, res) => {
        if (!!error || !res.ok) {
          reject(error);
        }

        resolve(res);
      });
  });
}
