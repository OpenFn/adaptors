import { expect, assert } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import { read } from '../src/Adaptor';
import patient from './fixtures/Patient' assert { type: 'json' };

const testServer = enableMockClient('https://fhir.example.com');

type MockOptions = {
  req?: RequestOptions;
  res?: ResponseOptions;
};
type RequestOptions = {};
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
      path: new RegExp(`r4/${path}`),
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
});
