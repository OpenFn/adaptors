import { expect } from 'chai';
import { enableMockClient, encode } from '@openfn/language-common/util';
import { setGlobalDispatcher } from 'undici';
import mockAgent from './mockAgent.js';
import {
  getAttachmentMetadata,
  getForm,
  getForms,
  getSubmission,
  getSubmissions,
  downloadAttachment,
} from '../src/Adaptor.js';

setGlobalDispatcher(mockAgent);

const testServer = enableMockClient('https://inform.mock.server.com');

const configuration = {
  apiVersion: 'v1',
  baseUrl: 'https://inform.mock.server.com',
  access_token: 'someaccesstoken',
};

const jsonHeaders = {
  headers: {
    'content-type': 'application/json',
  },
};

describe('getForms', () => {
  const result = [
    {
      public: true,
      formid: 2,
    },
    {
      public: true,
      formid: 3,
    },
  ];
  it('should get all forms', async () => {
    testServer
      .intercept({
        path: `/api/${configuration.apiVersion}/forms`,
        method: 'GET',
      })

      .reply(200, result, jsonHeaders);

    const state = {
      configuration,
    };

    const finalState = await getForms()(state);

    expect(finalState.data).to.deep.eql(result);
  });

  it('should get all forms with filter queries', async () => {
    testServer
      .intercept({
        path: `/api/${configuration.apiVersion}/forms`,
        method: 'GET',
        query: {
          public: true,
          page: 1,
          page_size: 5,
        },
      })

      .reply(200, result, jsonHeaders);

    const state = {
      configuration,
    };

    const finalState = await getForms({
      public: true,
      page: 1,
      page_size: 5,
    })(state);

    expect(finalState.data).to.deep.eql(result);
  });
});

describe('getForm', () => {
  it('should get a single form', async () => {
    const result = {
      public: true,
      formid: 1234,
    };
    testServer
      .intercept({
        path: `/api/${configuration.apiVersion}/forms/1234`,
        method: 'GET',
      })

      .reply(200, result, jsonHeaders);

    const state = {
      configuration,
    };

    const finalState = await getForm('1234')(state);
    expect(finalState.data).to.deep.eql(result);
  });

  it('should get a single form structure', async () => {
    const result = {
      name: 'data',
      type: 'survey',
    };
    testServer
      .intercept({
        path: `/api/${configuration.apiVersion}/forms/1234/form.json`,
        method: 'GET',
      })

      .reply(200, result, jsonHeaders);

    const state = {
      configuration,
    };

    const finalState = await getForm('1234', { structureOnly: true })(state);

    expect(finalState.data).to.deep.eql(result);
  });
});

describe('getSubmissions', () => {
  const result = [
    {
      _id: 7783155,
    },
    {
      _id: 7783158,
    },
  ];
  it("should get a single form's submission", async () => {
    testServer
      .intercept({
        path: `/api/${configuration.apiVersion}/data/1234`,
        method: 'GET',
      })

      .reply(200, result, jsonHeaders);

    const state = {
      configuration,
    };

    const finalState = await getSubmissions('1234')(state);

    expect(finalState.data).to.deep.eql(result);
  });

  it("should get a single form's submission with filters", async () => {
    testServer
      .intercept({
        path: `/api/${configuration.apiVersion}/data/1234`,
        method: 'GET',
        query: {
          query: `{"_submission_time":{"$gte":"2024-11-05"}}`,
          limit: 1,
        },
      })

      .reply(200, result, jsonHeaders);

    const state = {
      configuration,
    };

    const finalState = await getSubmissions('1234', {
      query: `{"_submission_time":{"$gte":"2024-11-05"}}`,
      limit: 1,
    })(state);

    expect(finalState.data).to.deep.eql(result);
  });
});

describe('getSubmission', () => {
  it('should get a single data submission for a single form', async () => {
    testServer
      .intercept({
        path: `/api/${configuration.apiVersion}/data/1234/7783155`,
        method: 'GET',
      })

      .reply(
        200,
        {
          _id: 7783155,
        },
        jsonHeaders
      );

    const state = {
      configuration,
    };

    const finalState = await getSubmission('1234', '7783155')(state);
    expect(finalState.data['_id']).to.deep.eql(7783155);
  });
});

describe('getAttachmentMetadata', () => {
  it('should get a single attatchment metadata', async () => {
    testServer
      .intercept({
        path: `/api/${configuration.apiVersion}/media/621985`,
        method: 'GET',
      })

      .reply(
        200,
        {
          id: 621985,
          xform: 7205,
        },
        jsonHeaders
      );

    const state = {
      configuration,
    };

    const finalState = await getAttachmentMetadata('621985')(state);
    expect(finalState.data.id).to.deep.eql(621985);
  });
});

describe('downloadAttachment', () => {
  it('should download an attachment in binary format', async () => {
    testServer
      .intercept({
        path: `/api/${configuration.apiVersion}/files/622038`,
        method: 'GET',
        query: {
          filename:
            'unicefbih/attachments/7205_primero_face_to_face_feedback/download_1-11_58_4.png',
        },
      })

      .reply(
        200,
        {
          _readableState: {},
          _events: {},
          _eventsCount: 0,
        },
        jsonHeaders
      );

    const state = {
      configuration,
    };

    const finalState = await downloadAttachment('622038', {
      filename:
        'unicefbih/attachments/7205_primero_face_to_face_feedback/download_1-11_58_4.png',
    })(state);
    expect(finalState.data['_eventsCount']).to.deep.eql(0);
  });

  it('should download an attachment in base64 string format', async () => {
    testServer
      .intercept({
        path: `/api/${configuration.apiVersion}/files/622038`,
        method: 'GET',
        query: {
          filename:
            'unicefbih/attachments/7205_primero_face_to_face_feedback/download_1-11_58_4.png',
        },
      })
      .reply(302, undefined, {
        headers: {
          location: 'https://onasreteam.blob.core.windows.net/image/sample',
        },
      });

    const mockBase64 =
      '-aVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQWdBQUFBSUFDQVlBQUFEMGVOVDZBQUFBQVhOU1IwSUE=';

    const state = {
      configuration,
    };

    const finalState = await downloadAttachment('622038', {
      filename:
        'unicefbih/attachments/7205_primero_face_to_face_feedback/download_1-11_58_4.png',
      parseAs: 'base64',
    })(state);

    expect(finalState.data).to.deep.eql(
      encode(mockBase64, { parseJson: false })
    );
  });
});
