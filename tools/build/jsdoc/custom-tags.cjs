const defaults = require('./state-defaults.cjs');

exports.defineTags = dictionary => {
  dictionary.defineTag('state', {
    canHaveName: true,
    canHaveType: true,
    onTagged: (doclet, tag) => {
      if (!doclet.state) {
        doclet.state = [];
      }
      doclet.state.push({
        name: tag.value.name,
        description:
          tag.value.description ?? defaults[tag.value.name] ?? 'No description',
        type: tag.value.type?.names[0],
      });
    },
  });
};
