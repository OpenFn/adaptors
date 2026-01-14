import { pathToFileURL } from 'node:url';

export default (rootDir: string) => {
  return import(pathToFileURL(`${rootDir}/package.json`).href, {
    // @ts-ignore
    with: { type: 'json' },
  });
};
