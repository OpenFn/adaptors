// TODO need complete typings to stop typedocs exploding
declare global {
  type Operation = any;
  type Operations = Operation[];
  type DataSource = any;
  type Integer = any;
  type State = any;
  type Field = any;
  type Fields = any;
  type Value = any;
}

export type Dhis2Attribute = {
  /**
   * The attribute id
   * @lookup $.children.attributes[*]
   */
  attribute: string;

  value: any;
};

export type Dhis2Data = {
  /**
   * The id of an organisation unit
   * @lookup $.children.orgUnits[*]
   */
  orgUnit?: string;

  /**
   * Tracked instance id
   */
  trackedEntityInstance?: string;

  /**
   * Tracked instance type
   * @lookup $.children.trackedEntityTypes[*]
   */
  trackedEntityType?: string;

  /**
   * List of attributes
   */
  attributes?: Dhis2Attribute[];
};
