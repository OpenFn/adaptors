import { expect } from 'chai';

import Adaptor from '../src';
const { execute, submit } = Adaptor;

import request from 'superagent';
import superagentMock from 'superagent-mock';
import Fixtures, { fixtures } from './Fixtures'

describe("execute", () => {

  it("executes each operation in sequence", (done) => {
    let state = {
      data: {},
      configuration: {}
    }
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
    let state = {
      data: {},
      configuration: {}
    }

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

describe("submit", () => {
  let mockRequest

  before(() => {
    mockRequest = superagentMock(request, Fixtures)
  })

  it("submits a form and returns state")

  after(() => {
    mockRequest.unset()
  })

})
