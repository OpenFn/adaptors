# Language MotherDuck <img src='./assets/square.png' width="30" height="30"/>

Language Pack for building expressions and operations to interact with MotherDuck, the serverless cloud analytics platform powered by DuckDB.

## Documentation

View all the required and optional properties for `state.configuration` in the official [configuration-schema](https://docs.openfn.org/adaptors/packages/motherduck-configuration-schema/) definition.

## Configuration

```json
{
  "token": "your_motherduck_token_here",
  "database": "my_database"
}
```

With session hint for read scaling:
```json
{
  "token": "your_motherduck_token_here",
  "database": "my_database",
  "sessionHint": "primary"
}
```

## Sample Expressions

### Execute SQL queries

```js
query('SELECT * FROM users WHERE age > 25');

query(`
  SELECT 
    COUNT(*) as total_users,
    AVG(age) as average_age
  FROM users
  WHERE created_at >= '2024-01-01'
`);
```

### Insert data

```js
insert('users', { 
  name: 'John Doe', 
  age: 30, 
  email: 'john@example.com' 
});

insertMany('users', [
  { name: 'Alice', age: 28, email: 'alice@example.com' },
  { name: 'Bob', age: 35, email: 'bob@example.com' }
]);
```

### Create and manage tables

```js
createTable('analytics', [
  { name: 'id', type: 'INTEGER PRIMARY KEY' },
  { name: 'event_name', type: 'VARCHAR(100)', required: true },
  { name: 'timestamp', type: 'TIMESTAMP', default: 'CURRENT_TIMESTAMP' },
  { name: 'user_id', type: 'INTEGER' }
]);

dropTable('old_table', { ifExists: true });
```

### Data transformation pipeline

```js
// ETL pipeline example
execute(
  // Extract: Query source data
  query('SELECT * FROM raw_events WHERE processed = false'),
  
  // Transform: Process the data
  fn(state => ({
    ...state,
    data: state.data.map(event => ({
      ...event,
      processed_at: new Date().toISOString(),
      category: event.type === 'click' ? 'engagement' : 'other'
    }))
  })),
  
  // Load: Insert processed data
  insertMany('processed_events', state => state.data),
  
  // Mark as processed
  query('UPDATE raw_events SET processed = true WHERE processed = false')
);
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the "Getting Started" guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.
