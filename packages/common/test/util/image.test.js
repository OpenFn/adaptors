import { expect } from 'chai';
import sharp from 'sharp';
import {
  metadata,
  resize,
  compress,
  strip,
  exifRead,
  exifWrite,
} from '../../src/util/image.js';

let testImageBuffer;

before(async () => {
  testImageBuffer = await sharp({
    create: {
      width: 100,
      height: 100,
      channels: 3,
      background: { r: 255, g: 0, b: 0 },
    },
  })
    .jpeg()
    .toBuffer();
});

describe('image util: metadata', () => {
  it('should return metadata object for a valid image', async () => {
    const meta = await metadata(testImageBuffer);
    expect(meta).to.be.an('object');
  });

  it('should return correct width and height', async () => {
    const meta = await metadata(testImageBuffer);
    expect(meta.width).to.equal(100);
    expect(meta.height).to.equal(100);
  });

  it('should return correct format', async () => {
    const meta = await metadata(testImageBuffer);
    expect(meta.format).to.equal('jpeg');
  });
});

describe('image util: resize', () => {
  it('should return a Buffer', async () => {
    const result = await resize(testImageBuffer, { width: 50, height: 50 });
    expect(result).to.be.instanceOf(Buffer);
  });

  it('should resize to specified width and height', async () => {
    const result = await resize(testImageBuffer, { width: 50, height: 50 });
    const meta = await sharp(result).metadata();
    expect(meta.width).to.equal(50);
    expect(meta.height).to.equal(50);
  });

  it('should default fit to cover when not specified', async () => {
    const result = await resize(testImageBuffer, { width: 40, height: 60 });
    const meta = await sharp(result).metadata();
    expect(meta.width).to.equal(40);
    expect(meta.height).to.equal(60);
  });

  it('should output a JPEG buffer', async () => {
    const result = await resize(testImageBuffer, { width: 50, height: 50 });
    const meta = await sharp(result).metadata();
    expect(meta.format).to.equal('jpeg');
  });
});

describe('image util: compress', () => {
  it('should return a Buffer', async () => {
    const result = await compress(testImageBuffer, 80);
    expect(result).to.be.instanceOf(Buffer);
  });

  it('should produce a smaller buffer at lower quality', async () => {
    const highQuality = await compress(testImageBuffer, 95);
    const lowQuality = await compress(testImageBuffer, 5);
    expect(lowQuality.length).to.be.lessThan(highQuality.length);
  });

  it('should output a JPEG buffer', async () => {
    const result = await compress(testImageBuffer, 80);
    const meta = await sharp(result).metadata();
    expect(meta.format).to.equal('jpeg');
  });
});

describe('image util: strip', () => {
  it('should return a Buffer', async () => {
    const result = await strip(testImageBuffer);
    expect(result).to.be.instanceOf(Buffer);
  });

  it('should preserve image dimensions', async () => {
    const result = await strip(testImageBuffer);
    const meta = await sharp(result).metadata();
    expect(meta.width).to.equal(100);
    expect(meta.height).to.equal(100);
  });
});

describe('image util: exifRead', () => {
  it('should return an object', async () => {
    const tags = await exifRead(testImageBuffer);
    expect(tags).to.be.an('object');
  });

  it('should include SourceFile in the returned tags', async () => {
    const tags = await exifRead(testImageBuffer);
    expect(tags).to.have.property('SourceFile');
  });
});

describe('image util: exifWrite', () => {
  it('should return a Buffer', async () => {
    const result = await exifWrite(testImageBuffer, { Comment: 'test' });
    expect(result).to.be.instanceOf(Buffer);
  });

  it('should write a comment field readable by exifRead', async () => {
    const result = await exifWrite(testImageBuffer, {
      ImageDescription: 'hello',
    });
    const tags = await exifRead(result);
    expect(tags.ImageDescription).to.equal('hello');
  });
});
