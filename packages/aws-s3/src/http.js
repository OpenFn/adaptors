import { request as commonRequest } from '@openfn/language-common/util';

/**
 * Minimal HTTP request helper that delegates to the common request util.
 * This file is optional for the aws-s3 adaptor (which uses the AWS SDK),
 * but provides a small generic wrapper if consumers prefer a plain HTTP
 * request helper for REST APIs.
 */
export const request = (configuration = {}, method, path, options = {}) => {
  const opts = {
    baseUrl: configuration.baseUrl,
    ...options,
  };
  return commonRequest(method, path, opts);
};

export default { request };
