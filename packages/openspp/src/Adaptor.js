/**
 * INVARIANT: Must export function named `request`
 * - ALL operational functions go here
 */
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

// OpenSPP pages individuals and groups by offset: it ignores `_lastId`, so
// the first page would be returned again
const NO_CURSOR = 'OpenSPP pages individuals and groups with offset, not lastId';

/**
 * Options for OpenSPP searches
 * @typedef {Object} SearchOptions
 * @public
 * @property {number} count - Page size, 1-100 (OpenSPP default 20). Sent as `_count`.
 * @property {number} offset - Number of records to skip. Sent as `_offset`.
 * @property {string} sort - `name`, `birthDate` or `lastUpdated`, prefix with `-` for descending. Sent as `_sort` (Individual only; other values throw, since OpenSPP would sort by `name`).
 * @property {string|string[]} elements - Only return these fields. Sent as `_elements` (Individual and Group).
 * @property {string|string[]} extensions - Include these extensions. Sent as `_extensions` (Individual and Group).
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
 * @param {object} [options] - `query` (query parameters) and `ifMatch` (ETag for optimistic locking)
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
 * @param {string} id - Identifier as `system|value`
 * @param {object} [options] - `elements` and `extensions` (see SearchOptions)
 * @returns {Operation}
 * @state {OpenSPPState}
 */
export function getIndividual(id, options = {}) {
  return util.readResource('Individual', id, options);
}

/**
 * Search individuals.
 * Records the API client may not see (for example without consent) are left
 * out, and `state.response.page.total` is then only the page size. Use
 * `state.response.page.next` to check for more pages; it can be null before
 * the last page when records are hidden (with `count` above 50 OpenSPP reads
 * only 100 records, so more than 100 - `count` hidden records are enough; at
 * 100, one is).
 * Note: on OpenSPP2 up to 2026.09, `group` can match a former member who is
 * still active in another group (fixed by open PR OpenSPP2 #555).
 * `membership-role` is matched separately from `group`, so it can match a role
 * held in a different group. On OpenSPP2 up to 2026.09, an unknown
 * `membership-role` code is ignored, so every individual matching the other
 * parameters is returned (#555 makes it match nothing).
 * @public
 * @example <caption>Search by name</caption>
 * searchIndividual({ name: "Santos" });
 * @example <caption>Born on or after 2010, 50 per page, second page</caption>
 * searchIndividual({ birthdate: "ge2010-01-01" }, { count: 50, offset: 50 });
 * @example <caption>Heads of household in a group (see the note above)</caption>
 * searchIndividual({ group: "urn:openspp:vocab:id-type#household_id|HH-1", "membership-role": "head" });
 * @function
 * @param {object} [query] - OpenSPP search parameters: `identifier`, `name`, `birthdate`, `gender`, `address`, `group`, `membership-role`, `_lastUpdated`
 * @param {SearchOptions} [options] - Paging and field options
 * @returns {Operation}
 * @state {OpenSPPState}
 */
export function searchIndividual(query = {}, options = {}) {
  return async state => {
    const [resolvedOptions] = expandReferences(state, options);
    util.rejectOptions('searchIndividual', resolvedOptions, {
      lastId: NO_CURSOR,
    });
    util.assertSortField('searchIndividual', resolvedOptions?.sort);
    return util.searchResource('Individual', query, resolvedOptions)(state);
  };
}

/**
 * Create an individual. `data` follows the OpenSPP Individual resource and
 * must include at least one identifier.
 * @public
 * @example
 * createIndividual({
 *   identifier: [{ system: "urn:openspp:vocab:id-type#national_id", value: "PH-123456789" }],
 *   name: { family: "Santos", given: "Maria" },
 *   birthDate: "1985-03-15",
 *   gender: { coding: [{ system: "urn:iso:std:iso:5218", code: "2" }] },
 * });
 * @function
 * @param {object} data - Individual resource
 * @returns {Operation}
 * @state {OpenSPPState}
 */
export function createIndividual(data) {
  return util.createResource('Individual', data);
}

