// This is a utility which lets us abstract the data layer a little, enabling unit tests
// the backend's job is to serve raw data (or cached backups) from the salesforce API
// It can use jsforce or cached data from the filesystem
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import jsforce from 'jsforce';

// config can include a filter, to only return a subset of sobjects
export default async (configuration, useMock) => {
  const cache = {
    globals: null,
    sobjects: {},
  };

  // take the result of descrbiebGlobal (live or mocl)
  // pull out the sobjects and filter according to config
  const processGlobals = describeGlobalResult => {
    const sobjects = describeGlobalResult.sobjects;
    if (configuration.filter) {
      return sobjects.filter(({ name }) => configuration.filter.includes(name));
    }
    return sobjects;
  };

  const processFields = describeSobjectResult => {
    return describeSobjectResult.fields;
  };

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

  const mockHelper = {
    // returns results from the file system
    getGlobals: async () => {
      if (!cache.globals) {
        const data = await readFile(
          path.resolve('./src/meta/data/globals.json'),
          'utf8'
        );
        cache.globals = processGlobals(JSON.parse(data));
      }
      return cache.globals;
    },
    getFields: async name => {
      if (!cache.sobjects[name]) {
        const data = await readFile(
          path.resolve(`./src/meta/data/sobject-${name}.json`),
          'utf8'
        );
        cache.sobjects[name] = processFields(JSON.parse(data));
      }
      return cache.sobjects[name];
    },
  };

  if (useMock) {
    return Promise.resolve(mockHelper);
  }

  const liveHelper = {
    getGlobals: async () => fetchGlobals().then(processGlobals),
    getFields: async sobjectName =>
      fetchSobject(sobjectName).then(processFields),
  };

  const { loginUrl, username, password, securityToken } = configuration;

  var conn = new jsforce.Connection({
    loginUrl,
  });

  const clearCache = () => {
    // clears everything
    conn.cache.clear();
    // conn.describeGlobal$.clear();
    // conn.sobject('Account').describe$.clear();
  };

  return new Promise(resolve => {
    conn.login(username, password + securityToken, (err, res) => {
      resolve(liveHelper);
    });
  });
};
