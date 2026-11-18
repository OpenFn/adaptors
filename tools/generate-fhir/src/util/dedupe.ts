import ts from 'typescript';

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const sourceFile = ts.createSourceFile('', '', ts.ScriptTarget.Latest);

/**
 * Remove duplicate type nodes, comparing them by their printed form.
 * The first occurrence of each type wins, so order is preserved.
 */
export const dedupe = (types: ts.TypeNode[]): ts.TypeNode[] => {
  const seen = new Set<string>();
  return types.filter(type => {
    const key = printer.printNode(ts.EmitHint.Unspecified, type, sourceFile);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};
