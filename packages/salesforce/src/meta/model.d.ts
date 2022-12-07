// Generic entity in a data model
type Entity = {
  type: string;
  name: string;

  // human readable definitions
  label?: string;
  desc?: string;
  shortDesc?: string;

  datatype?: string;

  entities?: Entity[];

  // arbitrary extra stuff  goes in the meta object
  meta?: Record<string, any>;

  addEntity: (e: Entity) => void;
};

type Model = {
  datasource: string; // ie salesforce
  name?: string;

  // this is the actual tree of data
  entities: Entity[];

  addEntity: (e: Entity) => void;
};
