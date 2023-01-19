exports.defineTags = dictionary => {
  dictionary.defineTag('paramlookup', {
    canHaveName: true,
    mustHaveValue: true,
    onTagged: (doclet, tag) => {
      const param = doclet.params.find(({ name }) => name == tag.value.name);
      if (param) {
        param.lookup = tag.value.description;
      }
    },
  });
};
