export default (rootDir: string) => {
  return import(`${rootDir}/package.json`, {
    // @ts-ignore
    with: { type: 'json' },
  });
};
