import test from 'ava';
import path from 'node:path';
import parseTs from '../src/parse-ts';

test('should parse a single interface', async t => {
  const result = await parseTs(path.resolve('test/fixtures/types.ts'));

  t.assert(result.length === 1);

  const [iface] = result;
  t.is(iface.name, 'Dhis2Attribute');
  // @ts-ignore
  const props = iface.type?.declaration?.children;
  t.is(props.length, 2);

  const [attr] = props;
  t.is(attr.kindString, 'Property');
  t.is(attr.comment.summary[0].text, 'The attribute id');
});
