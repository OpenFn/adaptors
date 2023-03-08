exports.defineTags = dictionary => {
  dictionary.defineTag('magic', {
    canHaveName: true,
    mustHaveValue: true,
    onTagged: (doclet, tag) => {
      const param = doclet.params.find(({ name }) => name == tag.value.name);
      if (param) {
        param.magic = tag.value.description;
      }
    },
  });
};
