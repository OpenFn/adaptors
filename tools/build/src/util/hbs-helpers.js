const handlebars = require('handlebars');

exports.toLowerCase = function (str) {
  return str ? str.toLowerCase() : str;
};

exports.commonFns = function(options) {
  options.hash.scope = 'global'
  const common = () => handlebars.helpers._identifiers(options).filter((o) => {
    return o.common
  }, options)

  return handlebars.helpers.each(common, options)

};
