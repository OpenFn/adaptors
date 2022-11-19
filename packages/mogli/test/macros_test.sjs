var assert = require('assert');

describe('macros', function() {
  describe('field', function () {
    it('creates an object', function () {
      var obj = field("fieldName","value");
      assert.equal("value", obj["fieldName"]);
    });
  });
});

