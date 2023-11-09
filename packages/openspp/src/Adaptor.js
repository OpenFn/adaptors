import {
  execute as commonExecute,
  composeNextState,
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
 * Create a brand new program membership for registrant.
 * @example
 * createProgramMembership("IND_Q4VGGZPF", "PROG_2023_00000001")
 * @private
 * @param {string} registrant_id - registrant_id of group / individual wanted to unenroll
 * @param {string} program_id - program_id of program
 */
async function createProgramMembership(registrant_id, program_id) {
  try {
    let registrant = await sppConnector.searchRead(
      'res.partner',
      [
        ['is_registrant', '=', true],
        ['registrant_id', '=', registrant_id],
      ],
      ['id'],
      { limit: 1 }
    );
    if (registrant.length === 0) {
      throw new Error(`Registrant ${registrant_id} not exists!`);
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
 * @param {string} registrant_id - The registrant_id of the group
 * @param {function} callback - An optional callback function
 * @returns {Operation}
 */
export function getGroup(registrant_id, callback = false) {
  return async state => {
    let defaultDomain = [
      ['is_registrant', '=', true],
      ['is_group', '=', true],
      ['registrant_id', '=', registrant_id],
    ];
    let defaultFields = [
      'name',
      'address',
      'phone',
      'kind',
      'registration_date',
      'registrant_id',
    ];
    try {
      let group = await sppConnector.searchRead(
        'res.partner',
        defaultDomain,
        defaultFields,
        { limit: 1, order: 'id desc' }
      );
      if (group.length === 0) {
        console.log(`✗ Error: Group ${registrant_id} not found!`);
        return state;
      }
      console.log(`ℹ Group ${registrant_id} found!`);
      let nextState = composeNextState(state, group[0]);
      if (callback) {
        return callback(nextState);
      } else {
        return nextState;
      }
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
 * @param {string} registrant_id - The registrant_id of the individual
 * @param {function} callback - An optional callback function
 * @returns {Operation}
 */
export function getIndividual(registrant_id, callback = false) {
  return async state => {
    let defaultDomain = [
      ['is_registrant', '=', true],
      ['is_group', '=', false],
      ['registrant_id', '=', registrant_id],
    ];
    let defaultFields = [
      'name',
      'address',
      'phone',
      'registrant_id',
      'gender',
      'email',
      'category_id',
      'birthdate',
    ];
    try {
      let individual = await sppConnector.searchRead(
        'res.partner',
        defaultDomain,
        defaultFields,
        { limit: 1, order: 'id desc' }
      );
      if (individual.length === 0) {
        console.log(`✗ Error: Individual with id=${registrant_id} not found!`);
        return state;
      }
      console.log(`ℹ Individual with id=${registrant_id} found!`);
      let nextState = composeNextState(state, individual[0]);
      if (callback) {
        return callback(nextState);
      } else {
        return nextState;
      }
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
 * @param {string} registrant_id - The name of the group
 * @param {number} [offset=0] - Offset searching
 * @param {function} callback - An optional callback function
 * @returns {Operation}
 */
export function getGroupMembers(registrant_id, offset = 0, callback = false) {
  return async state => {
    try {
      let group_id = await sppConnector.search('res.partner', [
        ['is_group', '=', true],
        ['is_registrant', '=', true],
        ['registrant_id', '=', registrant_id],
      ]);
      if (group_id.length === 0) {
        console.log(`✗ Error: Group id=${registrant_id} not found!`);
        return state;
      }
      let defaultDomain = [
        ['is_ended', '=', false],
        ['group', '=', group_id[0]],
      ];
      let defaultFields = [
        'individual',
        'kind',
        'start_date',
        'ended_date',
        'individual_birthdate',
        'individual_gender',
      ];
      let options = {
        limit: 100,
        order: 'id desc',
      };
      if (offset > 0) {
        options.offset = offset;
      }
      let members = await sppConnector.searchRead(
        'g2p.group.membership',
        defaultDomain,
        defaultFields,
        options
      );
      if (!members) {
        console.log(
          `⚠ Warning: Household ${registrant_id} not having members!`
        );
        return state;
      }
      console.log(`ℹ Household ${registrant_id} members found!`);
      let nextState = composeNextState(state, members);
      if (callback) {
        return callback(nextState);
      }
      return nextState;
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
 * getServicePoint("000117")
 * @function
 * @param {string} name - The number of the agent
 * @param {number} [offset=0] - Offset searching
 * @param {function} callback - An optional callback function
 * @returns {Operation}
 */
export function getServicePoint(name, offset = 0, callback = false) {
  return async state => {
    let defaultDomain = [['name', '=', name]];
    let defaultFields = [
      'name',
      'area_id',
      'service_type_ids',
      'phone_sanitized',
      'shop_address',
      'is_contract_active',
      'is_disabled',
    ];
    let options = {
      limit: 100,
      order: 'id desc',
    };
    if (offset > 0) {
      options.offset = offset;
    }
    try {
      let agents = await sppConnector.searchRead(
        'spp.service.point',
        defaultDomain,
        defaultFields,
        options
      );
      if (agents.length === 0) {
        console.log(`⚠ Warning: Agent ${name} not found!`);
        return state;
      }
      console.log(`ℹ Agent ${name} found!`);
      let nextState = composeNextState(state, agents);
      if (callback) {
        return callback(nextState);
      }
      return nextState;
    } catch (err) {
      console.log(`✗ Error: ${err}`);
      return state;
    }
  };
}

/**
 * get groups from OpenSPP
 * @public
 * @example
 * searchGroup([["registrant_id", "=", "GRP_Q4VGGZPF"]])
 * @function
 * @param {string} domain - searching domain
 * @param {number} [offset=0] - Offset searching
 * @param {function} callback - An optional callback function
 * @returns {Operation}
 */
export function searchGroup(domain, offset = 0, callback = false) {
  return async state => {
    let defaultDomain = [
      ['is_registrant', '=', true],
      ['is_group', '=', true],
    ];
    let defaultOrder = 'id desc';
    let defaultFields = ['name', 'registrant_id'];
    let isDomain = true;
    for (const element of domain) {
      if (!Array.isArray(element)) {
        isDomain = false;
        break;
      }
    }
    if (!isDomain) {
      domain = [domain];
    }
    let finalDomain = [...domain, ...defaultDomain];
    let options = {
      limit: 100,
      offset: offset,
      order: defaultOrder,
    };
    try {
      let groups = await sppConnector.searchRead(
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
      let nextState = composeNextState(state, groups);
      if (callback) {
        return callback(nextState);
      }
      return nextState;
    } catch (err) {
      console.log(`✗ Error: ${err}`);
      return state;
    }
  };
}

/**
 * get individuals from OpenSPP
 * @public
 * @example
 * searchIndividual([["registrant_id", "=", "IND_Q4VGGZPF"]])
 * @function
 * @param {string} domain - searching domain
 * @param {number} [offset=0] - Offset searching
 * @param {function} callback - An optional callback function
 * @returns {Operation}
 */
export function searchIndividual(domain, offset = 0, callback = false) {
  return async state => {
    let defaultDomain = [
      ['is_registrant', '=', true],
      ['is_group', '=', false],
    ];
    let defaultOrder = 'id desc';
    let defaultFields = ['name', 'registrant_id'];
    let isDomain = true;
    for (const element of domain) {
      if (!Array.isArray(element)) {
        isDomain = false;
        break;
      }
    }
    if (!isDomain) {
      domain = [domain];
    }
    let finalDomain = [...domain, ...defaultDomain];
    let options = {
      limit: 100,
      offset: offset,
      order: defaultOrder,
    };
    try {
      let individuals = await sppConnector.searchRead(
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
      let nextState = composeNextState(state, individuals);
      if (callback) {
        return callback(nextState);
      }
      return nextState;
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
export function getProgram(program_id, callback = false) {
  return async state => {
    let defaultDomain = [['program_id', '=', program_id]];
    let defaultFields = [
      'name',
      'program_id',
      'eligible_beneficiaries_count',
      'cycles_count',
      'state',
      'target_type',
    ];
    let options = { limit: 1 };
    try {
      let program = await sppConnector.searchRead(
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
      let nextState = composeNextState(state, program[0]);
      if (callback) {
        return callback(nextState);
      }
      return nextState;
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
 * @param {number} [offset=0] - offset from start
 * @param {function} callback - An optional callback function
 * @returns {Operation}
 */
export function getPrograms(offset = 0, callback = false) {
  return async state => {
    let defaultDomain = [];
    let defaultFields = ['name', 'program_id'];
    let defaultOrder = 'id';
    let options = {
      limit: 100,
      offset: offset,
      order: defaultOrder,
    };
    try {
      let programs = await sppConnector.searchRead(
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
      let nextState = composeNextState(state, programs);
      if (callback) {
        return callback(nextState);
      }
      return nextState;
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
 * getEnrolledPrograms("IND_Q4VGGZPF")
 * @function
 * @param {string} registrant_id - registrant_id of group / individual wanted to search
 * @param {function} callback - An optional callback function
 * @returns {Operation}
 */
export function getEnrolledPrograms(registrant_id, callback = false) {
  return async state => {
    let defaultDomain = [['partner_id.registrant_id', '=', registrant_id]];
    let defaultFields = ['program_id'];
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
      let programs = await sppConnector.searchRead(
        'g2p.program',
        [['id', 'in', program_ids]],
        defaultFields,
        { limit: program_ids.length }
      );
      let nextState = composeNextState(state, programs);
      if (callback) {
        return callback(nextState);
      }
      return nextState;
    } catch (err) {
      console.log(`✗ Error: ${err}`);
      return state;
    }
  };
}

/**
 * enroll registrant to program from OpenSPP
 * @public
 * @example
 * enroll("IND_Q4VGGZPF", "PROG_2023_00000001")
 * @function
 * @param {string} registrant_id - registrant_id of group / individual wanted to enroll
 * @param {string} program_id - program_id of program
 * @param {function} callback - An optional callback function
 */
export function enroll(registrant_id, program_id) {
  return async state => {
    let domain = [
      ['partner_id.registrant_id', '=', registrant_id],
      ['program_id.program_id', '=', program_id],
    ];
    let fields = ['partner_id', 'program_id', 'state'];
    try {
      let programMember = await sppConnector.searchRead(
        'g2p.program_membership',
        domain,
        fields,
        { limit: 1 }
      );
      if (programMember.length > 0) {
        let membership = programMember[0];
        if (membership.state !== 'enrolled') {
          await sppConnector.update('g2p.program_membership', membership.id, {
            state: 'enrolled',
          });
        }
        console.log(
          `ℹ Registrant ${registrant_id} enrolled into Program ${program_id}`
        );
      } else {
        await createProgramMembership(registrant_id, program_id);
      }
    } catch (err) {
      console.log(`✗ Error: ${err}`);
    } finally {
      return state;
    }
  };
}

/**
 * unenroll registrant from program from OpenSPP
 * @public
 * @example
 * unenroll("IND_Q4VGGZPF", "PROG_2023_00000001")
 * @function
 * @param {string} registrant_id - registrant_id of group / individual wanted to unenroll
 * @param {string} program_id - program_id of program
 * @param {function} callback - An optional callback function
 */
export function unenroll(registrant_id, program_id) {
  return async state => {
    let domain = [
      ['partner_id.registrant_id', '=', registrant_id],
      ['program_id.program_id', '=', program_id],
    ];
    let fields = ['partner_id', 'program_id', 'state'];
    try {
      let programMember = await sppConnector.searchRead(
        'g2p.program_membership',
        domain,
        fields,
        { limit: 1 }
      );
      if (programMember.length > 0 && programMember[0].state === 'enrolled') {
        let membership = programMember[0];
        await sppConnector.update('g2p.program_membership', membership.id, {
          state: 'not_eligible',
        });
      }
      console.log(
        `ℹ Registrant ${registrant_id} not enroll into Program ${program_id}`
      );
      return state;
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
  http,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';
