import xlsx from 'xlsx';

/**
 * The function `sheetToBuffer` takes in rows and options, It creates a workbook
 * and worksheet using the rows, appends the worksheet to the workbook, and returns the workbook as a
 * buffer.
 * @public
 * @example
 * <caption>Create a buffer containing excel file with `xlsx` output format  </caption>
 * sheetToBuffer(
 *   [
 *     ["Name", "Age"],
 *     ["John", 20],
 *   ],
 *   {
 *     wsName: "Patient Data",
 *     bookType: "xlsx",
 *   },
 * );
 * @param rows - The `rows` parameter is an array of objects representing the data to be written to the
 * Excel sheet. Each object in the array represents a row in the sheet, and the keys of the object
 * represent the column headers. The values of the object represent the data in each cell of the row.
 * @param options - The `options` parameter is an object that contains additional configuration options
 * @param {String} [options.wsName] - Worksheet name i.e 32 Characters
 * @param {String} [options.bookType] - File format of the exported file, Default is 'xlsx'. See {@link https://docs.sheetjs.com/docs/api/write-options/#supported-output-formats here}
 * for the function. It can have the following properties:
 * @returns a buffer containing the Excel file.
 */
export function sheetToBuffer(rows, options) {
  const { wsName = 'Sheet', bookType = 'xlsx' } = options;

  const workbook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.json_to_sheet(rows);

  xlsx.utils.book_append_sheet(workbook, worksheet, wsName);

  const buffer = xlsx.write(workbook, { type: 'buffer', bookType });

  console.log(`Creating sheet buffer with bookType '${bookType}'`);

  return buffer;
}
