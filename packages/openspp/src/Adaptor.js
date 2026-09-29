import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils.js';

/**
 * State object
 * @typedef {Object} OpenSPPState
 * @property data - the parsed response body. For searches, the list of resources.
 * @property response - the response from the HTTP server, including headers and statusCode. Searches add `page`, with `total` and `next`.
 * @property references - an array of all previous data objects used in the Job
 **/

// OpenSPP ignores `_lastId` for individuals and groups, so the first page
// would be returned again
const NO_CURSOR = 'OpenSPP ignores lastId for individuals and groups; page with offset';

// Programs page with a cursor instead of an offset
const PROGRAM_CURSOR =
  'OpenSPP pages programs with a cursor, so use count (page size, 1-100) and lastId (the _lastId value in state.response.page.next)';

/**
 * Options for OpenSPP searches
 * @typedef {Object} SearchOptions
 * @public
 * @property {number} count - Page size, 1-100 (OpenSPP default 20)
 * @property {number} offset - Number of records to skip
 * @property {string} sort - Individuals only: one of `name`, `birthDate` or `lastUpdated`, with a `-` prefix for descending
 * @property {string|string[]} elements - Only return these fields (individuals and groups)
 * @property {string|string[]} extensions - Include these extensions (individuals and groups)
 */

