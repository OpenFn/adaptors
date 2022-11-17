import { expect } from 'chai';

import nock from 'nock';
import ClientFixtures, { fixtures } from './ClientFixtures'

import Adaptor from '../src';
const { execute, event, dataElement, get } = Adaptor;


describe("execute", () => {

  it("executes each operation in sequence", (done) => {
    let state = {}
    let operations = [
      (state) => { return {counter: 1} },
      (state) => { return {counter: 2} },
      (state) => { return {counter: 3} }
    ]

    execute(...operations)(state)
    .then((finalState) => {
      expect(finalState).to.eql({ counter: 3 })
    })
    .then(done).catch(done)


  })

  it("assigns references, data to the initialState", () => {
    let state = {}

    let finalState = execute()(state)

    execute()(state)
    .then((finalState) => {
      expect(finalState).to.eql({
        references: [],
        data: null
      })
    })

  })
})

describe("get", () => {

  before(() => {
     nock('https://play.http.org')
       .get('/demo/api/events')
       .reply(200, { foo: 'bar' });
  })

  it("calls the callback", () => {
    let state = {
      configuration: {
        username: "hello",
        password: "there",
        baseUrl: 'https://play.http.org/demo'
      }
    };

    return execute(
      get("api/events", {
        callback: (response, state) => {
          return { ...state, references: [response] }
        },
        username: null
      })
    )(state)
    .then((state) => {
      let lastReference = state.references[0]

      // Check that the eventData made it's way to the request as a string.
      expect(lastReference).
        to.eql({foo: 'bar'})

    })

  })

})
