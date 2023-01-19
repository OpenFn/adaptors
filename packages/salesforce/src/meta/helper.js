import jsforce from 'jsforce';

const createHelper = configuration => {
  const { loginUrl, username, password, securityToken } = configuration;

  // These are needed by the mock and the real
  // But maybe they shouldn't be?
  const processGlobals = describeGlobalResult => {
    const sobjects = describeGlobalResult.sobjects;
    return sobjects.filter(({ name, deprecatedAndHidden }) => {
      if (deprecatedAndHidden) {
        return false;
      }
      if (configuration.filter) {
        return configuration.filter.includes(name);
      }
      return true;
    });
  };

  const processFields = describeSobjectResult => {
    return describeSobjectResult.fields;
  };

  var conn = new jsforce.Connection({
    loginUrl,
  });

  const fetchGlobals = async () =>
    new Promise(resolve => {
      conn.describeGlobal$((err, desc) => {
        resolve(desc);
      });
    });

  const fetchSobject = async name =>
    new Promise(resolve => {
      conn.describe(name, (err, result) => {
        resolve(result);
      });
    });

  const salesforceHelper = {
    // _fetchGlobals,
    // _fetchSobject,
    getGlobals: () => fetchGlobals().then(processGlobals),
    getFields: async sobjectName =>
      fetchSobject(sobjectName).then(processFields),

    // won't be mocked
    _somethingPrivate: () => {},
  };

  return new Promise(resolve => {
    conn.login(username, password + securityToken, (err, res) => {
      resolve(salesforceHelper);
    });
  });
};

export default createHelper;
