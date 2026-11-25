import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import { getAccountContext, searchTranscripts, dataValue } from '../src/index.js';

const server = enableMockClient('https://api.arcmira.com', { maxRedirections: 0 });
const configuration = { apiKey: 'synthetic-test-key-not-a-credential' };
const headers = { Authorization: `Bearer ${configuration.apiKey}` };
const fixture = {
  query: 'water policy', limit: 3, returned: 1,
  window: { after: '2026-01-01', before: '2026-02-01' },
  chunks: [{ video_id: 'abcdefghijk', text: 'Synthetic research passage.',
    start_seconds: 42, watch_url: '/watch/abcdefghijk?t=42',
    published_at: '2026-01-15', transcript_type: 'creator_captions' }],
  partial: true, failed_batches: 1,
  search_index: { state: 'catching_up', missing_before: '2015-06-23' },
  note: 'Synthetic coverage note.',
};

describe('Arcmira operations', () => {
  it('retrieves account context with bearer authentication and replaces data', async () => {
    const account = { tier: 'free', scopes: ['read'], usage: { credits: { used: 0 } } };
    server.intercept({ method: 'GET', path: '/v1/me', headers }).reply(200, account);
    const previous = { topic: 'water policy' };
    const state = await getAccountContext()({ configuration, data: previous });
    expect(state.data).to.deep.equal(account);
    expect(state.references).to.deep.equal([previous]);
    expect(state.response).to.deep.equal({ statusCode: 200 });
  });

  it('expands job input and preserves timestamp, source, date window and partial coverage', async () => {
    server.intercept({ method: 'GET', path: '/v1/search', headers,
      query: { q: 'water policy', limit: '3', after: '2026-01-01', before: '2026-02-01', source: 'creator_captions' },
    }).reply(200, fixture);
    const state = await searchTranscripts(dataValue('topic'), state => ({
      after: state.data.after, before: state.data.before, source: 'creator_captions', limit: 3,
    }))({ configuration, data: { topic: 'water policy', after: '2026-01-01', before: '2026-02-01' } });
    expect(state.data).to.deep.equal(fixture);
    expect(state.references).to.have.length(1);
  });

  it('defaults to five chunks and retains a valid empty result', async () => {
    const empty = { ...fixture, limit: 5, returned: 0, chunks: [], partial: false };
    server.intercept({ method: 'GET', path: '/v1/search', query: { q: 'water policy', limit: '5' } }).reply(200, empty);
    const state = await searchTranscripts('water policy')({ configuration, data: { chunks: [{ stale: true }] } });
    expect(state.data).to.deep.equal(empty);
  });

  it('accepts the documented maximum without adding a spending flag or pagination', async () => {
    server.intercept({ method: 'GET', path: '/v1/search', query: { q: 'water policy', limit: '20', channel_ids: 'UC123' } }).reply(200, { chunks: [] });
    const state = await searchTranscripts('water policy', { limit: 20, channel_ids: 'UC123' })({ configuration });
    expect(state.data.chunks).to.deep.equal([]);
  });

  it('rejects invalid inputs before sending an HTTP request', async () => {
    for (const [query, params] of [['x', {}], ['topic', { limit: 0 }], ['topic', { limit: 21 }],
      ['topic', { limit: 2.5 }], ['topic', { limit: null }], ['topic', { spending: 'existing_credits' }], ['topic', null],
      ['topic', { source: 'unknown' }], ['topic', { after: 42 }]]) {
      let failure;
      try { await searchTranscripts(query, params)({ configuration }); } catch (error) { failure = error; }
      expect(failure).to.be.instanceOf(Error);
      expect(failure.message).not.to.include('request failed');
    }
  });

  it('requires a credential before making a request', async () => {
    const failure = await getAccountContext()({}).catch(error => error);
    expect(failure.message).to.equal('Arcmira apiKey is required in configuration.');
  });

  it('throws a typed access error without copying body, headers or credentials', async () => {
    server.intercept({ method: 'GET', path: '/v1/me' }).reply(403, {
      error: { code: 'filter_requires_paid', message: configuration.apiKey },
    }, { headers: { 'x-debug': configuration.apiKey } });
    const failure = await getAccountContext()({ configuration }).catch(error => error);
    expect(failure.statusCode).to.equal(403);
    expect(failure.code).to.equal('filter_requires_paid');
    expect(failure.message).not.to.include(configuration.apiKey);
    expect(failure).not.to.have.property('body');
    expect(failure).not.to.have.property('headers');
  });

  it('does not expose a credential echoed as an API error code', async () => {
    const secret = 'synthetic_secret';
    server.intercept({ method: 'GET', path: '/v1/me' }).reply(401, { error: { code: secret } });
    const failure = await getAccountContext()({ configuration: { apiKey: secret } }).catch(error => error);
    expect(failure.statusCode).to.equal(401);
    expect(failure).not.to.have.property('code');
    expect(failure.message).not.to.include(secret);
  });

  it('stops on a rate limit without retrying or returning stale search data', async () => {
    server.intercept({ method: 'GET', path: '/v1/search', query: { q: 'water policy', limit: '5' } }).reply(429, { error: { code: 'rate_limited' } });
    const failure = await searchTranscripts('water policy')({ configuration, data: fixture }).catch(error => error);
    expect(failure.statusCode).to.equal(429);
    expect(failure).to.be.instanceOf(Error);
  });

  it('does not follow redirects to another origin', async () => {
    server.intercept({ method: 'GET', path: '/v1/me' }).reply(302, {}, { headers: { location: 'https://untrusted.invalid/' } });
    const failure = await getAccountContext()({ configuration }).catch(error => error);
    expect(failure.statusCode).to.equal(302);
  });

  it('does not leak a transport error', async () => {
    server.intercept({ method: 'GET', path: '/v1/me' }).replyWithError(new Error(configuration.apiKey));
    const failure = await getAccountContext()({ configuration }).catch(error => error);
    expect(failure.message).to.include('before a valid JSON response');
    expect(failure.message).not.to.include(configuration.apiKey);
    expect(failure).not.to.have.property('cause');
  });
});
