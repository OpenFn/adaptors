import { expect } from 'chai';
import { validateUploadUrl } from '../src/validateUrl.js';

describe('validateUploadUrl', () => {
  describe('when validateUploadUrl is not true', () => {
    it('returns without validating', () => {
      expect(() =>
        validateUploadUrl('http://evil.local/foo', {})
      ).to.not.throw();
      expect(() =>
        validateUploadUrl('', { validateUploadUrl: false })
      ).to.not.throw();
    });
  });

  describe('when validateUploadUrl is true', () => {
    const config = { validateUploadUrl: true };

    it('throws on empty URL', () => {
      expect(() => validateUploadUrl('', config)).to.throw(
        'audio_file_blob URL is required when passing a URL'
      );
      expect(() => validateUploadUrl('   ', config)).to.throw(
        'audio_file_blob URL is required when passing a URL'
      );
    });

    it('throws when URL exceeds max length', () => {
      const long = 'https://example.com/' + 'a'.repeat(2048);
      expect(() => validateUploadUrl(long, config)).to.throw(
        'must not exceed 2048 characters'
      );
    });

    it('throws on invalid URL format', () => {
      expect(() => validateUploadUrl('not-a-url', config)).to.throw(
        'valid URL format'
      );
      expect(() => validateUploadUrl('https://', config)).to.throw(
        'valid URL format'
      );
    });

    it('throws on HTTP (requires HTTPS)', () => {
      expect(() =>
        validateUploadUrl('http://example.com/audio.wav', config)
      ).to.throw('must use HTTPS');
    });

    it('throws on IP-based hostname (IPv4)', () => {
      expect(() =>
        validateUploadUrl('https://192.168.1.1/audio.wav', config)
      ).to.throw('IP-based URLs are not allowed');
      expect(() =>
        validateUploadUrl('https://8.8.8.8/file.wav', config)
      ).to.throw('IP-based URLs are not allowed');
    });

    it('throws on IP-based hostname (IPv6)', () => {
      expect(() =>
        validateUploadUrl('https://[::1]/audio.wav', config)
      ).to.throw('IP-based URLs are not allowed');
    });

    it('throws on internal/private hostnames (non-IP)', () => {
      expect(() =>
        validateUploadUrl('https://localhost/audio.wav', config)
      ).to.throw('Internal or private URLs are not allowed');
      expect(() =>
        validateUploadUrl('https://myserver.local/audio.wav', config)
      ).to.throw('Internal or private URLs are not allowed');
    });

    it('throws on IP hostnames (IPv4; checked before internal)', () => {
      expect(() =>
        validateUploadUrl('https://127.0.0.1/audio.wav', config)
      ).to.throw('IP-based URLs are not allowed');
      expect(() =>
        validateUploadUrl('https://0.0.0.0/audio.wav', config)
      ).to.throw('IP-based URLs are not allowed');
      expect(() =>
        validateUploadUrl('https://10.0.0.1/audio.wav', config)
      ).to.throw('IP-based URLs are not allowed');
      expect(() =>
        validateUploadUrl('https://172.16.0.1/audio.wav', config)
      ).to.throw('IP-based URLs are not allowed');
    });

    it('does not throw on valid HTTPS URL with public hostname', () => {
      expect(() =>
        validateUploadUrl('https://example.com/audio.wav', config)
      ).to.not.throw();
      expect(() =>
        validateUploadUrl('https://bucket.s3.amazonaws.com/path/file.wav', config)
      ).to.not.throw();
    });

    it('throws when allowedUrlDomains is set and host not in list', () => {
      const withAllowlist = {
        ...config,
        allowedUrlDomains: ['s3.amazonaws.com', 'sharepoint.com'],
      };
      expect(() =>
        validateUploadUrl('https://evil.com/audio.wav', withAllowlist)
      ).to.throw('URL host is not in the allowed list');
      expect(() =>
        validateUploadUrl('https://example.com/audio.wav', withAllowlist)
      ).to.throw('URL host is not in the allowed list');
    });

    it('does not throw when host matches allowlist (exact or subdomain)', () => {
      const withAllowlist = {
        ...config,
        allowedUrlDomains: ['s3.amazonaws.com', 'sharepoint.com'],
      };
      expect(() =>
        validateUploadUrl('https://s3.amazonaws.com/bucket/file.wav', withAllowlist)
      ).to.not.throw();
      expect(() =>
        validateUploadUrl(
          'https://my-bucket.s3.amazonaws.com/path/file.wav',
          withAllowlist
        )
      ).to.not.throw();
      expect(() =>
        validateUploadUrl('https://sharepoint.com/site/file.wav', withAllowlist)
      ).to.not.throw();
    });

    it('throws when allowedUrlExtensions is set and path does not end with one', () => {
      const withExt = {
        ...config,
        allowedUrlExtensions: ['.wav', '.mp3'],
      };
      expect(() =>
        validateUploadUrl('https://example.com/audio.mp4', withExt)
      ).to.throw('URL path must end with one of');
      expect(() =>
        validateUploadUrl('https://example.com/audio', withExt)
      ).to.throw('URL path must end with one of');
    });

    it('does not throw when path ends with allowed extension (case-insensitive)', () => {
      const withExt = {
        ...config,
        allowedUrlExtensions: ['.wav', '.mp3'],
      };
      expect(() =>
        validateUploadUrl('https://example.com/audio.wav', withExt)
      ).to.not.throw();
      expect(() =>
        validateUploadUrl('https://example.com/audio.WAV', withExt)
      ).to.not.throw();
      expect(() =>
        validateUploadUrl('https://example.com/audio.mp3', withExt)
      ).to.not.throw();
    });

    it('throws when requireExpiryParam is true and URL has no expiry param', () => {
      const withExpiry = { ...config, requireExpiryParam: true };
      expect(() =>
        validateUploadUrl('https://example.com/audio.wav', withExpiry)
      ).to.throw('expiry parameter');
    });

    it('does not throw when requireExpiryParam is true and URL has expiry param', () => {
      const withExpiry = { ...config, requireExpiryParam: true };
      expect(() =>
        validateUploadUrl(
          'https://example.com/audio.wav?X-Amz-Expires=3600',
          withExpiry
        )
      ).to.not.throw();
      expect(() =>
        validateUploadUrl(
          'https://example.com/audio.wav?Expires=1234567890',
          withExpiry
        )
      ).to.not.throw();
    });
  });
});
