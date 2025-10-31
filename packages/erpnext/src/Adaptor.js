import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import { FrappeApp } from 'frappe-js-sdk';

let frappeClient = null;

/**
 * State object
 * @typedef {Object} ERPNextState
 * @property data - The response body (as JSON)
 * @property response - The HTTP response from the ERPNext server (excluding the body)
 * @property references - An array of all previous data objects used in the Job
 * @private
 */

/**
 * Options object for list operations
 * @typedef {Object} ListOptions
 * @property {object} filters - Filters to apply to the query (e.g., `{ status: 'Open' }`).
 * @property {string[]} fields - Array of field names to return (e.g., `['name', 'status']`).
 * @property {number} limit - Maximum number of records to return. Defaults to `1000`.
 * @property {number} offset - Number of records to skip. Defaults to `0`.
 * @property {string} orderBy - Field to sort by with direction (e.g., `'creation desc'`).
 * @see {@link https://frappeframework.com/docs/user/en/api/database#get-list Frappe Database API}
 */

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute` to make working with this API easier.
 * @example
 * execute(
 *   create('Customer', { customer_name: 'Acme Corp' }),
 *   getList('Sales Order', { filters: { status: 'Draft' } })
 * )(state)
 * @private
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 */
export function execute(...operations) {
  const initialState = {
    references: [],
    data: null,
  };

  return state => {
    return commonExecute(login, ...operations)({ ...initialState, ...state });
  };
}

/**
 * Helper function for testing - allows setting a mock client
 * @example
 * setMockClient(mockFrappeClient)
 * @function
 * @private
 * @param {object} mock - Mock client object
 * @returns {void}
 */
export function setMockClient(mock) {
  frappeClient = mock;
}

/**
 * Logs in to ERPNext and initializes the Frappe client.
 * Uses API Key and Secret for token-based authentication.
 * @example
 *  login(state)
 * @private
 * @param {State} state - Runtime state.
 * @returns {State}
 */
async function login(state) {
  const { baseUrl, apiKey, apiSecret } = state.configuration;

  try {
    if (!apiKey || !apiSecret) {
      throw new Error(
        'Authentication credentials not provided. Please provide both apiKey and apiSecret.'
      );
    }

    console.log('Authenticating with API Key...');
    // Use token-based authentication with API Key and Secret
    const token = `${apiKey}:${apiSecret}`;
    frappeClient = new FrappeApp(baseUrl, {
      useToken: true,
      token: () => token,
      type: 'token',
    });
    console.log('✓ Successfully authenticated to ERPNext');
  } catch (err) {
    console.error(`✗ Authentication Error: ${err.message}`);
    frappeClient = null;
    throw err;
  }

  return state;
}

/**
 * Create a document in ERPNext. Returns the complete created document with all fields.
 * @public
 * @example <caption>Create a customer record</caption>
 * create('Customer', {
 *   customer_name: 'Acme Corporation',
 *   customer_type: 'Company'
 * });
 * @example <caption>Create with data from state</caption>
 * create('Sales Order', $.orderData);
 * @example <caption>Create an item with multiple fields</caption>
 * create('Item', {
 *   item_code: 'ITEM-001',
 *   item_name: 'Sample Product',
 *   item_group: 'Products',
 *   stock_uom: 'Nos'
 * });
 * @function
 * @param {string} doctype - The doctype to create (e.g., "Customer", "Sales Order")
 * @param {object} data - The document data as JSON
 * @state {ERPNextState}
 * @returns {Operation}
 */
export function create(doctype, data) {
  return async state => {
    const [resolvedDoctype, resolvedData] = expandReferences(
      state,
      doctype,
      data
    );

    console.log(`Creating ${resolvedDoctype} document...`);

    try {
      const response = await frappeClient
        .db()
        .createDoc(resolvedDoctype, resolvedData);

      return composeNextState(state, response);
    } catch (error) {
      console.error(`Error creating ${resolvedDoctype}: ${error.message}`);
      throw error;
    }
  };
}

/**
 * Read a document from ERPNext by name/ID. Returns the complete document with all fields.
 * Note: For field selection, use getList() with filters instead.
 * @public
 * @example <caption>Read a customer by name</caption>
 * read('Customer', 'CUST-00001');
 * @example <caption>Read from state data</caption>
 * read('Item', $.data.item_code);
 * @example <caption>Read a sales order</caption>
 * read('Sales Order', $.orderId);
 * @function
 * @param {string} doctype - The doctype to read from (e.g., "Customer", "Sales Order")
 * @param {string} name - The document name/ID to read
 * @state {ERPNextState}
 * @returns {Operation}
 */
export function read(doctype, name) {
  return async state => {
    const [resolvedDoctype, resolvedName] = expandReferences(
      state,
      doctype,
      name
    );

    console.log(`Reading ${resolvedDoctype} document: ${resolvedName}...`);

    try {
      const response = await frappeClient.db().getDoc(resolvedDoctype, resolvedName);

      return composeNextState(state, response);
    } catch (error) {
      console.error(`Error reading ${resolvedDoctype}: ${error.message}`);
      throw error;
    }
  };
}

/**
 * Update a document in ERPNext
 * @public
 * @example <caption>Update a customer's details</caption>
 * update('Customer', 'CUST-00001', {
 *   customer_name: 'Updated Corp Name',
 *   mobile_no: '+1234567890'
 * });
 * @example <caption>Update using state data</caption>
 * update('Sales Order', $.data.order_id, {
 *   status: 'Confirmed'
 * });
 * @example <caption>Update multiple fields</caption>
 * update('Item', 'ITEM-001', {
 *   item_name: 'Updated Product Name',
 *   standard_rate: 150.00,
 *   description: 'Updated description'
 * });
 * @function
 * @param {string} doctype - The doctype to update (e.g., "Customer", "Sales Order")
 * @param {string} name - The document name/ID to update
 * @param {object} data - The fields to update as JSON
 * @state {ERPNextState}
 * @returns {Operation}
 */
export function update(doctype, name, data) {
  return async state => {
    const [resolvedDoctype, resolvedName, resolvedData] = expandReferences(
      state,
      doctype,
      name,
      data
    );

    console.log(`Updating ${resolvedDoctype} document: ${resolvedName}...`);

    try {
      const response = await frappeClient
        .db()
        .updateDoc(resolvedDoctype, resolvedName, resolvedData);

      return composeNextState(state, response);
    } catch (error) {
      console.error(`Error updating ${resolvedDoctype}: ${error.message}`);
      throw error;
    }
  };
}

/**
 * Delete a document from ERPNext
 * @public
 * @example <caption>Delete a customer</caption>
 * deleteRecord('Customer', 'CUST-00001');
 * @example <caption>Delete using state data</caption>
 * deleteRecord('Sales Order', $.data.order_id);
 * @example <caption>Delete a draft document</caption>
 * deleteRecord('Quotation', 'QTN-00001');
 * @function
 * @param {string} doctype - The doctype to delete from (e.g., "Customer", "Sales Order")
 * @param {string} name - The document name/ID to delete
 * @state {ERPNextState}
 * @returns {Operation}
 */
export function deleteRecord(doctype, name) {
  return async state => {
    const [resolvedDoctype, resolvedName] = expandReferences(
      state,
      doctype,
      name
    );

    console.log(`Deleting ${resolvedDoctype} document: ${resolvedName}...`);

    try {
      const response = await frappeClient
        .db()
        .deleteDoc(resolvedDoctype, resolvedName);

      return composeNextState(state, response);
    } catch (error) {
      console.error(`Error deleting ${resolvedDoctype}: ${error.message}`);
      throw error;
    }
  };
}

/**
 * Get a list of documents from ERPNext with filtering, field selection, and pagination
 * @public
 * @example <caption>Get all customers</caption>
 * getList('Customer');
 * @example <caption>Get customers with filters</caption>
 * getList('Customer', {
 *   filters: { customer_type: 'Company' },
 *   fields: ['name', 'customer_name', 'territory']
 * });
 * @example <caption>Get with pagination</caption>
 * getList('Sales Order', {
 *   filters: { status: 'Draft' },
 *   limit: 50,
 *   offset: 0,
 *   orderBy: 'creation desc'
 * });
 * @example <caption>Get specific fields only</caption>
 * getList('Item', {
 *   fields: ['item_code', 'item_name', 'standard_rate'],
 *   filters: { item_group: 'Products' },
 *   limit: 100
 * });
 * @function
 * @param {string} doctype - The doctype to query (e.g., "Customer", "Sales Order")
 * @param {ListOptions} options - Optional query configuration. See {@link https://frappeframework.com/docs/user/en/api/database#get-list Frappe Database API} for supported options.
 * @state {ERPNextState}
 * @returns {Operation}
 */
export function getList(doctype, options = {}) {
  return async state => {
    const [resolvedDoctype, resolvedOptions] = expandReferences(
      state,
      doctype,
      options
    );

    console.log(`Fetching ${resolvedDoctype} list...`);

    try {
      const response = await frappeClient
        .db()
        .getDocList(resolvedDoctype, resolvedOptions);

      return composeNextState(state, response);
    } catch (error) {
      console.error(`Error fetching ${resolvedDoctype} list: ${error.message}`);
      throw error;
    }
  };
}

/**
 * Get count of documents matching filters
 * @public
 * @example <caption>Count all customers</caption>
 * getCount('Customer');
 * @example <caption>Count with filters</caption>
 * getCount('Sales Order', { status: 'Open' });
 * @example <caption>Count from state data</caption>
 * getCount('Item', { item_group: $.data.group_name });
 * @function
 * @param {string} doctype - The doctype to count (e.g., "Customer", "Sales Order")
 * @param {object} filters - Optional filters to apply (e.g., `{ status: 'Open' }`)
 * @state {ERPNextState}
 * @returns {Operation}
 */
export function getCount(doctype, filters = {}) {
  return async state => {
    const [resolvedDoctype, resolvedFilters] = expandReferences(
      state,
      doctype,
      filters
    );

    console.log(
      `Counting ${resolvedDoctype} documents${resolvedFilters && Object.keys(resolvedFilters).length > 0 ? ' with filters' : ''}...`
    );

    try {
      const response = await frappeClient
        .db()
        .getCount(resolvedDoctype, resolvedFilters);

      return composeNextState(state, response);
    } catch (error) {
      console.error(`Error counting ${resolvedDoctype}: ${error.message}`);
      throw error;
    }
  };
}

export {
  dataPath,
  dataValue,
  dateFns,
  each,
  field,
  fields,
  fn,
  fnIf,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';