/**
 * Update some fields of an individual (JSON Merge Patch). Omitted fields are
 * unchanged; `null` clears a field.
 * @public
 * @example
 * updateIndividual("urn:openspp:vocab:id-type#national_id|PH-123456789", { birthDate: "1985-03-16" });
 * @function
 * @param {string} id - Identifier as `system|value`
 * @param {object} data - Fields to change
 * @param {object} [options] - `ifMatch`: ETag from a previous read, to fail if the record changed
 * @returns {Operation}
 * @state {OpenSPPState}
 */
export function updateIndividual(id, data, options = {}) {
  return util.patchResource('Individual', id, data, options);
}

/**
 * Get a group by identifier. Note: on OpenSPP2 up to 2026.09,
 * `member[].entity.reference` values returned by OpenSPP can't be used to read
 * the members (fixed by open PR OpenSPP2 #555); use `getGroupMembers` instead.
 * @public
 * @example
 * getGroup("urn:openspp:vocab:id-type#household_id|HH-1");
 * @function
 * @param {string} id - Identifier as `system|value`
 * @param {object} [options] - `elements` and `extensions` (see SearchOptions)
 * @returns {Operation}
 * @state {OpenSPPState}
 */
export function getGroup(id, options = {}) {
  return util.readResource('Group', id, options);
}

/**
 * Search groups. `sort` is not supported: OpenSPP always sorts groups by name.
 * Note: on OpenSPP2 releases up to 2026.09, `offset` is ignored for groups and
 * every page returns the first page again (fixed by open PR OpenSPP2 #555).
 * @public
 * @example
 * searchGroup({ name: "Santos" }, { count: 50 });
 * @function
 * @param {object} [query] - OpenSPP search parameters: `identifier`, `name`, `member` (`Individual/system|value`; on OpenSPP2 up to 2026.09, any other value, or an individual that doesn't exist, is ignored and every group matching the other parameters is returned, and `member` also matches groups the individual has left). `type` is passed on, but not yet applied by OpenSPP2 (#565)
 * @param {SearchOptions} [options] - Paging and field options
 * @returns {Operation}
 * @state {OpenSPPState}
 */
export function searchGroup(query = {}, options = {}) {
  return async state => {
    const [resolvedOptions] = expandReferences(state, options);
    util.rejectOptions('searchGroup', resolvedOptions, {
      sort: 'OpenSPP cannot sort groups',
      lastId: NO_CURSOR,
    });
    return util.searchResource('Group', query, resolvedOptions)(state);
  };
}

/**
 * Create a group. `data` follows the OpenSPP Group resource and must include
 * at least one identifier.
 * @public
 * @example
 * createGroup({
 *   identifier: [{ system: "urn:openspp:vocab:id-type#household_id", value: "HH-1" }],
 *   name: "Santos Household",
 *   groupType: "household",
 * });
 * @function
 * @param {object} data - Group resource
 * @returns {Operation}
 * @state {OpenSPPState}
 */
export function createGroup(data) {
  return util.createResource('Group', data);
}

/**
 * Update some fields of a group (JSON Merge Patch).
 * @public
 * @example
 * updateGroup("urn:openspp:vocab:id-type#household_id|HH-1", { name: "Santos-Reyes Household" });
 * @function
 * @param {string} id - Identifier as `system|value`
 * @param {object} data - Fields to change
 * @param {object} [options] - `ifMatch`: ETag from a previous read
 * @returns {Operation}
 * @state {OpenSPPState}
 */
export function updateGroup(id, data, options = {}) {
  return util.patchResource('Group', id, data, options);
}

