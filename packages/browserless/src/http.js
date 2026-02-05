import * as util from './Utils.js';
import { expandReferences } from '@openfn/language-common/util';

const req = function (method, url, options) {
  return async state => {
    const [resolvedMethod, resolvedUrl, resolvedOptions] = expandReferences(
      state,
      method,
      url,
      options
    );

    const response = await util.request(state.configuration, resolvedMethod, resolvedUrl, resolvedOptions);
    const { body, ...responseWithoutBody } = response;
    return {
      ...state,
      response: responseWithoutBody,
      data: body,
    };
  };
};
export { req as request };
