export function responseWithPagination(data, nextPage) {
  return {
    body: {
      data,
      next_page: nextPage,
    },
  };
}

export function responseWithData(data) {
  return {
    body: {
      data,
    },
  };
}

export function responseWithError(error) {
  return {
    body: {
      errors: [
        {
          message: error.message || 'An error occurred',
          help:
            error.help ||
            'For more information on API status codes and how to handle them, read the docs on errors: https://developers.asana.com/docs/errors',
          phrase: error.phrase || '6 sad squid snuggle softly',
        },
      ],
    },
  };
}

export function mockTaskResponse(task) {
  return responseWithData({
    gid: task.gid || '12345',
    name: task.name || 'Test Task',
    notes: task.notes || 'Task notes',
    completed: task.completed || false,
    assignee: task.assignee || null,
    projects: task.projects || [],
    workspace: task.workspace || { gid: '12345', name: 'Test Workspace' },
    created_at: task.created_at || '2024-01-01T00:00:00.000Z',
    modified_at: task.modified_at || '2024-01-01T00:00:00.000Z',
    ...task,
  });
}

export function mockTasksResponse(tasks, nextPage = null) {
  const formattedTasks = tasks.map(task => ({
    gid: task.gid || '12345',
    name: task.name || 'Test Task',
    notes: task.notes || 'Task notes',
    completed: task.completed || false,
    assignee: task.assignee || null,
    projects: task.projects || [],
    workspace: task.workspace || { gid: '12345', name: 'Test Workspace' },
    created_at: task.created_at || '2024-01-01T00:00:00.000Z',
    modified_at: task.modified_at || '2024-01-01T00:00:00.000Z',
    ...task,
  }));

  return responseWithPagination(formattedTasks, nextPage);
}

export function mockStoryResponse(story) {
  return responseWithData({
    gid: story.gid || '12345',
    text: story.text || 'Test comment',
    type: story.type || 'comment',
    created_at: story.created_at || '2024-01-01T00:00:00.000Z',
    created_by: story.created_by || { gid: '12345', name: 'Test User' },
    ...story,
  });
}
