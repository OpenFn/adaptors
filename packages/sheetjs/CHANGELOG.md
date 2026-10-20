# @openfn/language-sheetjs

## 1.0.0

Initial release of the sheetjs adaptor, wrapping
[SheetJS](https://sheetjs.com/) for local spreadsheet transformation.

- `parse()` - read `.xlsx`, `.xls`, `.csv` and other supported file content
  (buffer, base64 string or data URL) into a workbook and list its sheet names
- `sheetToJson()` - convert a worksheet into an array of JSON objects
- `sheetToCsv()` - convert a worksheet into a CSV string
- `jsonToSheet()` - build a spreadsheet file from JSON records and return it as
  a buffer or base64 string

This adaptor requires no `configuration` and makes no network calls.
