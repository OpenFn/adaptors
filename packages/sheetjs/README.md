# language-sheetjs <img src='./assets/square.png' width="30" height="30"/>

An OpenFn **_adaptor_** for reading and writing spreadsheet files with
[SheetJS](https://sheetjs.com/).

Unlike most adaptors, sheetjs does not talk to an external system. It is a
data-transformation utility (like `common`) which operates on spreadsheet
content already on `state` - a base64 string or buffer fetched by another
adaptor, or a webhook payload.

## Documentation

View the
[docs site](https://docs.openfn.org/adaptors/packages/sheetjs-docs) for
full technical documentation.

### Configuration

This adaptor needs no `configuration` - it makes no network calls and requires
no credentials.

## Usage

### Reading a file

`parse()` turns file content into a workbook and lists its sheets:

```js
parse($.data.fileContent);
// state.data = { sheetNames: ['People', 'Orders'] }
```

The content type is detected automatically for buffers, base64 strings and
data URLs; SheetJS then works out the file format from the content itself. Pass
`type` explicitly to override the detection - the one ambiguous case is a
single-column CSV that is also valid base64:

```js
parse($.data.fileContent, { type: 'string' });
```

`sheetToJson()` converts a worksheet into an array of objects. Every operation
takes the file content, so each one stands on its own:

```js
sheetToJson($.data.fileContent);
sheetToJson($.data.fileContent, { sheetName: 'Orders' });
```

By default cells come back as raw values - numbers as numbers and dates as JS
`Date` objects. Pass `raw: false` to get each cell's formatted text instead:

```js
sheetToJson($.data.fileContent, { raw: false });
```

Other common options:

```js
// rows as arrays of cell values, rather than objects
sheetToJson($.data.fileContent, { header: 1 });

// read a fixed range and fill empty cells
sheetToJson($.data.fileContent, { range: 'A2:D40', defval: null });
```

`sheetToCsv()` converts a worksheet into a CSV string:

```js
sheetToCsv($.data.fileContent);
sheetToCsv($.data.fileContent, { FS: ';' });
```

### Writing a file

`jsonToSheet()` builds a spreadsheet from an array of objects and writes it to
`state.data` as a buffer, ready for a downstream `http`, `sftp` or
`googledrive` step to upload:

```js
jsonToSheet($.data.records, { sheetName: 'Export' });
// state.data = { buffer, bookType: 'xlsx', sheetName: 'Export' }
```

Ask for base64 instead when the destination expects a string:

```js
jsonToSheet($.data.records, { sheetName: 'Export', output: 'base64' });
// state.data = { base64, bookType: 'xlsx', sheetName: 'Export' }
```

The keys of the first object become the column headers. Use `header` to fix the
column order, and `bookType` to choose the format:

```js
jsonToSheet($.data.records, {
  bookType: 'csv',
  header: ['id', 'name', 'dateOfBirth'],
});
```

Note that SheetJS prefixes `csv` output with a UTF-8 BOM so that Excel opens it
with the right encoding.

## Notes

### Working with untrusted files

SheetJS does not throw on content it cannot identify - it falls back to parsing
it as plaintext and returns a workbook with garbage in it. Pass `type`
explicitly when you know the format, so a bad guess can't pass silently.

There is no size limit on parsing. `sheetRows` caps how many rows are
materialised, but the archive is still decompressed in full first, so cap file
size upstream if you accept spreadsheets from an untrusted source.

Values are written as text, never as formulas. But `csv` has no cell types, so a
spreadsheet app opening a CSV will treat a value like `=1+1` as a formula.
Sanitise untrusted data before writing a CSV that a person will open.

### Performance

Each operation parses the file it is given, so reading several sheets from one
file parses it several times - around 470ms per call on a 10MB file, and a few
milliseconds on a typical one. A parsed workbook is never written to `state`,
which keeps state small and avoids a subtle failure: OpenFn resolves operation
arguments by rebuilding objects from their own keys, and a `Date` has none, so
a workbook passed through `state` would come back with every date nulled. File
content is a Buffer or a string, so it passes through untouched.

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
"Getting Started" guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To build _only_ the docs run `pnpm build docs`.

### Dependencies

SheetJS is not published to the public npm registry. This package installs it
from the official SheetJS CDN tarball, pinned in `package.json`:

```json
"xlsx": "https://cdn.sheetjs.com/xlsx-0.20.3/xlsx-0.20.3.tgz"
```

### Test fixtures

`test/fixtures/sample.xlsx` is a generated binary. To change it, edit and re-run
`node test/fixtures/generate.js`.
