// TODO this need to be defined elsewhere, with type definitions behind it
// Either in /tools or in kit
const createModel = datasource => {
  const m = {
    datasource,
    entities: [],
    addEntity: function (e) {
      this.entities.push(e);
    },
  };

  return m;
};

const createEntity = (name, type, props = {}, children) => {
  const { label, datatype, value, ...meta } = props;

  const e = {
    name, // what is this?
    type, // domain specific type
    label, // the label to show the user
    value, // the thing that's inserted in code. Could be a template?
    datatype, // monaco-facing type
    addEntity: function (e) {
      if (!this.entities) {
        this.entities = [];
      }
      this.entities.push(e);
    },
  };

  if (children) {
    e.entities = children;
  }
  if (meta && Object.keys(meta).length) {
    e.meta = meta;
  }

  return e;
};

export { createModel, createEntity };
