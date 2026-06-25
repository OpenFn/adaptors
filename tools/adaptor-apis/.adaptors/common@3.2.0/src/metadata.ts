// Generic entity in a data model
export type Entity = {
  name: string; // the value when inserted
  type: string; // domain-specific type string (eg OrgUnit, sObject)

  label?: string; // human readable label
  datatype?: string; // the javascript type (shown in monaco)
  desc?: string; // a longer description

  children?: Entity[] | Record<string, Entity>;

  // arbitrary extra stuff  goes in the meta object
  meta?: Record<string, any>;

  addChild: (e: Entity, name?: string) => void;
};

// we need to map data types into a standard
// SF's types are UI focused, like picklist, reference, id. They also have string and datetime
// So we need to work out what htis list is
export type DataType = 'string' | 'boolean' | 'date';
