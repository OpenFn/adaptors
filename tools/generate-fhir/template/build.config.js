// override build config with an extra entry point
export default path => ({
  external: ['lodash'],
  entry: [`${path}/src/index.ts`],
});
