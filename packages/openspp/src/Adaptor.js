import {
  execute as commonExecute,
  composeNextState,
  dateFns,
} from '@openfn/language-common';

import pkg from 'odoo-await';
const Odoo = pkg;

let sppConnector = null;

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute` to make working with this API easier.
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
    return commonExecute(login, ...operations)({ ...initialState, ...state });
  };
}

/**
 * Logs in to OpenSpp, gets a session token.
 * @example
 *  login(state)
 * @private
 * @param {State} state - Runtime state.
 * @returns {State}
 */
async function login(state) {
  const { baseUrl, username, password, database } = state.configuration;
  sppConnector = new Odoo({
    baseUrl: baseUrl,
    db: database,
    username: username,
    password: password,
  });
  try {
    await sppConnector.connect();
  } catch (err) {
    console.log(`✗ Error: ${err}`);
    sppConnector = null;
  }
  return state;
}

/**
 * resolve input domain
 * @example
 * resolveDomain([['name', 'like', 'test']])
 * @private
 * @param {Array} domain - input domain
 */
const resolveDomain = domain => {
  for (const element of domain) {
    if (!Array.isArray(element) && !['|', '&', '!'].includes(element)) {
      return [domain];
    }
  }
  return domain;
};

const resolveOptions = options => {
  let res = {
    limit: 100,
    offset: 0,
    order: 'id desc',
  };
  for (const key of Object.keys(options)) {
    if (['limit', 'offset', 'order'].includes(key)) {
      res[key] = options[key];
    }
  }
  return res;
};

/**
 * Create a brand new program membership for registrant.
 * @example
 * createProgramMembership("IND_Q4VGGZPF", "PROG_2023_00000001")
 * @private
 * @param {string} spp_id - spp_id of group / individual wanted to unenroll
 * @param {string} program_id - program_id of program
 */
async function createProgramMembership(spp_id, program_id) {
  try {
    let registrant = await sppConnector.searchRead(
      'res.partner',
      [
        ['is_registrant', '=', true],
        ['spp_id', '=', spp_id],
      ],
      ['id'],
      { limit: 1 }
    );
    if (registrant.length === 0) {
      throw new Error(`Registrant ${spp_id} not exists!`);
    }
    registrant = registrant[0].id;
    let program = await sppConnector.searchRead(
      'g2p.program',
      [['program_id', '=', program_id]],
      ['id'],
      { limit: 1 }
    );
    if (program.length === 0) {
      throw new Error(`Program ${program_id} not exists!`);
    }
    program = program[0].id;
    await sppConnector.create('g2p.program_membership', {
      program_id: program,
      partner_id: registrant,
      state: 'enrolled',
    });
  } catch (err) {
    console.log(`✗ Error: ${err}`);
  }
}

/**
 * get group information from OpenSPP
 * @public
 * @example
 * getGroup("GRP_Q4VGGZPF")
 * @function
 * @param {string} spp_id - The spp_id of the group
 * @param {function} callback - An optional callback function
 * @returns {Operation}
 */
export function getGroup(spp_id, callback = s => s) {
  return async state => {
    const defaultDomain = [
      ['is_registrant', '=', true],
      ['is_group', '=', true],
      ['spp_id', '=', spp_id],
    ];
    const defaultFields = [
      'name',
      'address',
      'phone',
      'kind',
      'registration_date',
      'spp_id',
    ];
    try {
      const group = await sppConnector.searchRead(
        'res.partner',
        defaultDomain,
        defaultFields,
        { limit: 1, order: 'id desc' }
      );
      if (group.length === 0) {
        console.log(`✗ Error: Group ${spp_id} not found!`);
        return state;
      }
      console.log(`ℹ Group ${spp_id} found!`);
      const nextState = composeNextState(state, group[0]);
      return callback(nextState);
    } catch (err) {
      console.log(`✗ Error: ${err}`);
      return state;
    }
  };
}

/**
 * get individual information from OpenSPP
 * @public
 * @example
 * getIndividual("IND_Q4VGGZPF")
 * @function
 * @param {string} spp_id - The spp_id of the individual
 * @param {function} callback - An optional callback function
 * @returns {Operation}
 */
export function getIndividual(spp_id, callback = s => s) {
  return async state => {
    const defaultDomain = [
      ['is_registrant', '=', true],
      ['is_group', '=', false],
      ['spp_id', '=', spp_id],
    ];
    const defaultFields = [
      'name',
      'address',
      'phone',
      'spp_id',
      'gender',
      'email',
      'category_id',
      'birthdate',
    ];
    try {
      const individual = await sppConnector.searchRead(
        'res.partner',
        defaultDomain,
        defaultFields,
        { limit: 1, order: 'id desc' }
      );
      if (individual.length === 0) {
        console.log(`✗ Error: Individual with id=${spp_id} not found!`);
        return state;
      }
      console.log(`ℹ Individual with id=${spp_id} found!`);
      const nextState = composeNextState(state, individual[0]);
      return callback(nextState);
    } catch (err) {
      console.log(`✗ Error: ${err}`);
      return state;
    }
  };
}

/**
 * get group members information from OpenSPP
 * @public
 * @example
 * getGroupMembers("GRP_Q4VGGZPF")
 * @function
 * @param {string} spp_id - The name of the group
 * @param {object} [options={}] - Searching options, eg: limit for limiting number of records returning, order for searching order, offset for skipping records
 * @param {function} callback - An optional callback function
 * @returns {Operation}
 */
export function getGroupMembers(spp_id, options = {}, callback = s => s) {
  return async state => {
    try {
      const group_id = await sppConnector.search('res.partner', [
        ['is_group', '=', true],
        ['is_registrant', '=', true],
        ['spp_id', '=', spp_id],
      ]);
      if (group_id.length === 0) {
        console.log(`✗ Error: Group id=${spp_id} not found!`);
        return state;
      }
      const defaultDomain = [
        ['is_ended', '=', false],
        ['group', '=', group_id[0]],
      ];
      const defaultFields = [
        'individual',
        'kind',
        'start_date',
        'ended_date',
        'individual_birthdate',
        'individual_gender',
      ];
      options = resolveOptions(options);
      const members = await sppConnector.searchRead(
        'g2p.group.membership',
        defaultDomain,
        defaultFields,
        options
      );
      if (!members) {
        console.log(`⚠ Warning: Household ${spp_id} not having members!`);
        return state;
      }
      console.log(`ℹ Household ${spp_id} members found!`);
      const nextState = composeNextState(state, members);
      return callback(nextState);
    } catch (err) {
      console.log(`✗ Error: ${err}`);
      return state;
    }
  };
}

/**
 * get service points information from OpenSPP
 * @public
 * @example
 * getServicePoint("SVP_8P4KP4RT")
 * @function
 * @param {string} spp_id - The spp_id of the agent
 * @param {function} callback - An optional callback function
 * @returns {Operation}
 */
export function getServicePoint(spp_id, callback = s => s) {
  return async state => {
    const defaultFields = [
      'name',
      'area_id',
      'service_type_ids',
      'phone_sanitized',
      'shop_address',
      'is_contract_active',
      'is_disabled',
    ];
    try {
      const agents = await sppConnector.searchRead(
        'spp.service.point',
        [['spp_id', '=', spp_id]],
        defaultFields
      );
      if (agents.length === 0) {
        console.log(`⚠ Warning: Agent ${spp_id} not found!`);
        return state;
      }
      console.log(`ℹ Agent ${spp_id} found!`);
      const nextState = composeNextState(state, agents);
      return callback(nextState);
    } catch (err) {
      console.log(`✗ Error: ${err}`);
      return state;
    }
  };
}

/**
 * get groups from OpenSPP
 * @public
 * @example <caption>search group by domain</caption>
 * searchGroup([["spp_id", "=", "GRP_Q4VGGZPF"]])
 * @example <caption>search group by domain with offset</caption>
 * searchGroup([["spp_id", "ilike", "GRP"]], { offset: 100 }})
 * @example <caption>search group by complex domain for more accuracy</caption>
 * searchGroup([["address", "!=", false], ["phone", "!=", false]])
 * @function
 * @param {Array} domain - searching domain
 * @param {object} [options={}] - Searching options, eg: limit for limiting number of records returning, order for ordering search, offset for skipping records
 * @param {function} callback - An optional callback function
 * @returns {Operation}
 */
export function searchGroup(domain, options = {}, callback = s => s) {
  return async state => {
    const defaultDomain = [
      ['is_registrant', '=', true],
      ['is_group', '=', true],
    ];
    const defaultFields = ['name', 'spp_id'];
    domain = resolveDomain(domain);
    const finalDomain = [...domain, ...defaultDomain];
    options = resolveOptions(options);
    try {
      const groups = await sppConnector.searchRead(
        'res.partner',
        finalDomain,
        defaultFields,
        options
      );
      if (groups.length === 0) {
        console.log(`⚠ Warning: Group with domain=${domain} not found!`);
        return state;
      }
      console.log(`ℹ Group with domain=${domain} found!`);
      const nextState = composeNextState(state, groups);
      return callback(nextState);
    } catch (err) {
      console.log(`✗ Error: ${err}`);
      return state;
    }
  };
}

/**
 * get individuals from OpenSPP
 * @public
 * @example <caption>search individual by domain</caption>
 * searchIndividual([["spp_id", "=", "IND_Q4VGGZPF"]])
 * @example <caption>search individual by domain with offset</caption>
 * searchIndividual([["spp_id", "ilike", "IND"]], { offset: 100 })
 * @example <caption>search individual by complex domain for more accuracy</caption>
 * searchIndividual([["address", "!=", false], ["birthdate", "=", false]])
 * @function
 * @param {Array} domain - searching domain
 * @param {object} [options={}] - Searching options, eg: limit for limiting number of records returning, order for searching order, offset for skipping records
 * @param {function} callback - An optional callback function
 * @returns {Operation}
 */
export function searchIndividual(domain, options = {}, callback = s => s) {
  return async state => {
    const defaultDomain = [
      ['is_registrant', '=', true],
      ['is_group', '=', false],
    ];
    const defaultFields = ['name', 'spp_id'];
    domain = resolveDomain(domain);
    const finalDomain = [...domain, ...defaultDomain];
    options = resolveOptions(options);
    try {
      const individuals = await sppConnector.searchRead(
        'res.partner',
        finalDomain,
        defaultFields,
        options
      );
      if (individuals.length === 0) {
        console.log(`⚠ Warning: Individual with domain=${domain} not found!`);
        return state;
      }
      console.log(`ℹ Individual with domain=${domain} found!`);
      const nextState = composeNextState(state, individuals);
      return callback(nextState);
    } catch (err) {
      console.log(`✗ Error: ${err}`);
      return state;
    }
  };
}

/**
 * get program information from OpenSPP
 * @public
 * @example
 * getProgram("PROG_2023_00000001")
 * @function
 * @param {string} program_id - searching domain
 * @param {function} callback - An optional callback function
 * @returns {Operation}
 */
export function getProgram(program_id, callback = s => s) {
  return async state => {
    const defaultDomain = [['program_id', '=', program_id]];
    const defaultFields = [
      'name',
      'program_id',
      'eligible_beneficiaries_count',
      'cycles_count',
      'state',
      'target_type',
    ];
    const options = { limit: 1 };
    try {
      const program = await sppConnector.searchRead(
        'g2p.program',
        defaultDomain,
        defaultFields,
        options
      );
      if (program.length === 0) {
        console.log(`⚠ Warning: Program ${program_id} not found!`);
        return state;
      }
      console.log(`ℹ Program ${program_id} found!`);
      const nextState = composeNextState(state, program[0]);
      return callback(nextState);
    } catch (err) {
      console.log(`✗ Error: ${err}`);
      return state;
    }
  };
}

/**
 * get programs list from OpenSPP
 * @public
 * @example
 * getPrograms(100)
 * @function
 * @param {number} [options={}] - offset from start
 * @param {function} callback - An optional callback function
 * @returns {Operation}
 */
export function getPrograms(options = {}, callback = s => s) {
  return async state => {
    const defaultDomain = [];
    const defaultFields = ['name', 'program_id'];
    options = resolveOptions(options);
    try {
      const programs = await sppConnector.searchRead(
        'g2p.program',
        defaultDomain,
        defaultFields,
        options
      );
      if (programs.length === 0) {
        console.log(`⚠ Warning: No program found!`);
        return state;
      }
      console.log(`ℹ Program(s) found!`);
      const nextState = composeNextState(state, programs);
      return callback(nextState);
    } catch (err) {
      console.log(`✗ Error: ${err}`);
      return state;
    }
  };
}

/**
 * get programs list for specific registrant from OpenSPP
 * @public
 * @example
 * getEnrolledPrograms("IND_Q4VGGZPF")
 * @function
 * @param {string} spp_id - spp_id of group / individual wanted to search
 * @param {function} callback - An optional callback function
 * @returns {Operation}
 */
export function getEnrolledPrograms(spp_id, callback = s => s) {
  return async state => {
    const defaultDomain = [['partner_id.spp_id', '=', spp_id]];
    const defaultFields = ['program_id'];
    try {
      let program_ids = await sppConnector.searchRead(
        'g2p.program_membership',
        defaultDomain,
        defaultFields
      );
      if (program_ids.length === 0) {
        console.log(`⚠ Warning: No enrolled program(s) found!`);
        return state;
      }
      console.log(`ℹ Enrolled program(s) found!`);
      program_ids = program_ids.map(i => i.program_id[0]);
      const programs = await sppConnector.searchRead(
        'g2p.program',
        [['id', 'in', program_ids]],
        defaultFields,
        { limit: program_ids.length }
      );
      const nextState = composeNextState(state, programs);
      return callback(nextState);
    } catch (err) {
      console.log(`✗ Error: ${err}`);
      return state;
    }
  };
}

/**
 * enroll registrant to program in OpenSPP
 * @public
 * @example
 * enroll("IND_Q4VGGZPF", "PROG_2023_00000001")
 * @function
 * @param {string} spp_id - spp_id of group / individual wanted to enroll
 * @param {string} program_id - program_id of program
 */
export function enroll(spp_id, program_id) {
  return async state => {
    const domain = [
      ['partner_id.spp_id', '=', spp_id],
      ['program_id.program_id', '=', program_id],
    ];
    const fields = ['partner_id', 'program_id', 'state'];
    try {
      const programMember = await sppConnector.searchRead(
        'g2p.program_membership',
        domain,
        fields,
        { limit: 1 }
      );
      if (programMember.length > 0) {
        const membership = programMember[0];
        if (membership.state !== 'enrolled') {
          await sppConnector.update('g2p.program_membership', membership.id, {
            state: 'enrolled',
          });
        }
        console.log(
          `ℹ Registrant ${spp_id} enrolled into Program ${program_id}`
        );
      } else {
        await createProgramMembership(spp_id, program_id);
      }
    } catch (err) {
      console.log(`✗ Error: ${err}`);
    } finally {
      return state;
    }
  };
}

/**
 * unenroll registrant from program in OpenSPP
 * @public
 * @example
 * unenroll("IND_Q4VGGZPF", "PROG_2023_00000001")
 * @function
 * @param {string} spp_id - spp_id of group / individual wanted to unenroll
 * @param {string} program_id - program_id of program
 */
export function unenroll(spp_id, program_id) {
  return async state => {
    const domain = [
      ['partner_id.spp_id', '=', spp_id],
      ['program_id.program_id', '=', program_id],
    ];
    const fields = ['partner_id', 'program_id', 'state'];
    try {
      const programMember = await sppConnector.searchRead(
        'g2p.program_membership',
        domain,
        fields,
        { limit: 1 }
      );
      if (programMember.length > 0 && programMember[0].state === 'enrolled') {
        const membership = programMember[0];
        await sppConnector.update('g2p.program_membership', membership.id, {
          state: 'not_eligible',
        });
      }
      console.log(
        `ℹ Registrant ${spp_id} not enroll into Program ${program_id}`
      );
      return state;
    } catch (err) {
      console.log(`✗ Error: ${err}`);
      return state;
    }
  };
}

/**
 * create new individual for OpenSPP
 * @public
 * @example
 * createIndividual({ name: "Individual 1" })
 * @function
 * @param {object} data - registrant create data
 * @param {function} callback - An optional callback function
 * @returns {Operation}
 */
export function createIndividual(data, callback = s => s) {
  return async state => {
    try {
      if (!data.name) {
        throw new Error(`"name" is a required parameter!`);
      }
      data.is_registrant = true;
      data.is_group = false;
      const individualId = await sppConnector.create('res.partner', data);
      const res = await sppConnector.searchRead(
        'res.partner',
        [['id', '=', individualId]],
        ['spp_id'],
        { limit: 1 }
      );
      const individualRegistrantId = res[0].spp_id;
      console.log(
        `ℹ Individual created with registrant ID: ${individualRegistrantId}`
      );
      const nextState = composeNextState(state, individualRegistrantId);
      return callback(nextState);
    } catch (err) {
      console.log(`✗ Error: ${err}`);
      return state;
    }
  };
}

/**
 * create new group for OpenSPP
 * @public
 * @example
 * createGroup({ name: "Group 1" })
 * @function
 * @param {object} data - registrant create data
 * @param {function} callback - An optional callback function
 * @returns {Operation}
 */
export function createGroup(data, callback = s => s) {
  return async state => {
    try {
      if (!data.name) {
        throw new Error(`"name" is a required parameter!`);
      }
      data.is_registrant = true;
      data.is_group = true;
      const groupId = await sppConnector.create('res.partner', data);
      const res = await sppConnector.searchRead(
        'res.partner',
        [['id', '=', groupId]],
        ['spp_id'],
        { limit: 1 }
      );
      const groupRegistrantId = res[0].spp_id;
      console.log(`ℹ Group created with registrant ID: ${groupRegistrantId}`);
      const nextState = composeNextState(state, groupRegistrantId);
      return callback(nextState);
    } catch (err) {
      console.log(`✗ Error: ${err}`);
      return state;
    }
  };
}

/**
 * update group for OpenSPP
 * @public
 * @example
 * updateGroup("GRP_B2BRHJN2", { name: "Group 1" })
 * @function
 * @param {string} group_id - group registrant id
 * @param {object} data - registrant update data
 * @returns {Operation}
 */
export function updateGroup(group_id, data) {
  return async state => {
    try {
      const res = await sppConnector.searchRead(
        'res.partner',
        [
          ['spp_id', '=', group_id],
          ['is_registrant', '=', true],
          ['is_group', '=', true],
        ],
        ['id'],
        { limit: 1, order: 'id desc' }
      );
      if (res.length === 0) {
        throw new Error(
          `Group with registrant id: ${group_id} does not exists!`
        );
      }
      const groupId = res[0].id;
      await sppConnector.update('res.partner', groupId, data);
      console.log(`ℹ Group ${group_id} updated!`);
    } catch (err) {
      console.log(`✗ Error: ${err}`);
    } finally {
      return state;
    }
  };
}

/**
 * update individual for OpenSPP
 * @public
 * @example
 * updateIndividual("IND_8DUQL4M4", { name: "Individual 1" })
 * @function
 * @param {string} individual_id - individual registrant id
 * @param {object} data - registrant update data
 * @returns {Operation}
 */
export function updateIndividual(individual_id, data) {
  return async state => {
    try {
      if (typeof data !== 'object' || Array.isArray(data) || data === null) {
        throw new Error(`${data} is not an update object!`);
      }
      const res = await sppConnector.searchRead(
        'res.partner',
        [
          ['spp_id', '=', individual_id],
          ['is_registrant', '=', true],
          ['is_group', '=', false],
        ],
        ['id'],
        { limit: 1, order: 'id desc' }
      );
      if (res.length === 0) {
        throw new Error(
          `Individual with registrant id: ${individual_id} does not exists!`
        );
      }
      const individualId = res[0].id;
      await sppConnector.update('res.partner', individualId, data);
      console.log(`ℹ Individual ${individual_id} updated!`);
    } catch (err) {
      console.log(`✗ Error: ${err}`);
    } finally {
      return state;
    }
  };
}

/**
 * add individual to group in OpenSPP
 * @public
 * @example <caption>create a new head for group</caption>
 * addToGroup("GRP_B2BRHJN2", "IND_8DUQL4M4", "Head")
 * @example <caption>create a new ordinary member for group</caption>
 * addToGroup("GRP_B2BRHJN2", "IND_8DUQL4M4")
 * @example <caption>create a new member with new role for group</caption>
 * addToGroup("GRP_B2BRHJN2", "IND_8DUQL4M4", "new-role-name")
 * @function
 * @param {string} group_id - group registrant id
 * @param {string} individual_id - individual registrant id
 * @param {string} role - individual role in group
 * @returns {Operation}
 */
export function addToGroup(group_id, individual_id, role = '') {
  return async state => {
    try {
      let roleId = [];
      if (role.length > 0) {
        roleId = await sppConnector.search('g2p.group.membership.kind', [
          ['name', '=', role],
        ]);
        if (roleId.length === 0) {
          roleId = [
            await sppConnector.create('g2p.group.membership.kind', {
              name: role,
            }),
          ];
        }
      }
      const res = await sppConnector.searchRead(
        'g2p.group.membership',
        [
          ['group.spp_id', '=', group_id],
          ['individual.spp_id', '=', individual_id],
          ['is_ended', '=', false],
        ],
        ['id', 'kind'],
        { limit: 1 }
      );
      if (res.length === 0) {
        const individual = await sppConnector.searchRead(
          'res.partner',
          [
            ['spp_id', '=', individual_id],
            ['is_registrant', '=', true],
            ['is_group', '=', false],
          ],
          ['id'],
          { limit: 1 }
        );
        const group = await sppConnector.searchRead(
          'res.partner',
          [
            ['spp_id', '=', group_id],
            ['is_registrant', '=', true],
            ['is_group', '=', true],
          ],
          ['id'],
          { limit: 1 }
        );
        if (individual.length === 0 || group.length === 0) {
          throw new Error(`Individual or Group does not exist!`);
        }
        await sppConnector.create('g2p.group.membership', {
          individual: individual[0].id,
          group: group[0].id,
          kind: [[6, 0, roleId]],
        });
      } else {
        const groupMembershipIds = res.map(i => i.id);
        await sppConnector.update('g2p.group.membership', groupMembershipIds, {
          kind: [[6, 0, roleId]],
        });
      }
      if (role.length > 0) {
        console.log(
          `ℹ Individual ${individual_id} added to group ${group_id} with role ${role}!`
        );
      } else {
        console.log(
          `ℹ Individual ${individual_id} added to group ${group_id}!`
        );
      }
    } catch (err) {
      console.log(`✗ Error: ${err}`);
    } finally {
      return state;
    }
  };
}

/**
 * remove individual from group in OpenSPP
 * @public
 * @example
 * removeFromGroup("GRP_B2BRHJN2", "IND_8DUQL4M4")
 * @function
 * @param {string} group_id - group registrant id
 * @param {string} individual_id - individual registrant id
 * @returns {Operation}
 */
export function removeFromGroup(group_id, individual_id) {
  return async state => {
    try {
      const res = await sppConnector.searchRead(
        'g2p.group.membership',
        [
          ['group.spp_id', '=', group_id],
          ['individual.spp_id', '=', individual_id],
          ['is_ended', '=', false],
        ],
        ['id']
      );
      if (res.length > 0) {
        const groupMembershipIds = res.map(i => i.id);
        const now = new Date();
        const sppDateTimeNowString = dateFns.format(now, 'y-M-d HH:mm:ss');
        await sppConnector.update('g2p.group.membership', groupMembershipIds, {
          ended_date: sppDateTimeNowString,
        });
      }
      console.log(
        `ℹ Individual ${individual_id} membership to group ${group_id} is ended!`
      );
    } catch (err) {
      console.log(`✗ Error: ${err}`);
    } finally {
      return state;
    }
  };
}

/**
 * searching for service point in OpenSPP
 * @public
 * @example <caption>search without offset</caption>
 * searchServicePoint([["name", "ilike", "agent 1"]])
 * @example <caption>search with offset</caption>
 * searchServicePoint([["name", "ilike", "agent 1"]], { offset: 100 })
 * @function
 * @param {Array} domain - searching domain
 * @param {object} [options={}] - Searching options, eg: limit for limiting number of records returning, order for searching order, offset for skipping records
 * @param {function} callback - An optional callback function
 * @returns {Operation}
 */
export function searchServicePoint(domain, options = {}, callback = s => s) {
  return async state => {
    try {
      domain = resolveDomain(domain);
      let servicePoints = await sppConnector.searchRead(
        'spp.service.point',
        domain,
        [
          'name',
          'area_id',
          'service_type_ids',
          'program_id',
          'phone_sanitized',
          'is_contract_active',
          'is_disabled',
        ],
        resolveOptions(options)
      );
      for (let servicePoint of servicePoints) {
        servicePoint.program_ids = servicePoint.program_id;
        delete servicePoint.program_id;
      }
      if (servicePoints.length === 0) {
        console.log(
          `⚠ Warning: Service point with domain=${domain} not found!`
        );
        return state;
      }
      console.log(`ℹ Service point with domain=${domain} found!`);
      const nextState = composeNextState(state, servicePoints);
      return callback(nextState);
    } catch (err) {
      console.log(`✗ Error: ${err}`);
      return state;
    }
  };
}

/**
 * get area by id in OpenSPP
 * @public
 * @example
 * getArea("LOC_7M92NLDH")
 * @function
 * @param {string} spp_id - spp_id of area
 * @param {function} callback - An optional callback function
 * @returns {Operation}
 */
export function getArea(spp_id, callback = s => s) {
  return async state => {
    try {
      const area = await sppConnector.searchRead(
        'spp.area',
        [['spp_id', '=', spp_id]],
        ['parent_id', 'name', 'code', 'altnames', 'area_level', 'kind']
      );
      if (area.length === 0) {
        console.log(`⚠ Warning: Area ${spp_id} not found!`);
        return state;
      }
      console.log(`ℹ Area ${spp_id} found!`);
      const nextState = composeNextState(state, area);
      return callback(nextState);
    } catch (err) {
      console.log(`✗ Error: ${err}`);
      return state;
    }
  };
}

/**
 * searching for service point in OpenSPP
 * @public
 * @example <caption>search without offset</caption>
 * searchArea([["code", "=", "10732"]])
 * @example <caption>search with offset</caption>
 * searchArea([["kind", "=", 1]], { offset: 10 }})
 * @function
 * @param {Array} domain - searching domain
 * @param {object} [options={}] - Searching options, eg: limit for limiting number of records returning, order for searching order, offset for skipping records
 * @param {function} callback - An optional callback function
 * @returns {Operation}
 */
export function searchArea(domain, options = {}, callback = s => s) {
  return async state => {
    try {
      domain = resolveDomain(domain);
      const areas = await sppConnector.searchRead(
        'spp.area',
        domain,
        ['parent_id', 'name', 'code', 'altnames', 'area_level', 'kind'],
        resolveOptions(options)
      );
      if (areas.length === 0) {
        console.log(`⚠ Warning: Area with domain=${domain} not found!`);
        return state;
      }
      console.log(`ℹ Area with domain=${domain} found!`);
      const nextState = composeNextState(state, areas);
      return callback(nextState);
    } catch (err) {
      console.log(`✗ Error: ${err}`);
      return state;
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
