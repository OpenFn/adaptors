const fixtures = {
  site: {
    id: 123,
    data: {
      name: 'test',
      lat: 48.86,
      lon: 2.35,
    },
    responseBody: {
      httpStatus: 'OK',
      httpStatusCode: 200,
      status: 'OK',
      message: 'Import was successful.',
      response: {
        responseType: 'ImportSummaries',
        imported: 3,
        updated: 0,
        deleted: 0,
        ignored: 0,
        importSummaries: [
          {
            responseType: 'ImportSummary',
            status: 'SUCCESS',
            importCount: {
              imported: 3,
              updated: 0,
              ignored: 0,
              deleted: 0,
            },
            reference: 'rrPOYH80oqG',
            href: 'https://play.resourcemap.org/demo/api/events/rrPOYH80oqG',
          },
        ],
      },
    },
  },
};

export { fixtures };

export default [
  {
    pattern: 'https://www.resourcemap.org/demo(.*)',

    fixtures(match, params, headers) {
      if (match[1] === '/api/events') {
        return {
          body: fixtures.event.responseBody,
          statusCode: 200,
          params,
          headers,
        };
      }

      throw new Error(
        `No Fixture Match\ngot: ${JSON.stringify(match, 2, null)}`
      );
    },

    post(match, data) {
      return { ok: true, match, ...data };
    },
  },
];
