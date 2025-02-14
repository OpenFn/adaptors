import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import {
  read,
  search,
  update,
  create,
  delete as del,
  addToBundle,
  uploadBundle,
} from '../src/Adaptor';

import patient from './fixtures/Patient' assert { type: 'json' };

const testServer = enableMockClient('https://fhir.example.com');

type MockOptions = {
  req?: RequestOptions;
  res?: ResponseOptions;
};
type RequestOptions = {
  method?: string;
};
type ResponseOptions = {
  status?: number;
  data?: any;
  headers?: Record<string, string>;
};

const state = {
  configuration: {
    baseUrl: 'https://fhir.example.com/r4',
  },
};

const mock = (path: string, options: MockOptions = {}, times = 1) => {
  const { req, res } = Object.assign({ req: {}, res: {} }, options);

  const interceptor = testServer
    .intercept({
      // path: new RegExp(`r4/${path}`),
      path: `r4/${path}`,
      ...req,
    })
    .reply(res.status ?? 200, res.data ?? {}, {
      ...res,
      headers: {
        'content-type': 'application/fhir+json',
        ...res.headers,
      },
    });

  if (times === Infinity) {
    interceptor.persist();
  } else {
    interceptor.times(times);
  }
  return interceptor;
};

describe('read', () => {
  it('should read a valid id', async () => {
    mock('Patient/123', {
      res: {
        data: patient,
      },
    });

    const result = await read('Patient/123')(state);

    expect(result.data).to.eql(patient);
    expect(result.response.statusCode).to.equal(200);
  });

  it('should throw for an invalid id', async () => {
    let err;
    try {
      await read('123')(state);
    } catch (e) {
      err = e;
    }
    expect(err.code).to.equal('INVALID_RESOURCE_ID');
    expect(err.fix).to.be.ok;
    expect(err.description).to.be.ok;
  });
});

describe('search', () => {
  it('should do a simple search', async () => {
    mock('Patient?foo=bar', {
      res: {
        data: {
          resourceType: 'Bundle',
          entry: [{ resource: patient }],
        },
      },
    });

    const result = await search('Patient', { query: { foo: 'bar' } })(state);

    expect(result.data).to.eql([patient]);
  });
  it('should do a prefixed search term', async () => {
    mock('Patient?given:contains=eve', {
      res: {
        data: {
          resourceType: 'Bundle',
          entry: [{ resource: patient }],
        },
      },
    });

    const result = await search('Patient', {
      query: { 'given:contains': 'eve' },
    })(state);

    expect(result.data).to.eql([patient]);
  });
  it('should map special parameters', async () => {
    mock('Patient?_count=1', {
      res: {
        data: {
          resourceType: 'Bundle',
          entry: [{ resource: patient }],
        },
      },
    });

    const result = await search('Patient', {
      count: 1,
    })(state);

    expect(result.data).to.eql([patient]);
  });
});

describe('update', () => {
  it('should update a resource', async () => {
    mock('Patient/123', {
      req: {
        method: 'PUT',
      },
      res: {
        data: patient,
      },
    });

    const result = await update('Patient/123', patient)(state);

    expect(result.data).to.eql(patient);
    expect(result.response.statusCode).to.equal(200);
  });
});

describe('create', () => {
  it('should create a resource', async () => {
    mock('Patient', {
      req: {
        method: 'POST',
      },
      res: {
        data: patient,
      },
    });

    const result = await create(patient)(state);

    expect(result.data).to.eql(patient);
    expect(result.response.statusCode).to.equal(200);
  });
  it('should throw if no resourceType', async () => {
    let err;
    try {
      await create({})(state);
    } catch (e) {
      err = e;
    }

    expect(err.code).to.equal('INVALID_RESOURCE_TYPE');
    expect(err.fix).to.be.ok;
    expect(err.description).to.be.ok;
  });
});

describe('delete', () => {
  it('should delete a valid id', async () => {
    mock('Patient/123', {
      req: {
        method: 'DELETE',
      },
      res: {
        data: patient,
      },
    });

    const result = await del('Patient/123')(state);

    expect(result.data).to.eql(patient);
    expect(result.response.statusCode).to.equal(200);
  });

  it('should throw for an invalid id', async () => {
    let err;
    try {
      await del('123')(state);
    } catch (e) {
      err = e;
    }
    expect(err.code).to.equal('INVALID_RESOURCE_ID');
    expect(err.fix).to.be.ok;
    expect(err.description).to.be.ok;
  });
});

