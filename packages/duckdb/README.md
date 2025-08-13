# language-duckdb <img src='./assets/square.png' width="30" height="30"/>

An OpenFn **_adaptor_** for building integration jobs for use with DuckDB, the fast in-process analytical database. This adaptor supports both local DuckDB files and remote MotherDuck databases.

> **🔒 Enterprise-Grade Security**: This adaptor features comprehensive SQL injection protection, input validation, and secure error handling, making it safe for production use with sensitive data.

## Features

- **Local DuckDB Support**: Connect to local `.db` files or in-memory databases
- **MotherDuck Integration**: Connect to remote MotherDuck databases in the cloud
- **Full CRUD Operations**: Create, read, update, and delete data
- **Advanced SQL Support**: Execute complex queries with DuckDB's analytical capabilities
- **Database Management**: Create/drop tables, attach/detach databases
- **Modern Node.js Client**: Built on the latest DuckDB Node Neo client

### 🔒 Security Features

- **SQL Injection Protection**: Comprehensive validation of table names, column names, and WHERE clauses
- **Input Sanitization**: All user inputs are validated and escaped before use
- **Batch Processing Limits**: Automatic chunking of large datasets to prevent memory exhaustion
- **Secure Error Handling**: Graceful error propagation without exposing sensitive information
- **Connection Safety**: Automatic cleanup of database connections on error

## Quick Start

### Basic Usage

```javascript
import { execute, query, insert, createTable } from '@openfn/language-duckdb';

execute(
  // Create a table
  createTable('users', [
    { name: 'id', type: 'INTEGER PRIMARY KEY' },
    { name: 'name', type: 'VARCHAR(100)', required: true },
    { name: 'age', type: 'INTEGER' },
    { name: 'email', type: 'VARCHAR(255)' }
  ]),
  
  // Insert some data
  insert('users', { 
    name: 'John Doe', 
    age: 30, 
    email: 'john@example.com' 
  }),
  
  // Query the data
  query('SELECT * FROM users WHERE age > 25')
)(state);
```

### MotherDuck Connection

```javascript
import { execute, connectToMotherDuck, query } from '@openfn/language-duckdb';

execute(
  // Connect to MotherDuck
  connectToMotherDuck('my_database', 'your_token'),
  
  // Query remote data
  query('SELECT * FROM my_table'),
  
  // List available databases
  listDatabases()
)(state);
```

## Configuration

> **Note**: All configuration values are validated for security. Database paths and connection strings are checked for injection attempts.

### Local Database

```json
{
  "database": "path/to/local/database.db"
}
```

For in-memory database:
```json
{
  "database": ":memory:"
}
```

### MotherDuck Connection

```json
{
  "connectionString": "md:my_database",
  "motherDuckToken": "your_token_here"
}
```

Or configure dynamically:
```json
{
  "motherDuckDatabase": "my_database",
  "motherDuckToken": "your_token_here",
  "sessionHint": "optional_session_hint"
}
```

## API Reference

### Core Functions

#### `execute(...operations)`
Execute a sequence of DuckDB operations.

#### `query(sqlQuery, options?, callback?)`
Execute a SQL query.

```javascript
query('SELECT * FROM users WHERE age > ?', { writeSql: true })
```

#### `insert(table, record, options?, callback?)`
Insert a single record.

```javascript
insert('users', { name: 'Jane', age: 25, email: 'jane@example.com' })
```

#### `insertMany(table, records, options?, callback?)`
Insert multiple records with automatic batch processing for large datasets.

```javascript
// Small datasets are inserted in a single operation
insertMany('users', [
  { name: 'Alice', age: 28 },
  { name: 'Bob', age: 32 }
])

// Large datasets (>1000 records) are automatically chunked
const records = generateLargeDataset(); // 5000 records
insertMany('users', records)
// Automatically processes in 5 batches of 1000 records each
```

**Performance & Safety:**
- Automatically chunks datasets larger than 1000 records
- Prevents memory exhaustion with large data imports
- Provides progress logging for multi-batch operations

#### `update(table, changes, whereClause, options?, callback?)`
Update records.

```javascript
update('users', { age: 31 }, 'WHERE name = "John"')
```

#### `remove(table, whereClause, options?, callback?)`
Delete records.

```javascript
remove('users', 'WHERE age < 18')
```

### Database Management

#### `createTable(tableName, columns, options?, callback?)`
Create a new table.

```javascript
createTable('products', [
  { name: 'id', type: 'INTEGER', required: true, unique: true },
  { name: 'name', type: 'VARCHAR(255)', required: true },
  { name: 'price', type: 'DECIMAL(10,2)', default: 0.00 }
])
```

#### `dropTable(tableName, options?, callback?)`
Drop a table.

```javascript
dropTable('old_table', { ifExists: true })
```

