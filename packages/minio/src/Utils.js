import { parseCsv } from '@openfn/language-common';
import { stringify } from 'csv-stringify/sync';

function parseNdjson(text) {
  return text
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(line => JSON.parse(line));
}

export async function parseByFormat(buffer, format, state) {
  if (format === 'raw') {
    return buffer;
  }

  const text = buffer.toString('utf8');
  const trimmed = text.trim();

  if (format === 'json') {
    return trimmed ? JSON.parse(trimmed) : null;
  }

  if (format === 'ndjson') {
    return trimmed ? parseNdjson(trimmed) : [];
  }

  if (format === 'csv') {
    const csvState = await parseCsv(text)(state);
    return csvState.data;
  }

  throw new Error(
    `Unsupported format: ${format}. Use one of json, ndjson, csv, raw.`,
  );
}

export function writeDestination(state, destination, value) {
  const path = destination
    .split('.')
    .map(segment => segment.trim())
    .filter(Boolean);

  if (!path.length) {
    return state;
  }

  const nextState = { ...state };
  let cursor = nextState;

  for (let index = 0; index < path.length - 1; index += 1) {
    const segment = path[index];
    const existing = cursor[segment];

    cursor[segment] =
      existing && typeof existing === 'object' && !Array.isArray(existing)
        ? { ...existing }
        : {};

    cursor = cursor[segment];
  }

  cursor[path[path.length - 1]] = value;

  return nextState;
}

const CONTENT_TYPES = {
  json: 'application/json',
  ndjson: 'application/x-ndjson',
  csv: 'text/csv',
  raw: 'application/octet-stream',
};

export function serializeByFormat(data, format) {
  if (format === 'raw') {
    return Buffer.isBuffer(data) ? data : Buffer.from(String(data));
  }

  if (format === 'json') {
    return Buffer.from(JSON.stringify(data));
  }

  if (format === 'ndjson') {
    const lines = (Array.isArray(data) ? data : [data])
      .map(row => JSON.stringify(row))
      .join('\n');
    return Buffer.from(lines);
  }

  if (format === 'csv') {
    const rows = Array.isArray(data) ? data : [data];
    return Buffer.from(stringify(rows, { header: true }));
  }

  throw new Error(
    `Unsupported format: ${format}. Use one of json, ndjson, csv, raw.`,
  );
}

export function inferContentType(format) {
  return CONTENT_TYPES[format] ?? 'application/octet-stream';
}