describe('addToBundle', () => {
  it('should add one resource to a non-existing default bundle', async () => {
    const state = {
      configuration: {
        baseUrl: 'https://www.example.com/fhir',
      },
    };
    const resource = { id: 'a', resourceType: 'patient' };

    const result = await addToBundle(resource)(state);
    expect(result.bundle).to.eql({
      resourceType: 'Bundle',
      type: 'transaction',
      entry: [
        {
          resource,
          request: {
            method: 'PUT',
            url: 'patient/a',
          },
        },
      ],
    });
  });
  it('should add one resource to an existing default bundle', async () => {
    const z = { id: 'z', resourceType: 'patient' };
    const state = {
      bundle: {
        resourceType: 'Bundle',
        type: 'transaction',
        entry: [
          {
            resource: z,
            request: {
              method: 'PUT',
              url: 'patient/z',
            },
          },
        ],
        total: 0, // important!! Right now we are not maintaining this property on the bundle
      },
    };
    const a = { id: 'a', resourceType: 'patient' };

    const result = await addToBundle(a)(state);

    expect(result.bundle).to.eql({
      total: 0,
      resourceType: 'Bundle',
      type: 'transaction',
      entry: [
        {
          resource: z,
          request: {
            method: 'PUT',
            url: 'patient/z',
          },
        },
        {
          resource: a,
          request: {
            method: 'PUT',
            url: 'patient/a',
          },
        },
      ],
    });
  });
  it('should add multiple resources to a non-existing default bundle', async () => {
    const state = {};
    const a = { id: 'a', resourceType: 'patient' };
    const b = { id: 'b', resourceType: 'patient' };

    const result = await addToBundle([a, b])(state);

    expect(result.bundle).to.eql({
      resourceType: 'Bundle',
      type: 'transaction',
      entry: [
        {
          resource: a,
          request: {
            method: 'PUT',
            url: 'patient/a',
          },
        },
        {
          resource: b,
          request: {
            method: 'PUT',
            url: 'patient/b',
          },
        },
      ],
    });
  });
  it('should add multiple resources to a non-existing custom bundle', async () => {
    const state = {};
    const a = { id: 'a', resourceType: 'patient' };
    const b = { id: 'b', resourceType: 'patient' };

    const result = await addToBundle([a, b], 'my-bundle')(state);

    expect(result['my-bundle']).to.eql({
      resourceType: 'Bundle',
      type: 'transaction',
      entry: [
        {
          resource: a,
          request: {
            method: 'PUT',
            url: 'patient/a',
          },
        },
        {
          resource: b,
          request: {
            method: 'PUT',
            url: 'patient/b',
          },
        },
      ],
    });
  });
  it('should add multiple resources to an existing custom bundle', async () => {
    const z = { id: 'z', resourceType: 'patient' };
    const state = {
      'my-bundle': {
        resourceType: 'Bundle',
        type: 'transaction',
        entry: [
          {
            resource: z,
            request: {
              method: 'PUT',
              url: 'patient/z',
            },
          },
        ],
        total: 0,
      },
    };
    const a = { id: 'a', resourceType: 'patient' };
    const b = { id: 'b', resourceType: 'patient' };

    const result = await addToBundle([a, b], 'my-bundle')(state);

    expect(result['my-bundle']).to.eql({
      resourceType: 'Bundle',
      type: 'transaction',
      entry: [
        {
          resource: z,
          request: {
            method: 'PUT',
            url: 'patient/z',
          },
        },
        {
          resource: a,
          request: {
            method: 'PUT',
            url: 'patient/a',
          },
        },
        {
          resource: b,
          request: {
            method: 'PUT',
            url: 'patient/b',
          },
        },
      ],
      total: 0, // important!! Right now we are not maintaining this property on the bundle
    });
  });
});

describe('uploadBundle', () => {
  it('should post the default bundle from state', async () => {
    const state = {
      configuration: {
        baseUrl: 'https://fhir.example.com/r4',
      },
    };

    const a = { id: 'a', resourceType: 'patient' };
    addToBundle(a)(state);

    mock('', {
      req: {
        method: 'POST',
      },
      res: {
        // Simulated (incomplete) response bundle
        data: {
          resourceType: 'Bundle',
          id: 'bundle-response',
          meta: {
            lastUpdated: '2014-08-18T01:43:33Z',
          },
          type: 'transaction-response',
          entry: [
            {
              resource: a,
              //request // don't bother in the mock
              response: {
                status: '200 OK',
              },
            },
          ],
        },
      },
    });

    const result = await uploadBundle()(state);

    expect(result.response.statusCode).to.equal(200);
    expect(result.response.statusMessage).to.equal('OK');
    expect(result.data.entry[0].response.status).to.equal('200 OK');
  });

  it('should post a named bundle from state', async () => {
    const state = {
      configuration: {
        baseUrl: 'https://fhir.example.com/r4',
      },
    };

    const a = { id: 'a', resourceType: 'patient' };
    addToBundle(a, 'b1')(state);

    mock('', {
      req: {
        method: 'POST',
      },
      res: {
        // Simulated (incomplete) response bundle
        data: {
          resourceType: 'Bundle',
          id: 'bundle-response',
          meta: {
            lastUpdated: '2014-08-18T01:43:33Z',
          },
          type: 'transaction-response',
          entry: [
            {
              resource: a,
              //request // don't bother in the mock
              response: {
                status: '200 OK',
              },
            },
          ],
        },
      },
    });

    const result = await uploadBundle('b1')(state);

    expect(result.response.statusCode).to.equal(200);
    expect(result.response.statusMessage).to.equal('OK');
    expect(result.data.entry[0].response.status).to.equal('200 OK');
  });

  it('should post a bundle from state', async () => {
    const state = {
      configuration: {
        baseUrl: 'https://fhir.example.com/r4',
      },
    };

    const a = { id: 'a', resourceType: 'patient' };

    const bundle = {
      resourceType: 'Bundle',
      type: 'transaction',
      entry: [
        {
          resource: a,
          request: {
            method: 'PUT',
            url: 'patient/z',
          },
        },
      ],
    };

    mock('', {
      req: {
        method: 'POST',
      },
      res: {
        // Simulated (incomplete) response bundle
        data: {
          resourceType: 'Bundle',
          id: 'bundle-response',
          meta: {
            lastUpdated: '2014-08-18T01:43:33Z',
          },
          type: 'transaction-response',
          entry: [
            {
              resource: a,
              //request // don't bother in the mock
              response: {
                status: '200 OK',
              },
            },
          ],
        },
      },
    });

    const result = await uploadBundle(bundle)(state);

    expect(result.response.statusCode).to.equal(200);
    expect(result.response.statusMessage).to.equal('OK');
    expect(result.data.entry[0].response.status).to.equal('200 OK');
  });
});
