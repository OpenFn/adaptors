import { expect } from 'chai';
import { get, request, execute, fn } from '../src';
import configuration from '../tmp/creds.json' assert { type: 'json' };

const state = { configuration };

it('should get projects info', async () => {
  const { data } = await request('GET', 'projects')(state);

  expect(data.data).to.exist;
  expect(data.links).to.exist;
  expect(data.data.length).to.be.greaterThan(0);
  expect(data.data.length).to.be.lessThanOrEqual(10);
});
it('should get project info', async () => {
  const { data } = await execute(
    get('projects'),
    fn(state => {
      state.projectId = state.data.data[0]?.id;
      return state;
    }),
    get(s => `projects/${s.projectId}`)
  )(state);

  expect(data.data).to.exist;
  expect(data.data.attributes.name).to.exist;
});

it('should get provisioned resources info', async () => {
  const { data } = await execute(
    get('projects'),
    fn(state => {
      state.projectId = state.data.data[0]?.id;
      return state;
    }),
    get(`provision/yaml`, s => ({ query: { id: s.projectId } }))
  )(state);

  expect(data).to.exist;
  expect(data).to.be.a('string');
});

it('should get jobs info', async () => {
  const { data } = await get('jobs')(state);

  expect(data).to.exist;
  expect(data.data).to.exist;
  expect(data.data.length).to.be.greaterThan(0);
  expect(data.data.length).to.be.lessThanOrEqual(10);
});
it('should get jobs info for a project', async () => {
  const { data } = await execute(
    get('projects'),
    fn(state => {
      state.projectId = state.data.data[0]?.id;
      return state;
    }),
    get(s => `projects/${s.projectId}/jobs`)
  )(state);

  expect(data).to.exist;
  expect(data.data).to.exist;
  expect(data.data.length).to.be.greaterThan(0);
  expect(data.data.length).to.be.lessThanOrEqual(10);
});
it('should get workflows info for a project', async () => {
  const { data } = await execute(
    get('projects'),
    fn(state => {
      state.projectId = state.data.data[0]?.id;
      return state;
    }),
    get(s => `projects/${s.projectId}/workflows`)
  )(state);

  expect(data).to.exist;
  expect(data.errors).to.exist;
  expect(data.errors).to.be.empty;
  expect(data.workflows).to.exist;
  expect(data.workflows.length).to.be.greaterThan(0);
  expect(data.workflows.length).to.be.lessThanOrEqual(10);
});
