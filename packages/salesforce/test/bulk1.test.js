import { expect, assert } from 'chai';
import { bulk1, setMockConnection } from '../src/index';

describe('bulk1', () => {
  beforeEach(() => {
    setMockConnection(null);
  });

  describe('query', () => {
    it('should query successfully', done => {
      const fakeConnection = {
        bulk: {
          query: args => {
            const stream = {
              on: (event, handler) => {
                if (event === 'record') {
                  handler({ Id: '0015g00000LJ2wGAAT', Name: 'test' });
                  handler({ Id: '0015g00000LJ2wGBBT', Name: 'test2' });
                } else if (event === 'finish') {
                  handler();
                }
                return stream;
              },
            };
            return Promise.resolve(stream);
          },
        },
      };
      setMockConnection(fakeConnection);
      const state = {};
      bulk1
        .query('SELECT Id, Name FROM Account')(state)
        .then(state => {
          expect(state.data).to.eql([
            { Id: '0015g00000LJ2wGAAT', Name: 'test' },
            { Id: '0015g00000LJ2wGBBT', Name: 'test2' },
          ]);
        })
        .then(done)
        .catch(done);
    });

    it('should handle query errors', done => {
      const fakeConnection = {
        bulk: {
          query: args => {
            const stream = {
              on: (event, handler) => {
                if (event === 'error') {
                  handler(assert.fail('Invalid SOQL query'));
                }
                return stream;
              },
            };
            return Promise.resolve(stream);
          },
        },
      };
      setMockConnection(fakeConnection);
      const state = {};
      bulk1
        .query('INVALID QUERY')(state)
        .then(() => {
          done(assert.fail('Should have thrown an error'));
        })
        .catch(error => {
          expect(error.message).to.equal('Invalid SOQL query');
          done();
        });
    });

    it('should handle connection errors', done => {
      const fakeConnection = {
        bulk: {
          query: args => {
            return Promise.reject(assert.fail('Connection failed'));
          },
        },
      };
      setMockConnection(fakeConnection);
      const state = {};
      bulk1
        .query('SELECT Id FROM Account')(state)
        .then(() => {
          done(assert.fail('Should have thrown an error'));
        })
        .catch(error => {
          expect(error.message).to.equal('Connection failed');
          done();
        });
    });
  });

  describe('insert', () => {
    it('should insert successfully', done => {
      const fakeConnection = {
        bulk: {
          load: (sObject, operation, options, records) => {
            return Promise.resolve([
              {
                id: '0015g00000LJ2wGAAT',
                success: true,
                errors: [],
              },
              {
                id: '0015g00000LJ2wGBBT',
                success: true,
                errors: [],
              },
            ]);
          },
        },
      };
      setMockConnection(fakeConnection);
      const state = {};
      bulk1
        .insert('Account', [{ Name: 'Coco' }, { Name: 'Melon' }])(state)
        .then(state => {
          expect(state.data.successfulResults).to.eql([
            {
              id: '0015g00000LJ2wGAAT',
              success: true,
              errors: [],
            },
            {
              id: '0015g00000LJ2wGBBT',
              success: true,
              errors: [],
            },
          ]);
          expect(state.data.failedResults).to.be.empty;
          expect(state.data.totalProcessed).to.equal(2);
          expect(state.data.successCount).to.equal(2);
          expect(state.data.failureCount).to.equal(0);
        })
        .then(done)
        .catch(done);
    });

    it('should handle partial failures during insert', done => {
      const fakeConnection = {
        bulk: {
          load: (sObject, operation, options, records) => {
            return Promise.resolve([
              {
                id: '0015g00000LJ2wGAAT',
                success: true,
                errors: [],
              },
              {
                success: false,
                errors: ['Required fields are missing: [Name]'],
              },
            ]);
          },
        },
      };
      setMockConnection(fakeConnection);
      const state = {};
      bulk1
        .insert('Account', [{ Name: 'Valid' }, {}])(state)
        .then(state => {
          expect(state.data.successfulResults.length).to.equal(1);
          expect(state.data.failedResults.length).to.equal(1);
          expect(state.data.unprocessedRecords[0].error).to.contain(
            'Required fields'
          );
          expect(state.data.totalProcessed).to.equal(2);
          expect(state.data.successCount).to.equal(1);
          expect(state.data.failureCount).to.equal(1);
        })
        .then(done)
        .catch(done);
    });

    it('should handle no records with allowNoOp option', done => {
      const fakeConnection = {
        bulk: {},
      };
      setMockConnection(fakeConnection);
      const state = {};
      bulk1
        .insert('Account', [], { allowNoOp: true })(state)
        .then(state => {
          expect(state.data.message).to.equal('No records to process');
        })
        .then(done)
        .catch(done);
    });

    it('should throw error when no records provided', done => {
      const fakeConnection = {
        bulk: {},
      };
      setMockConnection(fakeConnection);
      const state = {};
      bulk1
        .insert(
          'Account',
          []
        )(state)
        .then(() => {
          done(assert.fail('Should have thrown an error'));
        })
        .catch(error => {
          expect(error.message).to.equal(
            'No records provided for bulk insert operation'
          );
          done();
        });
    });

    it('should fail on error when failOnError is true', done => {
      const fakeConnection = {
        bulk: {
          load: (sObject, operation, options, records) => {
            return Promise.resolve([
              {
                success: false,
                errors: ['Field validation error'],
              },
            ]);
          },
        },
      };
      setMockConnection(fakeConnection);
      const state = {};
      bulk1
        .insert('Account', [{ Name: 'Test' }], { failOnError: true })(state)
        .then(() => {
          done(assert.fail('should have thrown an error'));
        })
        .catch(error => {
          expect(error.message).to.contain('Bulk insert failed with 1 errors');
          expect(error.message).to.contain('Field validation error');
          done();
        });
    });
  });

  describe('update', () => {
    it('should update records successfully', done => {
      const fakeConnection = {
        bulk: {
          load: (sObject, operation, options, records) => {
            return Promise.resolve([
              {
                id: '0015g00000LJ2wGAAT',
                success: true,
                errors: [],
              },
            ]);
          },
        },
      };
      setMockConnection(fakeConnection);
      const state = {};
      bulk1
        .update('Account', [
          { Id: '0015g00000LJ2wGAAT', Name: 'test (updated)' },
        ])(state)
        .then(state => {
          expect(state.data.successfulResults).to.eql([
            {
              id: '0015g00000LJ2wGAAT',
              success: true,
              errors: [],
            },
          ]);
          expect(state.data.totalProcessed).to.equal(1);
          expect(state.data.successCount).to.equal(1);
          expect(state.data.failureCount).to.equal(0);
        })
        .then(done)
        .catch(done);
    });

    it('should handle update errors', done => {
      const fakeConnection = {
        bulk: {
          load: (sObject, operation, options, records) => {
            return Promise.resolve([
              {
                success: false,
                errors: ['Invalid ID: 123'],
              },
            ]);
          },
        },
      };
      setMockConnection(fakeConnection);
      const state = {};
      bulk1
        .update('Account', [{ Id: '123', Name: 'test' }])(state)
        .then(state => {
          expect(state.data.successfulResults).to.be.empty;
          expect(state.data.failedResults[0].errors).to.contain(
            'Invalid ID: 123'
          );
          expect(state.data.unprocessedRecords[0].error).to.equal(
            'Invalid ID: 123'
          );
        })
        .then(done)
        .catch(done);
    });

    it('should use custom polling options', done => {
      const fakeConnection = {
        bulk: {
          load: (sObject, operation, options, records) => {
            return Promise.resolve([
              {
                id: '0015g00000LJ2wGAAT',
                success: true,
                errors: [],
              },
            ]);
          },
        },
      };
      setMockConnection(fakeConnection);
      const state = {};
      bulk1
        .update('Account', [{ Id: '0015g00000LJ2wGAAT', Name: 'test' }], {
          pollInterval: 1000,
          pollTimeout: 15000,
        })(state)
        .then(state => {
          expect(state.data.successfulResults.length).to.equal(1);
        })
        .then(done)
        .catch(done);
    });
  });

  describe('upsert', () => {
    it('should upsert records successfully', done => {
      const fakeConnection = {
        bulk: {
          load: (sObject, operation, options, records) => {
            return Promise.resolve([
              {
                id: '0015g00000LJ2wGAAT',
                success: true,
                errors: [],
              },
            ]);
          },
        },
      };
      setMockConnection(fakeConnection);
      const state = {};
      bulk1
        .upsert(
          'Account',
          [{ External_Id__c: 'EXT001', Name: 'test-upsert' }],
          {
            extIdField: 'External_Id__c',
          }
        )(state)
        .then(state => {
          expect(state.data.successfulResults).to.eql([
            {
              id: '0015g00000LJ2wGAAT',
              success: true,
              errors: [],
            },
          ]);
          expect(state.data.totalProcessed).to.equal(1);
        })
        .then(done)
        .catch(done);
    });

    it('should throw error when extIdField is missing', done => {
      const fakeConnection = {
        bulk: {},
      };
      setMockConnection(fakeConnection);
      const state = {};
      try {
        bulk1.upsert('Account', [{ External_Id__c: 'EXT001', Name: 'test' }])(
          state
        );
        assert.fail('should have thrown an error');
      } catch (error) {
        expect(error.message).to.equal(
          'extIdField is required for upsert operations'
        );
      }
      done();
    });

    it('should handle upsert with concurrency mode', done => {
      const fakeConnection = {
        bulk: {
          load: (sObject, operation, options, records) => {
            expect(options.concurrencyMode).to.equal('Serial');
            return Promise.resolve([
              {
                id: '0015g00000LJ2wGAAT',
                success: true,
                errors: [],
              },
            ]);
          },
        },
      };
      setMockConnection(fakeConnection);
      const state = {};
      bulk1
        .upsert('Account', [{ External_Id__c: 'EXT001', Name: 'test' }], {
          extIdField: 'External_Id__c',
          concurrencyMode: 'Serial',
        })(state)
        .then(state => {
          expect(state.data.successfulResults.length).to.equal(1);
        })
        .then(done)
        .catch(done);
    });
  });

  describe('destroy', () => {
    it('should delete records successfully', done => {
      const fakeConnection = {
        bulk: {
          load: (sObject, operation, options, records) => {
            return Promise.resolve([
              {
                id: '0015g00000LJ2wGAAT',
                success: true,
                errors: [],
              },
            ]);
          },
        },
      };
      setMockConnection(fakeConnection);
      const state = {};
      bulk1
        .destroy('Account', [{ Id: '0015g00000LJ2wGAAT' }])(state)
        .then(state => {
          expect(state.data.successfulResults).to.eql([
            {
              id: '0015g00000LJ2wGAAT',
              success: true,
              errors: [],
            },
          ]);
          expect(state.data.totalProcessed).to.equal(1);
          expect(state.data.successCount).to.equal(1);
          expect(state.data.failureCount).to.equal(0);
        })
        .then(done)
        .catch(done);
    });

    it('should handle delete errors', done => {
      const fakeConnection = {
        bulk: {
          load: (sObject, operation, options, records) => {
            return Promise.resolve([
              {
                success: false,
                errors: ['Record not found'],
              },
            ]);
          },
        },
      };
      setMockConnection(fakeConnection);
      const state = {};
      bulk1
        .destroy('Account', [{ Id: 'invalid-id' }])(state)
        .then(state => {
          expect(state.data.successfulResults).to.be.empty;
          expect(state.data.failedResults[0].errors).to.contain(
            'Record not found'
          );
          expect(state.data.unprocessedRecords[0].error).to.equal(
            'Record not found'
          );
        })
        .then(done)
        .catch(done);
    });

    it('should handle connection errors during delete', done => {
      const fakeConnection = {
        bulk: {
          load: (sObject, operation, options, records) => {
            return Promise.reject(assert.fail('Connection timeout'));
          },
        },
      };
      setMockConnection(fakeConnection);
      const state = {};
      bulk1
        .destroy('Account', [{ Id: '0015g00000LJ2wGAAT' }])(state)
        .then(() => {
          done(assert.fail('Should have thrown an error'));
        })
        .catch(error => {
          expect(error.message).to.equal('Connection timeout');
          done();
        });
    });
  });

  describe('options handling', () => {
    it('should pass correct parameters to bulk.load', done => {
      let capturedParams = {};
      const fakeConnection = {
        bulk: {
          load: (sObject, operation, options, records) => {
            capturedParams = { sObject, operation, options, records };
            return Promise.resolve([
              {
                id: '0015g00000LJ2wGAAT',
                success: true,
                errors: [],
              },
            ]);
          },
        },
      };
      setMockConnection(fakeConnection);
      const state = {};
      const testRecords = [{ Name: 'Test Account' }];
      const testOptions = { concurrencyMode: 'Serial' };

      bulk1
        .insert(
          'Account',
          testRecords,
          testOptions
        )(state)
        .then(state => {
          // Assert the correct parameters were passed to bulk.load
          expect(capturedParams.sObject).to.equal('Account');
          expect(capturedParams.operation).to.equal('insert');
          expect(capturedParams.options).to.deep.equal({
            concurrencyMode: 'Serial',
          });
          expect(capturedParams.records).to.deep.equal(testRecords);
          expect(state.data.successfulResults.length).to.equal(1);
        })
        .then(done)
        .catch(done);
    });

    it('should pass correct parameters to bulk.load for upsert with extIdField', done => {
      let capturedParams = {};
      const fakeConnection = {
        bulk: {
          load: (sObject, operation, options, records) => {
            capturedParams = { sObject, operation, options, records };
            return Promise.resolve([
              {
                id: '0015g00000LJ2wGAAT',
                success: true,
                errors: [],
              },
            ]);
          },
        },
      };
      setMockConnection(fakeConnection);
      const state = {};
      const testRecords = [{ External_Id__c: 'EXT001', Name: 'Test Account' }];
      const testOptions = {
        extIdField: 'External_Id__c',
        concurrencyMode: 'Parallel',
      };

      bulk1
        .upsert(
          'Account',
          testRecords,
          testOptions
        )(state)
        .then(state => {
          // Assert the correct parameters were passed to bulk.load
          expect(capturedParams.sObject).to.equal('Account');
          expect(capturedParams.operation).to.equal('upsert');
          expect(capturedParams.options).to.deep.equal({
            extIdField: 'External_Id__c',
            concurrencyMode: 'Parallel',
          });
          expect(capturedParams.records).to.deep.equal(testRecords);
          expect(state.data.successfulResults.length).to.equal(1);
        })
        .then(done)
        .catch(done);
    });
  });
});
