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

const createEntity = (name, type, props = {}, children = []) => {
  const { label, datatype, ...meta } = props;

  const e = {
    name,
    type,
    label,
    datatype,
    meta,
    entities: [],
    addEntity: function (e) {
      this.entities.push(e);
    },
  };

  return e;
};

export { createModel, createEntity };
