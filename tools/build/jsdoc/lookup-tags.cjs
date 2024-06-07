exports.defineTags = dictionary => {
  dictionary.defineTag('state', {
    canHaveName: true,
    mustHaveValue: true,
    onTagged: (doclet, tag) => {
      if (!doclet.state) {
        doclet.state = [];
      }
      doclet.state.push({
        name: tag.value.name,
        description: tag.value.description,
      });
    },
  });
};
