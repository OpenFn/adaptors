import xlsx from 'xlsx';

export function compact(options = {}) {
  return Object.fromEntries(
    Object.entries(options).filter(([, value]) => value !== undefined)
  );
}

const decodeBase64 = str => {
  // Some APIs wrap base64 at a fixed column, so ignore whitespace
  const normalized = str.replace(/\s/g, '');
  if (normalized.length === 0 || normalized.length % 4 !== 0) return null;

  const decoded = Buffer.from(normalized, 'base64');
  return decoded.toString('base64') === normalized ? decoded : null;
};

// Encoders wrap base64 at 64 (PEM) or 76 (MIME) columns
const MIN_WRAP_WIDTH = 60;

/**
 * Multi-line content is only base64 if it has the shape a wrapping encoder
 * produces: every line but the last the same width, a multiple of 4 and at
 * least MIN_WRAP_WIDTH, with the last line no longer. Without this, a short
 * single-column CSV like "name\nJohn\nJane" passes the base64 round-trip and
 * is silently decoded into garbage.
 */
const isWrappedLikeBase64 = str => {
  const lines = str.trim().split(/\r?\n/);
  if (lines.length === 1) return true;

  const [width] = lines.map(line => line.length);
  if (width < MIN_WRAP_WIDTH || width % 4 !== 0) return false;

  const last = lines.pop();
  return lines.every(line => line.length === width) && last.length <= width;
};

/**
 * Normalise file content into something xlsx.read() accepts, working out the
 * SheetJS `type` if the caller didn't declare one.
 */
export function decodeContent(content, type) {
  if (Buffer.isBuffer(content)) {
    return { data: content, type: 'buffer' };
  }
  if (typeof content !== 'string') {
    throw new Error(
      'sheetjs: file content must be a Buffer or string. Wrap binary data in Buffer.from() first'
    );
  }

  // Split a data URL, eg "data:application/vnd.ms-excel;base64,0M8R4..."
  const isDataUrl = content.startsWith('data:');
  const comma = content.indexOf(',');
  if (isDataUrl && comma === -1) {
    throw new Error('sheetjs: malformed data URL; expected a comma separator');
  }
  const prefix = isDataUrl ? content.slice(0, comma) : '';
  const raw = isDataUrl ? content.slice(comma + 1) : content;

  // A declared encoding, whether from `type` or the data URL, must be honoured
  const declaredBase64 = type
    ? type === 'base64'
    : isDataUrl && prefix.includes(';base64');
  if (declaredBase64) {
    const decoded = decodeBase64(raw);
    if (!decoded) throw new Error('sheetjs: invalid base64 content');
    return { data: decoded, type: 'buffer' };
  }
  if (type) return { data: raw, type };

  // A data URL without ;base64 is percent-encoded text
  if (isDataUrl) {
    try {
      return { data: decodeURIComponent(raw), type: 'string' };
    } catch (e) {
      throw new Error(
        'sheetjs: malformed data URL; content is not valid percent-encoded text'
      );
    }
  }
  const decoded = isWrappedLikeBase64(raw) && decodeBase64(raw);
  return decoded
    ? { data: decoded, type: 'buffer' }
    : { data: raw, type: 'string' };
}

/**
 * Parse file content into a SheetJS workbook.
 * Parse options: https://docs.sheetjs.com/docs/api/parse-options
 */
export function parseWorkbook(content, options = {}) {
  const { type, ...readOptions } = options;
  const { data, type: resolvedType } = decodeContent(content, type);

  return xlsx.read(data, {
    cellDates: true,
    ...compact(readOptions),
    type: resolvedType,
  });
}

/**
 * Select a worksheet by name, by index, or fall back to the first sheet.
 * Throws with the available sheet names, which is the error job writers
 * most often need to debug.
 */
export function getWorksheet(workbook, { sheetName, sheetIndex } = {}) {
  const { SheetNames, Sheets } = workbook;

  if (!SheetNames || SheetNames.length === 0) {
    throw new Error('sheetjs: workbook contains no sheets');
  }

  if (sheetName !== undefined) {
    if (!SheetNames.includes(sheetName)) {
      throw new Error(
        `sheetjs: no sheet named "${sheetName}". Available sheets: ${SheetNames.join(
          ', '
        )}`
      );
    }
    return { name: sheetName, worksheet: Sheets[sheetName] };
  }

  if (sheetIndex !== undefined) {
    const name = SheetNames[sheetIndex];
    if (!name) {
      throw new Error(
        `sheetjs: no sheet at index ${sheetIndex}. This workbook has ${SheetNames.length} sheet(s): ${SheetNames.join(
          ', '
        )}`
      );
    }
    return { name, worksheet: Sheets[name] };
  }

  const [name] = SheetNames;
  return { name, worksheet: Sheets[name] };
}

const describe = value => {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'an array';
  return `a ${typeof value}`;
};

/**
 * Build a single-sheet workbook from an array of objects.
 * https://docs.sheetjs.com/docs/api/utilities/array#array-of-objects-input
 */
export function buildWorkbook(rows, options = {}) {
  const {
    sheetName = 'Sheet1',
    header,
    skipHeader,
    cellDates = true,
    dateNF,
  } = options;

  if (!Array.isArray(rows)) {
    throw new Error('sheetjs: jsonToSheet expects an array of objects');
  }
  const badIndex = rows.findIndex(
    row => row === null || typeof row !== 'object' || Array.isArray(row)
  );
  if (badIndex !== -1) {
    throw new Error(
      `sheetjs: jsonToSheet expects an array of objects, but item ${badIndex} is ${describe(
        rows[badIndex]
      )}`
    );
  }

  const worksheet = xlsx.utils.json_to_sheet(
    rows,
    compact({ header, skipHeader, cellDates, dateNF })
  );

  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);

  return workbook;
}

/**
 * Serialise a workbook to a Buffer or a base64 string.
 * Write options: https://docs.sheetjs.com/docs/api/write-options
 */
export function writeWorkbook(workbook, options = {}) {
  const { bookType = 'xlsx', output = 'buffer', compression } = options;

  if (output !== 'buffer' && output !== 'base64') {
    throw new Error(
      `sheetjs: unsupported output "${output}". Use "buffer" or "base64"`
    );
  }

  return xlsx.write(workbook, compact({ type: output, bookType, compression }));
}
