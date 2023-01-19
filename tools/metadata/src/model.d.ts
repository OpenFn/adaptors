// Generic entity in a data model
type Entity = {
  type: string;
  name: string;

  // Is this system/admin entity?
  system?: boolean;

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

// we need to map data types into a standard
// SF's types are UI focused, like picklist, reference, id. They also have string and datetime
// So we need to work out what htis list is
type DataType = 'string' | 'boolean' | 'date';
