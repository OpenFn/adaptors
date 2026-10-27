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

  it('sends queryTimeoutSeconds to Overpass as the query timeout', async () => {
    interceptQuery('[out:json][timeout:600];\nnode(1); out;').reply(200, {
      osm3s,
      elements: [],
    });

    const finalState = await query('node(1); out;', {
      queryTimeoutSeconds: 600,
    })({});

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
  const bbox = { south: 51.47, west: -0.15, north: 51.52, east: -0.05 };

  const interceptFeatureQuery = lines =>
    interceptQuery(
      ['[out:json][timeout:180];', ...lines, 'out center meta;'].join('\n'),
    );

  it('requires every tag in a tags object to match', async () => {
    interceptFeatureQuery([
      '(',
      '  nwr["amenity"="school"]["operator"="Example Trust"](51.47,-0.15,51.52,-0.05);',
      ');',
    ]).reply(200, { osm3s, elements: [] });

    const finalState = await listFeatures({
      tags: { amenity: 'school', operator: 'Example Trust' },
      bbox,
    })({});

    expect(finalState.data.features).to.eql([]);
  });

  it('matches any of the tag objects in a tags array', async () => {
    interceptFeatureQuery([
      '(',
      '  nwr["amenity"="library"](51.47,-0.15,51.52,-0.05);',
      '  nwr["leisure"="park"](51.47,-0.15,51.52,-0.05);',
      ');',
    ]).reply(200, { osm3s, elements: [] });

    const finalState = await listFeatures({
      tags: [{ amenity: 'library' }, { leisure: 'park' }],
      bbox,
    })({});

    expect(finalState.data.features).to.eql([]);
  });

  it('matches any of the values in a tag value array', async () => {
    interceptFeatureQuery([
      '(',
      '  nwr["amenity"~"^(library|community_centre)$"](51.47,-0.15,51.52,-0.05);',
      ');',
    ]).reply(200, { osm3s, elements: [] });

    const finalState = await listFeatures({
      tags: { amenity: ['library', 'community_centre'] },
      bbox,
    })({});

    expect(finalState.data.features).to.eql([]);
  });

  it("matches any value of a tag set to '*'", async () => {
    interceptFeatureQuery([
      '(',
      '  nwr["shop"](51.47,-0.15,51.52,-0.05);',
      ');',
    ]).reply(200, { osm3s, elements: [] });

    const finalState = await listFeatures({ tags: { shop: '*' }, bbox })({});

    expect(finalState.data.features).to.eql([]);
  });

  it('searches inside an area identified by its tags', async () => {
    interceptFeatureQuery([
      'area["ISO3166-2"="XX-YY"]->.searchArea;',
      '(',
      '  nwr["amenity"="school"](area.searchArea);',
      ');',
    ]).reply(200, { osm3s, elements: [] });

    const finalState = await listFeatures({
      tags: { amenity: 'school' },
      area: { 'ISO3166-2': 'XX-YY' },
    })({});

    expect(finalState.data.features).to.eql([]);
  });

  it('only fetches features changed since the changedSince date', async () => {
    interceptFeatureQuery([
      '(',
      '  nwr["amenity"="school"](51.47,-0.15,51.52,-0.05)(newer:"2026-10-01T00:00:00Z");',
      ');',
    ]).reply(200, { osm3s, elements: [] });

    const state = { lastRunTimestamp: '2026-10-01T00:00:00.000Z' };

    const finalState = await listFeatures({
      tags: { amenity: 'school' },
      bbox,
      changedSince: s => s.lastRunTimestamp,
    })(state);

    expect(finalState.data.features).to.eql([]);
  });

  it('returns a node as a point at its own location', async () => {
    interceptFeatureQuery([
      '(',
      '  nwr["amenity"="library"](51.47,-0.15,51.52,-0.05);',
      ');',
    ]).reply(200, {
      osm3s,
      elements: [
        {
          type: 'node',
          id: 101,
          lat: 51.5,
          lon: -0.1,
          timestamp: '2026-10-05T10:00:00Z',
          version: 3,
          tags: { amenity: 'library' },
        },
      ],
    });

    const finalState = await listFeatures({
      tags: { amenity: 'library' },
      bbox,
    })({});

    expect(finalState.data.features[0].geometry).to.eql({
      type: 'Point',
      coordinates: [-0.1, 51.5],
    });
  });

  it('returns a way as a point at its center', async () => {
    interceptFeatureQuery([
      '(',
      '  nwr["leisure"="park"](51.47,-0.15,51.52,-0.05);',
      ');',
    ]).reply(200, {
      osm3s,
      elements: [
        {
          type: 'way',
          id: 202,
          center: { lat: 51.49, lon: -0.12 },
          timestamp: '2026-10-06T11:00:00Z',
          version: 1,
          tags: { leisure: 'park' },
        },
      ],
    });

    const finalState = await listFeatures({
      tags: { leisure: 'park' },
      bbox,
    })({});

    expect(finalState.data.features[0].geometry).to.eql({
      type: 'Point',
      coordinates: [-0.12, 51.49],
    });
  });

  it('writes tags, id, version and timestamp to feature properties, without contributor details', async () => {
    interceptFeatureQuery([
      '(',
      '  nwr["amenity"="library"](51.47,-0.15,51.52,-0.05);',
      ');',
    ]).reply(200, {
      osm3s,
      elements: [
        {
          type: 'node',
          id: 101,
          lat: 51.5,
          lon: -0.1,
          timestamp: '2026-10-05T10:00:00Z',
          version: 3,
          changeset: 999,
          user: 'mapper',
          uid: 42,
          tags: { amenity: 'library', name: 'Central Library' },
        },
      ],
    });

    const finalState = await listFeatures({
      tags: { amenity: 'library' },
      bbox,
    })({});

    expect(finalState.data.features).to.eql([
      {
        type: 'Feature',
        id: 'node/101',
        geometry: { type: 'Point', coordinates: [-0.1, 51.5] },
        properties: {
          amenity: 'library',
          name: 'Central Library',
          '@id': 'node/101',
          '@version': 3,
          '@timestamp': '2026-10-05T10:00:00Z',
        },
      },
    ]);
  });

  it('returns a FeatureCollection stamped with the time of the OpenStreetMap data', async () => {
    interceptFeatureQuery([
      '(',
      '  nwr["amenity"="school"](51.47,-0.15,51.52,-0.05);',
      ');',
    ]).reply(200, { osm3s, elements: [] });

    const finalState = await listFeatures({
      tags: { amenity: 'school' },
      bbox,
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
