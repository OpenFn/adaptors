import request from 'superagent'

export function post({ apiToken, body, url }) {
  return new Promise((resolve, reject) => {
    request.post(url)
    .type('json')
    .accept('json')
    .set('Authorization', `Token ${apiToken}`)
    .send(JSON.stringify(body))
    .end((error, res) => {
      if (!!error || !res.ok) {
        reject( error )
      }

      resolve( res )
    })

  })
}
