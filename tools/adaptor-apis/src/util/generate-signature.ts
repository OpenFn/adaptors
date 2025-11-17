// Incoming data is the jsdoc parse tree (see raw.json)
// TODO we need typings for this
export default (data: any) => {
  if (data.kind == 'function') {
    // Support signatures as an array, but right now we'll only generate one
    const sigs = [];

    const params = (data.params ?? [])
      // Objects in params are listed as their own entries, like `object.parseAs`
      // So just ignore these nested objects
      .filter(p => !p.name.includes('.'))
      .map(p => p.name)
      .join(', ');
    sigs.push(`${data.name}(${params})`);

    return sigs;
  }
};
