// TODO this need to be defined elsewhere, with type definitions behind it
// Either in /tools or in kit
const createEntity = (name, type, props = {}, children) => {
  const { label, datatype, value, ...meta } = props;

  const e = {
    name, // basic identifier (should reflect the id or name in the datasource)
    type, // domain specific type
    addChild: function (e, name) {
      if (!this.children) {
        this.children = name ? {} : [];
      }
      if (name) {
        if (isArray(this.children)) {
          throw new Error('Cannot add a named entity to child array');
        }
        this.children[name] = e;
      } else {
        // will throw if children is an object
        this.children.push(e);
      }
    },
  };

  if (label) {
    e.label = label; // the label to show the user
  }

  if (datatype) {
    e.datatype = datatype; // monaco-facing type
  }

  if (children) {
    e.children = children;
  }

  // ensure meta object or we get problems in jsonpath
  e.meta = meta || {};

  return e;
};

export { createEntity };
