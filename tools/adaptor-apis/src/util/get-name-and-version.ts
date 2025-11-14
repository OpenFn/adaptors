export default (specifier: string) => {
  let name;
  let version = '@latest';

  const atIndex = specifier.lastIndexOf('@');
  if (atIndex > 0) {
    name = specifier.substring(0, atIndex);
    version = specifier.substring(atIndex + 1);
  } else {
    name = specifier;
  }

  return { name, version } as { name: string; version?: string };
};
