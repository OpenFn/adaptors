/**
 * Test template utils from outside the template dir
 * 
 * This means that generated adaptors don't include these tests, which is probably good
 * 
 * Also tests here use ava, not mocha. But maybe that's not so good
 */
import test from 'ava';

import * as util from '../../template/src/util'

// TODO how similar are value sets?
// Are they always for Codings, or for differnet structures?

test('set and lookup a default value set', (t) => {
  util.setValues('http://www/fhir/ValueSet/PersonIdentifiersVS', {
    "PI": {
      "code": "PI",
      "display": "Personal ID Number",
      "system": "https://www/fhir/CodeSystem/SzPersonIdentificationsCS",
    }
  }, 'default')

  const result = util.lookupValue('http://www/fhir/ValueSet/PersonIdentifiersVS', 'PI')

  t.deepEqual(result, {
    "code": "PI",
    "display": "Personal ID Number",
    "system": "https://www/fhir/CodeSystem/SzPersonIdentificationsCS",
  })
})

test('set and lookup a user value set', (t) => {
  util.setValues('http://www/fhir/ValueSet/PersonIdentifiersVS', {
    "PI": {
      "code": "PI",
      "display": "Personal ID Number",
      "system": "https://www/fhir/CodeSystem/SzPersonIdentificationsCS",
    }
  }, 'user')

  const result = util.lookupValue('http://www/fhir/ValueSet/PersonIdentifiersVS', 'PI')

  t.deepEqual(result, {
    "code": "PI",
    "display": "Personal ID Number",
    "system": "https://www/fhir/CodeSystem/SzPersonIdentificationsCS",
  })
})

test('map user set before default set', (t) => {
  // Set a default mapping (the adaptor would do this)
  util.setValues('http://www/fhir/ValueSet/PersonIdentifiersVS', {
    "PI": {
      "code": "PI",
      "display": "Personal ID Number",
      "system": "https://www/fhir/CodeSystem/SzPersonIdentificationsCS",
    }
  }, 'default')

  // The user, in job code, sets a mapping from some custom value to a default mapping
  util.setValues('http://www/fhir/ValueSet/PersonIdentifiersVS', {
    "PersonalIdentifier": "PI"
  }, 'user')


  // Now map the custom value...
  const result = util.lookupValue('http://www/fhir/ValueSet/PersonIdentifiersVS', 'PersonalIdentifier')

  // Which should resolve to the system-mapped coding. Hurrah!
  t.deepEqual(result, {
    "code": "PI",
    "display": "Personal ID Number",
    "system": "https://www/fhir/CodeSystem/SzPersonIdentificationsCS",
  })
})