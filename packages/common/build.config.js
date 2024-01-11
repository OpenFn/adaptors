// override build config with an extra entry point
export default path => ({
  entry: {
    index: `${path}/src/index.js`,
    metadata: `${path}/src/metadata.js`,
    util: `${path}/src/util/index.js`,
  },
});
