import { expect } from 'chai';
import sinon from 'sinon';
import { reference, createSMS, steps, each,
  field, fields, sourceValue, dataValue } from '../src/Adaptor';
import { execute } from '../src/FakeAdaptor';
import testData from './testData';

describe("Adaptor", () => {

  describe("reference", () => {
    it("returns the Id of a previous operation", () => {
      let state = { references: [{id: '12345'}] };
      let Id = reference(0, state);
      expect(Id).to.eql('12345');
    })
  })

  describe("createSMS", () => {

    it("makes a new SMS in Mogli", (done) => {

      const fakeConnection = {
        instanceUrl: "https://na8.salesforce.fake.com",
        accessToken: "8675309",
        createSMS: function() {
          return Promise.resolve({Id: 10})
        }
      };
      let state = {
        configuration: { loginUrl: "https://www.login.salesforce.com" },
        connection: fakeConnection,
        references: []
      };

      let fields = { field: "value" };

      let spy = sinon.spy(fakeConnection, "createSMS");

      fakeConnection.createSMS(fields, state).then((state) => {
        // TODO: finish tests...
        // expect(spy.args[0]).to.eql(fields);
        expect(spy.called).to.eql(true);
        // expect(state.references[0]).to.eql({Id: 10})
      }).then(done).catch(done)
    })
  })


  describe("nesting", () => {

    let initialState
    let afterExecutionOf

    function executionWrapper(initialState) {
      return (operations) => {
        return execute(operations)(initialState)
      }
    }

    let counter = 0
    const fakeConnection = {
      createSMS: function(sObject, attrs) {
        return Promise.resolve({fields: attrs, Id: counter+=1})
      }
    };

    beforeEach(() => {
      initialState = { connection: fakeConnection, data: testData, references: []};
      afterExecutionOf = executionWrapper(initialState)
    })

    it("works", (done) => {
      let operations = (
        steps(
          each(
            "$.data.store.book[*]",
            createSMS(
              fields(
                field("sender", dataValue("from_number")),
                field("receivedAt", dataValue("timestamp")),
                field("message", dataValue("message"))
              )
            )
          )
        )
      )

    afterExecutionOf(operations).then((state) => {
      console.log(state);
      // TODO: finish tests...
      // let references = state.references.reverse()

      // expect(references.length).to.eql(4)
      // expect(references[0].fields.title).to.eql("Sayings of the Century")
    }).then(done).catch(done)
    })
  })

})
