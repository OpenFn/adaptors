import { expect } from 'chai';

import Adaptor from '../src';
const { execute, submitSite } = Adaptor;

import superagentMock from 'superagent-mock';
import Fixtures, { fixtures } from './Fixtures';

describe('execute', () => {
  it('executes each operation in sequence', done => {
    let state = {};
    let operations = [
      state => {
        return { counter: 1 };
      },
      state => {
        return { counter: 2 };
      },
      state => {
        return { counter: 3 };
      },
    ];

    execute(...operations)(state)
      .then(finalState => {
        expect(finalState).to.eql({ counter: 3 });
      })
      .then(done)
      .catch(done);
  });

  it('assigns references, data to the initialState', () => {
    let state = {};

    let finalState = execute()(state);

    execute()(state).then(finalState => {
      expect(finalState).to.eql({
        references: [],
        data: null,
      });
    });
  });
});

// describe("submitSite", () => {
//   let mockRequest
//
//   before(() => {
//     mockRequest = superagentMock(request, Fixtures)
//   })
//
//   it("posts to API and returns state", () => {
//     let state = {
//       configuration: {
//         username: "hello",
//         password: "there",
//         apiUrl: 'https://www.resourcemap.org/demo'
//       }
//     };
//
//     return execute(
//       submitSite(fixtures.site.id, fixtures.site.data)
//     )(state)
//     .then((state) => {
//       let lastReference = state.references[0]
//
//       // Check that the eventData made it's way to the request as a string.
//       expect(lastReference.params).
//         to.eql(JSON.stringify(fixtures.event.requestBody))
//
//     })
//
//   })
//
//   after(() => {
//     mockRequest.unset()
//   })
//
// })
