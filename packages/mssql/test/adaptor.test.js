import {
  execute,
  query,
  insert,
  insertMany,
  upsert,
  findValue,
} from '../src/Adaptor';
import mssql from 'mssql';
import { expect } from 'chai';

// Minimal stub implementation
const createStub = () => {
  const stub = function () {
    stub.calls.push(Array.from(arguments));
    return stub.returnValue;
  };
  stub.calls = [];
  stub.returnValue = undefined;
  stub.resolves = value => {
    stub.returnValue = Promise.resolve(value);
    return stub;
  };
  stub.returns = value => {
    stub.returnValue = value;
    return stub;
  };
  return stub;
};

const createSandbox = () => {
  const stubs = new Set();
  return {
    stub: (obj, method) => {
      const original = obj[method];
      const stub = createStub();
      obj[method] = stub;
      stubs.add({ obj, method, original });
      return stub;
    },
    restore: () => {
      stubs.forEach(({ obj, method, original }) => {
        obj[method] = original;
      });
      stubs.clear();
    },
  };
};

describe('MSSQL Adaptor', () => {
  let mockConnection;
  let mockRequest;
  let mockPool;
  let sandbox;

  beforeEach(() => {
    // Create a new sandbox for each test
    sandbox = createSandbox();

    // Setup mock request
    mockRequest = {
      query: createStub().resolves({ recordset: [] }),
      input: createStub(),
    };

    // Setup mock connection
    mockConnection = {
      request: createStub().returns(mockRequest),
      close: createStub(),
    };

    // Setup mock pool
    mockPool = {
      connect: createStub().resolves(mockConnection),
      close: createStub(),
      request: createStub().returns(mockRequest),
    };

    // Mock mssql.connect to return our mock pool
    sandbox.stub(mssql, 'connect').resolves(mockPool);
  });

  afterEach(() => {
    // Restore all stubs
    sandbox.restore();
  });

  describe('query', () => {
    it.only('should execute a simple query successfully', async () => {
      const mockResult = {
        recordset: [{ id: 1, name: 'Test' }],
      };
      mockRequest.query.resolves(mockResult);

      const state = {
        configuration: {
          server: 'test-server',
          database: 'test-db',
          user: 'test-user',
          password: 'test-password',
        },
      };

      const sqlStatement = 'SELECT * FROM users';
      const { response } = await execute(query(sqlStatement))(state);
      expect(response.body.rows).to.deep.equal(mockResult.recordset);
    });

    it.skip('should handle SQL injection attempts', async () => {
      const state = {
        configuration: {
          server: 'test-server',
          database: 'test-db',
          user: 'test-user',
          password: 'test-password',
        },
      };

      // Test with malicious input
      const maliciousInput = "'; DROP TABLE users; --";
      const sqlStatement = `SELECT * FROM users WHERE name = '${maliciousInput}'`;

      // The query should be parameterized and safe
      const { response } = await execute(query(sqlStatement))(state);

      console.log('Mock request calls:', mockRequest.query.calls);
      console.log('Response:', response);

      // Verify that the query was executed with proper parameterization
      expect(mockRequest.input).to.have.been.calledWith('name', maliciousInput);
      expect(mockRequest.query).to.have.been.calledWith(
        'SELECT * FROM users WHERE name = @name'
      );
    });
  });

  describe('insert function', () => {
    it('should insert a record successfully', async () => {
      const mockResult = {
        rowsAffected: [1],
      };
      mockRequest.query.resolves(mockResult);

      const state = {
        configuration: {
          server: 'test-server',
          database: 'test-db',
          user: 'test-user',
          password: 'test-password',
        },
      };

      const table = 'users';
      const record = {
        name: 'John Doe',
        email: 'john@example.com',
      };

      const result = await execute(insert(table, record))(state);

      expect(mockRequest.query).to.have.been.called;
      expect(result.data).to.be.defined;
    });

    it('should prevent SQL injection in insert', async () => {
      const state = {
        configuration: {
          server: 'test-server',
          database: 'test-db',
          user: 'test-user',
          password: 'test-password',
        },
      };

      const table = 'users';
      const maliciousRecord = {
        name: "'; DROP TABLE users; --",
        email: "'; DELETE FROM users; --",
      };

      await execute(insert(table, maliciousRecord))(state);

      // Verify that the query was executed with proper parameterization
      expect(mockRequest.input).to.have.been.called;
      expect(mockRequest.query).to.have.been.called;
    });
  });

  describe('findValue function', () => {
    it('should find a value successfully', async () => {
      const mockResult = {
        recordset: [{ id: 123 }],
      };
      mockRequest.query.resolves(mockResult);

      const state = {
        configuration: {
          server: 'test-server',
          database: 'test-db',
          user: 'test-user',
          password: 'test-password',
        },
      };

      const filter = {
        uuid: 'id',
        relation: 'users',
        where: { name: 'John Doe' },
      };

      const result = await execute(findValue(filter))(state);

      expect(mockRequest.query).to.have.been.called;
      expect(result).to.equal(123);
    });

    it('should prevent SQL injection in findValue', async () => {
      const state = {
        configuration: {
          server: 'test-server',
          database: 'test-db',
          user: 'test-user',
          password: 'test-password',
        },
      };

      const maliciousFilter = {
        uuid: 'id',
        relation: 'users',
        where: { name: "'; DROP TABLE users; --" },
      };

      await execute(findValue(maliciousFilter))(state);

      // Verify that the query was executed with proper parameterization
      expect(mockRequest.input).to.have.been.called;
      expect(mockRequest.query).to.have.been.called;
    });
  });

  describe('insertMany function', () => {
    it('should insert multiple records successfully', async () => {
      const mockResult = {
        rowsAffected: [2],
      };
      mockRequest.query.resolves(mockResult);

      const state = {
        configuration: {
          server: 'test-server',
          database: 'test-db',
          user: 'test-user',
          password: 'test-password',
        },
      };

      const table = 'users';
      const records = [
        { name: 'John Doe', email: 'john@example.com' },
        { name: 'Jane Doe', email: 'jane@example.com' },
      ];

      const result = await execute(insertMany(table, records))(state);

      expect(mockRequest.query).to.have.been.called;
      expect(result.data).to.be.defined;
    });

    it('should prevent SQL injection in insertMany', async () => {
      const state = {
        configuration: {
          server: 'test-server',
          database: 'test-db',
          user: 'test-user',
          password: 'test-password',
        },
      };

      const table = 'users';
      const maliciousRecords = [
        { name: "'; DROP TABLE users; --", email: 'test1@example.com' },
        { name: "'; DELETE FROM users; --", email: 'test2@example.com' },
      ];

      await execute(insertMany(table, maliciousRecords))(state);

      // Verify that the query was executed with proper parameterization
      expect(mockRequest.input).to.have.been.called;
      expect(mockRequest.query).to.have.been.called;
    });
  });
});
