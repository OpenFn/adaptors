/**
 * Lightweight URL validation for audio_file_blob upload URLs.
 * Sync, in-memory only — no network or file I/O. Used when configuration.validateUploadUrl is true.
 * @see plan: Sahara lightweight URL validation (validateUrl.js)
 */

const MAX_URL_LENGTH = 2048;

/** IPv4 octet pattern; full match implies valid dotted quad */
const IPV4_REGEX = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;

function isIPv4(hostname) {
  const m = hostname.match(IPV4_REGEX);
  if (!m) return false;
  return m.slice(1, 5).every(octet => {
    const n = parseInt(octet, 10);
    return n >= 0 && n <= 255;
  });
}

function isIPv6(hostname) {
  return hostname.includes(':');
}

function isPrivateIPv4(hostname) {
  const m = hostname.match(IPV4_REGEX);
  if (!m) return false;
  const [a, b, c] = m.slice(1, 5).map(s => parseInt(s, 10));
  if (a === 10) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  return false;
}

function isInternalHost(hostname) {
  const lower = hostname.toLowerCase();
  if (lower === 'localhost') return true;
  if (lower === '127.0.0.1' || lower === '0.0.0.0' || lower === '[::1]') return true;
  if (lower.endsWith('.local')) return true;
  if (isIPv4(hostname) && isPrivateIPv4(hostname)) return true;
  return false;
}

function hostnameMatchesAllowlist(hostname, allowedDomains) {
  const lower = hostname.toLowerCase();
  for (const domain of allowedDomains) {
    const d = domain.toLowerCase().trim();
    if (!d) continue;
    if (lower === d) return true;
    if (lower.endsWith('.' + d)) return true;
  }
  return false;
}

function pathnameEndsWithExtension(pathname, allowedExtensions) {
  const lower = pathname.toLowerCase();
  for (const ext of allowedExtensions) {
    const e = ext.startsWith('.') ? ext.toLowerCase() : '.' + ext.toLowerCase();
    if (lower.endsWith(e)) return true;
  }
  return false;
}

/**
 * Validate an upload URL when configuration.validateUploadUrl is true.
 * Throws on failure; no return value on success.
 * @param {string} urlString - The URL to validate (e.g. audio_file_blob value)
 * @param {object} configuration - Adaptor configuration (validateUploadUrl, allowedUrlDomains, etc.)
 * @throws {Error} When URL is invalid or fails any check
 */
export function validateUploadUrl(urlString, configuration = {}) {
  if (configuration.validateUploadUrl !== true) {
    return;
  }

  const trimmed = typeof urlString === 'string' ? urlString.trim() : String(urlString ?? '').trim();
  if (!trimmed) {
    throw new Error('audio_file_blob URL is required when passing a URL');
  }

  if (trimmed.length > MAX_URL_LENGTH) {
    throw new Error(`audio_file_blob URL must not exceed ${MAX_URL_LENGTH} characters`);
  }

  let parsed;
  try {
    parsed = new URL(trimmed);
  } catch (_) {
    throw new Error('audio_file_blob must be a valid URL format');
  }

  if (parsed.protocol !== 'https:') {
    throw new Error('audio_file_blob URL must use HTTPS');
  }

  const hostname = parsed.hostname;
  if (isIPv4(hostname) || isIPv6(hostname)) {
    throw new Error('IP-based URLs are not allowed');
  }

  if (isInternalHost(hostname)) {
    throw new Error('Internal or private URLs are not allowed');
  }

  const allowedDomains = configuration.allowedUrlDomains;
  if (Array.isArray(allowedDomains) && allowedDomains.length > 0) {
    if (!hostnameMatchesAllowlist(hostname, allowedDomains)) {
      throw new Error('URL host is not in the allowed list');
    }
  }

  const allowedExtensions = configuration.allowedUrlExtensions;
  if (Array.isArray(allowedExtensions) && allowedExtensions.length > 0) {
    if (!pathnameEndsWithExtension(parsed.pathname, allowedExtensions)) {
      throw new Error(
        `URL path must end with one of: ${allowedExtensions.join(', ')} (weak hint only; actual file type is validated by the backend)`
      );
    }
  }

  if (configuration.requireExpiryParam === true) {
    const hasExpiry =
      parsed.searchParams.has('X-Amz-Expires') ||
      parsed.searchParams.has('Expires') ||
      parsed.searchParams.has('expires');
    if (!hasExpiry) {
      throw new Error('URL must include an expiry parameter (e.g. X-Amz-Expires or Expires)');
    }
  }
}
