// look up the

import { expect } from 'chai';
import data from './sample-data.json';

// This should be defined in tools
// It'll lookup a js file, read the jsdoc, and return an indexed object with query strings
// this needs a bunch of unit tests itsself cause it aint easy
const loadQueries = path => {};

describe('Salesforce lookup tests', () => {
  const queries = loadQueries();

  it('should list sobjects', () => {
    const results = jq.query(data, queries.upsert.params.sobject);

    expect(results.length).toEqual(2);
  });
});