/**
 * Options for getPrograms
 * @typedef {Object} ProgramOptions
 * @public
 * @property {string} [name] - Filter by name
 * @property {'active'|'ended'} [status] - Filter by status
 * @property {'individual'|'group'} [targetType] - Filter by target type
 * @property {number} [count] - Page size, 1-100 (OpenSPP default 20)
 * @property {number|string} [lastId] - Cursor for the next page: the `_lastId` value in `state.response.page.next`
 */

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute` to authenticate with OpenSPP first.
 * @example
 * execute(
 *   create("foo"),
 *   delete("bar")
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
    return commonExecute(
      util.authorize,
      ...operations
    )({ ...initialState, ...state });
  };
}

/**
 * Make a request to any OpenSPP REST API v2 endpoint.
 * Paths are relative to `/api/v2/spp`.
 * @public
 * @example <caption>List vocabularies</caption>
 * request("GET", "/Vocabulary", null, { query: { _count: 10 } });
 * @example <caption>Read GIS layers</caption>
 * request("GET", "/gis/ogc/collections");
 * @function
 * @param {string} method - HTTP method
 * @param {string} path - Path relative to /api/v2/spp, eg `/Individual`
 * @param {object} [body] - Request body, sent as JSON
 * @param {object} [options] - `query` (query parameters), `ifMatch` (ETag for optimistic locking) and `headers`
 * @returns {Operation}
 * @state {OpenSPPState}
 */
export function request(method, path, body, options = {}) {
  return async state => {
    const [resolvedMethod, resolvedPath, resolvedBody, resolvedOptions] =
      expandReferences(state, method, path, body, options);

    const response = await util.request(
      state.configuration,
      resolvedMethod,
      resolvedPath,
      { body: resolvedBody, ...resolvedOptions }
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Get an individual by identifier.
 * @public
 * @example
 * getIndividual("urn:openspp:vocab:id-type#national_id|PH-123456789");
 * @example <caption>Only return some fields</caption>
 * getIndividual("urn:openspp:vocab:id-type#national_id|PH-123456789", { elements: ["identifier", "name"] });
 * @function
 * @param {string} id - Identifier as `system\|value`
 * @param {object} [options] - `elements` and `extensions` (see SearchOptions)
 * @returns {Operation}
 * @state {OpenSPPState}
 */
export function getIndividual(id, options = {}) {
  return async state => {
    const [resolvedId, resolvedOptions] = expandReferences(state, id, options);
    const response = await util.readResource(
      state.configuration,
      'Individual',
      resolvedId,
      resolvedOptions
    );
    return util.prepareNextState(state, response);
  };
}

/**
 * Search individuals. Records the API client may not see (eg without consent)
 * are left out.
 * @public
 * @example <caption>Search by name</caption>
 * searchIndividual({ name: "Santos" });
 * @example <caption>Born on or after 2010, 50 per page, second page</caption>
 * searchIndividual({ birthdate: "ge2010-01-01" }, { count: 50, offset: 50 });
 * @example <caption>Heads of household in a group</caption>
 * searchIndividual({ group: "urn:openspp:vocab:id-type#household_id|HH-1", "membership-role": "head" });
 * @function
 * @param {object} [query] - OpenSPP search parameters, eg `{ name: "Santos" }`. `identifier` and `group` must be `system\|value`. See the [OpenSPP search docs](https://docs.openspp.org/developer_guide/api_v2/search)
 * @param {SearchOptions} [options] - Paging and field options
 * @returns {Operation}
 * @state {OpenSPPState}
 */
export function searchIndividual(query = {}, options = {}) {
  return async state => {
    const [resolvedQuery, resolvedOptions] = expandReferences(
      state,
      query,
      options
    );
    util.warnUnsupportedOptions('searchIndividual', resolvedOptions, {
      lastId: NO_CURSOR,
    });
    util.warnUnsupportedSort('searchIndividual', resolvedOptions?.sort);
    const response = await util.searchResource(
      state.configuration,
      'Individual',
      resolvedQuery,
      resolvedOptions
    );
    return util.prepareSearchState(state, response);
  };
}

/**
 * Create an individual.
 * @public
 * @example
 * createIndividual({
 *   identifier: [{ system: "urn:openspp:vocab:id-type#national_id", value: "PH-123456789" }],
 *   name: { family: "Santos", given: "Maria" },
 *   birthDate: "1985-03-15",
 *   gender: { coding: [{ system: "urn:iso:std:iso:5218", code: "2" }] },
 * });
 * @function
 * @param {object} data - Individual resource, with at least one `identifier`. See the [OpenSPP resource docs](https://docs.openspp.org/developer_guide/api_v2/resources)
 * @returns {Operation}
 * @state {OpenSPPState}
 */
export function createIndividual(data) {
  return async state => {
    const [resolvedData] = expandReferences(state, data);
    const response = await util.createResource(
      state.configuration,
      'Individual',
      resolvedData
    );
    return util.prepareNextState(state, response);
  };
}

/**
 * Update some fields of an individual. Fields you leave out are unchanged, and
 * `null` clears a field.
 * @public
 * @example
 * updateIndividual("urn:openspp:vocab:id-type#national_id|PH-123456789", { birthDate: "1985-03-16" });
 * @function
 * @param {string} id - Identifier as `system\|value`
 * @param {object} data - Fields to change
 * @param {object} [options] - `ifMatch`: ETag from a previous read, to fail if the record changed
 * @returns {Operation}
 * @state {OpenSPPState}
 */
export function updateIndividual(id, data, options = {}) {
  return async state => {
    const [resolvedId, resolvedData, resolvedOptions] = expandReferences(
      state,
      id,
      data,
      options
    );
    const response = await util.patchResource(
      state.configuration,
      'Individual',
      resolvedId,
      resolvedData,
      resolvedOptions
    );
    return util.prepareNextState(state, response);
  };
}

/**
 * Get a group by identifier. To read the members, use `getGroupMembers`.
 * @public
 * @example
 * getGroup("urn:openspp:vocab:id-type#household_id|HH-1");
 * @function
 * @param {string} id - Identifier as `system\|value`
 * @param {object} [options] - `elements` and `extensions` (see SearchOptions)
 * @returns {Operation}
 * @state {OpenSPPState}
 */
export function getGroup(id, options = {}) {
  return async state => {
    const [resolvedId, resolvedOptions] = expandReferences(state, id, options);
    const response = await util.readResource(
      state.configuration,
      'Group',
      resolvedId,
      resolvedOptions
    );
    return util.prepareNextState(state, response);
  };
}

/**
 * Search groups.
 * @public
 * @example
 * searchGroup({ name: "Santos" }, { count: 50 });
 * @function
 * @param {object} [query] - OpenSPP search parameters, eg `{ name: "Santos" }`. See the [OpenSPP search docs](https://docs.openspp.org/developer_guide/api_v2/search)
 * @param {SearchOptions} [options] - Paging and field options
 * @returns {Operation}
 * @state {OpenSPPState}
 */
export function searchGroup(query = {}, options = {}) {
  return async state => {
    const [resolvedQuery, resolvedOptions] = expandReferences(
      state,
      query,
      options
    );
    util.warnUnsupportedOptions('searchGroup', resolvedOptions, {
      sort: 'OpenSPP cannot sort groups',
      lastId: NO_CURSOR,
    });
    const response = await util.searchResource(
      state.configuration,
      'Group',
      resolvedQuery,
      resolvedOptions
    );
    return util.prepareSearchState(state, response);
  };
}

/**
 * Create a group.
 * @public
 * @example
 * createGroup({
 *   identifier: [{ system: "urn:openspp:vocab:id-type#household_id", value: "HH-1" }],
 *   name: "Santos Household",
 *   groupType: "household",
 * });
 * @function
 * @param {object} data - Group resource, with at least one `identifier`. See the [OpenSPP resource docs](https://docs.openspp.org/developer_guide/api_v2/resources)
 * @returns {Operation}
 * @state {OpenSPPState}
 */
export function createGroup(data) {
  return async state => {
    const [resolvedData] = expandReferences(state, data);
    const response = await util.createResource(
      state.configuration,
      'Group',
      resolvedData
    );
    return util.prepareNextState(state, response);
  };
}

/**
 * Update some fields of a group. Fields you leave out are unchanged, and
 * `null` clears a field.
 * @public
 * @example
 * updateGroup("urn:openspp:vocab:id-type#household_id|HH-1", { name: "Santos-Reyes Household" });
 * @function
 * @param {string} id - Identifier as `system\|value`
 * @param {object} data - Fields to change
 * @param {object} [options] - `ifMatch`: ETag from a previous read, to fail if the record changed
 * @returns {Operation}
 * @state {OpenSPPState}
 */
export function updateGroup(id, data, options = {}) {
  return async state => {
    const [resolvedId, resolvedData, resolvedOptions] = expandReferences(
      state,
      id,
      data,
      options
    );
    const response = await util.patchResource(
      state.configuration,
      'Group',
      resolvedId,
      resolvedData,
      resolvedOptions
    );
    return util.prepareNextState(state, response);
  };
}

/**
 * List the individuals who are members of a group.
 * @public
 * @example
 * getGroupMembers("urn:openspp:vocab:id-type#household_id|HH-1");
 * @example <caption>Only the head of household</caption>
 * getGroupMembers("urn:openspp:vocab:id-type#household_id|HH-1", { role: "head" });
 * @function
 * @param {string} groupId - Group identifier as `system\|value`
 * @param {object} [options] - `role` (membership role code) plus SearchOptions
 * @returns {Operation}
 * @state {OpenSPPState}
 */
export function getGroupMembers(groupId, options = {}) {
  return async state => {
    const [resolvedGroupId, resolvedOptions] = expandReferences(
      state,
      groupId,
      options
    );
    util.warnUnsupportedOptions('getGroupMembers', resolvedOptions, {
      lastId: NO_CURSOR,
    });
    util.warnUnsupportedSort('getGroupMembers', resolvedOptions?.sort);
    const { role, ...searchOptions } = resolvedOptions;
    const query = { group: resolvedGroupId };
    if (role !== undefined) {
      query['membership-role'] = role;
    }
    const response = await util.searchResource(
      state.configuration,
      'Individual',
      query,
      searchOptions
    );
    return util.prepareSearchState(state, response);
  };
}

const toRole = role =>
  typeof role === 'string'
    ? { coding: [{ system: 'urn:openspp:vocab:group-membership-type', code: role }] }
    : role;

/**
 * Add an individual to a group. Throws a 409 error if the individual is
 * already a member. To change an existing member's role, use `request` with
 * both identifiers URL-encoded, eg
 * `request("PATCH", "/Group/<group>/member/<individual>", { role: { coding: [{ system: "urn:openspp:vocab:group-membership-type", code: "spouse" }] } })`.
 * @public
 * @example <caption>Add as head of household</caption>
 * addToGroup("urn:openspp:vocab:id-type#household_id|HH-1", "urn:openspp:vocab:id-type#national_id|PH-123", "head");
 * @example <caption>Add without a role</caption>
 * addToGroup("urn:openspp:vocab:id-type#household_id|HH-1", "urn:openspp:vocab:id-type#national_id|PH-123");
 * @function
 * @param {string} groupId - Group identifier as `system\|value`
 * @param {string} individualId - Individual identifier as `system\|value`
 * @param {string|object} [role] - Role code in `urn:openspp:vocab:group-membership-type` (eg "head", "spouse", "child"), or a CodeableConcept
 * @param {object} [options] - `startDate` (YYYY-MM-DD)
 * @returns {Operation}
 * @state {OpenSPPState}
 */
export function addToGroup(groupId, individualId, role, options = {}) {
  return async state => {
    const [resolvedGroupId, resolvedIndividualId, resolvedRole, resolvedOptions] =
      expandReferences(state, groupId, individualId, role, options);

    util.encodeIdentifier(resolvedIndividualId);

    const body = { entity: { reference: `Individual/${resolvedIndividualId}` } };
    if (resolvedRole) {
      body.role = toRole(resolvedRole);
    }
    if (resolvedOptions.startDate) {
      body.startDate = resolvedOptions.startDate;
    }

    const response = await util.request(
      state.configuration,
      'POST',
      `/Group/${util.encodeIdentifier(resolvedGroupId)}/$add-member`,
      { body }
    );
    return util.prepareNextState(state, response);
  };
}

/**
 * End an individual's membership of a group. OpenSPP sets the end date to
 * now unless `endedDate` is given.
 * @public
 * @example
 * removeFromGroup("urn:openspp:vocab:id-type#household_id|HH-1", "urn:openspp:vocab:id-type#national_id|PH-123", { reason: "Moved out" });
 * @function
 * @param {string} groupId - Group identifier as `system\|value`
 * @param {string} individualId - Individual identifier as `system\|value`
 * @param {object} [options] - `reason` (OpenSPP logs it but doesn't save it), `endedDate` (YYYY-MM-DD)
 * @returns {Operation}
 * @state {OpenSPPState}
 */
export function removeFromGroup(groupId, individualId, options = {}) {
  return async state => {
    const [resolvedGroupId, resolvedIndividualId, resolvedOptions] =
      expandReferences(state, groupId, individualId, options);

    util.encodeIdentifier(resolvedIndividualId);
    const body = { entity: { reference: `Individual/${resolvedIndividualId}` } };
    if (resolvedOptions.reason) {
      body.reason = resolvedOptions.reason;
    }
    if (resolvedOptions.endedDate) {
      body.endedDate = resolvedOptions.endedDate;
    }

    const response = await util.request(
      state.configuration,
      'POST',
      `/Group/${util.encodeIdentifier(resolvedGroupId)}/$remove-member`,
      { body }
    );
    return util.prepareNextState(state, response);
  };
}

/**
 * Get a program by identifier.
 * @public
 * @example
 * getProgram("urn:openspp:program|universal-child-grant");
 * @function
 * @param {string} id - Program identifier as `system\|value`
 * @returns {Operation}
 * @state {OpenSPPState}
 */
export function getProgram(id) {
  return async state => {
    const [resolvedId] = expandReferences(state, id);
    const response = await util.readResource(
      state.configuration,
      'Program',
      resolvedId
    );
    return util.prepareNextState(state, response);
  };
}

/**
 * List programs.
 * @public
 * @example
 * getPrograms();
 * @example <caption>Programs for groups, 10 per page</caption>
 * getPrograms({ targetType: "group", count: 10 });
 * @function
 * @param {ProgramOptions} [options] - Filters and paging
 * @returns {Operation}
 * @state {OpenSPPState}
 */
export function getPrograms(options = {}) {
  return async state => {
    const [resolvedOptions] = expandReferences(state, options);
    util.assertObject(resolvedOptions, 'options');
    util.warnUnsupportedOptions('getPrograms', resolvedOptions, {
      offset: PROGRAM_CURSOR,
      limit: PROGRAM_CURSOR,
      order: 'OpenSPP cannot sort programs',
    });
    const { count, lastId, ...query } = resolvedOptions;
    const response = await util.searchResource(
      state.configuration,
      'Program',
      query,
      { count, lastId }
    );
    return util.prepareSearchState(state, response);
  };
}

/**
 * List the programs a registrant is enrolled in, as ProgramMembership
 * resources (each has a `program` reference).
 * @public
 * @example
 * getEnrolledPrograms("Group/urn:openspp:vocab:id-type#household_id|HH-1");
 * @function
 * @param {string} beneficiary - Typed reference: `Individual/system\|value` or `Group/system\|value`
 * @returns {Operation}
 * @state {OpenSPPState}
 */
export function getEnrolledPrograms(beneficiary) {
  return async state => {
    const [resolvedBeneficiary] = expandReferences(state, beneficiary);
    util.parseReference(resolvedBeneficiary);
    const response = await util.listMemberships(
      state.configuration,
      resolvedBeneficiary,
      { status: 'enrolled' }
    );
    return util.prepareSearchState(state, response);
  };
}

/**
 * Enroll a registrant in a program. If they are already enrolled, returns their
 * membership unchanged. If they have a membership in this program that isn't
 * enrolled (eg exited), it is set back to enrolled. That update throws if the
 * registrant also has memberships in other programs, because the adaptor can't
 * be sure OpenSPP would update the membership for this program.
 * @public
 * @example
 * enroll("Individual/urn:openspp:vocab:id-type#national_id|PH-123", "urn:openspp:program|universal-child-grant");
 * @function
 * @param {string} beneficiary - Typed reference: `Individual/system\|value` or `Group/system\|value`
 * @param {string} programId - Program identifier as `system\|value`
 * @param {object} [options] - `enrollmentDate` (YYYY-MM-DD) for new memberships
 * @returns {Operation}
 * @state {OpenSPPState}
 */
export function enroll(beneficiary, programId, options = {}) {
  return async state => {
    const [resolvedBeneficiary, resolvedProgramId, resolvedOptions] =
      expandReferences(state, beneficiary, programId, options);

    const found = await util.findMembership(
      state.configuration,
      resolvedBeneficiary,
      resolvedProgramId
    );

    if (!found.membership) {
      const body = {
        program: { reference: found.programReference },
        beneficiary: { reference: resolvedBeneficiary },
        status: 'enrolled',
      };
      if (resolvedOptions.enrollmentDate) {
        body.enrollmentDate = resolvedOptions.enrollmentDate;
      }
      const response = await util.request(
        state.configuration,
        'POST',
        '/ProgramMembership',
        { body }
      );
      return util.prepareNextState(state, response);
    }

    if (found.membership.status === 'enrolled') {
      return util.prepareNextState(state, {
        ...found.response,
        body: found.membership,
      });
    }

    const response = await util.putMembership(
      state.configuration,
      resolvedBeneficiary,
      found,
      { status: 'enrolled' }
    );
    return util.prepareNextState(state, response);
  };
}

/**
 * Unenroll a registrant from a program by setting their membership to
 * `exited`. If the membership isn't enrolled, returns it unchanged. Throws if
 * the registrant has no membership in this program, or also has memberships in
 * other programs, because the adaptor can't be sure OpenSPP would update the
 * membership for this program.
 * @public
 * @example
 * unenroll("Individual/urn:openspp:vocab:id-type#national_id|PH-123", "urn:openspp:program|universal-child-grant");
 * @example <caption>With exit details</caption>
 * unenroll("Group/urn:openspp:vocab:id-type#household_id|HH-1", "urn:openspp:program|cash-transfer", { exitDate: "2026-09-30" });
 * @function
 * @param {string} beneficiary - Typed reference: `Individual/system\|value` or `Group/system\|value`
 * @param {string} programId - Program identifier as `system\|value`
 * @param {object} [options] - `exitDate` (YYYY-MM-DD), `exitReason` (CodeableConcept; OpenSPP doesn't save it)
 * @returns {Operation}
 * @state {OpenSPPState}
 */
export function unenroll(beneficiary, programId, options = {}) {
  return async state => {
    const [resolvedBeneficiary, resolvedProgramId, resolvedOptions] =
      expandReferences(state, beneficiary, programId, options);

    const found = await util.findMembership(
      state.configuration,
      resolvedBeneficiary,
      resolvedProgramId
    );

    if (!found.membership) {
      throw new Error(
        `${resolvedBeneficiary} is not a member of ${found.programReference}`
      );
    }

    if (found.membership.status !== 'enrolled') {
      return util.prepareNextState(state, {
        ...found.response,
        body: found.membership,
      });
    }

    const response = await util.putMembership(
      state.configuration,
      resolvedBeneficiary,
      found,
      {
        status: 'exited',
        exitDate: resolvedOptions.exitDate,
        exitReason: resolvedOptions.exitReason,
      }
    );
    return util.prepareNextState(state, response);
  };
}

/**
 * Get a service point by its identifier (the service point name).
 * @public
 * @example
 * getServicePoint("Agoncillo Payment Center");
 * @function
 * @param {string} name - Service point identifier (its name)
 * @returns {Operation}
 * @state {OpenSPPState}
 */
export function getServicePoint(name) {
  return async state => {
    const [resolvedName] = expandReferences(state, name);
    if (typeof resolvedName !== 'string' || !resolvedName) {
      throw new Error(`Invalid service point name "${resolvedName}"`);
    }
    const response = await util.request(
      state.configuration,
      'GET',
      `/ServicePoint/${encodeURIComponent(resolvedName)}`
    );
    return util.prepareNextState(state, response);
  };
}

/**
 * Search service points.
 * @public
 * @example
 * searchServicePoint({ country: "PH", contractActive: true });
 * @function
 * @param {object} [query] - OpenSPP search parameters, eg `{ country: "PH" }`. See the [OpenSPP service point docs](https://docs.openspp.org/developer_guide/api_v2/products_service_points)
 * @param {object} [options] - `count`, `offset`
 * @returns {Operation}
 * @state {OpenSPPState}
 */
export function searchServicePoint(query = {}, options = {}) {
  return async state => {
    const [resolvedQuery, resolvedOptions] = expandReferences(
      state,
      query,
      options
    );
    util.warnUnsupportedOptions('searchServicePoint', resolvedOptions, {
      sort: 'OpenSPP cannot sort service points',
      lastId: 'OpenSPP pages service points with offset, not lastId',
      elements: 'OpenSPP always returns every service point field',
      extensions: 'OpenSPP has no extensions for service points',
    });
    const response = await util.searchResource(
      state.configuration,
      'ServicePoint',
      resolvedQuery,
      resolvedOptions
    );
    return util.prepareSearchState(state, response);
  };
}

export {
  combine,
  dataPath,
  dataValue,
  dateFns,
  each,
  field,
  fields,
  fn,
  fnIf,
  lastReferenceValue,
  log,
  merge,
  sourceValue,
} from '@openfn/language-common';
