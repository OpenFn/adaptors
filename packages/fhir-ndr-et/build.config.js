// override build config with an extra entry point
export default path => ({
  entry: {
    index: `${path}/src/index.js`,
    utils: `${path}/src/utils.js`,
  },
});
