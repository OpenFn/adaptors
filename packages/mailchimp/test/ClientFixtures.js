const fixtures = {
  post: {
    requestBody: {
      "A": 1
    },
    responseBody: {
      "httpStatus": "OK",
      "httpStatusCode": 200,
      "status": "OK",
      "message": "Import was successful.",
      "response": {
        "responseType": "ImportSummaries",
        "imported": 1,
        "updated": 0,
        "deleted": 0,
        "ignored": 0
      }
    }
  }
}

export {fixtures};

export default [
  {
    pattern : 'https://fake.server.com/api(.*)',

    fixtures(match, params, headers) {
      if (match[1] === '/api') {
        return {body: fixtures.post.responseBody, params, headers}
      }

      throw new Error(`No Fixture Match\ngot: ${JSON.stringify(match, 2, null)}`)
    },

    post(match, data) {
      return {
        ok: true,
        match,
        ...data
      }
    }
  }
]
