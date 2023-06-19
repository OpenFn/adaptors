import request from 'request';
import { assembleError, tryJson } from './Utils';

export function req(method, params) {
  const { url, headers, body, formData, auth, query, options, rest } = params;
  return new Promise((resolve, reject) => {
    const j = request.jar();
    request(
      {
        url,
        headers,
        auth,
        qs: query,
        method: method,
        json: body,
        formData,
        jar: j,
        options,
        ...rest,
      },
      function (err, response, body) {
        const error = assembleError({ error: err, response, params });
        if (error) {
          reject(error);
        } else {
          console.log(`✓ ${method} succeeded.`);
          console.log(
            `Server responded with: \n${JSON.stringify(response, null, 2)}`
          );
          const resp = tryJson(body);
          if (rest.keepCookie) {
            const __cookie = j.getCookieString(url);
            resolve({
              __cookie,
              __headers: response.headers,
              ...resp,
            });
          } else {
            resolve(resp);
          }
        }
      }
    );
  });
}
