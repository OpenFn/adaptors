import { expect } from 'chai';
import { each, execute, create, source, sourceValue, steps, map } from '../src/FakeAdaptor'
import testData from './testData' assert { type: 'json' };

const fakeLogger = { debug: function() { } , info: function() { }}

describe("JSON References", () => {

  describe("One to one", () => {
    it("references a given path", () => {
      let value = sourceValue("$.data.store.bicycle.color")({data: testData});
      expect(value).to.eql("red");
    })
  })

  describe("Use cases", () => {

    it("can produce a one to one", () => {
      const state = {data: testData, references: [], logger: fakeLogger};

      let result = create("myObject", {
        bicycle: sourceValue("$.data.store.bicycle.color")
      })(state)

      expect(result.references).to.eql([ {
        sObject: "myObject", id: 1, fields: { bicycle: "red" }
      } ])
    });

    it("can create an object", function(done) {
      const state = {data: testData, references: []};

      execute(steps(
        create('Bicycle', {
          color: sourceValue("$.data.store.bicycle.color")
        })
      ))(state)
      .then(function({references}) {
        expect(references).to.eql([
          {
            "fields": {
              "color": "red"
            },
            id: 1,
            "sObject": "Bicycle"
          }
        ]);
      }).catch(function(err) {
        return err;
      }).then(done)

    });

    it("can create many objects", function(done) {
      const state = {data: testData, references: []};

      execute(steps(
        each("$.data.store.book[*]",
            create("Book", {
              title: sourceValue("$.data.title")
            })
           ),
      ))(state)
      .then(function({references}) {
        expect(references.reverse()).to.eql(
          [ { sObject: 'Book', id: 1, fields: { title: 'Sayings of the Century' } },
            { sObject: 'Book', id: 2, fields: { title: 'Sword of Honour' } },
            { sObject: 'Book', id: 3, fields: { title: 'Moby Dick' } },
            { sObject: 'Book', id: 4, fields: { title: 'The Lord of the Rings' } } ]
        );
      }).catch(function(err) {
        return err;
      }).then(done)

    });
  })
  
})


