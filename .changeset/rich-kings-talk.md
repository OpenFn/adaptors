---
'@openfn/language-asana': minor
---

#### Add Auto Pagination to `getTasks` and `upsertTask` Functions

##### `getTasks` Function:

- **Example without limit** (returns all tasks):

  ```js
  getTasks('1206933955023739', {
    opt_fields: 'name,notes,assignee',
  });
  ```

- **Limit the number of tasks returned**:

  ```js
  getTasks('1206933955023739', {
    opt_fields: 'name,notes,assignee',
    limit: 100,
  });
  ```

##### `upsertTask` Function:

- Now automatically fetches all tasks to find a matching task before updating or
  creating a new one.
