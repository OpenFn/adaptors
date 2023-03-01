import TypeDoc from 'typedoc';
import path from 'node:path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

export default async (pathToSource: string) => {
  const dir = path.dirname(pathToSource);
  const app = new TypeDoc.Application();

  const s = new TypeDoc.Serializer();

  app.options.addReader(new TypeDoc.TSConfigReader());
  app.bootstrap({
    entryPoints: [pathToSource],
    showConfig: true,

    // TODO lots of wierd warnings come from common... wat can we do about externals?
    // this doesn't seem to help..
    excludeExternals: true,

    // dodgy pathing
    // having to pass a path here is a real pain - can't I just pass all the options I need?
    // Or an inline object?
    basePath: dir, // doesn't do what I think it does

    // Ideally this would use the tsconfig in the "hosting" pckage
    // ie, if running from dhis2 tests, it should use dhis2's config
    // But the config for the doc build and the config for tests is kinda different
    // This package's tests actually fail if we use its tsconfig (because includes is wrong)
    // tsconfig: `${dirname}/tsconfig.parser.json`,
    // tsconfig: path.resolve('../../tools/parse-jsdoc/tsconfig.parser.json'),

    // includes: ['../../**/*.ts'],
    // tsconfig: {
    //   // dodgy include pathing
    //   "include": ["../../**/*.ts"],
    //   "compilerOptions": {
    //     "strict": false,
    //     "module": "es2020",
    //     "moduleResolution": "node",
    //     "allowSyntheticDefaultImports": true,
    //     "skipLibCheck": true
    //   }
    // }

    compilerOptions: {
      strict: false,
    },
  });

  const project = app.convert();
  const json = s.projectToObject(project!);

  // Return all type aliases in the file
  return (
    json.children?.filter(thing => thing.kindString === 'Type alias') ?? []
  );
};
