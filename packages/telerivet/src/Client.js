import request from 'superagent';

export function post({ apiKey, body, url }) {
  return new Promise((resolve, reject) => {
    request
      .post(url)
      .type('json')
      .accept('json')
      .auth(apiKey)
      .send(JSON.stringify(body))
      .end((error, res) => {
        if (!!error || !res.ok) {
          reject(error);
        }

        resolve(res);
      });
  });
}
