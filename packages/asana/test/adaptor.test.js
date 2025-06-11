import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import {
  execute,
  request,
  getTask,
  getTasks,
  updateTask,
  createTask,
  upsertTask,
} from '../src';
import { responseWithData } from './helper';

const baseUrl = 'https://app.asana.com';
const testServer = enableMockClient(baseUrl);
const configuration = {
  apiVersion: 'v1',
  token: 'fake-token',
};
const state = { configuration };

describe('execute', () => {
  it('executes each operation in sequence', done => {
    let state = {};
    let operations = [
      state => {
        return { counter: 1 };
      },
      state => {
        return { counter: 2 };
      },
      state => {
        return { counter: 3 };
      },
    ];

    execute(...operations)(state)
      .then(finalState => {
        expect(finalState).to.eql({ counter: 3 });
      })
      .then(done)
      .catch(done);
  });

  it('assigns references, data to the initialState', () => {
    let state = {};

    let finalState = execute()(state);

    execute()(state).then(finalState => {
      expect(finalState).to.eql({ references: [], data: null });
    });
  });
});

describe('request', () => {
  it('throws if an absolute URL is passed', async () => {
    // happily the request won't actually be made, so we don't need to mock anything here
    let err;
    try {
      await execute(request('https://www.blah.com/a/b/c'))({});
    } catch (e) {
      err = e;
    }
    expect(err.code).to.equal('BASE_URL_MISMATCH');
  });
});

describe.only('getTask', () => {
  it('should fetch a task by GID', async () => {
    const taskGid = '12345';
    const params = { opt_fields: 'name,notes' };
    const mockData = { gid: taskGid, name: 'Test Task', notes: 'Some notes' };
    testServer
      .intercept({
        path: `/api/v1/tasks/${taskGid}`,
        query: params,
        method: 'GET',
      })
      .reply(200, responseWithData(mockData));
    const result = await execute(getTask(taskGid, params))(state);
    console.log({ result });
    expect(result.data).to.eql(mockData);
  });
});

describe.skip('getTasks', () => {
  it('should fetch tasks for a project', async () => {
    const projectGid = 'proj123';
    const params = { opt_fields: 'name' };
    const mockData = [
      { gid: '1', name: 'Task 1' },
      { gid: '2', name: 'Task 2' },
    ];
    testServer
      .intercept({
        path: `/api/v1/projects/${projectGid}/tasks`,
        method: 'GET',
      })
      .reply(200, responseWithData(mockData));
    const result = await execute(getTasks(projectGid, params))(state);
    expect(result.data).to.eql(mockData);
  });
});

describe.skip('updateTask', () => {
  it('should update a task by GID', async () => {
    const taskGid = '12345';
    const params = { name: 'Updated Task' };
    const mockData = { gid: taskGid, name: 'Updated Task' };
    testServer
      .intercept({
        path: `/api/v1/tasks/${taskGid}`,
        method: 'PUT',
      })
      .reply(200, responseWithData(mockData));
    const result = await execute(updateTask(taskGid, params))(state);
    expect(result.data).to.eql(mockData);
  });
});

describe('createTask', () => {
  it('should create a new task', async () => {
    const params = { name: 'New Task', projects: ['proj123'] };
    const mockData = { gid: 'new123', name: 'New Task' };
    testServer
      .intercept({
        path: `/api/v1/tasks`,
        method: 'POST',
      })
      .reply(200, responseWithData(mockData));
    const result = await execute(createTask(params))(state);
    expect(result.data).to.eql(mockData);
  });
});

describe('upsertTask', () => {
  it('should update if matching task exists', async () => {
    const projectGid = 'proj123';
    const params = {
      externalId: 'name',
      data: { name: 'Existing Task', projects: [projectGid] },
    };
    const existingTask = { gid: 'task1', name: 'Existing Task' };
    const updatedTask = { gid: 'task1', name: 'Existing Task', updated: true };
    // First call: search for existing task
    testServer
      .intercept({
        path: `/api/v1/projects/${projectGid}/tasks`,
        method: 'GET',
      })
      .reply(200, responseWithData([existingTask]));
    // Second call: update the task
    testServer
      .intercept({
        path: `/api/v1/tasks/${existingTask.gid}`,
        method: 'PUT',
      })
      .reply(200, responseWithData(updatedTask));
    const result = await execute(upsertTask(projectGid, params))(state);
    expect(result.data).to.eql(updatedTask);
  });

  it('should create if no matching task exists', async () => {
    const projectGid = 'proj123';
    const params = {
      externalId: 'name',
      data: { name: 'New Task', projects: [projectGid] },
    };
    const newTask = { gid: 'new123', name: 'New Task' };
    // First call: search for existing task (none found)
    testServer
      .intercept({
        path: `/api/v1/projects/${projectGid}/tasks`,
        method: 'GET',
      })
      .reply(200, responseWithData([]));
    // Second call: create the task
    testServer
      .intercept({
        path: `/api/v1/tasks`,
        method: 'POST',
      })
      .reply(200, responseWithData(newTask));
    const result = await execute(upsertTask(projectGid, params))(state);
    expect(result.data).to.eql(newTask);
  });
});
