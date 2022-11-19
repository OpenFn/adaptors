const fixtures = {
  event: {
    requestBody: {
      "program": "eBAyeGv0exc",
      "orgUnit": "DiszpKrYNg8",
      "eventDate": "2013-05-17",
      "status": "COMPLETED",
      "storedBy": "admin",
      "coordinate": {
        "latitude": "59.8",
        "longitude": "10.9"
      },
      "dataValues": [
        { "dataElement": "qrur9Dvnyt5", "value": "99" },
        { "dataElement": "oZg33kd9taw", "value": "Female" },
        { "dataElement": "msodh3rEMJa", "value": "2013-05-18" }
      ]
    },
    responseBody: {
      "httpStatus":"OK",
      "httpStatusCode":200,"status":"OK","message":"Import was successful.","response":{"responseType":"ImportSummaries","imported":3,"updated":0,"deleted":0,"ignored":0,"importSummaries":[{"responseType":"ImportSummary","status":"SUCCESS","importCount":{"imported":3,"updated":0,"ignored":0,"deleted":0},"reference":"rrPOYH80oqG","href":"https://play.http.org/demo/api/events/rrPOYH80oqG"}]}}


  }
}

export { fixtures };

export default [ {
  pattern: 'https://play.http.org/demo(.*)',

  fixtures( match, params, headers ) {
    if( match[1] === '/api/events' ) {
      return {
        body: fixtures.event.responseBody,
        params, headers
      }
    }

    throw new Error( `No Fixture Match\ngot: ${JSON.stringify(match, 2, null)}`)
  },

  post(match, data) {
    return { ok: true, match, ...data }
  },

  get(match, data) {
    return { ok: true, match, ...data }
  }
} ]
