const fixtures = {
  entity: {
    params: {
      entityName: 'accounts',
      body: {
        name: 'johnny',
        creditonhold: false,
        address1_latitude: 47.639583,
        description: 'This is the description of the sample account',
        revenue: 5000000,
        accountcategorycode: 1,
      },
    },
    response: {
      body: {}, // find out what Vtiger returns.
    },
  },
};

export { fixtures };

export default [
  {
    pattern: 'https://openfn.crm2.vtiger.com/(.*)',

    fixtures(match, params, headers) {
      if (match[1] === '/api/createEntity') {
        return { body: fixtures.entity.responseBody, params, headers };
      }

      throw new Error(
        `No Fixture Match\ngot: ${JSON.stringify(match, 2, null)}`
      );
    },

    post(match, data) {
      return {
        ok: true,
        match,
        ...data,
      };
    },

    get(match, data) {
      return {
        ok: true,
        match,
        ...data,
      };
    },
  },
];
