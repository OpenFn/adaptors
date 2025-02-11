import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import { read, search, update, create, delete as del } from '../src/Adaptor';
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
