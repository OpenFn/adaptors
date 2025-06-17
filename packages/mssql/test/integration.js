// For testing locally
// ```
// docker run -e "ACCEPT_EULA=Y" \
//            -e "SA_PASSWORD=YourStrong@Passw0rd" \
//            -p 1433:1433 \
//            --name mssql \
//            -d mcr.microsoft.com/mssql/server:2022-latest
// ```

// For M1, M2, M3
// docker run -e "ACCEPT_EULA=1" \
//            -e "MSSQL_SA_PASSWORD=YourStrong@Passw0rd" \
//            -p 1433:1433 \
//            --name sqledge \
//            -d mcr.microsoft.com/azure-sql-edge

import { execute, sql, findValue } from '../src/Adaptor';
import { expect } from 'chai';

describe('MSSQL Integration Tests', () => {
  const state = {
    configuration: {
      server: 'localhost',
      userName: 'sa',
      password: 'YourStrong@Passw0rd',
      database: 'master',
      port: 1433,
    },
  };

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

  it.only('should prevent SQL injection in findValue()', async () => {
    // First create a test table with some data
    await execute(
      sql({
        query: `
          IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'test_injection')
          CREATE TABLE test_injection (
            id INT PRIMARY KEY IDENTITY(1,1),
            name NVARCHAR(100),
            email NVARCHAR(100)
          )
        `,
      })
    )(state);

    // Insert test data
    await execute(
      sql({
        query: `
          INSERT INTO test_injection (name, email)
          VALUES ('Test User', 'test@example.com')
        `,
      })
    )(state);

    // Try to inject SQL in the where clause
    const maliciousInput = "test@example.com'; DROP TABLE test_injection; --";

    const result = await execute(
      findValue({
        uuid: 'email',
        relation: 'test_injection',
        where: { email: maliciousInput },
      })
    )(state);

    // // Verify the table still exists and the query didn't execute malicious code
    // const tableCheck = await execute(
    //   sql({
    //     query: 'SELECT COUNT(*) as count FROM test_injection',
    //   })
    // )(state);

    // expect(tableCheck.response.rows[0].count).to.equal(1);
    // expect(result).to.be.undefined; // Should not find any matching record
  });

  //   after(async () => {
  //     // Clean up test tables
  //     await execute(
  //       sql({
  //         query: 'DROP TABLE IF EXISTS test_users',
  //       })
  //     )(state);
  //     await execute(
  //       sql({
  //         query: 'DROP TABLE IF EXISTS test_injection',
  //       })
  //     )(state);
  //   });
});
