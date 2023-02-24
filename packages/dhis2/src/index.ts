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

// apparently we can't just export * from index.js, we have to re-export. Bit of a bummer.
import * as Adaptor from './Adaptor';
export default Adaptor;

export * from './Adaptor';
