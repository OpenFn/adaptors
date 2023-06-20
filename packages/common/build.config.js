// override build config with an extra entry point
export default path => ({
  entry: [`${path}/src/index.js`, `${path}/src/metadata.js`, `${path}/src/util.js`],
});
