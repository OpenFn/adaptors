import Adaptor from '../src';
import pkg from 'chai';
const { expect } = pkg;
import nock from 'nock';

const { execute, getCases, alterState } = Adaptor;

describe.skip('The execute() function', () => {
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

  it('assigns references, data to the initialState', done => {
    let state = {};

    let finalState = execute()(state);

    execute()(state)
      .then(finalState => {
        expect(finalState).to.eql({
          references: [],
          data: null,
        });
      })
      .then(done)
      .catch(done);
  });
});

describe.skip('The getCases() function', () => {
  before(() => {
    nock('https://www.example.com').persist().get('/api/cases').reply(200, {
      httpStatus: 'OK',
      message: 'the response',
    });
    nock('https://www.example.com').persist().post('/api/login').reply(200, {
      httpStatus: 'OK',
      message: 'the response',
    });
  });

  it('prepares nextState properly', () => {
    let state = {
      configuration: {
        user: 'hello',
        password: 'there',
        url: 'https://www.example.com',
      },
      data: {
        triggering: 'event',
      },
    };

    return execute(
      alterState(state => {
        state.counter = 1;
        return state;
      }),
      getCases({}),
      alterState(state => {
        state.counter = 2;
        return state;
      })
    )(state).then(nextState => {
      const { data, references, counter } = nextState;
      expect(data).to.eql({ httpStatus: 'OK', message: 'the response' });
      expect(references).to.eql([{ triggering: 'event' }]);
      expect(counter).to.eql(2);
      console.log(nextState);
    });
  });
});