/**
 * List the individuals who are members of a group.
 * Note: on OpenSPP2 up to 2026.09, the result can include former members who
 * are still active in another group (fixed by open PR OpenSPP2 #555). `role`
 * is matched separately from the group, so it can match a role held in a
 * different group. On OpenSPP2 up to 2026.09, an unknown `role` code is
 * ignored, so every member is returned (#555 makes it match nothing).
 * @public
 * @example
 * getGroupMembers("urn:openspp:vocab:id-type#household_id|HH-1");
 * @example <caption>Only the head of household (see the note above)</caption>
 * getGroupMembers("urn:openspp:vocab:id-type#household_id|HH-1", { role: "head" });
 * @function
 * @param {string} groupId - Group identifier as `system|value`
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
    util.rejectOptions('getGroupMembers', resolvedOptions, {
      lastId: NO_CURSOR,
    });
    util.assertSortField('getGroupMembers', resolvedOptions?.sort);
    const { role, ...searchOptions } = resolvedOptions;
    const query = { group: resolvedGroupId };
    if (role !== undefined) {
      query['membership-role'] = role;
    }
    return util.searchResource('Individual', query, searchOptions)(state);
  };
}

const toRole = role =>
  typeof role === 'string'
    ? { coding: [{ system: 'urn:openspp:vocab:group-membership-type', code: role }] }
    : role;

/**
 * Add an individual to a group. If the individual is already a member, their
 * roles are replaced by `role` when it is given, and left unchanged otherwise
 * (`startDate` only applies to new members). OpenSPP ignores a role code it
 * doesn't know: a new member is added without a role, and an existing member
 * keeps their current roles.
 * @public
 * @example <caption>Add as head of household</caption>
 * addToGroup("urn:openspp:vocab:id-type#household_id|HH-1", "urn:openspp:vocab:id-type#national_id|PH-123", "head");
 * @example <caption>Add without a role</caption>
 * addToGroup("urn:openspp:vocab:id-type#household_id|HH-1", "urn:openspp:vocab:id-type#national_id|PH-123");
 * @function
 * @param {string} groupId - Group identifier as `system|value`
 * @param {string} individualId - Individual identifier as `system|value`
 * @param {string|object} [role] - Role code in `urn:openspp:vocab:group-membership-type` (eg "head", "spouse", "child"), or a CodeableConcept
 * @param {object} [options] - `startDate` (YYYY-MM-DD)
 * @returns {Operation}
 * @state {OpenSPPState}
 */
export function addToGroup(groupId, individualId, role, options = {}) {
  return async state => {
    const [resolvedGroupId, resolvedIndividualId, resolvedRole, resolvedOptions] =
      expandReferences(state, groupId, individualId, role, options);

    const groupPath = `/Group/${util.encodeIdentifier(resolvedGroupId)}`;
    const memberPath = `${groupPath}/member/${util.encodeIdentifier(
      resolvedIndividualId
    )}`;

    const body = { entity: { reference: `Individual/${resolvedIndividualId}` } };
    if (resolvedRole) {
      body.role = toRole(resolvedRole);
    }
    if (resolvedOptions.startDate) {
      body.startDate = resolvedOptions.startDate;
    }

    let response;
    try {
      response = await util.request(
        state.configuration,
        'POST',
        `${groupPath}/$add-member`,
        { body }
      );
    } catch (error) {
      // OpenSPP also returns 409 for other conflicts, eg an identifier that
      // matches more than one registrant
      const isAlreadyMember =
        error.statusCode === 409 &&
        /already a member/i.test(error.body?.detail ?? '');
      if (!isAlreadyMember) {
        throw error;
      }
      // Already a member: set the role if one was given. An empty patch
      // changes nothing and returns the current membership.
      const patch = resolvedRole ? { role: toRole(resolvedRole) } : {};
      response = await util.request(state.configuration, 'PATCH', memberPath, {
        body: patch,
      });
    }

    return util.prepareNextState(state, response);
  };
}

/**
 * End an individual's membership of a group. OpenSPP sets the end date to
 * now unless `endedDate` is given.
 * Note: OpenSPP2 up to 2026.09 may still report the membership as `active`
 * (and list the individual in group searches) until OpenSPP's scheduled
 * membership repair runs (fixed by open PR OpenSPP2 #555). The end date is
 * saved either way.
 * @public
 * @example
 * removeFromGroup("urn:openspp:vocab:id-type#household_id|HH-1", "urn:openspp:vocab:id-type#national_id|PH-123", { reason: "Moved out" });
 * @function
 * @param {string} groupId - Group identifier as `system|value`
 * @param {string} individualId - Individual identifier as `system|value`
 * @param {object} [options] - `reason` (logged by OpenSPP2 but not stored), `endedDate` (YYYY-MM-DD)
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
 * @param {string} id - Program identifier as `system|value`
 * @returns {Operation}
 * @state {OpenSPPState}
 */
export function getProgram(id) {
  return util.readResource('Program', id);
}

