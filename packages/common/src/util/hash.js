import { createHash, getHashes } from 'node:crypto';

const DEFAULT_ALGORITHM = 'sha256';

const resolveAlgorithm = input => {
  const requested = String(input ?? DEFAULT_ALGORITHM)
    .trim()
    .toLowerCase();
  const available = getHashes();
  const match = [requested, requested.replace(/[\s_-]/g, '')].find(candidate =>
    available.includes(candidate),
  );

  if (!match) {
    throw new Error(
      `util.hash: unsupported algorithm "${input}". ` +
        `Common options: sha256, sha512, sha3-256, sha1, md5. ` +
        `This runtime supports: ${available.slice(0, 12).join(', ')}...`,
    );
  }
  return match;
};

const stableStringify = value => {
  if (value === undefined) return 'null';
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;

  const entries = Object.keys(value)
    .sort()
    .filter(key => value[key] !== undefined)
    .map(key => `${JSON.stringify(key)}:${stableStringify(value[key])}`);
  return `{${entries.join(',')}}`;
};

const serialize = (data, stable) => {
  if (data === null || data === undefined) {
    throw new Error('util.hash: data is required');
  }
  if (typeof data === 'string') return data;
  if (Buffer.isBuffer(data) || ArrayBuffer.isView(data)) return data;
  if (typeof data === 'object') {
    return stable ? stableStringify(data) : JSON.stringify(data);
  }
  return String(data);
};

/**
 * Generate a cryptographic hash of a string, object or buffer.
 *
 * Objects are serialized to JSON with their keys sorted, so the digest is
 * stable across key orderings - important when hashing a payload to build an
 * idempotency or deduplication key. Pass `{ stable: false }` to hash the
 * plain `JSON.stringify` output instead.
 *
 * Note this is a one-way digest, unlike `util.encode`, which is reversible
 * base64.
 * @public
 * @function
 * @example <caption>Hash a string with the default algorithm (sha256)</caption>
 * util.hash('hello world')
 * @example <caption>Choose an algorithm</caption>
 * util.hash('hello world', 'sha512')
 * @example <caption>Build a deduplication key from a payload</caption>
 * const key = `obs:${util.hash({ sender: state.data.sender, body: state.data.content })}`
 * @example <caption>Base64url output, for use in a URL or filename</caption>
 * util.hash(state.data, 'sha256', { encoding: 'base64url' })
 * @param {string|object|Buffer} data - The data to hash. Objects are
 *   serialized with sorted keys unless `stable` is false.
 * @param {string} [algorithm=sha256] - Any digest this runtime supports, eg
 *   sha256, sha512, sha3-256, sha1, md5. Case and hyphens are forgiving:
 *   'SHA-256' and 'sha256' are the same.
 * @param {object} [options]
 * @param {string} [options.encoding=hex] - Output encoding: hex, base64 or
 *   base64url.
 * @param {boolean} [options.stable=true] - Sort object keys before hashing.
 * @returns {string} The digest of the data.
 */
export function hash(data, algorithm = DEFAULT_ALGORITHM, options = {}) {
  const { encoding = 'hex', stable = true } = options;

  if (!['hex', 'base64', 'base64url'].includes(encoding)) {
    throw new Error(
      `util.hash: unsupported encoding "${encoding}". Use hex, base64 or base64url.`,
    );
  }

  return createHash(resolveAlgorithm(algorithm))
    .update(serialize(data, stable))
    .digest(encoding);
}

/**
 * Generate a sha256 hash of a string, object or buffer. Shorthand for
 * `util.hash(data, 'sha256')`.
 * @public
 * @function
 * @example <caption>Hash a string</caption>
 * util.sha256('hello world')
 * @param {string|object|Buffer} data - The data to hash.
 * @param {object} [options] - Same options as util.hash.
 * @returns {string} The sha256 digest, hex encoded by default.
 */
export function sha256(data, options = {}) {
  return hash(data, 'sha256', options);
}
