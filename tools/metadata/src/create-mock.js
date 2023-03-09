// Attempt a totally generic mock
// Calls the underlying functions, writes the results to disk,
// returns the cached stuff when available
import fs from 'node:fs/promises';
import path from 'node:path';

const getFileName = (fn, ...args) => {
  const extras = args && args.length ? `__${args.join('_')}` : '';
  return `${fn}${extras}.json`;
};

const callHelper = async (helper, fnName, dataPath, ...args) => {
  const result = await helper[fnName](...args);
  await fs.mkdir(path.dirname(dataPath), { recursive: true });
  await fs.writeFile(dataPath, JSON.stringify(result));
  console.log(`  Writing to ${dataPath}`);
  return result;
};

const createMock = (helper, options = {}) => {
  const wrap =
    fnName =>
    async (...args) => {
      const dataPath = path.resolve(
        `${options.path || 'tmp'}/${getFileName(fnName, ...args)}`
      );
      await fs.mkdir(path.dirname(dataPath), { recursive: true });
      if (options.force) {
        return callHelper(helper, fnName, dataPath, ...args);
      }
      try {
        const raw = await fs.readFile(dataPath, 'utf8');
        return JSON.parse(raw);
      } catch (e) {
        // TODO should the mock call the helper, or just happily ignore?
        // salesforce wants to ignore, like, a lot
        // console.log('-- call helper');
        // return callHelper(helper, fnName, dataPath, ...args);
      }
    };

  const mock = {};
  Object.keys(helper).forEach(fnName => {
    if (!fnName.startsWith('_')) {
      mock[fnName] = wrap(fnName);
    }
  });
  return mock;
};

export default createMock;
