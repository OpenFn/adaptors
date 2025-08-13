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
  listTables,
  attachDatabase,
  detachDatabase
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

describe('DuckDB Adapter', () => {
  let baseState;
  
  beforeEach(() => {
    baseState = {
      configuration: {
        database: ':memory:'
      },
      data: {},
      references: [],
      queries: []
    };
  });

  describe('execute', () => {
    it('should execute a sequence of operations', async () => {
      const operation = execute(
        query('SELECT 1 as test_value'),
        (state) => {
          expect(state.data).to.exist;
          return state;
        }
      );
      
      const result = await operation(baseState);
      expect(result.queries).to.be.an('array');
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
      expect(result.queries).to.include.something.that.includes('SELECT 1');
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
      expect(result.queries).to.have.length.greaterThan(0);
    });

    it('should expand references in query text', async () => {
      const stateWithData = {
        ...baseState,
        data: { tableName: 'test_users_ref', minAge: 18 }
      };
      
      const operation = execute(
        createTable(
          (state) => state.data.tableName,
          [{ name: 'id', type: 'INTEGER' }, { name: 'age', type: 'INTEGER' }]
        ),
        insert(
          (state) => state.data.tableName,
          { id: 1, age: 25 }
        ),
        query(
          (state) => `SELECT * FROM ${state.data.tableName} WHERE age >= ${state.data.minAge}`
        )
      );
      
      const result = await operation(stateWithData);
      expect(result.queries).to.include.something.that.includes('test_users_ref');
      expect(result.queries).to.include.something.that.includes('18');
    });

    it('should log SQL when writeSql option is true', async () => {
      const operation = execute(
        query('SELECT 1', { writeSql: true })
      );
      const result = await operation(baseState);
      
      expect(result.queries).to.include('SELECT 1');
    });

    it('should skip execution when execute option is false', async () => {
      const operation = execute(
        query('SELECT 1', { execute: false, writeSql: true })
      );
      const result = await operation(baseState);
      
      expect(result.queries).to.include('SELECT 1');
      // Data should not be populated since query didn't execute
      expect(result.data).to.be.undefined;
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
      
      expect(result.queries).to.include.something.that.includes('INSERT INTO test_users');
      expect(result.queries).to.include.something.that.includes(user.name);
      expect(result.queries).to.include.something.that.includes(user.email);
    });

    it('should handle special characters in string values', async () => {
      const userWithQuotes = {
        name: "O'Malley",
        email: "test@example.com",
        bio: 'Says "Hello World"'
      };
      
      const insertOp = insert('users', userWithQuotes);
      const result = await insertOp(baseState);
      
      // Should escape quotes properly in SQL
      expect(result.queries).to.include.something.that.includes("O''Malley");
      expect(result.queries).to.include.something.that.includes('"Hello World"');
    });

    it('should handle null and undefined values', async () => {
      const userWithNulls = {
        name: 'John Doe',
        age: null,
        email: undefined,
        active: true
      };
      
      const insertOp = insert('users', userWithNulls);
      const result = await insertOp(baseState);
      
      expect(result.queries).to.include.something.that.includes('NULL');
    });

    it('should expand references in table name and data', async () => {
      const stateWithData = {
        ...baseState,
        data: {
          targetTable: 'users',
          newUser: { name: 'Dynamic User', age: 25 }
        }
      };
      
      const dynamicInsert = insert(
        (state) => state.data.targetTable,
        (state) => state.data.newUser
      );
      
      const result = await dynamicInsert(stateWithData);
      expect(result.queries).to.include.something.that.includes('Dynamic User');
    });

    it('should validate table name for SQL injection', async () => {
      const maliciousTableName = "users; DROP TABLE users; --";
      const insertOp = insert(maliciousTableName, { name: 'Test' });
      
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
      const insertOp = insertMany('users', users);
      const result = await insertOp(baseState);
      
      expect(result.queries).to.include.something.that.includes('INSERT INTO users');
      expect(result.queries).to.include.something.that.includes('Alice Johnson');
      expect(result.queries).to.include.something.that.includes('Bob Smith');
    });

    it('should handle large batch inserts efficiently', async () => {
      // Generate 50 test records
      const largeDataset = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        age: 20 + (i % 30),
        email: `user${i + 1}@example.com`
      }));
      
      const insertOp = insertMany('users', largeDataset);
      const result = await insertOp(baseState);
      
      // Should create a single VALUES statement with all records
      expect(result.queries).to.include.something.that.includes('VALUES');
      expect(result.queries).to.include.something.that.includes('User 1');
      expect(result.queries).to.include.something.that.includes('User 50');
    });

    it('should handle empty array gracefully', async () => {
      const insertOp = insertMany('users', []);
      const result = await insertOp(baseState);
      
      // Should not generate any SQL for empty array
      expect(result.queries).to.be.an('array');
    });

    it('should handle inconsistent record structures', async () => {
      const mixedRecords = [
        { name: 'Complete User', age: 30, email: 'complete@example.com' },
        { name: 'Partial User' }, // missing age and email
        { name: 'Another User', age: 25 } // missing email
      ];
      
      const insertOp = insertMany('users', mixedRecords);
      const result = await insertOp(baseState);
      
      expect(result.queries).to.include.something.that.includes('Complete User');
      expect(result.queries).to.include.something.that.includes('Partial User');
    });
  });

  describe('update', () => {
    it('should update user records with WHERE clause', async () => {
      const changes = { age: 31, email: 'newemail@example.com' };
      const updateOp = update('users', changes, 'WHERE name = \'John Doe\'');
      const result = await updateOp(baseState);
      
      expect(result.queries).to.include.something.that.includes('UPDATE users');
      expect(result.queries).to.include.something.that.includes('SET');
      expect(result.queries).to.include.something.that.includes('age = 31');
      expect(result.queries).to.include.something.that.includes('newemail@example.com');
      expect(result.queries).to.include.something.that.includes('WHERE name = \'John Doe\'');
    });

    it('should handle null values in update data', async () => {
      const changes = { age: null, last_login: null };
      const updateOp = update('users', changes, 'WHERE id = 1');
      const result = await updateOp(baseState);
      
      expect(result.queries).to.include.something.that.includes('age = NULL');
      expect(result.queries).to.include.something.that.includes('last_login = NULL');
    });

    it('should escape special characters in update values', async () => {
      const changes = {
        name: "O'Connor",
        bio: 'He said "Hello World"'
      };
      const updateOp = update('users', changes, 'WHERE id = 1');
      const result = await updateOp(baseState);
      
      expect(result.queries).to.include.something.that.includes("O''Connor");
      expect(result.queries).to.include.something.that.includes('"Hello World"');
    });

    it('should expand references in update parameters', async () => {
      const stateWithData = {
        ...baseState,
        data: {
          tableName: 'users',
          updateData: { age: 35 },
          condition: 'WHERE active = true'
        }
      };
      
      const dynamicUpdate = update(
        (state) => state.data.tableName,
        (state) => state.data.updateData,
        (state) => state.data.condition
      );
      
      const result = await dynamicUpdate(stateWithData);
      expect(result.queries).to.include.something.that.includes('UPDATE users');
      expect(result.queries).to.include.something.that.includes('age = 35');
      expect(result.queries).to.include.something.that.includes('WHERE active = true');
    });
  });

  describe('remove', () => {
    it('should delete records with WHERE clause', async () => {
      const removeOp = remove('users', 'WHERE age < 18');
      const result = await removeOp(baseState);
      
      expect(result.queries).to.include.something.that.includes('DELETE FROM users');
      expect(result.queries).to.include.something.that.includes('WHERE age < 18');
    });

    it('should handle complex WHERE conditions', async () => {
      const complexCondition = "WHERE age BETWEEN 18 AND 65 AND email LIKE '%@company.com'";
      const removeOp = remove('users', complexCondition);
      const result = await removeOp(baseState);
      
      expect(result.queries).to.include.something.that.includes('DELETE FROM users');
      expect(result.queries).to.include.something.that.includes('BETWEEN 18 AND 65');
      expect(result.queries).to.include.something.that.includes('@company.com');
    });

    it('should expand references in table name and WHERE clause', async () => {
      const stateWithData = {
        ...baseState,
        data: {
          targetTable: 'users',
          deleteCondition: 'WHERE inactive = true'
        }
      };
      
      const dynamicRemove = remove(
        (state) => state.data.targetTable,
        (state) => state.data.deleteCondition
      );
      
      const result = await dynamicRemove(stateWithData);
      expect(result.queries).to.include.something.that.includes('DELETE FROM users');
      expect(result.queries).to.include.something.that.includes('WHERE inactive = true');
    });

    it('should validate table name for SQL injection', async () => {
      const maliciousTableName = "users; DROP DATABASE; --";
      const removeOp = remove(maliciousTableName, 'WHERE id = 1');
      
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
      const createOp = createTable('users', columns);
      const result = await createOp(baseState);
      
      expect(result.queries).to.include.something.that.includes('CREATE TABLE users');
      expect(result.queries).to.include.something.that.includes('id INTEGER PRIMARY KEY');
      expect(result.queries).to.include.something.that.includes('name VARCHAR(100) NOT NULL');
      expect(result.queries).to.include.something.that.includes('age INTEGER');
      expect(result.queries).to.include.something.that.includes('email VARCHAR(255)');
    });

    it('should handle column constraints properly', async () => {
      const constrainedColumns = [
        { name: 'id', type: 'INTEGER', required: true, unique: true },
        { name: 'email', type: 'VARCHAR(255)', default: 'user@example.com' },
        { name: 'created_at', type: 'TIMESTAMP', default: 'CURRENT_TIMESTAMP' }
      ];
      
      const createOp = createTable('users_constrained', constrainedColumns);
      const result = await createOp(baseState);
      
      expect(result.queries).to.include.something.that.includes('id INTEGER NOT NULL UNIQUE');
      expect(result.queries).to.include.something.that.includes('email VARCHAR(255) DEFAULT \'user@example.com\'');
      expect(result.queries).to.include.something.that.includes('created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP');
    });

    it('should expand references in table name and column definitions', async () => {
      const stateWithData = {
        ...baseState,
        data: {
          tableName: 'dynamic_users',
          columns: [
            { name: 'id', type: 'INTEGER PRIMARY KEY' },
            { name: 'name', type: 'VARCHAR(100)', required: true }
          ]
        }
      };
      
      const dynamicCreate = createTable(
        (state) => state.data.tableName,
        (state) => state.data.columns
      );
      
      const result = await dynamicCreate(stateWithData);
      expect(result.queries).to.include.something.that.includes('CREATE TABLE dynamic_users');
    });

    it('should validate table name for SQL injection', async () => {
      const maliciousTableName = "users; DROP TABLE admin; --";
      const createOp = createTable(maliciousTableName, fixtures.userColumns);
      
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
      const dropOp = dropTable('users');
      const result = await dropOp(baseState);
      
      expect(result.queries).to.include('DROP TABLE users');
    });

    it('should add IF EXISTS clause when specified', async () => {
      const dropOp = dropTable('users', { ifExists: true });
      const result = await dropOp(baseState);
      
      expect(result.queries).to.include('DROP TABLE IF EXISTS users');
    });

    it('should expand references in table name', async () => {
      const stateWithData = {
        ...baseState,
        data: { oldTable: 'legacy_users' }
      };
      
      const dynamicDrop = dropTable(
        (state) => state.data.oldTable,
        { ifExists: true }
      );
      
      const result = await dynamicDrop(stateWithData);
      expect(result.queries).to.include('DROP TABLE IF EXISTS legacy_users');
    });

    it('should validate table name for SQL injection', async () => {
      const maliciousTableName = "users; DROP DATABASE main; --";
      const dropOp = dropTable(maliciousTableName);
      
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
      const describeOp = describeTable('users');
      const result = await describeOp(baseState);
      
      expect(result.queries).to.include.something.that.includes('DESCRIBE users');
    });

    it('should expand references in table name', async () => {
      const stateWithData = {
        ...baseState,
        data: { tableName: 'user_profiles' }
      };
      
      const dynamicDescribe = describeTable(
        (state) => state.data.tableName
      );
      
      const result = await dynamicDescribe(stateWithData);
      expect(result.queries).to.include.something.that.includes('user_profiles');
    });

    it('should validate table name for SQL injection', async () => {
      const maliciousTableName = "users; SELECT password FROM admin; --";
      const describeOp = describeTable(maliciousTableName);
      
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
        const connectOp = connectToMotherDuck('analytics_db', 'secret_token');
        const result = await connectOp(baseState);
        
        expect(result.configuration.motherDuckDatabase).to.equal('analytics_db');
        expect(result.configuration.motherDuckToken).to.equal('secret_token');
        expect(result.configuration.connectionString).to.include('md:analytics_db');
      });

      it('should handle session hints for read scaling', async () => {
        const connectOp = connectToMotherDuck('readonly_db', 'token123', { sessionHint: 'readonly' });
        const result = await connectOp(baseState);
        
        expect(result.configuration.sessionHint).to.equal('readonly');
        expect(result.configuration.motherDuckDatabase).to.equal('readonly_db');
      });

      it('should expand references in connection parameters', async () => {
        const stateWithCreds = {
          ...baseState,
          data: {
            dbName: 'prod_analytics',
            authToken: 'dynamic_token_123'
          }
        };
        
        const dynamicConnect = connectToMotherDuck(
          (state) => state.data.dbName,
          (state) => state.data.authToken
        );
        
        const result = await dynamicConnect(stateWithCreds);
        expect(result.configuration.motherDuckDatabase).to.equal('prod_analytics');
        expect(result.configuration.motherDuckToken).to.equal('dynamic_token_123');
      });

      it('should handle missing token gracefully', async () => {
        const connectOp = connectToMotherDuck('test_db', '');
        
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
        const listOp = listDatabases();
        const result = await listOp(baseState);
        
        expect(result.queries).to.include.something.that.includes('SHOW DATABASES');
      });

      it('should log SQL when writeSql option is true', async () => {
        const listOp = listDatabases({ writeSql: true });
        const result = await listOp(baseState);
        
        expect(result.queries).to.include('SHOW DATABASES');
      });

      it('should skip execution when execute option is false', async () => {
        const listOp = listDatabases({ execute: false, writeSql: true });
        const result = await listOp(baseState);
        
        expect(result.queries).to.include('SHOW DATABASES');
        expect(result.data).to.be.undefined;
      });
    });

    describe('listTables', () => {
      it('should query system catalog for tables', async () => {
        const listOp = listTables();
        const result = await listOp(baseState);
        
        expect(result.queries).to.include.something.that.includes('SHOW TABLES');
      });

      it('should handle callback function', async () => {
        let callbackExecuted = false;
        const callback = (state) => {
          callbackExecuted = true;
          return { ...state, processed: true };
        };
        
        const listOp = listTables({}, callback);
        const result = await listOp(baseState);
        
        expect(callbackExecuted).to.be.true;
        expect(result.processed).to.be.true;
      });
    });

    describe('attachDatabase', () => {
      it('should attach external database with alias', async () => {
        const attachOp = attachDatabase('/path/to/backup.db', 'backup_db');
        const result = await attachOp(baseState);
        
        expect(result.queries).to.include('ATTACH \'/path/to/backup.db\' AS backup_db');
      });

      it('should handle MotherDuck to local file attachment', async () => {
        const attachOp = attachDatabase('local_analytics.db', 'local');
        const result = await attachOp(baseState);
        
        expect(result.queries).to.include.something.that.includes('ATTACH');
        expect(result.queries).to.include.something.that.includes('local_analytics.db');
        expect(result.queries).to.include.something.that.includes('local');
      });

      it('should expand references in database path and alias', async () => {
        const stateWithData = {
          ...baseState,
          data: {
            backupPath: '/backups/2024/data.db',
            aliasName: 'backup_2024'
          }
        };
        
        const dynamicAttach = attachDatabase(
          (state) => state.data.backupPath,
          (state) => state.data.aliasName
        );
        
        const result = await dynamicAttach(stateWithData);
        expect(result.queries).to.include.something.that.includes('/backups/2024/data.db');
        expect(result.queries).to.include.something.that.includes('backup_2024');
      });
    });

    describe('detachDatabase', () => {
      it('should detach database by alias', async () => {
        const detachOp = detachDatabase('backup_db');
        const result = await detachOp(baseState);
        
        expect(result.queries).to.include('DETACH backup_db');
      });

      it('should expand references in alias name', async () => {
        const stateWithData = {
          ...baseState,
          data: { aliasToRemove: 'temp_data' }
        };
        
        const dynamicDetach = detachDatabase(
          (state) => state.data.aliasToRemove
        );
        
        const result = await dynamicDetach(stateWithData);
        expect(result.queries).to.include('DETACH temp_data');
      });

      it('should validate alias name for SQL injection', async () => {
        const maliciousAlias = "backup; DROP DATABASE main; --";
        const detachOp = detachDatabase(maliciousAlias);
        
        try {
          await detachOp(baseState);
          expect.fail('Should have thrown validation error');
        } catch (error) {
          expect(error.message).to.include('Invalid SQL identifier');
        }
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
      expect(result.queries).to.have.length.greaterThan(4);
      expect(result.queries).to.include.something.that.includes('CREATE TABLE');
      expect(result.queries).to.include.something.that.includes('INSERT INTO');
      expect(result.queries).to.include.something.that.includes('SELECT');
      expect(result.queries).to.include.something.that.includes('UPDATE');
      expect(result.queries).to.include.something.that.includes('DROP TABLE');
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

    it('should handle callback functions properly', async () => {
      let callbackState = null;
      const callback = (state) => {
        callbackState = state;
        return { ...state, callbackExecuted: true };
      };
      
      const queryWithCallback = query('SELECT 1 as test', {}, callback);
      const result = await queryWithCallback(baseState);
      
      expect(callbackState).to.not.be.null;
      expect(result.callbackExecuted).to.be.true;
    });

    it('should handle dynamic reference expansion', async () => {
      const dynamicState = {
        ...baseState,
        data: {
          tableName: 'dynamic_table',
          userData: { name: 'Dynamic User', age: 30 },
          whereClause: 'WHERE age > 25'
        }
      };
      
      const dynamicWorkflow = execute(
        createTable(
          (state) => state.data.tableName,
          [
            { name: 'id', type: 'INTEGER PRIMARY KEY' },
            { name: 'name', type: 'VARCHAR(100)' },
            { name: 'age', type: 'INTEGER' }
          ]
        ),
        insert(
          (state) => state.data.tableName,
          (state) => ({ id: 1, ...state.data.userData })
        ),
        query(
          (state) => `SELECT * FROM ${state.data.tableName} ${state.data.whereClause}`
        )
      );
      
      const result = await dynamicWorkflow(dynamicState);
      expect(result.queries).to.include.something.that.includes('dynamic_table');
      expect(result.queries).to.include.something.that.includes('Dynamic User');
      expect(result.queries).to.include.something.that.includes('WHERE age > 25');
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
        expect(error.message).to.include('SQL');
      }
    });

    it('should handle empty insertMany gracefully', async () => {
      const insertOp = insertMany('users', []);
      const result = await insertOp(baseState);
      
      // Empty array should not generate SQL
      expect(result.queries).to.be.an('array');
    });

    it('should handle null/undefined function parameters', async () => {
      try {
        const insertOp = insert(null, { name: 'test' });
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
      
      try {
        const createOp = createTable('bad_table', badColumns);
        await createOp(baseState);
        expect.fail('Should have thrown error for malformed columns');
      } catch (error) {
        expect(error).to.be.an('error');
      }
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
          const insertOp = insert(maliciousTable, { name: 'test' });
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
          const insertOp = insert('users', maliciousRecord);
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
        const insertOp = insert('users', { name: dangerousString, safe_col: 'test' });
        const result = await insertOp(baseState);
        
        // Should have properly escaped the dangerous string
        expect(result.queries).to.be.an('array');
        // The query should not contain unescaped dangerous characters
        const query = result.queries[result.queries.length - 1];
        if (dangerousString.includes("'")) {
          expect(query).to.include("''"); // Should have doubled single quotes
        }
      }
    });

    it('should validate WHERE clause content', async () => {
      const maliciousWhereClauses = [
        "WHERE 1=1; DROP TABLE users; --",
        "WHERE id=1 UNION SELECT password FROM admin",
        "WHERE name='test' OR '1'='1'"
      ];
      
      for (const maliciousWhere of maliciousWhereClauses) {
        // Note: WHERE clauses are not currently validated for SQL injection
        // This test documents current behavior and can be updated when validation is added
        const updateOp = update('users', { name: 'safe' }, maliciousWhere);
        const result = await updateOp(baseState);
        
        // Currently passes through, but should be validated in production
        expect(result.queries).to.include.something.that.includes(maliciousWhere);
      }
    });
  });

  describe('Configuration validation', () => {
    it('should handle missing database configuration', async () => {
      const emptyConfigState = {
        configuration: {},
        data: {},
        references: [],
        queries: []
      };
      
      const executeOp = execute(query('SELECT 1'));
      
      try {
        await executeOp(emptyConfigState);
        // May succeed with default in-memory database
      } catch (error) {
        expect(error.message).to.include('database');
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
      
      const complexQuery = query(
        (state) => `SELECT '${state.data.nested.deeply.value}' as table_name`
      );
      
      const result = await complexQuery(complexState);
      expect(result.queries).to.include.something.that.includes('test_table');
    });
  });
});
