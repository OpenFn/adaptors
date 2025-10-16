// Override build config to use TypeScript entry point
export default path => ({
  entry: [`${path}/src/index.ts`],
});