#### `describeTable(tableName, options?, callback?)`
Get table structure information.

```javascript
describeTable('users')
```

### MotherDuck Functions

#### `connectToMotherDuck(database, token, sessionHint?, callback?)`
Configure connection to MotherDuck.

```javascript
connectToMotherDuck('analytics_db', 'your_token', 'session_hint')
```

#### `listDatabases(options?, callback?)`
List all available databases.

#### `listTables(options?, callback?)`
List all tables in current database.

#### `attachDatabase(database, alias, options?, callback?)`
Attach an external database.

```javascript
attachDatabase('local_file.db', 'local_db')
```

#### `detachDatabase(alias, options?, callback?)`
Detach a database.

```javascript
detachDatabase('local_db')
```

## Advanced Examples

### Secure Dynamic Queries

Build dynamic queries safely using state and references:

```javascript
execute(
  // Safe dynamic table and column references
  (state) => {
    const table = state.data.targetTable; // Automatically validated
    const column = state.data.filterColumn; // Automatically validated
    return query(`SELECT * FROM ${table} WHERE ${column} > 100`)(state);
  }
)
```

### Handling User Input Safely

All user inputs are automatically sanitized:

```javascript
execute(
  // User input is automatically escaped
  insert('comments', {
    user: "Bobby'; DROP TABLE users; --", // Safely escaped
    comment: "Hello <script>alert('XSS')</script>", // Stored safely
    timestamp: new Date().toISOString()
  })
)
```

### Working with Complex Data Types

```javascript
// DuckDB supports arrays, structs, and other complex types
query(`
  SELECT 
    name,
    [age, salary] as metrics,
    {'department': dept, 'location': loc} as details
  FROM employees
`)
```

### Data Analysis Operations

```javascript
// Analytical queries with window functions
query(`
  SELECT 
    name,
    salary,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) as rank
  FROM employees
`)
```

### Hybrid Local/Remote Operations

```javascript
execute(
  // Attach local database
  attachDatabase('local_backup.db', 'backup'),
  
  // Sync data between MotherDuck and local
  query(`
    INSERT INTO main.users 
    SELECT * FROM backup.users 
    WHERE updated_at > '2023-01-01'
  `),
  
  // Detach when done
  detachDatabase('backup')
)
```

## Security Best Practices

This adaptor implements multiple layers of security to protect against common database vulnerabilities:

### SQL Injection Protection

All table names, column names, and WHERE clauses are validated before execution:

```javascript
// ✅ Safe - all inputs are validated
update('users', { age: 31 }, 'WHERE name = "John"')

// ❌ Blocked - SQL injection attempt detected
update('users; DROP TABLE admin;', { age: 31 }, 'WHERE id = 1')
// Error: Invalid SQL identifier

// ❌ Blocked - dangerous WHERE clause
remove('users', 'WHERE 1=1; DROP TABLE users;')
// Error: WHERE clause contains forbidden keyword: ;
```

### Input Validation

All string values are automatically escaped to prevent injection:

```javascript
// ✅ Safe - quotes are automatically escaped
insert('users', { 
  name: "O'Malley",  // Automatically escaped to O''Malley
  bio: 'Says "Hello"' // Safely handled
})
```

### Batch Processing Limits

Large datasets are automatically chunked to prevent memory issues:

```javascript
// ✅ Safe - automatically processed in batches of 1000
const largeDataset = Array.from({ length: 5000 }, (_, i) => ({
  id: i,
  name: `User ${i}`
}));

insertMany('users', largeDataset)
// Automatically splits into 5 batches
```

### Secure Connection Management

Database connections are automatically cleaned up on error:

```javascript
execute(
  query('SELECT * FROM users'),
  // If this fails, connection is automatically closed
  insert('invalid_table', { data: 'test' }),
  // This won't leave open connections
)
```

## Error Handling

All operations include built-in error handling with secure error messages that don't expose sensitive information. Use the `writeSql: true` option to debug queries:

```javascript
query('SELECT * FROM users', { writeSql: true, execute: false })
```

## Documentation

View the [docs site](https://docs.openfn.org/adaptors/packages/duckdb-docs) for full technical documentation.

### Configuration Schema

View the [configuration-schema](https://docs.openfn.org/adaptors/packages/duckdb-configuration-schema/) for required and optional `configuration` properties.

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the "Getting Started" guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To build _only_ the docs run `pnpm build docs`.

## Dependencies

This adaptor uses the modern [DuckDB Node Neo client](https://duckdb.org/docs/stable/clients/node_neo/overview.html) (`@duckdb/node-api`) for optimal performance and TypeScript support.

## Attribution

This adaptor was developed by:
- **Author**: Aseidas Blauvelt <ablauvelt@verasolutions.org>
- **Organization**: Vera Solutions
- **License**: LGPLv3
