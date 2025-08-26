// MSSQ DB for testing locally
// docker run -e "ACCEPT_EULA=Y" \
//            -e "SA_PASSWORD=YourStrong@Passw0rd" \
//            -p 1433:1433 \
//            --name mssql \
//            -d mcr.microsoft.com/mssql/server:2022-latest
// For Mac [M1, M2, M3]
// docker run -e "ACCEPT_EULA=1" \
//            -e "MSSQL_SA_PASSWORD=YourStrong@Passw0rd" \
//            -p 1433:1433 \
//            --name sqledge \
//            -d mcr.microsoft.com/azure-sql-edge

import { execute, sql, findValue, insert, insertMany } from '../src/Adaptor';
import { expect } from 'chai';

describe('MSSQL Integration Tests', () => {
  let state = {
    configuration: {
      server: 'localhost',
      userName: 'sa',
      password: 'YourStrong@Passw0rd',
      database: 'master',
      port: 1433,
    },
  };

  beforeEach(() => {
    // Reset state before each test
    state = {
      configuration: {
        server: 'localhost',
        userName: 'sa',
        password: 'YourStrong@Passw0rd',
        database: 'master',
        port: 1433,
      },
    };
  });

  it('should create a test table and seed data', async () => {
    // Create test table
    await execute(
      sql({
        query: `
          IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'test_users')
          CREATE TABLE test_users (
            id INT PRIMARY KEY IDENTITY(1,1),
            name NVARCHAR(100),
            email NVARCHAR(100),
            created_at DATETIME DEFAULT GETDATE()
          )
        `,
      })
    )(state);

    // Insert test data
    const insertResult = await execute(
      sql({
        query: `
          INSERT INTO test_users (name, email)
          VALUES 
            ('John Doe', 'john@example.com'),
            ('Jane Smith', 'jane@example.com'),
            ('Bob Johnson', 'bob@example.com')
        `,
      })
    )(state);

    // Verify data was inserted
    const selectResult = await execute(
      sql({
        query: 'SELECT * FROM test_users ORDER BY id',
      })
    )(state);

    expect(selectResult.response.rows).to.have.lengthOf(3);
    expect(selectResult.response.rows[0]).to.deep.include({
      name: 'John Doe',
      email: 'john@example.com',
    });
    expect(selectResult.response.rows[1]).to.deep.include({
      name: 'Jane Smith',
      email: 'jane@example.com',
    });
    expect(selectResult.response.rows[2]).to.deep.include({
      name: 'Bob Johnson',
      email: 'bob@example.com',
    });
  });

  it('should prevent SQL injection in findValue()', async () => {
    try {
      // First create a test table with some data
      await execute(
        sql({
          query: `
            IF EXISTS (SELECT * FROM sys.tables WHERE name = 'test_injection')
            DROP TABLE test_injection;
            
            CREATE TABLE test_injection (
              id INT PRIMARY KEY IDENTITY(1,1),
              name NVARCHAR(100),
              email NVARCHAR(100)
            );
          `,
        })
      )(state);

      // Insert test data
      await execute(
        sql({
          query: `
            INSERT INTO test_injection (name, email)
            VALUES 
              ('Test User', 'test@example.com'),
              ('Evil User', 'evil@example.com')
          `,
        })
      )(state);

      // Get initial table state
      const initialCheck = await execute(
        sql({
          query: 'SELECT COUNT(*) as count FROM test_injection',
        })
      )(state);
      expect(initialCheck.response.rows[0].count).to.equal(2);

      // Try to inject SQL in the where clause
      const maliciousInput = "test@example.com'; DROP TABLE test_injection; --";
      console.log('Attempting malicious query...');

      // Test the malicious query
      const result = await execute(
        findValue({
          uuid: 'id',
          relation: 'test_injection',
          where: { email: maliciousInput },
        })
      )(state);

      console.log('Malicious query completed, checking table state...');

      // Verify the table still exists and has the correct data
      const tableCheck = await execute(
        sql({
          query: 'SELECT COUNT(*) as count FROM test_injection',
        })
      )(state);

      expect(tableCheck.response.rows[0].count).to.equal(2);
      expect(result).to.be.undefined; // Should not find any matching record

      // Verify legitimate query still works
      const legitResult = await execute(
        findValue({
          uuid: 'id',
          relation: 'test_injection',
          where: { email: 'test@example.com' },
        })
      )(state);

      expect(legitResult).to.equal(1); // Should find the first record
    } catch (error) {
      console.error('Test error:', error);
      // Attempt to verify table state even if test fails
      try {
        const finalCheck = await execute(
          sql({
            query: 'SELECT COUNT(*) as count FROM test_injection',
          })
        )(state);
        console.log('Final table state:', finalCheck.response.rows[0].count);
      } catch (e) {
        console.error('Could not check final table state:', e.message);
      }
      throw error;
    }
  });
  it('should insert a record', async () => {
    const result = await execute(
      insert('test_users', { name: 'John Doe', email: 'john@example.com' })
    )(state);
    expect(result).to.equal(1);
  });
  it('should insert multiple records', async () => {
    const result = await execute(
      insertMany('test_users', [
        { name: 'John Doe', email: 'john@example.com' },
        { name: 'Jane Smith', email: 'jane@example.com' },
      ])
    )(state);
    expect(result).to.equal(2);
  });

  after(async () => {
    try {
      // Clean up test tables
      await execute(
        sql({
          query: `
            DROP TABLE IF EXISTS test_users;
            DROP TABLE IF EXISTS test_injection;
          `,
        })
      )(state);
    } catch (error) {
      console.error('Cleanup error:', error);
    }
  });
});
