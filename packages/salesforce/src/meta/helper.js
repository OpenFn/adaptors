import { Connection } from '@jsforce/jsforce-node';

const createHelper = (configuration = {}) => {
  const { loginUrl, username, password, securityToken } = configuration;

  // These are needed by the mock and the real
  // But maybe they shouldn't be?
  const processGlobals = describeGlobalResult => {
    const sobjects = describeGlobalResult.sobjects;
    return sobjects.filter(({ name, deprecatedAndHidden }) => {
      if (deprecatedAndHidden) {
        return false;
      }
      // TODO filter is deprecated at the moment
      if (configuration.filter) {
        return configuration.filter.includes(name);
      }
      return true;
    });
  };

  const processFields = describeSobjectResult => {
    return describeSobjectResult.fields;
  };

  let conn;

  const fetchGlobals = async () =>
    new Promise(resolve => {
      conn.describeGlobal((err, desc) => {
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
    getGlobals: () => fetchGlobals().then(processGlobals),
    getFields: async sobjectName =>
      fetchSobject(sobjectName).then(processFields),
  };

  return new Promise(resolve => {
    if (loginUrl) {
      conn = new Connection({
        loginUrl,
      });
      conn.login(username, password + securityToken, (err, res) => {
        resolve(salesforceHelper);
      });
    } else {
      resolve(salesforceHelper);
    }
  });
};

export default createHelper;
