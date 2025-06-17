import { expect } from 'chai';
import configuration from '../tmp/creds.json' assert { type: 'json' };
import {
  getTask,
  getTasks,
  createTask,
  updateTask,
  upsertTask,
  createTaskStory,
  request,
  execute,
} from '../dist/index.js';

const state = { configuration };

describe('Integration tests', () => {
  let createdTaskGid;
  const testProjectGid = configuration.projectId; //'1206930238111330'; // Replace with a valid project GID from your Asana workspace

  describe('request', () => {
    it('should make a GET request with proper authorization', async () => {
      const { data, response } = await execute(request('workspaces'))(state);

      expect(data).to.be.an('array');
      expect(response.statusCode).to.equal(200);
    });
  });
  describe('createTask', () => {
    it('should create a new task', async () => {
      const taskData = {
        name: 'Test Task',
        notes: 'This is a test task created by integration tests',
        projects: [testProjectGid],
      };

      const { data } = await execute(createTask(taskData))(state);

      expect(data).to.have.property('gid');
      expect(data.name).to.equal('Test Task');
      expect(data.notes).to.equal(
        'This is a test task created by integration tests'
      );

      createdTaskGid = data.gid;
    }).timeout(5000);
  });

  describe('getTask', () => {
    it('should get a specific task', async () => {
      const { data } = await execute(
        getTask(createdTaskGid, {
          opt_fields: 'name,notes,assignee',
        })
      )(state);

      console.log({ data });
      expect(data).to.have.property('gid', createdTaskGid);
      expect(data).to.have.property('name');
      expect(data).to.have.property('notes');
    }).timeout(5000);
  });

  describe('getTasks', () => {
    it('should get 5 tasks from a project', async () => {
      const { data } = await execute(
        getTasks(testProjectGid, {
          opt_fields: 'name,notes,assignee',
          limit: 5,
        })
      )(state);

      expect(data).to.be.an('array');
      expect(data.length).to.be.at.most(5);
      expect(data[0]).to.have.property('gid');
      expect(data[0]).to.have.property('name');
    });
    it('should get all tasks from a project', async () => {
      const { data } = await execute(
        getTasks(testProjectGid, {
          opt_fields: 'name,notes,assignee',
        })
      )(state);
      expect(data).to.be.an('array');
      expect(data.length).to.greaterThan(1e3);
      expect(data[0]).to.have.property('gid');
      expect(data[0]).to.have.property('name');
    }).timeout(1e4);
  });

  describe('upsertTask', () => {
    it('should upsert a task', async () => {
      const { data } = await execute(
        upsertTask(testProjectGid, {
          externalId: 'name',
          data: {
            name: 'Test-Upsert',
            notes: 'This is a test task',
            projects: [testProjectGid],
          },
        })
      )(state);

      expect(data.name).to.equal('Test-Upsert');
    }).timeout(1e4);
  });
  describe('updateTask', () => {
    it('should update an existing task', async () => {
      const updateData = {
        name: 'Updated Test Task',
        notes: 'This task has been updated by integration tests',
      };

      const { data } = await execute(updateTask(createdTaskGid, updateData))(
        state
      );

      console.log({ data });
      expect(data).to.have.property('gid', createdTaskGid);
      expect(data.name).to.equal('Updated Test Task');
      expect(data.notes).to.equal(
        'This task has been updated by integration tests'
      );
    }).timeout(5000);
  });

  describe('createTaskStory', () => {
    it('should create a comment on a task', async () => {
      const storyData = {
        text: 'This is a test comment created by integration tests',
      };

      const { data } = await execute(
        createTaskStory(createdTaskGid, storyData)
      )(state);

      expect(data).to.have.property('gid');
      expect(data).to.have.property('text', storyData.text);
      expect(data).to.have.property('type', 'comment');
    }).timeout(5000);

    it('should create an HTML formatted comment', async () => {
      const storyData = {
        html_text: '<body>This is an <b>HTML</b> formatted comment</body>',
      };

      const { data } = await execute(
        createTaskStory(createdTaskGid, storyData)
      )(state);

      expect(data).to.have.property('gid');
      expect(data).to.have.property(
        'text',
        'This is an HTML formatted comment'
      );
      expect(data).to.have.property('type', 'comment');
    }).timeout(5000);
  });
});
