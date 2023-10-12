import {
  execute as commonExecute,
  composeNextState,
  expandReferences,
} from "@openfn/language-common";

import pkg from "odoo";
const { Odoo } = pkg;

var sppConnector = null;


export class Log {
  static info(message) {
    return console.info(`ℹ `, message);
  }

  static success(message) {
    return console.info(`✓ Success at ${new Date()}:\n∟`, message);
  }

  static warn(message) {
    return console.warn(`⚠ Warning at ${new Date()}:\n∟`, message);
  }

  static error(message) {
    return console.error(`✗ Error at ${new Date()}:\n∟`, message);
  }
}


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
  sppConnector = null;

  const initialState = {
    references: [],
    data: null,
  };

  return state => {
    return commonExecute(...operations)({ ...initialState, ...state });
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
function login(state) {
  const {baseUrl, username, password, database} = state.configuration;
  sppConnector = new Odoo({
    host: baseUrl,
    database: database,
    username: username,
    password: password
  });
  sppConnector.connect((err) => {
    if (err) {
      Log.error(err);
      throw new Error("Can't login to OpenSPP, please check your credentials or network!");
    }
  });
  return state;
}

/**
 * Create a brand new program membership for registrant.
 * @example
 *  _creatingEnrolledRegistrantToProgram("IND_Q4VGGZPF", "PROG_2023_00000001")
 * @private
 * @param {string} registrant_id - registrant_id of group / individual wanted to unenroll 
 * @param {string} program_id - program_id of program 
 */
function _creatingEnrolledRegistrantToProgram(registrant_id, program_id) {
  if (sppConnector === null) {
    login(state);
  }
  let registrant;
  let program;
  sppConnector
    .search_read(
      "res.partner",
      {
        domain: [["is_registrant", "=", true], ["registrant_id", "=", registrant_id]],
        limit: 1,
        fields: ["id"],
      },
      (err, res) => {
        if (err) {
          Log.error(err);
        }
        registrant = res;
      }
    )
    .then(() =>{
      sppConnector.search_read(
        "g2p.program",
        {
          domain: [["program_id", "=", program_id]],
          limit: 1,
          fields: ["id"],
        },
        (err, res) => {
          if (err) {
            Log.error(err);
          }
          program = res;
        }
      )
    })
    .then(() =>{
      if (!registrant || !program) {
        return Log.error("Registrant or Program not exists!");
      }
      let registrantId = registrant[0].id;
      let programId = program[0].id;
      sppConnector.create(
        "g2p.program_membership",
        {
          program_id: programId,
          partner_id: registrantId,
          state: "enrolled",
        }
      );
    });
};

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
export function getGroup(registrant_id, callback=false) {
  if (sppConnector === null) {
    login(state);
  }
  return state => {
    let defaultDomain = [
      ["is_registrant", "=", true],
      ["is_group", "=", true],
      ["registrant_id", "=", registrant_id]
    ];
    let defaultOrder = "id desc";
    let defaultFields = [
      "name", "address", "phone", "kind", "registration_date", "registrant_id"
    ];
    let options = {
      domain: defaultDomain,
      limit: 1,
      order: defaultOrder,
      fields: defaultFields
    };
    sppConnector.search_read("res.partner", options, (err, group) => {
      if (err) {
        return Log.error(err);
      }
      if (!group) {
        return Log.warn(`Group ${registrant_id} not found!`);
      }
      Log.info(`Group ${registrant_id} found!`);
      let nextState = composeNextState(state, group);
      if (callback) {
        return callback(nextState);
      }
      return nextState;
    });
  };
};

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
export function getIndividual(registrant_id, callback=false) {
  if (sppConnector === null) {
    login(state);
  }
  return state => {
    let defaultDomain = [
      ["is_registrant", "=", true],
      ["is_group", "=", true],
      ["registrant_id", "=", registrant_id]
    ];
    let defaultOrder = "id desc";
    let defaultFields = [
      "name", "address", "phone", "registrant_id",
      "gender", "email", "category_id", "birthdate",
    ];
    let options = {
      domain: defaultDomain,
      limit: 1,
      order: defaultOrder,
      fields: defaultFields
    };
    sppConnector.search_read("res.partner", options, (err, individual) => {
      if (err) {
        return Log.error(err);
      }
      if (!individual) {
        return Log.warn(`Individual with id=${registrant_id} not found!`);
      }
      Log.info(`Individual with id=${registrant_id} found!`);
      let nextState = composeNextState(state, individual);
      if (callback) {
        return callback(nextState);
      }
      return nextState;
    });
  };
};

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
export function getGroupMembers(registrant_id, offset=0, callback=false) {
  if (sppConnector === null) {
    login(state);
  }
  return state => {
    let defaultDomain = [
      ["is_ended", "=", false],
      ["group.registrant_id", "=", registrant_id]
    ];
    let defaultFields = [
      "individual", "kind", "start_date", "ended_date",
      "individual_birthdate", "individual_gender"
    ];
    let options = {
      domain: defaultDomain,
      limit: 100,
      fields: defaultFields
    };
    if (offset > 0) {
      options.offset = offset
    }
    sppConnector.search_read("g2p.group.membership", options, (err, members) => {
      if (err) {
        return Log.error(err);
      }
      if (!members) {
        return Log.warn(`Household ${registrant_id} not found or not having members!`)
      }
      Log.info(`Household ${registrant_id} members found!`);
      let nextState = composeNextState(state, members);
      if (callback) {
        return callback(nextState);
      }
      return nextState;
    })
  }
};

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
export function getServicePoint(name, offset=0, callback=false) {
  if (sppConnector === null) {
    login(state);
  }
  return state => {
    let defaultDomain = [["name", "=", name]];
    let defaultFields = [
      "name", "area_id", "service_type_ids", "phone_sanitized",
      "shop_address", "is_contract_active", "is_disabled"
    ];
    let options = {
      domain: defaultDomain,
      limit: 100,
      fields: defaultFields
    };
    if (offset > 0) {
      options.offset = offset;
    }
    sppConnector.search_read("spp.service.point", options, (err, agents) => {
      if (err) {
        return Log.error(err);
      }
      if (!agents) {
        return Log.warn(`Agent ${name} not found!`)
      }
      Log.info(`Agent ${name} found!`);
      let nextState = composeNextState(state, agents);
      if (callback) {
        return callback(nextState);
      }
      return nextState;
    })
  }
};

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
export function searchGroup(domain, offset=0, callback=false) {
  if (sppConnector === null) {
    login(state);
  }
  return state => {
    let defaultDomain = [
      ["is_registrant", "=", true],
      ["is_group", "=", true],
    ];
    let defaultOrder = "id desc";
    let defaultFields = ["name", "registrant_id"];
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
      domain: finalDomain,
      limit: 100,
      offset: offset,
      order: defaultOrder,
      fields: defaultFields
    };
    sppConnector.search_read("res.partner", options, (err, groups) => {
      if (err) {
        return Log.error(err);
      }
      if (!groups) {
        return Log.warn(`Group with domain=${domain} not found!`);
      }
      Log.info(`Group with domain=${domain} found!`);
      let nextState = composeNextState(state, groups);
      if (callback) {
        return callback(nextState);
      }
      return nextState;
    });
  }
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
export function searchIndividual(domain, offset=0, callback=false) {
  if (sppConnector === null) {
    login(state);
  }
  return state => {
    let defaultDomain = [
      ["is_registrant", "=", true],
      ["is_group", "=", false],
    ];
    let defaultOrder = "id desc";
    let defaultFields = ["name", "registrant_id"];
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
      domain: finalDomain,
      limit: 100,
      offset: offset,
      order: defaultOrder,
      fields: defaultFields
    };
    sppConnector.search_read("res.partner", options, (err, individuals) => {
      if (err) {
        return Log.error(err);
      }
      if (!individuals) {
        return Log.warn(`Individual with domain=${domain} not found!`);
      }
      Log.info(`Individual with domain=${domain} found!`);
      let nextState = composeNextState(state, individuals);
      if (callback) {
        return callback(nextState);
      }
      return nextState;
    });
  }
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
export function getProgram(program_id, callback=false) {
  if (sppConnector === null) {
    login(state);
  }
  return state => {
    let defaultDomain = [["program_id", "=", program_id]];
    let defaultFields = [
      "name", "program_id", "eligible_beneficiaries_count",
      "cycles_count", "state", "target_type"
    ];
    let options = {
      domain: defaultDomain,
      limit: 1,
      fields: defaultFields
    };
    sppConnector.search_read("g2p.program", options, (err, program) => {
      if (err) {
        return Log.error(err);
      }
      if (!program) {
        return Log.warn(`Program ${program_id} not found!`)
      }
      Log.info(`Program ${program_id} found!`);
      let nextState = composeNextState(state, program);
      if (callback) {
        return callback(nextState);
      }
      return nextState;
    })
  }
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
export function getPrograms(offset=0, callback=false) {
  if (sppConnector === null) {
    login(state);
  }
  return state => {
    let defaultDomain = [];
    let defaultFields = ["name", "program_id"];
    let defaultOrder = "id";
    let options = {
      domain: defaultDomain,
      limit: 100,
      fields: defaultFields,
      offset: offset,
      order: defaultOrder,
    };
    sppConnector.search_read("g2p.program", options, (err, programs) => {
      if (err) {
        return Log.error(err);
      }
      if (!programs) {
        return Log.warn("No program found!");
      }
      Log.info("Program(s) found!");
      let nextState = composeNextState(state, programs);
      if (callback) {
        return callback(nextState);
      }
      return nextState;
    });
  };
};

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
export function getEnrolledPrograms(registrant_id, callback=false) {
  if (sppConnector === null) {
    login(state);
  }
  return state => {
    let defaultDomain = [["partner_id.registrant_id", "=", registrant_id]];
    let defaultFields = ["program_id"];
    sppConnector.search_read(
      "g2p.program_membership",
      {
        domain: defaultDomain,
        fields: defaultFields,
        limit: 500
      },
      (err, program_ids) => {
        if (err) {
          return Log.error(err);
        }
        if (!program_ids) {
          return Log.warn("No enrolled program(s) found!");
        }
        Log.info("Enrolled program(s) found!");
        sppConnector.search_read(
          "g2p.program",
          {
            domain: [["id", "in", program_ids]],
            fields: defaultFields,
            limit: program_ids.length
          },
          (err, programs) => {
            let nextState = composeNextState(state, programs);
            if (callback) {
              return callback(nextState);
            }
            return nextState;
          }
        );
      }
    );
  };
};

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
export function enroll(registrant_id, program_id, callback=false) {
  if (sppConnector === null) {
    login(state);
  }
  return state => {
    let domain = [
      ["partner_id.registrant_id", "=", registrant_id],
      ["program_id.program_id", "=", program_id],
    ];
    let fields = ["partner_id", "program_id", "state"];
    sppConnector.search_read(
      "g2p.program_membership",
      {
        domain: domain,
        limit: 1,
        fields: fields,
      },
      (err, result) => {
        if (err) {
          return Log.error(err);
        }
        if (Array.isArray(result) && result.length > 0) {
          let membership = result[0];
          if (membership.state === "enrolled") {
            return Log.info(`Registrant ${registrant_id} enrolled into Program ${program_id}`);
          } else {
            sppConnector.update(
              model="g2p.program_membership",
              id=membership.id,
              params={state: "enrolled"},
              (err, result) => {
                if (err) {
                  return Log.error(err);
                }
                return Log.info(`Registrant ${registrant_id} enrolled into Program ${program_id}`);
              }
            );
          }
        } else {
          Log.info("Please waiting to create program membership");
          return _creatingEnrolledRegistrantToProgram(registrant_id, program_id);
        }
      }
    );
  };
};

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
export function unenroll(registrant_id, program_id, callback=false) {
  if (sppConnector === null) {
    login(state);
  }
  return state => {
    let domain = [
      ["partner_id.registrant_id", "=", registrant_id],
      ["program_id.program_id", "=", program_id],
    ];
    let fields = ["partner_id", "program_id", "state"];
    sppConnector.search_read(
      "g2p.program_membership",
      {
        domain: domain,
        fields: fields,
        limit: 1
      },
      (err, result) => {
        if (err) {
          Log.error(err);
        }
        if ((Array.isArray(result) && result.length === 0) || result[0].state !== "enrolled") {
          Log.info(`Registrant ${registrant_id} is not enrolled into Program ${program_id}`);
        } else {
          sppConnector.update(
            model="g2p.program_membership",
            id=membership.id,
            params={state: "not_eligible"},
            (err, result) => {
              if (err) {
                return Log.error(err);
              }
              return Log.info(`Registrant ${registrant_id} enrolled into Program ${program_id}`);
            }
          );
        }
      }
    );
  };
};

// TODO: Decide which functions to publish from @openfn/language-common
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
} from "@openfn/language-common";
