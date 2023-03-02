import TypeDoc, { TypeDocOptions } from 'typedoc';

export default async (pathToSource: string, pathToTsConfig?: string) => {
  const app = new TypeDoc.Application();

  const s = new TypeDoc.Serializer();

  app.options.addReader(new TypeDoc.TSConfigReader());

  const options = {
    entryPoints: [pathToSource],
    // Ignore errors (our adaptors have a lot of undefined types, like Operation)
    skipErrorChecking: true,
  } as Partial<TypeDocOptions>;

  // If not defined, this will look in the working dir (usually the adaptor dir) for a tsconfig
  if (pathToTsConfig) {
    options.tsconfig = pathToTsConfig;
  }

  app.bootstrap(options);

  const project = app.convert();
  const json = s.projectToObject(project!);

  // Return all type aliases in the file
  return (
    json.children?.filter(thing => thing.kindString === 'Type alias') ?? []
  );
};
