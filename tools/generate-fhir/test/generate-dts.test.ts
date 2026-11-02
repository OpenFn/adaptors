import test from 'ava';
import ts from 'typescript';
import {
  generateDataTypes,
  generateInterface,
  generateType,
} from '../src/generate-dts';

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const sourceFile = ts.createSourceFile(
  'generated.ts',
  '',
  ts.ScriptTarget.Latest,
  false,
  ts.ScriptKind.TS
);

const print = (node: ts.Node) =>
  printer.printNode(ts.EmitHint.Unspecified, node, sourceFile);

for (const [name, generate] of [
  ['type alias', generateType],
  ['interface', generateInterface],
] as const) {
  const propertyType = (
    prop: { type: string | string[]; isArray?: boolean },
    overrides = {},
    shorthands: Record<string, string[]> = {}
  ) => {
    const schema = {
      id: 'Example',
      type: 'Example',
      props: { value: prop },
    };
    const declaration = generate(
      'Example',
      schema as any,
      overrides,
      shorthands,
      'Example'
    );
    const members = ts.isInterfaceDeclaration(declaration)
      ? declaration.members
      : (declaration.type as ts.TypeLiteralNode).members;
    const property = members.find(ts.isPropertySignature)!;
    return property.type!;
  };

  test(`${name}: deduplicates nonadjacent members in first-occurrence order`, t => {
    const type = propertyType({
      type: ['Reference', 'string', 'Reference', 'boolean', 'string', 'url'],
    });

    t.is(print(type), 'Reference | string | boolean | url');
  });

  test(`${name}: collapses FHIR string aliases to a single type`, t => {
    const type = propertyType({
      type: ['date', 'dateTime', 'instant', 'uri', 'id', 'string'],
    });

    t.false(ts.isUnionTypeNode(type));
    t.is(print(type), 'string');
  });

  test(`${name}: collapses FHIR number aliases to a single type`, t => {
    const type = propertyType({
      type: ['decimal', 'integer', 'positiveInt', 'unsignedInt', 'number'],
    });

    t.false(ts.isUnionTypeNode(type));
    t.is(print(type), 'number');
  });

  test(`${name}: deduplicates any without removing other members`, t => {
    const type = propertyType({
      type: ['base64Binary', 'boolean', 'canonical', 'any', 'date'],
    });

    t.is(print(type), 'any | boolean | string');
  });

  test(`${name}: preserves an already unique union`, t => {
    const type = propertyType({ type: ['boolean', 'Quantity', 'string'] });

    t.is(print(type), 'boolean | Quantity | string');
  });

  test(`${name}: preserves scalar input`, t => {
    const type = propertyType({ type: 'date' });

    t.false(ts.isUnionTypeNode(type));
    t.is(print(type), 'string');
  });

  test(`${name}: deduplicates arrays after mapping primitive aliases`, t => {
    const type = propertyType({
      type: ['date', 'string', 'CodeableConcept', 'dateTime'],
      isArray: true,
    });

    t.is(print(type), 'string[] | CodeableConcept[]');
  });

  test(`${name}: preserves grouped shorthand unions and array shorthands`, t => {
    const type = propertyType(
      {
        type: ['CodeableConcept', 'Identifier', 'Reference', 'CodeableConcept'],
        isArray: true,
      },
      {},
      {
        CodeableConcept: ['string[]', 'string[]'],
        Identifier: ['string', 'string'],
        Reference: ['string', 'string'],
      }
    );

    t.is(
      print(type),
      '(string[] | CodeableConcept) | (string | Identifier) | (string | Reference)'
    );
  });

  test(`${name}: preserves distinct shorthands on mapped aliases`, t => {
    const type = propertyType(
      { type: ['date', 'dateTime', 'string', 'date'] },
      {},
      { date: ['DateInput'], dateTime: ['TimestampInput'] }
    );

    t.is(
      print(type),
      '(DateInput | string) | (TimestampInput | string) | string'
    );
  });

  test(`${name}: collapses a shorthand identical to its base type`, t => {
    const type = propertyType(
      { type: ['string'] },
      {},
      { string: ['string', 'string'] }
    );

    t.false(ts.isUnionTypeNode(type));
    t.is(print(type), 'string');
  });

  test(`${name}: deduplicates mapping overrides`, t => {
    const type = propertyType(
      { type: ['boolean'] },
      { value: { type: ['date', 'string', 'dateTime'] } }
    );

    t.is(print(type), 'string');
  });
}

test('generateDataTypes deduplicates R4B choice properties', t => {
  const choiceTypes = [
    'base64Binary',
    'boolean',
    'canonical',
    'string',
    'date',
    'dateTime',
    'decimal',
    'integer',
    'unsignedInt',
    'url',
    'Address',
    'CodeableConcept',
    'Identifier',
    'Reference',
  ];
  const props = Object.fromEntries(
    ['defaultValue', 'fixed', 'pattern'].map(key => [
      key,
      { type: choiceTypes },
    ])
  );
  for (const key of ['minValue', 'maxValue']) {
    props[key] = {
      type: ['date', 'dateTime', 'integer', 'decimal', 'Quantity'],
    };
  }
  const schema = {
    ElementDefinition: [
      { id: 'ElementDefinition', type: 'ElementDefinition', props },
    ],
    Extension: [
      {
        id: 'Extension',
        type: 'Extension',
        props: { value: { type: choiceTypes } },
      },
    ],
  };
  const { src, index } = generateDataTypes(schema as any, {
    typeShorthands: {
      CodeableConcept: ['string[]'],
      Identifier: ['string'],
      Reference: ['string'],
    },
  });
  const file = ts.createSourceFile(
    'fhir.ts',
    src,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  );
  const declarations = file.statements as ts.NodeArray<ts.InterfaceDeclaration>;

  t.deepEqual(index, { ElementDefinition: true, Extension: true });
  t.deepEqual(
    declarations.map(declaration => declaration.name.text),
    ['ElementDefinition', 'Extension']
  );
  t.is(declarations[0].members.length, 5);
  t.is(declarations[1].members.length, 1);
  for (const member of declarations.flatMap(
    declaration => declaration.members
  )) {
    const property = member as ts.PropertySignature;
    const key = (property.name as ts.Identifier).text;
    t.is(
      property.type!.getText(file),
      ['minValue', 'maxValue'].includes(key)
        ? 'string | number | Quantity'
        : 'any | boolean | string | number | url | Address | (string[] | CodeableConcept) | (string | Identifier) | (string | Reference)',
      key
    );
    t.truthy(property.questionToken);
  }
});
