import sql from 'mssql';
import * as adaptor from '../src/Adaptor';

describe('MSSQL Adaptor', () => {
  let connection;
  let state;

  beforeAll(async () => {
    // Create a real connection pool for testing
    const config = {
      user: process.env.MSSQL_TEST_USER || 'sa',
      password: process.env.MSSQL_TEST_PASSWORD || 'YourStrong!Passw0rd',
      server: process.env.MSSQL_TEST_SERVER || 'localhost',
      database: process.env.MSSQL_TEST_DATABASE || 'test_db',
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    };

    // Create connection pool
    connection = await sql.connect(config);

    // Create test tables
    await connection.request().query(`
      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'users')
      CREATE TABLE users (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INT,
        email VARCHAR(255) UNIQUE
      )
    `);

    // Initialize state object
    state = {
      connection,
      configuration: config,
      references: [],
      data: null,
      queries: [],
    };
  });

  afterAll(async () => {
    // Clean up test tables
    await connection.request().query(`
      IF EXISTS (SELECT * FROM sys.tables WHERE name = 'users')
      DROP TABLE users
    `);

    // Close connection
    await connection.close();
  });

  beforeEach(async () => {
    // Clear test data before each test
    await connection.request().query('DELETE FROM users');
  });

  describe('findValue', () => {
    it('should find a value with simple condition', async () => {
      // Insert test data
      await connection.request().query(`
        INSERT INTO users (name, age) VALUES ('John', 30)
      `);

      const filter = {
        uuid: 'id',
        relation: 'users',
        where: { name: 'John' },
      };

      const result = await adaptor.findValue(filter)(state);
      expect(result).toBe(1); // First record gets ID 1
    });

    it('should handle multiple conditions', async () => {
      // Insert test data
      await connection.request().query(`
        INSERT INTO users (name, age) VALUES ('John', 30)
      `);

      const filter = {
        uuid: 'id',
        relation: 'users',
        where: { name: 'John', age: 30 },
        operator: { name: 'like', age: '=' },
      };

      const result = await adaptor.findValue(filter)(state);
      expect(result).toBe(1);
    });
  });

  describe('insert', () => {
    it('should insert a single record', async () => {
      const table = 'users';
      const record = { name: 'John', age: 30 };
      const options = { logValues: true };

      const result = await adaptor.insert(table, record, options)(state);

      // Verify the insert
      const verify = await connection.request().query(`
        SELECT * FROM users WHERE name = 'John' AND age = 30
      `);

      expect(verify.recordset.length).toBe(1);
      expect(verify.recordset[0].name).toBe('John');
      expect(verify.recordset[0].age).toBe(30);
    });
  });

  describe('insertMany', () => {
    it('should insert multiple records', async () => {
      const table = 'users';
      const records = [
        { name: 'John', age: 30 },
        { name: 'Jane', age: 25 },
      ];
      const options = { logValues: true };

      const result = await adaptor.insertMany(table, records, options)(state);

      // Verify the inserts
      const verify = await connection.request().query(`
        SELECT * FROM users ORDER BY name
      `);

      expect(verify.recordset.length).toBe(2);
      expect(verify.recordset[0].name).toBe('Jane');
      expect(verify.recordset[1].name).toBe('John');
    });
  });

  describe('upsert', () => {
    it('should upsert a record', async () => {
      const table = 'users';
      const uuid = 'id';
      const record = { id: 1, name: 'John', age: 30 };
      const options = { logValues: true };

      // First insert
      await adaptor.upsert(table, uuid, record, options)(state);

      // Then update
      const updatedRecord = { id: 1, name: 'John Updated', age: 31 };
      await adaptor.upsert(table, uuid, updatedRecord, options)(state);

      // Verify the update
      const verify = await connection.request().query(`
        SELECT * FROM users WHERE id = 1
      `);

      expect(verify.recordset.length).toBe(1);
      expect(verify.recordset[0].name).toBe('John Updated');
      expect(verify.recordset[0].age).toBe(31);
    });
  });

  describe('describeTable', () => {
    it('should describe a table', async () => {
      const tableName = 'users';
      const options = { logValues: true };

      const result = await adaptor.describeTable(tableName, options)(state);

      expect(result).toContain('id');
      expect(result).toContain('name');
      expect(result).toContain('age');
      expect(result).toContain('email');
    });
  });

  describe('insertTable', () => {
    it('should create a table', async () => {
      const tableName = 'test_table';
      const columns = [
        {
          name: 'id',
          type: 'int',
          identity: true,
          required: true,
        },
        {
          name: 'name',
          type: 'varchar(255)',
          required: true,
        },
        {
          name: 'age',
          type: 'int',
        },
      ];
      const options = { logValues: true };

      await adaptor.insertTable(tableName, columns, options)(state);

      // Verify table creation
      const verify = await connection.request().query(`
        SELECT * FROM information_schema.columns 
        WHERE table_name = '${tableName}'
        ORDER BY ordinal_position
      `);

      expect(verify.recordset.length).toBe(3);

      // Clean up
      await connection.request().query(`DROP TABLE ${tableName}`);
    });
  });

  describe('modifyTable', () => {
    it('should modify a table', async () => {
      const tableName = 'test_table';

      // First create a table
      await connection.request().query(`
        CREATE TABLE ${tableName} (
          id INT IDENTITY(1,1) PRIMARY KEY,
          name VARCHAR(255) NOT NULL
        )
      `);

      const columns = [
        {
          name: 'email',
          type: 'varchar(255)',
          required: true,
          unique: true,
        },
      ];
      const options = { logValues: true };

      await adaptor.modifyTable(tableName, columns, options)(state);

      // Verify column addition
      const verify = await connection.request().query(`
        SELECT * FROM information_schema.columns 
        WHERE table_name = '${tableName}'
        ORDER BY ordinal_position
      `);

      expect(verify.recordset.length).toBe(3);
      expect(verify.recordset[2].column_name).toBe('email');

      // Clean up
      await connection.request().query(`DROP TABLE ${tableName}`);
    });
  });
});
