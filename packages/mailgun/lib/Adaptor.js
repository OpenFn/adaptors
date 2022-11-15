"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "alterState", {
  enumerable: true,
  get: function () {
    return _languageCommon.alterState;
  }
});
Object.defineProperty(exports, "beta", {
  enumerable: true,
  get: function () {
    return _languageCommon.beta;
  }
});
Object.defineProperty(exports, "dataPath", {
  enumerable: true,
  get: function () {
    return _languageCommon.dataPath;
  }
});
Object.defineProperty(exports, "dataValue", {
  enumerable: true,
  get: function () {
    return _languageCommon.dataValue;
  }
});
Object.defineProperty(exports, "each", {
  enumerable: true,
  get: function () {
    return _languageCommon.each;
  }
});
exports.execute = execute;
Object.defineProperty(exports, "field", {
  enumerable: true,
  get: function () {
    return _languageCommon.field;
  }
});
Object.defineProperty(exports, "fields", {
  enumerable: true,
  get: function () {
    return _languageCommon.fields;
  }
});
Object.defineProperty(exports, "fn", {
  enumerable: true,
  get: function () {
    return _languageCommon.fn;
  }
});
Object.defineProperty(exports, "lastReferenceValue", {
  enumerable: true,
  get: function () {
    return _languageCommon.lastReferenceValue;
  }
});
Object.defineProperty(exports, "merge", {
  enumerable: true,
  get: function () {
    return _languageCommon.merge;
  }
});
exports.send = send;
Object.defineProperty(exports, "sourceValue", {
  enumerable: true,
  get: function () {
    return _languageCommon.sourceValue;
  }
});

var _languageCommon = require("@openfn/language-common");

var _mailgunJs = _interopRequireDefault(require("mailgun-js"));

var _syncRequest = _interopRequireDefault(require("sync-request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @module Adaptor */
// NOTE: We can use sync-request because the Node sandbox the client uses will
// be killed after 300s, regardless of whether this succeeds, fails, or hangs.

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for mailgun.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
 * )(state)
 * @constructor
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 */
function execute(...operations) {
  const initialState = {
    references: [],
    data: null
  };
  return state => {
    return (0, _languageCommon.execute)(...operations)({ ...initialState,
      ...state
    });
  };
}
/**
 * Create an event
 * @public
 * @example
 * send({
 *   from: 'from_email',
 *   to: 'to_email',
 *   subject: 'Your Subject',
 *   text: 'Your message goes here',
 *   attachment: {
 *     url: 'www.google.com/doodle.png',
 *     filename: 'forYou.png',
 *   },
 * })
 * @function
 * @param {object} params - Params for sending an email
 */


function send(params) {
  return state => {
    const body = (0, _languageCommon.expandReferences)(params)(state);
    const {
      apiKey,
      domain
    } = state.configuration;
    const mailgun = new _mailgunJs.default({
      apiKey: apiKey,
      domain: domain
    });

    if (body.attachment) {
      const response = (0, _syncRequest.default)("GET", body.attachment.url);
      console.log(response);
      var attch = new mailgun.Attachment({
        data: response.body,
        filename: body.attachment.filename
      });
      body.attachment = attch;
    }

    console.log("Sending mail:");
    return new Promise((resolve, reject) => {
      mailgun.messages().send(body, (error, response) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          console.log(response);
          resolve(response);
        }
      });
    }).then(response => {
      const nextState = (0, _languageCommon.composeNextState)(state, response);
      return nextState;
    });
  };
}