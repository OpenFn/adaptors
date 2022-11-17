import { expect } from 'chai';
import Adaptor from '../src';
const { execute, fetchSurveyData } = Adaptor;
import request from 'superagent';
import superagentMock from 'superagent-mock';
import ClientFixtures, { fixtures } from './ClientFixtures'

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

describe("fetchSurveyData", () => {
  let mockRequest

  before(() => {
    mockRequest = superagentMock(request, ClientFixtures)
  })

  it("fetches survey data from Magpi, transforms it to JSON, and posts it elsewhere");
  // it("fetches survey data from Magpi, transforms it to JSON, and posts it elsewhere", () => {
  //   let state = {
  //     configuration: {
  //       "username": "taylordowns2000",
  //       "accessToken": "blahblahblah"
  //     }
  //   };
  //
  //   return execute(
  //     fetchSurveyData(fixtures.event.requestBody)
  //   )(state)
  //   .then((state) => {
  //     let lastReference = state.references[0]
  //
  //     // Check that the eventData made it's way to the request as a string.
  //     expect(lastReference.params).
  //       to.eql(JSON.stringify(fixtures.event.requestBody))
  //
  //   })
  //
  // })

  after(() => {
    mockRequest.unset()
  })

})
