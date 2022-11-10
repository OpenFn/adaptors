import Adaptor from '../src';
import { expect } from 'chai';
import nock from 'nock';

const { execute, get, post, put, patch, del, alterState } = Adaptor;

function stdGet(state) {
  return execute(get('https://www.example.com/api/fake', {}))(state).then(
    nextState => {
      const { data, references } = nextState;
      expect(data).to.eql({ httpStatus: 'OK', message: 'the response' });
      expect(references).to.eql([{ triggering: 'event' }]);
    }
  );
}

function clientReq(method, state) {
  return execute(method('https://www.example.com/api/fake', {}))(state).then(
    nextState => {
      const { data, references } = nextState;
      expect(data).to.eql({ httpStatus: 'OK', message: 'the response' });
      expect(references).to.eql([{ a: 1 }]);
    }
  );
}

describe('The execute() function', () => {
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

describe('The get() function', () => {
  before(() => {
    nock('https://www.example.com')
      .persist()
      .get('/api/fake')
      .reply(200, {
        httpStatus: 'OK',
        message: 'the response',
      });
  });

  it.only('prepares nextState properly', () => {
    let state = {
      configuration: {
        username: 'hello',
        password: 'there',
        baseUrl: 'https://www.example.com',
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
      get('/api/fake', {}),
      alterState(state => {
        state.counter = 2;
        return state;
      })
    )(state).then(nextState => {
      const { data, references, counter } = nextState;
      expect(data).to.eql({ httpStatus: 'OK', message: 'the response' });
      expect(references).to.eql([{ triggering: 'event' }]);
      expect(counter).to.eql(2);
      console.log(nextState)
    });
  });

  it('works without a baseUrl', () => {
    let state = {
      configuration: {
        username: 'hello',
        password: 'there',
      },
      data: { triggering: 'event' },
    };
    return stdGet(state);
  });

  it('works with an empty set of credentials', () => {
    let state = {
      configuration: {},
      data: { triggering: 'event' },
    };
    return stdGet(state);
  });

  it('works with no credentials (null)', () => {
    let state = {
      configuration: null,
      data: {
        triggering: 'event',
      },
    };
    return stdGet(state);
  });
});

describe('The client', () => {
  before(() => {
    nock('https://www.example.com')
      .get('/api/fake')
      .reply(200, {
        httpStatus: 'OK',
        message: 'the response',
      });

    nock('https://www.example.com')
      .post('/api/fake')
      .reply(200, {
        httpStatus: 'OK',
        message: 'the response',
      });

    nock('https://www.example.com')
      .put('/api/fake')
      .reply(200, {
        httpStatus: 'OK',
        message: 'the response',
      });

    nock('https://www.example.com')
      .patch('/api/fake')
      .reply(200, {
        httpStatus: 'OK',
        message: 'the response',
      });

    nock('https://www.example.com')
      .delete('/api/fake')
      .reply(200, {
        httpStatus: 'OK',
        message: 'the response',
      });
  });

  const stdState = {
    configuration: null,
    data: { a: 1 },
  };

  it('works with GET', () => {
    let state = stdState;
    clientReq(get, state);
  });

  it('works with POST', () => {
    let state = stdState;
    clientReq(post, state);
  });

  it('works with PATCH', () => {
    let state = stdState;
    clientReq(patch, state);
  });

  it('works with POST', () => {
    let state = stdState;
    clientReq(put, state);
  });

  it('works with POST', () => {
    let state = stdState;
    clientReq(del, state);
  });
});
