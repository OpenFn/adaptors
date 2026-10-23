import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import { request, query, listFeatures } from '../src/index.js';

const testServer = enableMockClient('https://overpass-api.de');
const selfHostedServer = enableMockClient('https://overpass.example.org');

const userAgent =
  '@openfn/language-openstreetmap (+https://github.com/OpenFn/adaptors)';

const osm3s = {
  timestamp_osm_base: '2026-10-20T08:00:00Z',
  copyright:
    'The data included in this document is from www.openstreetmap.org.',
};

const encodeQuery = ql => new URLSearchParams({ data: ql }).toString();

const interceptQuery = ql =>
  testServer.intercept({
    path: '/api/interpreter',
    method: 'POST',
    body: encodeQuery(ql),
    headers: { 'user-agent': userAgent },
  });

describe('request', () => {
  it('sends the request to the configured baseUrl and writes the response to state', async () => {
    selfHostedServer
      .intercept({
        path: '/api/status',
        method: 'GET',
        headers: { 'user-agent': userAgent },
      })
      .reply(200, 'Rate limit: 0\n2 slots available now.\n', {
        headers: { 'content-type': 'text/plain' },
      });

    const state = {
      configuration: { baseUrl: 'https://overpass.example.org/api' },
    };

    const finalState = await request('GET', 'status')(state);

    expect(finalState.data).to.equal('Rate limit: 0\n2 slots available now.\n');
    expect(finalState.response.statusCode).to.equal(200);
  });
});

describe('query', () => {
  it('sends the query with json output and the default timeout, and writes the elements to state.data', async () => {
    const elements = [
      {
        type: 'node',
        id: 1,
        lat: 51.5,
        lon: -0.1,
        tags: { amenity: 'school' },
      },
    ];

    interceptQuery(
      '[out:json][timeout:180];\nnwr["amenity"="school"](51.47,-0.15,51.52,-0.05); out center;',
    ).reply(200, { version: 0.6, osm3s, elements });

    const finalState = await query(
      'nwr["amenity"="school"](51.47,-0.15,51.52,-0.05); out center;',
    )({});

    expect(finalState.data).to.eql(elements);
    expect(finalState.response).to.be.undefined;
  });

  it('sends a custom timeout to Overpass', async () => {
    interceptQuery('[out:json][timeout:600];\nnode(1); out;').reply(200, {
      osm3s,
      elements: [],
    });

    const finalState = await query('node(1); out;', { timeout: 600 })({});

    expect(finalState.data).to.eql([]);
  });

  it('throws the Overpass remark when a query fails part way through', async () => {
    const remark =
      'runtime error: Query timed out in "query" at line 2 after 181 seconds.';
    interceptQuery('[out:json][timeout:180];\nnode(1); out;').reply(200, {
      osm3s,
      elements: [{ type: 'node', id: 1, lat: 0, lon: 0 }],
      remark,
    });

    const error = await query('node(1); out;')({}).catch(e => e);

    expect(error.message).to.equal(remark);
  });

  it('includes the Overpass error text when the query is rejected', async () => {
    const html = `<?xml version="1.0" encoding="UTF-8"?>
<html><body>
<p>The data included in this document is from www.openstreetmap.org.</p>
<p><strong style="color:#FF0000">Error</strong>: line 2: parse error: Unknown type &quot;nwrr&quot; </p>
<p><strong style="color:#FF0000">Error</strong>: line 2: parse error: An empty query is not allowed </p>
</body></html>`;
    interceptQuery('[out:json][timeout:180];\nnwrr(1); out;').reply(400, html, {
      headers: { 'content-type': 'text/html; charset=utf-8' },
    });

    const error = await query('nwrr(1); out;')({}).catch(e => e);

    expect(error.statusCode).to.equal(400);
    expect(error.message).to.equal(
      'POST to https://overpass-api.de/api/interpreter returned 400: Bad Request: ' +
        'line 2: parse error: Unknown type "nwrr"; ' +
        'line 2: parse error: An empty query is not allowed',
    );
  });
});

describe('listFeatures', () => {
  it('lists features matching any tag group inside an area, changed since a date, as GeoJSON points', async () => {
    interceptQuery(
      [
        '[out:json][timeout:180];',
        'area["ISO3166-2"="XX-YY"]->.searchArea;',
        '(',
        '  nwr["amenity"~"^(library|community_centre)$"](area.searchArea)(newer:"2026-10-01T00:00:00Z");',
        '  nwr["leisure"="park"]["access"](area.searchArea)(newer:"2026-10-01T00:00:00Z");',
        ');',
        'out center meta;',
      ].join('\n'),
    ).reply(200, {
      osm3s,
      elements: [
        {
          type: 'node',
          id: 101,
          lat: 1.5,
          lon: 30.25,
          timestamp: '2026-10-05T10:00:00Z',
          version: 3,
          changeset: 999,
          user: 'mapper',
          uid: 42,
          tags: { amenity: 'library', name: 'Central Library' },
        },
        {
          type: 'way',
          id: 202,
          center: { lat: 1.6, lon: 30.3 },
          timestamp: '2026-10-06T11:00:00Z',
          version: 1,
          changeset: 1000,
          user: 'mapper',
          uid: 42,
          tags: { leisure: 'park', access: 'yes' },
        },
      ],
    });

    const state = { data: { since: '2026-10-01T00:00:00.000Z' } };

    const finalState = await listFeatures({
      tags: [
        { amenity: ['library', 'community_centre'] },
        { leisure: 'park', access: '*' },
      ],
      area: { 'ISO3166-2': 'XX-YY' },
      changedSince: s => s.data.since,
    })(state);

    expect(finalState.data).to.eql({
      type: 'FeatureCollection',
      timestamp: '2026-10-20T08:00:00Z',
      features: [
        {
          type: 'Feature',
          id: 'node/101',
          geometry: { type: 'Point', coordinates: [30.25, 1.5] },
          properties: {
            amenity: 'library',
            name: 'Central Library',
            '@id': 'node/101',
            '@version': 3,
            '@timestamp': '2026-10-05T10:00:00Z',
          },
        },
        {
          type: 'Feature',
          id: 'way/202',
          geometry: { type: 'Point', coordinates: [30.3, 1.6] },
          properties: {
            leisure: 'park',
            access: 'yes',
            '@id': 'way/202',
            '@version': 1,
            '@timestamp': '2026-10-06T11:00:00Z',
          },
        },
      ],
    });
  });

  it('searches inside a bounding box', async () => {
    interceptQuery(
      [
        '[out:json][timeout:180];',
        '(',
        '  nwr["amenity"="school"](51.47,-0.15,51.52,-0.05);',
        ');',
        'out center meta;',
      ].join('\n'),
    ).reply(200, { osm3s, elements: [] });

    const finalState = await listFeatures({
      tags: { amenity: 'school' },
      bbox: { south: 51.47, west: -0.15, north: 51.52, east: -0.05 },
    })({});

    expect(finalState.data).to.eql({
      type: 'FeatureCollection',
      timestamp: '2026-10-20T08:00:00Z',
      features: [],
    });
  });

  it('throws when neither an area nor a bbox is given', async () => {
    const error = await listFeatures({ tags: { amenity: 'school' } })({}).catch(
      e => e,
    );

    expect(error.message).to.equal('Either area or bbox is required');
  });
});
