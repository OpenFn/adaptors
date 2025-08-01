import { expect } from 'chai';

import {
  execute,
  request,
  getTask,
  getTasks,
  updateTask,
  createTask,
  upsertTask,
  searchTask,
} from '../src';
import { DEFAULT_PAGE_LIMIT } from '../src/util';
import { mockServer } from './helper';

const configuration = {
  token: 'fake-token',
};
const state = { configuration };

describe('Adaptor Test', () => {
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

      expect(err.code).to.equal('UNEXPECTED_ABSOLUTE_URL');
    });
  });

  describe('getTask', () => {
    it('should fetch a task by GID', async () => {
      const taskGid = '12345';
      const params = { opt_fields: 'name,notes' };
      const mockData = { gid: taskGid, name: 'Test Task', notes: 'Some notes' };
      mockServer
        .intercept({
          path: `/api/1.0/tasks/${taskGid}`,
          query: params,
          method: 'GET',
        })
        .reply(200, {
          data: mockData,
        });
      const { data } = await getTask(taskGid, params)(state);

      expect(data).to.eql(mockData);
    });
  });

  describe('getTasks', () => {
    it('should fetch tasks for a project', async () => {
      const projectGid = 'proj123';
      const params = { opt_fields: 'name' };
      const mockData = [
        { gid: '1', name: 'Task 1' },
        { gid: '2', name: 'Task 2' },
      ];
      mockServer
        .intercept({
          path: `/api/1.0/projects/${projectGid}/tasks`,
          query: { limit: DEFAULT_PAGE_LIMIT, ...params },
          method: 'GET',
        })
        .reply(200, { data: mockData });
      const { data } = await getTasks(projectGid, params)(state);
      expect(data).to.eql(mockData);
      expect(data.length).to.eql(2);
    });
  });

  describe('updateTask', () => {
    it('should update a task by GID', async () => {
      const taskGid = '12345';
      const taskData = { name: 'Updated Task' };
      const mockData = { gid: taskGid, name: 'Updated Task' };
      mockServer
        .intercept({
          path: `/api/1.0/tasks/${taskGid}`,
          method: 'PUT',
          body: JSON.stringify({ data: taskData }),
        })
        .reply(200, { data: mockData });
      const { data } = await updateTask(taskGid, taskData)(state);

      expect(data).to.eql(mockData);
      expect(data.name).to.eql('Updated Task');
    });
  });

  describe('createTask', () => {
    it('should create a new task', async () => {
      const newTaskData = { name: 'New Task', projects: ['proj123'] };
      const mockData = { gid: 'new123', name: 'New Task' };
      mockServer
        .intercept({
          path: `/api/1.0/tasks`,
          body: JSON.stringify({ data: newTaskData }),
          method: 'POST',
        })
        .reply(200, { data: mockData });
      const { data } = await createTask(newTaskData)(state);
      expect(data).to.eql(mockData);
    });
  });

  describe('upsertTask', () => {
    it('should update if matching task exists', async () => {
      const projectGid = 'proj123';
      const upsertTaskData = {
        externalId: 'name',
        data: { name: 'Existing Task', projects: [projectGid] },
      };
      const { projects, workspace, ...remainingData } = upsertTaskData.data;
      const existingTask = { gid: 'task1', name: 'Existing Task' };
      const updatedTask = {
        gid: 'task1',
        name: 'Existing Task',
        updated: true,
      };
      // First call: search for existing task
      mockServer
        .intercept({
          path: `/api/1.0/projects/${projectGid}/tasks`,
          query: { opt_fields: 'name', limit: DEFAULT_PAGE_LIMIT },
          method: 'GET',
        })
        .reply(200, { data: [existingTask] });
      // Second call: update the task
      mockServer
        .intercept({
          path: `/api/1.0/tasks/${existingTask.gid}`,
          method: 'PUT',
          body: JSON.stringify({ data: remainingData }),
        })
        .reply(200, { data: updatedTask });
      const { data } = await upsertTask(projectGid, upsertTaskData)(state);
      expect(data).to.eql(updatedTask);
    });

    it('should create if no matching task exists', async () => {
      const projectGid = 'proj123';
      const upsertTaskData = {
        externalId: 'name',
        data: { name: 'New Task', projects: [projectGid] },
      };
      const newTask = { gid: 'new123', name: 'New Task' };
      // First call: search for existing task (none found)
      mockServer
        .intercept({
          path: `/api/1.0/projects/${projectGid}/tasks`,
          query: { opt_fields: 'name', limit: DEFAULT_PAGE_LIMIT },
          method: 'GET',
        })
        .reply(200, { data: [] });
      // Second call: create the task
      mockServer
        .intercept({
          path: `/api/1.0/tasks`,
          method: 'POST',
          body: JSON.stringify({ data: upsertTaskData.data }),
        })
        .reply(200, { data: newTask });
      const { data } = await upsertTask(projectGid, upsertTaskData)(state);
      expect(data).to.eql(newTask);
    });
  });

  describe('searchTask', () => {
    it('should query a task', async () => {
      const workspaceGid = 'ws123';
      const taskName = 'Test Search Task';
      const mockData = [
        { gid: '1', name: 'Test Search Task', notes: 'A note' },
      ];
      const stateWithWorkspace = {
        configuration: { ...configuration, workspaceGid },
      };
      mockServer
        .intercept({
          path: `/api/1.0/workspaces/${workspaceGid}/tasks/search`,
          query: {
            text: taskName,
          },
          method: 'GET',
        })
        .reply(200, { data: mockData });
      const { data } = await searchTask(taskName)(stateWithWorkspace);
      expect(data).to.eql(mockData);
      expect(data.length).to.eql(1);
      expect(data[0].name).to.eql('Test Search Task');
    });
    it('should throw an error if workspaceGid is missing', async () => {
      let error;
      try {
        await searchTask('Some Task')({
          configuration: { token: 'fake-token' },
        });
      } catch (err) {
        error = err;
      }
      expect(error).to.be.an('Error');
      expect(error.message).to.equal('You need to specify Workspace GID');
    });
  });
});
