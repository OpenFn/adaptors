import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  assertRelativeUrl,
} from '@openfn/language-common/util';

export const DEFAULT_BASE_URL = 'https://overpass-api.de/api';
export const DEFAULT_QUERY_TIMEOUT_SECONDS = 180;
export const USER_AGENT =
  '@openfn/language-openstreetmap (+https://github.com/OpenFn/adaptors)';

export const prepareNextState = (state, response) => {
  const { body, ...responseWithoutBody } = response;

  return {
    ...composeNextState(state, body),
    response: responseWithoutBody,
  };
};

const decodeEntities = text =>
  text
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

// Overpass reports errors as an HTML page with one
// <p><strong>Error</strong>: ...</p> paragraph per error
export const parseOverpassError = body => {
  if (typeof body !== 'string') {
    return;
  }
  const errors = [
    ...body.matchAll(/<strong[^>]*>Error<\/strong>:([\s\S]*?)<\/p>/g),
  ].map(([, text]) => decodeEntities(text.replace(/<[^>]*>/g, '')).trim());

  return errors.join('; ');
};

export const request = async (
  configuration = {},
  method,
  path,
  options = {},
) => {
  assertRelativeUrl(path);

  try {
    return await commonRequest(method, path, {
      baseUrl: configuration.baseUrl || DEFAULT_BASE_URL,
      ...options,
      headers: {
        'user-agent': USER_AGENT,
        ...options.headers,
      },
    });
  } catch (e) {
    const details = parseOverpassError(e.body);
    if (details) {
      e.message = `${e.message}: ${details}`;
    }
    throw e;
  }
};

export const runQuery = async (
  configuration,
  overpassQL,
  { queryTimeoutSeconds = DEFAULT_QUERY_TIMEOUT_SECONDS } = {},
) => {
  if (!Number.isInteger(queryTimeoutSeconds) || queryTimeoutSeconds <= 0) {
    throw new Error('queryTimeoutSeconds must be a positive whole number');
  }

  const response = await request(configuration, 'POST', 'interpreter', {
    body: new URLSearchParams({
      data: `[out:json][timeout:${queryTimeoutSeconds}];\n${overpassQL}`,
    }).toString(),
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    parseAs: 'json',
    timeout: (queryTimeoutSeconds + 30) * 1000,
  });

  // Overpass returns 200 with a remark when a query fails part way through,
  // eg on timeout or out of memory, and the elements are incomplete
  if (/error/i.test(response.body.remark ?? '')) {
    throw new Error(response.body.remark);
  }

  return response.body;
};

const quote = value =>
  `"${String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;

const escapeRegex = value =>
  String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const tagFilters = tags =>
  Object.entries(tags)
    .map(([key, value]) => {
      if (value === '*') {
        return `[${quote(key)}]`;
      }
      if (Array.isArray(value)) {
        const pattern = `^(${value.map(escapeRegex).join('|')})$`;
        return `[${quote(key)}~${quote(pattern)}]`;
      }
      return `[${quote(key)}=${quote(value)}]`;
    })
    .join('');

const toOverpassDate = value => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`changedSince is not a valid date: ${value}`);
  }
  return date.toISOString().replace(/\.\d{3}Z$/, 'Z');
};

const bboxFilter = ({ south, west, north, east }) => {
  const coords = [south, west, north, east].map(Number);
  if (coords.some(n => !Number.isFinite(n))) {
    throw new Error('bbox must have numeric south, west, north and east');
  }
  return `(${coords.join(',')})`;
};

export const buildFeatureQuery = ({ tags, area, bbox, changedSince } = {}) => {
  const tagGroups = [tags ?? []].flat();
  if (!tagGroups.length || tagGroups.some(t => !Object.keys(t ?? {}).length)) {
    throw new Error('tags must include at least one tag');
  }
  if (!area && !bbox) {
    throw new Error('Either area or bbox is required');
  }

  let suffix = '';
  if (area) {
    suffix += '(area.searchArea)';
  }
  if (bbox) {
    suffix += bboxFilter(bbox);
  }
  if (changedSince) {
    suffix += `(newer:${quote(toOverpassDate(changedSince))})`;
  }

  const lines = [];
  if (area) {
    lines.push(`area${tagFilters(area)}->.searchArea;`);
  }
  lines.push('(');
  for (const group of tagGroups) {
    lines.push(`  nwr${tagFilters(group)}${suffix};`);
  }
  lines.push(');', 'out center meta;');

  return lines.join('\n');
};

const toFeature = ({
  type,
  id,
  lat,
  lon,
  center,
  version,
  timestamp,
  tags,
}) => {
  const point = center ?? (lat === undefined ? undefined : { lat, lon });

  return {
    type: 'Feature',
    id: `${type}/${id}`,
    geometry: point
      ? { type: 'Point', coordinates: [point.lon, point.lat] }
      : null,
    properties: {
      ...tags,
      '@id': `${type}/${id}`,
      '@version': version,
      '@timestamp': timestamp,
    },
  };
};

export const toFeatureCollection = ({ osm3s, elements = [] }) => ({
  type: 'FeatureCollection',
  timestamp: osm3s?.timestamp_osm_base,
  features: elements.map(toFeature),
});
