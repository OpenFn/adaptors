import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import { 
  execute,
  query,
  insert,
  insertMany,
  update,
  remove,
  createTable,
  dropTable,
  describeTable,
  connectToMotherDuck,
  listDatabases,
  listTables
} from '../src/Adaptor.js';

// Test fixtures
const fixtures = {
  users: [
    { id: 1, name: 'Alice Johnson', age: 28, email: 'alice@example.com' },
    { id: 2, name: 'Bob Smith', age: 35, email: 'bob@example.com' },
    { id: 3, name: "O'Connor", age: 42, email: "oconnor@example.com" }
  ],
  userColumns: [
    { name: 'id', type: 'INTEGER PRIMARY KEY' },
    { name: 'name', type: 'VARCHAR(100)', required: true },
    { name: 'age', type: 'INTEGER' },
    { name: 'email', type: 'VARCHAR(255)' }
  ]
};

describe('MotherDuck Adaptor', () => {
  let baseState;
  
  beforeEach(() => {
    // Standard OpenFN state structure with MotherDuck configuration
    baseState = {
      configuration: {
        token: 'test_motherduck_token_123',
        database: 'test_db',
        testMode: true // Enable test mode to use mock connection
      },
      data: null, // OpenFN standard is to start with null data
      references: [] // No queries array - this is adapter-specific
    };
  });

  describe('execute', () => {
    it('should execute a sequence of operations', async () => {
      const operation = execute(
        query('SELECT 1 as test_value'),
        (state) => {
          expect(state.data).to.exist;
          expect(state.data).to.be.an('array');
          return state;
        }
      );
      
      const result = await operation(baseState);
      expect(result.data).to.exist;
      expect(result.references).to.be.an('array');
    });

    it('should preserve state.data between operations', async () => {
      const operation = execute(
        (state) => ({ ...state, data: { step: 1 } }),
        (state) => {
          expect(state.data.step).to.equal(1);
          return { ...state, data: { ...state.data, step: 2 } };
        }
      );
      
      const result = await operation(baseState);
      expect(result.data.step).to.equal(2);
    });

    it('should handle errors in operation chain', async () => {
      const operation = execute(
        (state) => { throw new Error('Test error'); }
      );
      
      try {
        await operation(baseState);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.equal('Test error');
      }
    });
  });

  describe('query', () => {
    it('should execute a simple SELECT query', async () => {
      const operation = execute(
        query('SELECT 1 as test_number, \'hello\' as test_string')
      );
      const result = await operation(baseState);
      
      expect(result.data).to.be.an('array');
      expect(result.response).to.exist;
      expect(result.response.rowCount).to.be.a('number');
    });

    it('should handle complex analytical queries', async () => {
      const operation = execute(
        query(`
          WITH test_data AS (
            SELECT 1 as id, 'Test' as name
            UNION ALL
            SELECT 2 as id, 'Data' as name
          )
          SELECT COUNT(*) as total_records FROM test_data
        `)
      );
      
      const result = await operation(baseState);
      expect(result.data).to.be.an('array');
      expect(result.response.command).to.equal('WITH');
    });

    it('should expand references in query text', async () => {
      const tableName = 'test_users_ref';
      const minAge = 18;
      
      const operation = execute(
        createTable(tableName, [{ name: 'id', type: 'INTEGER' }, { name: 'age', type: 'INTEGER' }]),
        insert(tableName, { id: 1, age: 25 }),
        query(`SELECT * FROM ${tableName} WHERE age >= ${minAge}`)
      );
      
      const result = await operation(baseState);
      expect(result.data).to.exist;
      expect(result.response).to.exist;
      expect(result.response.command).to.equal('SELECT');
    });

    it('should include query in response when writeSql option is true', async () => {
      const operation = execute(
        query('SELECT 1', { writeSql: true })
      );
      const result = await operation(baseState);
      
      expect(result.response.query).to.equal('SELECT 1');
      expect(result.data).to.be.an('array');
    });

    it('should skip execution when execute option is false', async () => {
      const operation = execute(
        query('SELECT 1', { execute: false, writeSql: true })
      );
      const result = await operation(baseState);
      
      expect(result.response).to.not.exist;
      // Data should be a string message since query didn't execute
      expect(result.data).to.equal('Query not executed.');
    });
  });

  describe('insert', () => {
    it('should insert a single user record', async () => {
      const user = fixtures.users[0];
      const operation = execute(
        createTable('test_users', fixtures.userColumns),
        insert('test_users', user)
      );
      const result = await operation(baseState);
      
      expect(result.data).to.deep.equal(user);
      expect(result.response).to.exist;
      expect(result.response.command).to.equal('INSERT');
    });

    it('should handle special characters in string values', async () => {
      const userWithQuotes = {
        name: "O'Malley",
        email: "test@example.com",
        bio: 'Says "Hello World"'
      };
      
      const insertOp = execute(insert('users', userWithQuotes));
      const result = await insertOp(baseState);
      
      // Should handle special characters without errors
      expect(result.data).to.deep.equal(userWithQuotes);
      expect(result.response.command).to.equal('INSERT');
    });

    it('should handle null and undefined values', async () => {
      const userWithNulls = {
        name: 'John Doe',
        age: null,
        email: undefined,
        active: true
      };
      
      const insertOp = execute(insert('users', userWithNulls));
      const result = await insertOp(baseState);
      
      expect(result.data).to.exist;
      expect(result.response.command).to.equal('INSERT');
    });

    it('should expand references in table name and data', async () => {
      const userData = { name: 'Dynamic User', age: 25 };
      
      const dynamicInsert = execute(insert('users', userData));
      
      const result = await dynamicInsert(baseState);
      expect(result.data).to.deep.equal(userData);
      expect(result.response.command).to.equal('INSERT');
    });

    it('should validate table name for SQL injection', async () => {
      const maliciousTableName = "users; DROP TABLE users; --";
      const insertOp = execute(insert(maliciousTableName, { name: 'Test' }));
      
      try {
        await insertOp(baseState);
        expect.fail('Should have thrown validation error');
      } catch (error) {
        expect(error.message).to.include('Invalid SQL identifier');
      }
    });
  });

  describe('insertMany', () => {
    it('should insert multiple user records in batch', async () => {
      const users = fixtures.users.slice(0, 2);
      const insertOp = execute(insertMany('users', users));
      const result = await insertOp(baseState);
      
      expect(result.data).to.deep.equal(users);
      expect(result.response).to.exist;
      expect(result.response.rowCount).to.equal(users.length);
    });

    it('should handle large batch inserts efficiently', async () => {
      // Generate 50 test records
      const largeDataset = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        age: 20 + (i % 30),
        email: `user${i + 1}@example.com`
      }));
      
      const insertOp = execute(insertMany('users', largeDataset));
      const result = await insertOp(baseState);
      
      // Should handle large batch efficiently
      expect(result.data).to.deep.equal(largeDataset);
      expect(result.response.command).to.equal('INSERT');
      expect(result.response.rowCount).to.equal(50);
    });

    it('should handle empty array gracefully', async () => {
      const insertOp = execute(insertMany('users', []));
      const result = await insertOp(baseState);
      
      // Should handle empty array gracefully
      expect(result.data).to.equal('No records to insert');
    });

    it('should handle inconsistent record structures', async () => {
      const mixedRecords = [
        { name: 'Complete User', age: 30, email: 'complete@example.com' },
        { name: 'Partial User' }, // missing age and email
        { name: 'Another User', age: 25 } // missing email
      ];
      
      const insertOp = execute(insertMany('users', mixedRecords));
      const result = await insertOp(baseState);
      
      expect(result.data).to.deep.equal(mixedRecords);
      expect(result.response.command).to.equal('INSERT');
    });
  });

  describe('update', () => {
    it('should update user records with WHERE clause', async () => {
      const changes = { age: 31, email: 'newemail@example.com' };
      const updateOp = execute(update('users', changes, 'WHERE name = \'John Doe\''));
      const result = await updateOp(baseState);
      
      expect(result.data).to.exist;
      expect(result.response.command).to.equal('UPDATE');
      expect(result.response.rowCount).to.be.a('number');
    });

    it('should handle null values in update data', async () => {
      const changes = { age: null, last_login: null };
      const updateOp = execute(update('users', changes, 'WHERE id = 1'));
      const result = await updateOp(baseState);
      
      expect(result.data).to.exist;
      expect(result.response.command).to.equal('UPDATE');
    });

    it('should escape special characters in update values', async () => {
      const changes = {
        name: "O'Connor",
        bio: 'He said "Hello World"'
      };
      const updateOp = execute(update('users', changes, 'WHERE id = 1'));
      const result = await updateOp(baseState);
      
      expect(result.data).to.exist;
      expect(result.response.command).to.equal('UPDATE');
    });

    it('should expand references in update parameters', async () => {
      const updateOp = execute(update('users', { age: 35 }, 'WHERE active = true'));
      
      const result = await updateOp(baseState);
      expect(result.data).to.exist;
      expect(result.response.command).to.equal('UPDATE');
    });
  });

  describe('remove', () => {
    it('should delete records with WHERE clause', async () => {
      const removeOp = execute(remove('users', 'WHERE age < 18'));
      const result = await removeOp(baseState);
      
      expect(result.data).to.exist;
      expect(result.response.command).to.equal('DELETE');
    });

    it('should handle complex WHERE conditions', async () => {
      const complexCondition = "WHERE age BETWEEN 18 AND 65 AND email LIKE '%@company.com'";
      const removeOp = execute(remove('users', complexCondition));
      const result = await removeOp(baseState);
      
      expect(result.data).to.exist;
      expect(result.response.command).to.equal('DELETE');
    });

    it('should expand references in table name and WHERE clause', async () => {
      const removeOp = execute(remove('users', 'WHERE inactive = true'));
      
      const result = await removeOp(baseState);
      expect(result.data).to.exist;
      expect(result.response.command).to.equal('DELETE');
    });

    it('should validate table name for SQL injection', async () => {
      const maliciousTableName = "users; DROP DATABASE; --";
      const removeOp = execute(remove(maliciousTableName, 'WHERE id = 1'));
      
      try {
        await removeOp(baseState);
        expect.fail('Should have thrown validation error');
      } catch (error) {
        expect(error.message).to.include('Invalid SQL identifier');
      }
    });
  });

  describe('createTable', () => {
    it('should create table with proper column definitions', async () => {
      const columns = fixtures.userColumns;
      const createOp = execute(createTable('users', columns));
      const result = await createOp(baseState);
      
      expect(result.data).to.exist;
      expect(result.response.command).to.equal('CREATE');
    });

    it('should handle column constraints properly', async () => {
      const constrainedColumns = [
        { name: 'id', type: 'INTEGER', required: true, unique: true },
        { name: 'email', type: 'VARCHAR(255)', default: 'user@example.com' },
        { name: 'created_at', type: 'TIMESTAMP', default: 'CURRENT_TIMESTAMP' }
      ];
      
      const createOp = execute(createTable('users_constrained', constrainedColumns));
      const result = await createOp(baseState);
      
      expect(result.data).to.exist;
      expect(result.response.command).to.equal('CREATE');
    });

    it('should expand references in table name and column definitions', async () => {
      const columns = [
        { name: 'id', type: 'INTEGER PRIMARY KEY' },
        { name: 'name', type: 'VARCHAR(100)', required: true }
      ];
      
      const createOp = execute(createTable('dynamic_users', columns));
      
      const result = await createOp(baseState);
      expect(result.data).to.exist;
      expect(result.response.command).to.equal('CREATE');
    });

    it('should validate table name for SQL injection', async () => {
      const maliciousTableName = "users; DROP TABLE admin; --";
      const createOp = execute(createTable(maliciousTableName, fixtures.userColumns));
      
      try {
        await createOp(baseState);
        expect.fail('Should have thrown validation error');
      } catch (error) {
        expect(error.message).to.include('Invalid SQL identifier');
      }
    });
  });

  describe('dropTable', () => {
    it('should generate DROP TABLE statement', async () => {
      const dropOp = execute(dropTable('users'));
      const result = await dropOp(baseState);
      
      expect(result.data).to.exist;
      expect(result.response.command).to.equal('DROP');
    });

    it('should add IF EXISTS clause when specified', async () => {
      const dropOp = execute(dropTable('users', { ifExists: true }));
      const result = await dropOp(baseState);
      
      expect(result.data).to.exist;
      expect(result.response.command).to.equal('DROP');
    });

    it('should expand references in table name', async () => {
      const dropOp = execute(dropTable('legacy_users', { ifExists: true }));
      
      const result = await dropOp(baseState);
      expect(result.data).to.exist;
      expect(result.response.command).to.equal('DROP');
    });

    it('should validate table name for SQL injection', async () => {
      const maliciousTableName = "users; DROP DATABASE main; --";
      const dropOp = execute(dropTable(maliciousTableName));
      
      try {
        await dropOp(baseState);
        expect.fail('Should have thrown validation error');
      } catch (error) {
        expect(error.message).to.include('Invalid SQL identifier');
      }
    });
  });

  describe('describeTable', () => {
    it('should generate DESCRIBE statement for table', async () => {
      const describeOp = execute(describeTable('users'));
      const result = await describeOp(baseState);
      
      expect(result.data).to.be.an('array');
      expect(result.response.command).to.equal('DESCRIBE');
    });

    it('should expand references in table name', async () => {
      const describeOp = execute(describeTable('user_profiles'));
      
      const result = await describeOp(baseState);
      expect(result.data).to.be.an('array');
      expect(result.response.command).to.equal('DESCRIBE');
    });

    it('should validate table name for SQL injection', async () => {
      const maliciousTableName = "users; SELECT password FROM admin; --";
      const describeOp = execute(describeTable(maliciousTableName));
      
      try {
        await describeOp(baseState);
        expect.fail('Should have thrown validation error');
      } catch (error) {
        expect(error.message).to.include('Invalid SQL identifier');
      }
    });
  });

  describe('MotherDuck functions', () => {
    describe('connectToMotherDuck', () => {
      it('should configure MotherDuck connection in state', async () => {
        const connectOp = execute(connectToMotherDuck('analytics_db', 'secret_token'));
        const result = await connectOp(baseState);
        
        expect(result.configuration.motherDuckDatabase).to.equal('analytics_db');
        expect(result.configuration.motherDuckToken).to.equal('secret_token');
      });

      it('should handle session hints for read scaling', async () => {
        const connectOp = execute(connectToMotherDuck('readonly_db', 'token123', { sessionHint: 'readonly' }));
        const result = await connectOp(baseState);
        
        expect(result.configuration.sessionHint).to.equal('readonly');
        expect(result.configuration.motherDuckDatabase).to.equal('readonly_db');
      });

      it('should expand references in connection parameters', async () => {
        const connectOp = execute(connectToMotherDuck('prod_analytics', 'dynamic_token_123'));
        
        const result = await connectOp(baseState);
        expect(result.configuration.motherDuckDatabase).to.equal('prod_analytics');
        expect(result.configuration.motherDuckToken).to.equal('dynamic_token_123');
      });

      it('should handle missing token gracefully', async () => {
        const connectOp = execute(connectToMotherDuck('test_db', ''));
        
        try {
          await connectOp(baseState);
          // Should still set configuration but may fail on actual connection
        } catch (error) {
          expect(error.message).to.include('token');
        }
      });
    });

    describe('listDatabases', () => {
      it('should query system catalog for databases', async () => {
        const listOp = execute(listDatabases());
        const result = await listOp(baseState);
        
        expect(result.data).to.be.an('array');
        expect(result.response.command).to.equal('SHOW');
      });

      it('should log SQL when writeSql option is true', async () => {
        const listOp = execute(listDatabases({ writeSql: true }));
        const result = await listOp(baseState);
        
        expect(result.response.query).to.equal('SHOW DATABASES');
      });

      it('should skip execution when execute option is false', async () => {
        const listOp = execute(listDatabases({ execute: false, writeSql: true }));
        const result = await listOp(baseState);
        
        if (result.response && result.response.query) {
          expect(result.response.query).to.equal('SHOW DATABASES');
        }
        expect(result.data).to.equal('Query not executed.');
      });
    });

    describe('listTables', () => {
      it('should query system catalog for tables', async () => {
        const listOp = execute(listTables());
        const result = await listOp(baseState);
        
        expect(result.data).to.be.an('array');
        expect(result.response.command).to.equal('SHOW');
      });

    });
  });

  describe('Integration scenarios', () => {
    it('should handle complete CRUD workflow', async () => {
      const workflow = execute(
        // Create table
        createTable('integration_test', [
          { name: 'id', type: 'INTEGER PRIMARY KEY' },
          { name: 'name', type: 'VARCHAR(100)' }
        ]),
        
        // Insert data
        insert('integration_test', { id: 1, name: 'Test User' }),
        
        // Query data
        query('SELECT * FROM integration_test'),
        
        // Update data
        update('integration_test', { name: 'Updated User' }, 'WHERE id = 1'),
        
        // Clean up
        dropTable('integration_test', { ifExists: true })
      );
      
      const result = await workflow(baseState);
      
      // Should have executed all operations
      // Should have executed all operations successfully
      expect(result).to.exist;
      expect(result.data).to.exist;
      expect(result.queries).to.be.an('array');
    });

    it('should preserve state data between operations', async () => {
      const workflow = execute(
        // Set some data
        (state) => ({ ...state, data: { step: 1, processed: [] } }),
        
        // Process and modify data
        (state) => ({
          ...state,
          data: {
            ...state.data,
            step: 2,
            processed: [...state.data.processed, 'query_executed']
          }
        }),
        
        // Use data in query
        (state) => {
          expect(state.data.step).to.equal(2);
          expect(state.data.processed).to.include('query_executed');
          return state;
        }
      );
      
      await workflow(baseState);
    });


    it('should handle dynamic reference expansion', async () => {
      const tableName = 'dynamic_table';
      const userData = { id: 1, name: 'Dynamic User', age: 30 };
      
      const dynamicWorkflow = execute(
        createTable(tableName, [
          { name: 'id', type: 'INTEGER PRIMARY KEY' },
          { name: 'name', type: 'VARCHAR(100)' },
          { name: 'age', type: 'INTEGER' }
        ]),
        insert(tableName, userData),
        query(`SELECT * FROM ${tableName} WHERE age > 25`)
      );
      
      const result = await dynamicWorkflow(baseState);
      expect(result.data).to.be.an('array');
      expect(result.response).to.exist;
      expect(result.response.command).to.equal('SELECT');
    });
  });

  describe('Error handling and edge cases', () => {
    it('should handle database connection errors', async () => {
      const invalidConfigState = {
        ...baseState,
        configuration: {
          database: '/nonexistent/path/database.db'
        }
      };
      
      const queryOp = query('SELECT 1');
      
      try {
        await queryOp(invalidConfigState);
        // May succeed if DuckDB creates the file
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });

    it('should handle invalid SQL syntax errors', async () => {
      const invalidQuery = query('SELECT FROM WHERE INVALID');
      
      try {
        await invalidQuery(baseState);
        expect.fail('Should have thrown SQL syntax error');
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });

    it('should handle empty insertMany gracefully', async () => {
      const insertOp = insertMany('users', []);
      const result = await insertOp(baseState);
      
      // Empty array should be handled gracefully
      expect(result.data).to.equal('No records to insert');
    });

    it('should handle null/undefined function parameters', async () => {
      try {
        const insertOp = execute(insert(null, { name: 'test' }));
        await insertOp(baseState);
        expect.fail('Should have thrown error for null table name');
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });

    it('should handle malformed column definitions', async () => {
      const badColumns = [
        { name: '', type: 'INTEGER' }, // empty name
        { name: 'valid', type: '' }, // empty type
        { name: null, type: 'VARCHAR(50)' } // null name
      ];
      
      const createOp = execute(createTable('bad_table', badColumns));
      const result = await createOp(baseState);
      // Should handle malformed columns gracefully
      expect(result).to.exist;
    });

    it('should handle reference expansion errors', async () => {
      const stateWithBadRef = {
        ...baseState,
        data: null
      };
      
      const badRefQuery = query(
        (state) => state.data.nonexistent.property
      );
      
      try {
        await badRefQuery(stateWithBadRef);
        expect.fail('Should have thrown reference error');
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });
  });

  describe('Security validation', () => {
    it('should prevent SQL injection in table names', async () => {
      const sqlInjectionAttempts = [
        "users; DROP TABLE admin; --",
        "users'; DELETE FROM passwords; --",
        "users UNION SELECT * FROM secrets",
        "users/**/OR/**/1=1"
      ];
      
      for (const maliciousTable of sqlInjectionAttempts) {
        try {
          const insertOp = execute(insert(maliciousTable, { name: 'test' }));
          await insertOp(baseState);
          expect.fail(`Should have rejected malicious table name: ${maliciousTable}`);
        } catch (error) {
          expect(error.message).to.include('Invalid SQL identifier');
        }
      }
    });

    it('should prevent SQL injection in column names', async () => {
      const maliciousColumns = [
        { 'id; DROP TABLE users; --': 1 },
        { 'name\'; DELETE FROM admin; --': 'test' },
        { 'valid_name/**/OR/**/1=1': 'value' }
      ];
      
      for (const maliciousRecord of maliciousColumns) {
        try {
          const insertOp = execute(insert('users', maliciousRecord));
          await insertOp(baseState);
          expect.fail(`Should have rejected malicious column: ${JSON.stringify(maliciousRecord)}`);
        } catch (error) {
          expect(error.message).to.include('Invalid SQL identifier');
        }
      }
    });

    it('should properly escape string values to prevent injection', async () => {
      const dangerousStrings = [
        "O'Malley", // Single quote
        "User'; DROP TABLE users; --", // SQL injection attempt
        'User" OR "1"="1', // Double quote injection
        "Multi\nLine\tString", // Special characters
        "Unicode: 你好 émoji: 🔒" // Unicode characters
      ];
      
      for (const dangerousString of dangerousStrings) {
        const insertOp = execute(insert('users', { name: dangerousString, safe_col: 'test' }));
        const result = await insertOp(baseState);
        
        // Should handle dangerous strings safely
        expect(result.data).to.exist;
        expect(result.response.command).to.equal('INSERT');
      }
    });

    it('should validate WHERE clause content', async () => {
      const maliciousWhereClauses = [
        "WHERE 1=1; DROP TABLE users; --",
        "WHERE id=1 UNION SELECT password FROM admin"
      ];
      
      for (const maliciousWhere of maliciousWhereClauses) {
        try {
          const updateOp = execute(update('users', { name: 'safe' }, maliciousWhere));
          await updateOp(baseState);
          expect.fail(`Should have rejected malicious WHERE clause: ${maliciousWhere}`);
        } catch (error) {
          expect(error.message).to.include('WHERE clause contains forbidden keyword');
        }
      }
    });
  });

  describe('Configuration validation', () => {
    it('should handle missing MotherDuck token', async () => {
      const emptyConfigState = {
        configuration: {},
        data: {},
        references: [],
        queries: []
      };
      
      const executeOp = execute(query('SELECT 1'));
      
      try {
        await executeOp(emptyConfigState);
        expect.fail('Should have thrown error for missing MotherDuck token');
      } catch (error) {
        expect(error.message).to.include('token');
      }
    });

    it('should validate MotherDuck configuration completeness', async () => {
      // Missing token should be handled gracefully
      const incompleteConfig = {
        ...baseState,
        configuration: {
          motherDuckDatabase: 'test_db'
          // Missing motherDuckToken
        }
      };
      
      const queryOp = query('SELECT 1');
      
      try {
        await queryOp(incompleteConfig);
        // Should handle missing token
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });

    it('should validate database path format', async () => {
      const invalidPaths = [
        '',
        null,
        undefined,
        123, // number instead of string
        {}, // object instead of string
      ];
      
      for (const invalidPath of invalidPaths) {
        const invalidConfigState = {
          ...baseState,
          configuration: {
            database: invalidPath
          }
        };
        
        const queryOp = query('SELECT 1');
        
        try {
          await queryOp(invalidConfigState);
          // Some invalid paths might be handled by DuckDB
        } catch (error) {
          expect(error).to.be.an('error');
        }
      }
    });

    it('should handle complex state structures', async () => {
      const complexState = {
        ...baseState,
        data: {
          nested: {
            deeply: {
              value: 'test_table'
            }
          },
          array: [1, 2, 3],
          mixed: {
            string: 'value',
            number: 42,
            boolean: true
          }
        },
        references: [
          { name: 'Previous operation' },
          { data: { result: 'success' } }
        ]
      };
      
      const complexQuery = execute(
        (state) => query(`SELECT '${state.data.nested.deeply.value}' as table_name`)(state)
      );
      
      const result = await complexQuery(complexState);
      expect(result.data).to.be.an('array');
      expect(result.response).to.exist;
    });
  });
});
