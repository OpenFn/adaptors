import { expect } from 'chai';
import net from 'node:net';

import Adaptor from '../src/index.js';
const { execute, submitSite } = Adaptor;

import superagentMock from 'superagent-mock';
import Fixtures, { fixtures } from './Fixtures.js';

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

describe('submitSite', () => {
  it('rejects when the server cannot be reached', async () => {
    // Grab a free port, then close it so the connection is refused
    const server = net.createServer();
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const { port } = server.address();
    await new Promise(resolve => server.close(resolve));

    const state = {
      configuration: {
        baseUrl: `http://127.0.0.1:${port}`,
        username: 'hello',
        password: 'there',
      },
    };

    let error;
    try {
      await submitSite('1', { name: 'My Site' })(state);
    } catch (e) {
      error = e;
    }
    expect(error).to.have.property('code', 'ECONNREFUSED');
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
