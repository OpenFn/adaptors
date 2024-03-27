# language-asana

Language Pack for connecting with Asana.

## Documentation

### Configuration

View all the required and optional properties for `state.configuration` in the
official
[configuration-schema](https://docs.openfn.org/adaptors/packages/asana-configuration-schema/)
definition.

### How to create an API token

Using Asana's API requires having an API token. To generate that token, head to
the [Asana developer console](https://app.asana.com/0/developer-console) and
enter the **Personal access tokens** section.
[For API Reference docs](https://developers.asana.com/docs/api-explorer)

There you can click on **+New access token**. A prompt will be opened allowing
you to give the token a name and then create it.

_Note: Treat your PAT like you would with a password. Do not share it or display
it online._

### Sample expression

## Find a single task of a given project using the task id.

```js
getTask('1234', {
  opt_fields: 'name,assignee',
});
```

## Find the list of tasks of a given project using the project id.

```js
getTasks('22889593722', {
  opt_fields: 'name,notes,assignee',
});
```

## Update a specific task

```js
updateTask('12344', {
  name: 'test',
  approval_status: 'pending',
  assignee: '12345',
});
```

## Create a task

```js
createTask({
  name: 'test',
  approval_status: 'pending',
  assignee: '12345',
});
```

## Update a task or create a new one

You can use a field name literal as `externalId` to match a specific task. If
the task does not exist, a new one will be created. The first parameter in this
function should be the `project_id`.

```js
upsertTask('12344', {
  externalId: 'name',
  data: {
    name: 'A new task',
    projects: ['12344'],
    notes: 'This is a new task',
  },
});
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
