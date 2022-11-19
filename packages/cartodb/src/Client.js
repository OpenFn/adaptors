import request from 'superagent'

export function post({ apiKey, body, url }) {
  return new Promise((resolve, reject) => {
    request.get(url)
    .query({ q: body })
    .query({ api_key: apiKey })
    .end((error, res) => {
      if (!!error || !res.ok) {
        reject( error )
      }

      resolve( res )
    })

  })
}
