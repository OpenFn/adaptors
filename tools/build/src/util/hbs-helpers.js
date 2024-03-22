const handlebars = require('handlebars');

exports.toLowerCase = function (str) {
  return str ? str.toLowerCase() : str;
};

// const common = () => {
//   return options.data.root.filter(function (o) {
//     console.log(o)
//     return true;
//   //   if (identifier.kind === 'external') {
//   //     return identifier.description && identifier.description.length > 0
//   //   } else {
//   //     return true
//   //   }
//   // })
// }

exports.commonFns = function(options) {
  options.hash.scope = 'global'
  const common = () => handlebars.helpers._identifiers(options).filter((o) => {
    return o.common
  }, options)

  return handlebars.helpers.each(common, options)

};
