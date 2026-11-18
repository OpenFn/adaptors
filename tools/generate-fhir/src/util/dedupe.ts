import ts from 'typescript';

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const sourceFile = ts.createSourceFile('', '', ts.ScriptTarget.Latest);

const printTsNode = (node: ts.Node) =>
  printer.printNode(ts.EmitHint.Unspecified, node, sourceFile);

/**
 * Remove duplicate items, comparing them by a string key.
 * By default the key is the printed form of a TypeScript node.
 * The first occurrence of each key wins, so order is preserved.
 */
export function dedupe(types: ts.TypeNode[]): ts.TypeNode[];
export function dedupe<T>(items: T[], key: (item: T) => string): T[];
export function dedupe(
  items: any[],
  key: (item: any) => string = printTsNode,
): any[] {
  const seen = new Set<string>();
  return items.filter(item => {
    const k = key(item);
    if (seen.has(k)) {
      return false;
    }
    seen.add(k);
    return true;
  });
}
