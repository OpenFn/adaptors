export type Dhis2Attribute = {
  /**
   * The attribute id
   * @lookup $.children.attributes[*]
   */
  attribute: string;

  value: any;
};
