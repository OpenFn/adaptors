
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

/**
 * @typedef {Object} Address
 * @property {string} [city] - Name of city, town etc.
 * @property {string} [country] - Country (e.g. can be ISO 3166 2 or 3 letter code)
 * @property {string} [district] - District name (aka county)
 * @property {Extension[]} [extension] - Additional content defined by implementations
 * @property {string} [id] - Unique id for inter-element referencing
 * @property {string[]} [line] - Street name, number, direction & P.O. Box etc.
 * @property {Period} [period] - Time period when address was/is in use
 * @property {string} [postalCode] - Postal code for area
 * @property {string} [state] - Sub-unit of country (abbreviations ok)
 * @property {string} [text] - Text representation of the address
 * @property {string} [type] - postal | physical | both
 * @property {string} [use] - home | work | temp | old | billing - purpose of this address
 */

/**
 * @typedef {Object} CodeableConcept
 * @property {Coding[]} [coding] - Code defined by a terminology system
 * @property {Extension[]} [extension] - Additional content defined by implementations
 * @property {string} [id] - Unique id for inter-element referencing
 * @property {string} [text] - Plain text representation of the concept
 */

/**
 * @typedef {Object} Coding
 * @property {string} [code] - Symbol in syntax defined by the system
 * @property {string} [display] - Representation defined by the system
 * @property {Extension[]} [extension] - Additional content defined by implementations
 * @property {string} [id] - Unique id for inter-element referencing
 * @property {string} [system] - Identity of the terminology system
 * @property {boolean} [userSelected] - If this coding was chosen directly by the user
 * @property {string} [version] - Version of the system - if relevant
 */

/**
 * @typedef {Object} ContactPoint
 * @property {Extension[]} [extension] - Additional content defined by implementations
 * @property {string} [id] - Unique id for inter-element referencing
 * @property {Period} [period] - Time period when the contact point was/is in use
 * @property {number} [rank] - Specify preferred order of use (1 = highest)
 * @property {string} [system] - phone | fax | email | pager | url | sms | other
 * @property {string} [use] - home | work | temp | old | mobile - purpose of this contact point
 * @property {string} [value] - The actual contact point details
 */

/**
 * @typedef {Object} HumanName
 * @property {Extension[]} [extension] - Additional content defined by implementations
 * @property {string} [family] - Family name (often called 'Surname')
 * @property {string[]} [given] - Given names (not always 'first'). Includes middle names
 * @property {string} [id] - Unique id for inter-element referencing
 * @property {Period} [period] - Time period when name was/is in use
 * @property {string[]} [prefix] - Parts that come before the name
 * @property {string[]} [suffix] - Parts that come after the name
 * @property {string} [text] - Text representation of the full name
 * @property {string} [use] - usual | official | temp | nickname | anonymous | old | maiden
 */

/**
 * @typedef {Object} Identifier
 * @property {string|Reference} [assigner] - Organization that issued id (may be just text)
 * @property {Extension[]} [extension] - Additional content defined by implementations
 * @property {string} [id] - Unique id for inter-element referencing
 * @property {Period} [period] - Time period when id is/was valid for use
 * @property {string} [system] - The namespace for the identifier value
 * @property {string[]|CodeableConcept} [type] - Description of identifier
 * @property {string} [use] - usual | official | temp | secondary | old (If known)
 * @property {string} [value] - The value that is unique
 */

/**
 * @typedef {Object} Period
 * @property {string} [end] - End time with inclusive boundary, if not ongoing
 * @property {Extension[]} [extension] - Additional content defined by implementations
 * @property {string} [id] - Unique id for inter-element referencing
 * @property {string} [start] - Starting time with inclusive boundary
 */

/**
 * @typedef {Object} Reference
 * @property {string} [display] - Text alternative for the resource
 * @property {Extension[]} [extension] - Additional content defined by implementations
 * @property {string} [id] - Unique id for inter-element referencing
 * @property {string|Identifier} [identifier] - Logical reference, when literal reference is not known
 * @property {string} [reference] - Literal reference, Relative, internal or absolute URL
 * @property {string} [type] - Type the reference refers to (e.g. "Patient")
 */

