const handlebars = require('handlebars');

exports.toLowerCase = function (str) {
  return str ? str.toLowerCase() : str;
};

exports.commonFns = function (options) {
  options.hash.scope = 'global';
  const common = () =>
    handlebars.helpers._identifiers(options).filter(o => {
      return o.common;
    }, options);

  return handlebars.helpers.each(common, options);
};

// exports.findById = function (options, id) {
//   options.hash.scope = 'global';
//   return handlebars.helpers._identifiers(options).find(o => {
//     return o.id === id;
//   }, options);
// };

exports.findById = function (id, options) {
  const result = options.data.root.find(o => {
    return o.id === id;
  });
  return options.fn(result);

  // const x = options.data.root.find(o => {
  //   return o.id === id;
  // });
  // return JSON.stringify(x);
  // return JSON.stringify(id);
};