/**
 * List programs. Programs page with a cursor instead of an offset: for the
 * next page, pass as `lastId` the `_lastId` value in `state.response.page.next`.
 * @public
 * @example
 * getPrograms();
 * @example <caption>Programs for groups, 10 per page</caption>
 * getPrograms({ targetType: "group", count: 10 });
 * @function
 * @param {object} [options] - Filters `name`, `status` (`active` or `ended`) and `targetType` (`individual` or `group`), and paging `count` (1-100) and `lastId`
 * @returns {Operation}
 * @state {OpenSPPState}
 */
export function getPrograms(options = {}) {
  return async state => {
    const [resolvedOptions] = expandReferences(state, options);
    util.assertObject(resolvedOptions, 'options');
    for (const key of ['offset', 'limit', 'order']) {
      if (resolvedOptions[key] !== undefined) {
        throw new Error(
          `getPrograms does not support ${key}. OpenSPP pages programs with a cursor: use count for the page size and lastId to get the next page`
        );
      }
    }
    const { count, lastId, ...query } = resolvedOptions;
    return util.searchResource('Program', query, { count, lastId })(state);
  };
}

/**
 * List the programs a registrant is enrolled in, as ProgramMembership
 * resources (each has a `program` reference).
 * @public
 * @example
 * getEnrolledPrograms("Group/urn:openspp:vocab:id-type#household_id|HH-1");
 * @function
 * @param {string} beneficiary - Typed reference: `Individual/system|value` or `Group/system|value`
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
 * Enroll a registrant in a program. Does nothing if they are already enrolled.
 * If they have a membership in this program that isn't enrolled (eg exited),
 * it is set back to enrolled. OpenSPP2 up to 2026.09 can't address a
 * membership per program (open PR OpenSPP2 #555 adds this, but the adaptor
 * doesn't use it yet), so that update is refused when the registrant has memberships in other programs too.
 * @public
 * @example
 * enroll("Individual/urn:openspp:vocab:id-type#national_id|PH-123", "urn:openspp:program|universal-child-grant");
 * @function
 * @param {string} beneficiary - Typed reference: `Individual/system|value` or `Group/system|value`
 * @param {string} programId - Program identifier as `system|value`
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
 * `exited`. Does nothing if the membership isn't enrolled. OpenSPP2 up to
 * 2026.09 can't address a membership per program (open PR OpenSPP2 #555 adds
 * this, but the adaptor doesn't use it yet), so this is refused when the registrant has memberships in other
 * programs too.
 * @public
 * @example
 * unenroll("Individual/urn:openspp:vocab:id-type#national_id|PH-123", "urn:openspp:program|universal-child-grant");
 * @example <caption>With exit details</caption>
 * unenroll("Group/urn:openspp:vocab:id-type#household_id|HH-1", "urn:openspp:program|cash-transfer", { exitDate: "2026-09-30" });
 * @function
 * @param {string} beneficiary - Typed reference: `Individual/system|value` or `Group/system|value`
 * @param {string} programId - Program identifier as `system|value`
 * @param {object} [options] - `exitDate` (YYYY-MM-DD), `exitReason` (CodeableConcept; accepted but not yet stored by OpenSPP2)
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
 * Search service points. Only `count` and `offset` are supported: OpenSPP
 * cannot sort service points or limit their fields.
 * @public
 * @example
 * searchServicePoint({ country: "PH", contractActive: true });
 * @function
 * @param {object} [query] - OpenSPP search parameters: `name`, `area`, `country`, `contractActive`, `_lastUpdated`
 * @param {object} [options] - `count`, `offset`
 * @returns {Operation}
 * @state {OpenSPPState}
 */
export function searchServicePoint(query = {}, options = {}) {
  return async state => {
    const [resolvedOptions] = expandReferences(state, options);
    util.rejectOptions('searchServicePoint', resolvedOptions, {
      sort: 'OpenSPP cannot sort service points',
      lastId: 'OpenSPP pages service points with offset, not lastId',
      elements: 'OpenSPP always returns every service point field',
      extensions: 'OpenSPP has no extensions for service points',
    });
    return util.searchResource('ServicePoint', query, resolvedOptions)(state);
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
