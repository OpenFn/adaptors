import { expect } from 'chai';
import * as undici from 'undici'
import {Readable } from 'node:stream';
import tar from 'tar-stream';
import fs from 'node:fs'
import gunzip from 'gunzip-maybe';
import fixtureData from './fixtures/data.json' assert { type: 'json' }

describe('gzip', () => {
  it('should extract a tarball as json', (cb) => {
    const extract = tar.extract();
    let data = '';

    extract.on('entry', function(header, stream, next) {
      // header.name // filename
      stream.on('data', function(chunk) {
        data += chunk
      });
      
      stream.on('end', function() {
        next();
      });

      stream.resume();
    });

    extract.on('finish', function() {
      const json = JSON.parse(data);
      expect(json).eql(fixtureData)
      cb()
    });
    
    
    fs.createReadStream('./test/fixtures/data.tar').pipe(extract)

  })

  // this is the same as above, but with nicer syntax
  it('should extract a tarball as json with async', async () => {
    const extract = tar.extract();
    let data = '';

    fs.createReadStream('./test/fixtures/data.tar').pipe(extract)

    for await (const entry of extract) {
      console.log(entry.header.name) // filename
      for await (const d of entry) {
        data = d;
      }
      entry.resume();
    }

    const json = JSON.parse(data);
    expect(json).eql(fixtureData)
  });


  // To get this test to pass, you have to run `npx serve` from the fixtures folder
  it('should download and extract a tarball with undici fetch', async () => {
    const response = await undici.fetch('http://localhost:3000/data.tgz')

    // note that we need to extract AND ungzip
    // undici won't gzip the tar itself - a subtle but important distinction here!
    const extract = tar.extract();
    const stream = Readable.from(response.body);
    stream.pipe(gunzip()).pipe(extract);
    
    // This is where we'll save the result data
    const json = {};

    // This iterates over every file in the tarball
    for await (const entry of extract) {
      let jsonString = ''
      // Load the file's json into a string
      for await (const d of entry) {
        jsonString += d;
      }
      // Now parse and save the json to json using the file name
      json[entry.header.name] = JSON.parse(jsonString);

      // Now parse the next file
      entry.resume();
    }

    expect(json).to.eql({ 'data.json': { "message": "hello world"} })
  })
})