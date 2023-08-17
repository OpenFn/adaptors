import chai from 'chai';
const { expect } = chai;

import { execute, upsertMembers } from '../src';
// const { execute } = Adaptor;

describe('execute', () => {
  it('executes each operation in sequence', done => {
    let state = {
      configuration: {
        apiKey: 'somEThINGkeyish',
        server: 'us11',
      },
    };
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
    let state = {
      configuration: {
        apiKey: 'somEThINGkeyish',
        server: 'us11',
      },
    };

    execute()(state).then(finalState => {
      expect(finalState).to.eql({ ...state, references: [], data: null });
    });
  });
  it('should throw an error if apiKey is not defined', () => {
    let state = {
      configuration: {
        apiKey: '',
        server: 'us11',
      },
    };

    execute()(state).catch(error => {
      expect(error.message).to.eql('Your Mailchimp apiKey is required');
    });
  });

  it('should throw an error if server is not defined', () => {
    let state = {
      configuration: {
        apiKey: 'somEThINGkeyish',
        server: '',
      },
    };

    execute()(state).catch(error => {
      expect(error.message).to.eql('Your Mailchimp server prefix is required');
    });
  });
});
