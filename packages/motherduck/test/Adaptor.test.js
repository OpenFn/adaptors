import { expect } from 'chai';
import {
  execute,
  query,
  insert,
} from '../src/Adaptor.js';

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
      data: null,
      references: []
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

    it('should expand function references in query text', async () => {
      const operation = execute(
        // First, set a specific value on state that we'll reference
        state => ({
          ...state,
          data: { uniqueValue: 'EXPANDED_REFERENCE_WORKED' }
        }),

        // Use function reference - if expandReferences doesn't work, this function won't be called
        // and the query would fail with a syntax error (trying to execute a function as SQL)
        query(state => `SELECT '${state.data.uniqueValue}' as result`, { writeSql: true })
      );

      const result = await operation(baseState);
      expect(result.data).to.be.an('array');
      // This will only pass if the function was actually called with state
      expect(result.data[0].result).to.equal('EXPANDED_REFERENCE_WORKED');
      // Verify the SQL was actually generated from the function
      expect(result.response.query).to.equal("SELECT 'EXPANDED_REFERENCE_WORKED' as result");
    });

    it('should work with static query strings (no references)', async () => {
      const operation = execute(
        query('SELECT 42 as answer')
      );

      const result = await operation(baseState);
      expect(result.data).to.be.an('array');
      expect(result.data[0].answer).to.equal(42);
    });

    it('should include query in response when writeSql option is true', async () => {
      const operation = execute(
        query('SELECT 1', { writeSql: true })
      );
      const result = await operation(baseState);

      expect(result.response.query).to.equal('SELECT 1');
      expect(result.data).to.be.an('array');
    });

    it('should hide query in response by default (writeSql: false)', async () => {
      const operation = execute(
        query('SELECT * FROM sensitive_table')
      );
      const result = await operation(baseState);

      // By default, SQL should be hidden for security
      expect(result.response.query).to.equal('[query hidden]');
    });

    it('should hide query even with function references when writeSql is false', async () => {
      const operation = execute(
        state => ({ ...state, data: { secret: 'confidential_data' } }),
        query(state => `SELECT '${state.data.secret}' as value`)  // No writeSql option
      );
      const result = await operation(baseState);

      // Even though we used a function reference, SQL should still be hidden
      expect(result.response.query).to.equal('[query hidden]');
      // But the query should still execute correctly
      expect(result.data[0].value).to.equal('confidential_data');
    });

    it('should use function reference for options', async () => {
      const operation = execute(
        state => ({ ...state, data: { showSql: true } }),
        query(
          'SELECT 1',
          state => ({ writeSql: state.data.showSql })
        )
      );

      const result = await operation(baseState);
      expect(result.response.query).to.equal('SELECT 1');
    });
  });

  describe('insert', () => {
    it('should insert a single record', async () => {
      const user = { id: 1, name: 'Alice', age: 28 };
      const operation = execute(
        // First create the table
        query('CREATE TABLE test_users (id INTEGER, name VARCHAR(100), age INTEGER)'),
        // Then insert
        insert('test_users', user)
      );
      const result = await operation(baseState);

      expect(result.data).to.exist;
      expect(result.data.recordsInserted).to.equal(1);
      expect(result.data.batches).to.equal(1);
    });

    it('should insert multiple records as array', async () => {
      const users = [
        { id: 1, name: 'Alice', age: 28 },
        { id: 2, name: 'Bob', age: 35 }
      ];

      const operation = execute(
        query('CREATE TABLE users (id INTEGER, name VARCHAR(100), age INTEGER)'),
        insert('users', users)
      );
      const result = await operation(baseState);

      expect(result.data.recordsInserted).to.equal(2);
      expect(result.data.batches).to.equal(1);
    });

    it('should handle special characters in string values', async () => {
      const userWithQuotes = {
        id: 1,
        name: "O'Malley",
        bio: 'Says "Hello World"'
      };

      const operation = execute(
        query('CREATE TABLE users (id INTEGER, name VARCHAR(100), bio TEXT)'),
        insert('users', userWithQuotes)
      );
      const result = await operation(baseState);

      expect(result.data.recordsInserted).to.equal(1);
    });

    it('should handle null and undefined values', async () => {
      const userWithNulls = {
        name: 'John Doe',
        age: null,
        email: undefined,
        active: true
      };

      const operation = execute(
        query('CREATE TABLE users (name VARCHAR(100), age INTEGER, email VARCHAR(100), active BOOLEAN)'),
        insert('users', userWithNulls)
      );
      const result = await operation(baseState);

      expect(result.data.recordsInserted).to.equal(1);
    });

    it('should expand function references in table name', async () => {
      const operation = execute(
        // Set a unique table name on state in a persistent location
        state => ({ ...state, config: { targetTable: 'ref_test_table_unique' } }),
        // Create the table with that exact name
        query(state => `CREATE TABLE ${state.config.targetTable} (id INTEGER, name VARCHAR(100))`),
        // Insert using function reference for table name
        insert(
          state => state.config.targetTable,  // If this doesn't expand, insert will fail
          { id: 1, name: 'Test' }
        ),
        // Verify by querying with the same reference
        query(state => `SELECT COUNT(*) as count FROM ${state.config.targetTable}`)
      );

      const result = await operation(baseState);
      // If expandReferences didn't work, the query would fail because table wouldn't exist
      expect(result.data[0].count).to.equal(1);
    });

    it('should expand function references in record data', async () => {
      const operation = execute(
        // Set specific values on state in a persistent location
        state => ({ ...state, config: { userName: 'REF_USER_123', userAge: 99 } }),
        query('CREATE TABLE users (name VARCHAR(100), age INTEGER)'),
        // Insert using function reference for data - if not expanded, would insert wrong values
        insert(
          'users',
          state => ({ name: state.config.userName, age: state.config.userAge })
        ),
        // Query back to verify the exact values were used
        query('SELECT name, age FROM users')
      );

      const result = await operation(baseState);
      // If expandReferences didn't work, these specific values wouldn't match
      expect(result.data[0].name).to.equal('REF_USER_123');
      expect(result.data[0].age).to.equal(99);
    });

    it('should validate table name for SQL injection', async () => {
      const maliciousTableName = "users; DROP TABLE users; --";
      const operation = execute(
        insert(maliciousTableName, { name: 'Test' })
      );

      try {
        await operation(baseState);
        expect.fail('Should have thrown validation error');
      } catch (error) {
        expect(error.message).to.include('Invalid SQL identifier');
      }
    });

    it('should validate column names for SQL injection', async () => {
      const maliciousRecord = {
        'id; DROP TABLE users; --': 1,
        'name': 'test'
      };

      const operation = execute(
        query('CREATE TABLE users (id INTEGER, name VARCHAR(100))'),
        insert('users', maliciousRecord)
      );

      try {
        await operation(baseState);
        expect.fail('Should have thrown validation error');
      } catch (error) {
        expect(error.message).to.include('Invalid SQL identifier');
      }
    });

    it('should handle empty array gracefully', async () => {
      const operation = execute(
        insert('users', [])
      );
      const result = await operation(baseState);

      // Should return consistent data structure with zero counts
      expect(result.data).to.deep.equal({ recordsInserted: 0, batches: 0 });
    });

    it('should automatically batch large inserts using default batch size', async () => {
      // Generate 2500 records to exceed default batch size of 1000
      const largeDataset = Array.from({ length: 2500 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        age: 20 + (i % 50)
      }));

      const operation = execute(
        query('CREATE TABLE users (id INTEGER, name VARCHAR(100), age INTEGER)'),
        insert('users', largeDataset)
      );
      const result = await operation(baseState);

      // Verify all records were inserted
      expect(result.data.recordsInserted).to.equal(2500);
      // Verify batching occurred: 2500 / 1000 = 3 batches (1000, 1000, 500)
      expect(result.data.batches).to.equal(3);
    });

    it('should respect custom batch size', async () => {
      const records = Array.from({ length: 150 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`
      }));

      const operation = execute(
        query('CREATE TABLE users (id INTEGER, name VARCHAR(100))'),
        insert('users', records, { batchSize: 50 })
      );
      const result = await operation(baseState);

      expect(result.data.recordsInserted).to.equal(150);
      expect(result.data.batches).to.equal(3); // 3 batches of 50 each
    });
  });

  describe('Integration scenarios', () => {
    it('should handle complete workflow with state flowing through operations', async () => {
      const workflow = execute(
        // Create table
        query('CREATE TABLE workflow_test (id INTEGER, name VARCHAR(100), processed BOOLEAN)'),

        // Insert initial data
        insert('workflow_test', { id: 1, name: 'Initial', processed: false }),

        // Query to verify insert
        query('SELECT * FROM workflow_test'),

        // Use query results in next operation
        state => {
          expect(state.data).to.be.an('array');
          expect(state.data[0].name).to.equal('Initial');
          return state;
        },

        // Update based on state (using raw SQL for now since we don't have update function)
        query('UPDATE workflow_test SET processed = true WHERE id = 1'),

        // Verify update
        query('SELECT * FROM workflow_test WHERE processed = true')
      );

      const result = await workflow(baseState);
      expect(result.data).to.be.an('array');
      expect(result.data.length).to.equal(1);
    });

    it('should chain operations using state data', async () => {
      const workflow = execute(
        // Set config data in a persistent location
        state => ({
          ...state,
          config: {
            tableName: 'chained_test',
            records: [
              { id: 1, value: 'First' },
              { id: 2, value: 'Second' }
            ]
          }
        }),

        // Create table using state
        query(state => `CREATE TABLE ${state.config.tableName} (id INTEGER, value VARCHAR(100))`),

        // Insert using state
        insert(
          state => state.config.tableName,
          state => state.config.records
        ),

        // Query using state
        query(state => `SELECT COUNT(*) as total FROM ${state.config.tableName}`)
      );

      const result = await workflow(baseState);
      expect(result.data[0].total).to.equal(2);
    });
  });

  describe('Error handling', () => {
    it('should handle database connection errors gracefully', async () => {
      const invalidConfigState = {
        configuration: {
          token: '',
          testMode: false // Force real connection attempt
        },
        data: null,
        references: []
      };

      const operation = execute(
        query('SELECT 1')
      );

      try {
        await operation(invalidConfigState);
        expect.fail('Should have thrown connection error');
      } catch (error) {
        expect(error.message).to.include('token');
      }
    });

    it('should handle invalid SQL syntax errors', async () => {
      const operation = execute(
        query('SELECT FROM WHERE INVALID')
      );

      try {
        await operation(baseState);
        expect.fail('Should have thrown SQL syntax error');
      } catch (error) {
        expect(error.message).to.include('MotherDuck query failed');
        // Error should include details about the syntax problem
        expect(error.message).to.match(/syntax|parser|invalid/i);
      }
    });

    it('should handle errors within operation chain', async () => {
      const operation = execute(
        query('SELECT 1'),
        () => {
          throw new Error('Custom error in chain');
        }
      );

      try {
        await operation(baseState);
        expect.fail('Should have thrown custom error');
      } catch (error) {
        expect(error.message).to.equal('Custom error in chain');
      }
    });

    it('should provide helpful error messages for missing connection', async () => {
      // Try to use query outside of execute block (no connection)
      const standaloneQuery = query('SELECT 1');

      try {
        await standaloneQuery(baseState);
        expect.fail('Should have thrown error about missing connection');
      } catch (error) {
        expect(error.message).to.include('No active MotherDuck connection');
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
          const operation = execute(
            insert(maliciousTable, { name: 'test' })
          );
          await operation(baseState);
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
          const operation = execute(
            query('CREATE TABLE users (id INTEGER)'),
            insert('users', maliciousRecord)
          );
          await operation(baseState);
          expect.fail(`Should have rejected malicious column: ${JSON.stringify(maliciousRecord)}`);
        } catch (error) {
          expect(error.message).to.include('Invalid SQL identifier');
        }
      }
    });

    it('should properly escape string values to prevent injection', async () => {
      const dangerousStrings = [
        "O'Malley",
        "User'; DROP TABLE users; --",
        'User" OR "1"="1',
        "Multi\nLine\tString"
      ];

      for (const dangerousString of dangerousStrings) {
        const operation = execute(
          query('CREATE TABLE users (name VARCHAR(255))'),
          insert('users', { name: dangerousString })
        );
        const result = await operation(baseState);

        expect(result.data.recordsInserted).to.equal(1);
      }
    });
  });

  describe('Configuration validation', () => {
    it('should require token for non-test mode', async () => {
      const emptyConfigState = {
        configuration: {
          testMode: false
        },
        data: null,
        references: []
      };

      const operation = execute(query('SELECT 1'));

      try {
        await operation(emptyConfigState);
        expect.fail('Should have thrown error for missing token');
      } catch (error) {
        expect(error.message).to.include('token');
      }
    });

    it('should use default database name when not specified', async () => {
      const minimalConfig = {
        configuration: {
          token: 'test_token',
          testMode: true
          // No database specified - should use default 'my_db'
        },
        data: null,
        references: []
      };

      const operation = execute(
        query('SELECT current_database() as db_name')
      );

      const result = await operation(minimalConfig);
      expect(result.data).to.be.an('array');
      // Should use the default database name
      expect(result.data[0].db_name).to.equal('my_db');
    });
  });
});
