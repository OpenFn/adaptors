import TypeDoc from 'typedoc';

export default async (pathToSource: string, pathToTsConfig?: string) => {
  const app = new TypeDoc.Application();

  const s = new TypeDoc.Serializer();

  app.options.addReader(new TypeDoc.TSConfigReader());

  app.bootstrap({
    entryPoints: [pathToSource],
    showConfig: true,

    // TODO lots of weird warnings come from common... what can we do about externals?
    // this doesn't seem to help...
    excludeExternals: true,

    // If not defined, this will look in the working dir (usually the adaptor dir) for a tsconfig
    tsconfig: pathToTsConfig,
  });

  const project = app.convert();
  const json = s.projectToObject(project!);

  // Return all type aliases in the file
  return (
    json.children?.filter(thing => thing.kindString === 'Type alias') ?? []
  );
};
