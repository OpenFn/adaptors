// override build config with an extra entry point
export default path => ({
  entry: {
    index: `${path}/src/index.js`,
    Utils: `${path}/src/Utils.js`,
  },
  externals: [`${path}/src/builders.js`],
});
