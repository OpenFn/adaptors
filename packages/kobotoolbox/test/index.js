import chai from 'chai';
const { expect } = chai;

import nock from 'nock';

import Adaptor from '../src';
const { execute } = Adaptor;

import { getSubmissions, getForms, getDeploymentInfo } from '../src/Adaptor';

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
      expect(finalState).to.eql({ references: [], data: null });
    });
  });
});

describe('getSubmissions', () => {
  before(() => {
    nock('https://kf.kobotoolbox.org')
      .get('/api/v2/assets/aXecHjmbATuF6iGFmvBLBX/data/?format=json')
      .basicAuth({ user: 'john', pass: 'doe' })
      .reply(200, {
        count: 2,
        next: null,
        previous: null,
        results: [{}, {}],
      });

    nock('https://kf.kobotoolbox.org')
      .get('/api/v2/assets/bXecHjmbATuF6iGFmvBLBX/data/?format=json')
      .basicAuth({ user: 'john', pass: 'doe' })
      .reply(404, {
        body: 'A 404 error.',
      });

    nock('https://kf.kobotoolbox.org')
      .get('/api/v2/assets/cXecHjmbATuF6iGFmvBLBX/data/?format=json')
      .basicAuth({ user: 'john', pass: 'doe' })
      .reply(500, {
        body: 'Another error.',
      });
  });

  it('should get a list of submissions', async () => {
    let state = {
      configuration: {
        username: 'john',
        password: 'doe',
        baseURL: 'https://kf.kobotoolbox.org',
        // type: 'process.env.type',
        apiVersion: 'v2',
      },
    };

    const nextState = await execute(
      getSubmissions({ formId: 'aXecHjmbATuF6iGFmvBLBX' })
    )(state).then(nextState => {
      return nextState;
    });
    expect(nextState.data).to.deep.eq({
      count: 2,
      next: null,
      previous: null,
      results: [{}, {}],
    });
  }).timeout(10 * 1000);

  it('throws an error for a 404 response', async () => {
    const state = {
      configuration: {
        username: 'john',
        password: 'doe',
        baseURL: 'https://kf.kobotoolbox.org',
        apiVersion: 'v2',
      },
    };

    const error = await execute(
      getSubmissions({ formId: 'bXecHjmbATuF6iGFmvBLBX' })
    )(state).catch(error => {
      return error;
    });
    expect(error.message).to.eql('Request failed with status code 404');
  });

  it('throws different kind of errors', async () => {
    const state = {
      configuration: {
        username: 'john',
        password: 'doe',
        baseURL: 'https://kf.kobotoolbox.org',
        apiVersion: 'v2',
      },
    };

    const error = await execute(
      getSubmissions({ formId: 'cXecHjmbATuF6iGFmvBLBX' })
    )(state).catch(error => {
      return error;
    });
    expect(error.message).to.eql('Request failed with status code 500');
  });
});

describe('getForms', () => {
  before(() => {
    nock('https://kf.kobotoolbox.org')
      .get('/api/v2/assets/?format=json')
      .basicAuth({ user: 'john', pass: 'doe' })
      .reply(200, {
        count: 10,
        next: null,
        previous: null,
        results: [{}, {}],
      });
  });

  it('should get a list of forms', async () => {
    let state = {
      configuration: {
        username: 'john',
        password: 'doe',
        baseURL: 'https://kf.kobotoolbox.org',
        apiVersion: 'v2',
      },
    };
    const nextState = await execute(getForms())(state).then(nextState => {
      return nextState;
    });
    expect(nextState.data).to.deep.eq({
      count: 10,
      next: null,
      previous: null,
      results: [{}, {}],
    });
  }).timeout(10 * 1000);
  /* 
  it('throws an error for a 404 response', async () => {

    const state = {
      configuration: {
        username: 'john',
        password: 'doe',
        baseURL: 'https://kf.kobotoolbox.org',
        apiVersion: 'v2',
      },
    };

    const error = await execute(getForms())(state).catch(error => {
      return error;
    });
    expect(error.message).to.eql('Request failed with status code 404');
  });

  it('throws different kind of errors', async () => {
   
    const state = {
      configuration: {
        username: 'john',
        password: 'doe',
        baseURL: 'https://kf.kobotoolbox.org',
        apiVersion: 'v2',
      },
    };

    const error = await execute(getForms())(state).catch(error => {
      return error;
    });
    expect(error.message).to.eql('Request failed with status code 500');
  }); */
});

describe('getDeploymentInfo', () => {
  before(() => {
    nock('https://kf.kobotoolbox.org')
      .get('/api/v2/assets/aXecHjmbATuF6iGFmvBLBX/deployment/?format=json')
      .basicAuth({ user: 'john', pass: 'doe' })
      .reply(200, {
        count: 2,
        next: null,
        previous: null,
        results: [{}, {}],
      });
    nock('https://kf.kobotoolbox.org')
      .get('/api/v2/assets/bXecHjmbATuF6iGFmvBLBX/deployment/?format=json')
      .basicAuth({ user: 'john', pass: 'doe' })
      .reply(404, {
        body: 'A 404 error.',
      });
    nock('https://kf.kobotoolbox.org')
      .get('/api/v2/assets/cXecHjmbATuF6iGFmvBLBX/deployment/?format=json')
      .basicAuth({ user: 'john', pass: 'doe' })
      .reply(500, {
        body: 'Another error.',
      });
  });
  it('should get a list of deployment', async () => {
    let state = {
      configuration: {
        username: 'john',
        password: 'doe',
        baseURL: 'https://kf.kobotoolbox.org',
        // type: 'process.env.type',
        apiVersion: 'v2',
      },
    };
    const nextState = await execute(
      getDeploymentInfo({ formId: 'aXecHjmbATuF6iGFmvBLBX' })
    )(state).then(nextState => {
      return nextState;
    });
    expect(nextState.data).to.deep.eq({
      count: 2,
      next: null,
      previous: null,
      results: [{}, {}],
    });
  }).timeout(10 * 1000);
  it('throws an error for a 404 response', async () => {
    const state = {
      configuration: {
        username: 'john',
        password: 'doe',
        baseURL: 'https://kf.kobotoolbox.org',
        apiVersion: 'v2',
      },
    };
    const error = await execute(
      getDeploymentInfo({ formId: 'bXecHjmbATuF6iGFmvBLBX' })
    )(state).catch(error => {
      return error;
    });
    expect(error.message).to.eql('Request failed with status code 404');
  });
  it('throws different kind of errors', async () => {
    const state = {
      configuration: {
        username: 'john',
        password: 'doe',
        baseURL: 'https://kf.kobotoolbox.org',
        apiVersion: 'v2',
      },
    };
    const error = await execute(
      getDeploymentInfo({ formId: 'cXecHjmbATuF6iGFmvBLBX' })
    )(state).catch(error => {
      return error;
    });
    expect(error.message).to.eql('Request failed with status code 500');
  });
});
