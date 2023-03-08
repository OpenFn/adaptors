export type Dhis2Attribute = {
  /**
   * The attribute id
   * @magic $.children.attributes[*]
   */
  attribute: string;

  value: any;
};

export type Dhis2Data = {
  /**
   * The id of an organisation unit
   * @magic $.children.orgUnits[*]
   */
  orgUnit?: string;

  /**
   * Tracked instance id
   */
  trackedEntityInstance?: string;

  /**
   * Tracked instance type
   * @magic $.children.trackedEntityTypes[*]
   */
  trackedEntityType?: string;

  /**
   * List of attributes
   */
  attributes?: Dhis2Attribute[];
};
