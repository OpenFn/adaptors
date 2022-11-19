import request from 'superagent'

export function post({ username, password, body, url }) {
  return new Promise((resolve, reject) => {
    request.post(url)
    .type('json')
    .accept('json')
    .auth(username, password)
    .send(JSON.stringify(body))
    .end((error, res) => {
      if (!!error || !res.ok) {
        reject( error )
      }

      resolve( res )
    })

  })
}
